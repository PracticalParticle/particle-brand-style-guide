import type { Root } from 'mdast'
import type { BlockContent } from 'mdast'
import { visit } from 'unist-util-visit'

type DirectiveNode = {
  type: 'containerDirective' | 'leafDirective'
  name: string
  children?: BlockContent[]
  data?: Record<string, unknown>
}
type ParagraphNode = { type: 'paragraph'; children: Array<{ type: string; value?: string }>; data?: Record<string, unknown> }

function getParagraphText(node: ParagraphNode): string {
  return (node.children || [])
    .filter((c): c is { type: 'text'; value: string } => c.type === 'text' && typeof (c as { value?: string }).value === 'string')
    .map((c) => c.value)
    .join('')
    .trim()
}

function isDocCard(node: { type: string; name?: string }): boolean {
  return node.type === 'containerDirective' && (node as { name?: string }).name === 'doc-card'
}

/** Create a synthetic doc-card container so the grid has exactly N .doc-card direct children. */
function wrapInDocCard(children: BlockContent[]): DirectiveNode {
  return {
    type: 'containerDirective',
    name: 'doc-card',
    children,
    data: { hName: 'div', hProperties: { className: ['doc-card'] } },
  }
}

const MAX_DOC_CARDS_COLS = 8

/**
 * Remark plugin: convert directive nodes (from remark-directive) into divs
 * with the directive name as a class, so they can be styled as document sections.
 * Also hides paragraphs that contain only ":::" (closing fences).
 * For :::doc-cards, columns are dynamic: number of :::doc-card children = number of columns (1–8).
 *
 * Syntax:
 *   :::doc-cards
 *   :::doc-card
 *   Card one
 *   :::
 *   :::doc-card
 *   Card two
 *   :::
 *   :::
 *
 * Supported: doc-card, doc-callout, doc-cards (dynamic columns), doc-table, doc-list, doc-list-compact, doc-page-break
 */
export function remarkDocDirectives() {
  return (tree: Root) => {
    visit(tree, ['containerDirective', 'leafDirective'], (node, index, parent) => {
      const n = node as unknown as DirectiveNode
      n.data = n.data || {}
      const name = (n.name || '').trim()
      if (!name) {
        n.data.hName = 'div'
        n.data.hProperties = { className: 'doc-directive-fence', style: 'display:none', 'aria-hidden': true }
        return
      }

      // Single :::doc-cards section: columns = number of :::doc-card children (1..8).
      // Parser often puts only the first card inside doc-cards and the rest as siblings; pull following doc-card siblings in.
      if (name === 'doc-cards') {
        const children = (n.children = n.children || [])
        const siblings = parent?.children
        if (siblings && typeof index === 'number') {
          while (index + 1 < siblings.length && isDocCard(siblings[index + 1] as { type: string; name?: string })) {
            children.push(siblings[index + 1] as BlockContent)
            siblings.splice(index + 1, 1)
          }
        }
        const cardNodes: DirectiveNode[] = []
        let loose: BlockContent[] = []
        const flushLoose = () => {
          if (loose.length) {
            cardNodes.push(wrapInDocCard(loose))
            loose = []
          }
        }
        for (const child of children) {
          const childNode = child as { type: string; name?: string }
          if (childNode.type === 'paragraph' && getParagraphText(child as ParagraphNode) === ':::') continue
          if (isDocCard(childNode)) {
            flushLoose()
            cardNodes.push(child as unknown as DirectiveNode)
          } else {
            loose.push(child as BlockContent)
          }
        }
        flushLoose()
        const count = Math.min(Math.max(cardNodes.length, 1), MAX_DOC_CARDS_COLS)
        if (cardNodes.length > 0) {
          n.children = cardNodes as unknown as BlockContent[]
        }
        n.data.hName = 'div'
        n.data.hProperties = {
          className: ['doc-cards', `doc-cards-${count}`],
          style: `display:grid;grid-template-columns:repeat(${count},minmax(0,1fr));gap:0.75rem;align-items:start;width:100%;`,
        }
        return
      }

      n.data.hName = 'div'
      n.data.hProperties = { className: [name] }
    })
    // Hide paragraphs that are only ":::" (closing directive fence) so they don't show in the rendered view
    visit(tree, 'paragraph', (node) => {
      const p = node as ParagraphNode
      if (getParagraphText(p) === ':::') {
        p.data = p.data || {}
        p.data.hName = 'div'
        p.data.hProperties = { className: 'doc-directive-fence', style: 'display:none', 'aria-hidden': true }
      }
    })
  }
}
