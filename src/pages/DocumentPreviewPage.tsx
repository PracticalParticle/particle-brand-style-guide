import { useMemo, useRef, useState } from 'react'
import type { ComponentPropsWithoutRef } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import remarkDirective from 'remark-directive'
import { useReactToPrint } from 'react-to-print'
import { Button, Card, Input, Label, Logo } from '../components'
import { remarkDocDirectives } from '../utils/remarkDocDirectives'
import { lightNeutrals, lightPrintPalette, lightTheme } from '../tokens/colors'
import { fontFamilyToCssString, typography } from '../tokens/typography'
import logoSvgRaw from '../components/Logo/logo.svg?raw'

/** Print/PDF: light theme text + borders (documents are always light for export) */
const PRINT = {
  textPrimary: lightTheme.text.primary,
  textSecondary: lightTheme.text.secondary,
  border: lightTheme.border.default,
  borderStrong: lightTheme.border.hover,
  link: lightPrintPalette.link,
} as const

/** Print/PDF: map design-system fontSize tokens to { fontSize, lineHeight, letterSpacing } */
function printFont(
  key: keyof typeof typography.fontSize
): { fontSize: string; lineHeight: string; letterSpacing: string } {
  const t = typography.fontSize[key]
  const meta = t[1] as { lineHeight?: string; letterSpacing?: string }
  return {
    fontSize: t[0],
    lineHeight: meta.lineHeight ?? '1.5rem',
    letterSpacing: meta.letterSpacing ?? 'normal',
  }
}

const PRINT_FONTS = {
  sans: fontFamilyToCssString(typography.fontFamily.sans),
  mono: fontFamilyToCssString(typography.fontFamily.mono),
  /** Body copy — token `sm` (14px), line-height ≥1.5 */
  body: printFont('sm'),
  /** Notes, callouts, footer, inline code — token `xs` */
  note: printFont('xs'),
  /** Section headings */
  h1: printFont('2xl'),
  h2: printFont('xl'),
  h3: printFont('lg'),
} as const

const DEFAULT_HEADER_TITLE = 'Bloxchain Protocol'
const DEFAULT_HEADER_SUBTITLE = 'Particle Crypto Security LTD'
const DEFAULT_FOOTER = 'Confidential — For authorised use only'
const WEBSITE_URL = 'https://particlecs.com'
const WEBSITE_LABEL = 'particlecs.com'
const SAMPLE_MARKDOWN = `# Document Title

This is a **sample document** with markdown. Assign section styles with \`:::styleName\` (no space). Header and footer repeat on each page.

:::doc-card
## Section one (card)

- List item one
- List item two
- List item three
:::

:::doc-callout
**Note:** This is a callout. Use \`:::doc-callout\` for highlights or side notes.
:::

:::doc-cards
:::doc-card
**Card A**
:::
:::doc-card
**Card B**
:::
:::

## Section two

| Column A | Column B |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

## Long content for pagination

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.

### Subsection

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

:::doc-page-break
:::

## Conclusion

Use **Export to PDF** and choose "Save as PDF" in the print dialog. Header and footer will appear on every page.
`

/** On-screen markdown preview (Tailwind); print path uses {@link getPrintPageStyle} instead. */
const DOCUMENT_PREVIEW_MARKDOWN_CLASS =
  'document-preview-pane text-sm text-text-primary bg-white [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:mt-2 [&_h1]:leading-snug [&_h1]:tracking-tight [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-3 [&_h2]:leading-snug [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:leading-snug [&_p]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_table]:border-collapse [&_th]:border [&_th]:border-border [&_td]:border [&_td]:border-border [&_th]:px-2 [&_td]:px-2 [&_th]:bg-bg-tertiary [&_a]:underline [&_a]:text-primary [&_.doc-card]:rounded-lg [&_.doc-card]:border [&_.doc-card]:border-border [&_.doc-card]:bg-bg-tertiary/50 [&_.doc-card]:p-4 [&_.doc-card]:my-3 [&_.doc-callout]:border-l-4 [&_.doc-callout]:border-l-primary [&_.doc-callout]:bg-bg-tertiary/50 [&_.doc-callout]:py-2 [&_.doc-callout]:px-3 [&_.doc-callout]:my-3 [&_.doc-callout]:text-xs [&_.doc-callout]:text-text-secondary [&_.doc-callout_strong]:text-text-primary [&_.doc-callout_strong]:font-semibold [&_.doc-callout_b]:text-text-primary [&_.doc-callout_code]:text-text-primary [&_.doc-directive-fence]:!hidden [&_.doc-cards]:grid [&_.doc-cards]:gap-3 [&_.doc-cards]:w-full [&_.doc-cards]:items-start [&_.doc-cards>*:not(.doc-card)]:!hidden [&_.doc-cards_.doc-card]:my-0 [&_.doc-cards_.doc-card]:min-w-0 [&_.doc-cards-1]:grid-cols-1 [&_.doc-cards-2]:grid-cols-2 [&_.doc-cards-3]:grid-cols-3 [&_.doc-cards-4]:grid-cols-4 [&_.doc-cards-5]:grid-cols-5 [&_.doc-cards-6]:grid-cols-6 [&_.doc-cards-7]:grid-cols-7 [&_.doc-cards-8]:grid-cols-8 [&_.doc-table]:my-4 [&_.doc-table]:w-full [&_.doc-table]:rounded-none [&_.doc-table]:border-0 [&_.doc-table]:bg-transparent [&_.doc-table]:p-0 [&_.doc-table]:shadow-none [&_.doc-table_table]:border-collapse [&_.doc-table_table]:border [&_.doc-table_table]:border-border [&_.doc-table_table]:text-sm [&_.doc-table_table]:leading-normal [&_.doc-table_th]:border [&_.doc-table_th]:border-border [&_.doc-table_th]:bg-bg-tertiary [&_.doc-table_th]:px-3 [&_.doc-table_th]:py-2.5 [&_.doc-table_td]:border [&_.doc-table_td]:border-border [&_.doc-table_td]:px-3 [&_.doc-table_td]:py-2.5 [&_pre]:font-mono [&_pre]:text-xs [&_pre]:my-3 [&_pre]:rounded-md [&_pre]:border [&_pre]:border-border [&_pre]:bg-bg-secondary [&_pre]:p-3 [&_pre]:overflow-x-auto [&_.doc-card_pre]:!my-0 [&_.doc-card_pre:not(:first-child)]:!mt-2 [&_.doc-card_pre]:!bg-transparent [&_.doc-card_pre]:!border-0 [&_.doc-card_pre]:!p-0 [&_.doc-card_pre]:!rounded-none [&_.doc-card_pre]:!shadow-none [&_.doc-figure_pre]:!m-0 [&_.doc-figure_pre]:!rounded-none [&_.doc-figure_pre]:!border-0 [&_.doc-figure_pre]:!bg-transparent [&_.doc-figure_pre]:!p-0 [&_.doc-figure_pre]:!shadow-none [&_.doc-figure_pre]:text-xs [&_.doc-figure_pre]:leading-tight [&_.doc-figure_pre]:text-text-primary [&_.doc-list]:pl-6 [&_.doc-list-compact]:pl-5 [&_.doc-list-compact_li]:my-0.5 [&_.doc-page-break]:block [&_.doc-page-break]:border-t [&_.doc-page-break]:border-dashed [&_.doc-page-break]:border-border [&_.doc-page-break]:my-4 [&_.doc-page-break]:py-2 [&_.doc-page-break]:text-center [&_.doc-page-break]:text-xs [&_.doc-page-break]:text-text-tertiary [&_.doc-page-break]:before:content-[\'Page_break\']'

function getPrintPageStyle(logoDataUrl: string): string {
  const b = PRINT_FONTS.body
  const n = PRINT_FONTS.note
  const h1 = PRINT_FONTS.h1
  const h2 = PRINT_FONTS.h2
  const h3 = PRINT_FONTS.h3
  const sans = PRINT_FONTS.sans
  const mono = PRINT_FONTS.mono
  const S = lightPrintPalette

  return `
  /* Less vertical margin at sheet edges; slightly wider L/R keeps line length comfortable */
  @page { size: A4; margin: 10mm 18mm 11mm 18mm; }
  *, *::before, *::after { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  html, body {
    font-family: ${sans};
    color: ${PRINT.textPrimary};
    font-size: ${b.fontSize};
    line-height: ${b.lineHeight};
    letter-spacing: ${b.letterSpacing};
    margin: 0;
    padding: 0;
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
    background: ${S.paper} !important;
  }
  body > * { position: static !important; left: auto !important; width: 100% !important; max-width: 100% !important; background: ${S.paper} !important; }
  .doc-print-root { width: 100% !important; max-width: 100% !important; min-width: 0 !important; }
  .doc-print-body { background: ${S.paper} !important; }
  .doc-print-table { width: 100%; max-width: 100%; table-layout: fixed; border-collapse: collapse; background: ${S.paper} !important; }
  .doc-print-table td { background: ${S.paper} !important; }
  .doc-print-table thead td { background: ${S.paper} !important; }
  .doc-print-table tfoot td { background: ${S.paper} !important; }
  .doc-print-table thead { display: table-header-group !important; }
  .doc-print-table tfoot { display: table-footer-group !important; }
  /* Tight to top sheet edge; a bit more space under header row before the rule */
  .doc-print-header { padding: 4px 0 8px 0; border-bottom: 1px solid ${PRINT.border}; }
  .doc-print-footer {
    padding: 6px 0 3px 0;
    border-top: 1px solid ${PRINT.border};
    border-bottom: none;
    font-family: ${sans};
    font-size: ${n.fontSize};
    line-height: ${n.lineHeight};
    letter-spacing: ${n.letterSpacing};
    color: ${PRINT.textSecondary};
  }
  /*
   * Main column: keep td padding at 0 — padding on tbody cells is unreliable in print (and child
   * margins can collapse with td padding, eating the gap). Spacing lives on the inner wrapper.
   */
  td.doc-print-body {
    padding: 0 !important;
    vertical-align: top;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    overflow-wrap: anywhere;
    word-break: break-word;
    font-family: ${sans};
    font-size: ${b.fontSize};
    line-height: ${b.lineHeight};
    letter-spacing: ${b.letterSpacing};
    color: ${PRINT.textPrimary};
  }
  /* flow-root: stops first/last block margins from collapsing through (no stuck-to-rule look) */
  td.doc-print-body > .doc-print-body {
    display: flow-root;
    padding: 28px 0 32px 0;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
    word-wrap: break-word;
    overflow-wrap: anywhere;
  }
  .doc-print-body .doc-print-body { word-wrap: break-word; overflow-wrap: anywhere; }
  .doc-print-body img, .doc-print-body svg, .doc-print-body video { max-width: 100% !important; height: auto !important; }
  .doc-print-body code {
    font-family: ${mono};
    font-size: ${n.fontSize};
    line-height: ${n.lineHeight};
    letter-spacing: ${n.letterSpacing};
    word-wrap: break-word;
    overflow-wrap: anywhere;
    max-width: 100%;
  }
  .doc-print-body pre {
    font-family: ${mono};
    font-size: ${n.fontSize};
    line-height: ${n.lineHeight};
    letter-spacing: ${n.letterSpacing};
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: anywhere;
    max-width: 100%;
    margin: 0.65em 0;
    padding: 0.65rem 0.85rem;
    background: ${S.codeBlockBg} !important;
    border: 1px solid ${S.codeBlockBorder};
    border-radius: 6px;
  }
  .doc-print-body .doc-figure { margin: 0.5em 0; page-break-inside: avoid; }
  .doc-print-body .doc-figure pre {
    font-family: ${mono} !important;
    font-size: ${n.fontSize} !important;
    line-height: ${n.lineHeight} !important;
    letter-spacing: ${n.letterSpacing} !important;
    margin: 0.35em 0 !important;
    padding: 0 !important;
    max-width: 100% !important;
    background: transparent !important;
    border: none !important;
    border-radius: 0 !important;
    white-space: pre !important;
    word-wrap: normal !important;
    overflow-wrap: normal !important;
    overflow-x: visible;
  }
  .doc-print-body .doc-figure pre code {
    font-size: inherit !important;
    line-height: inherit !important;
    letter-spacing: inherit !important;
    background: transparent !important;
    padding: 0 !important;
    border: none !important;
    white-space: pre !important;
  }
  .doc-print-body h1 {
    font-family: ${sans};
    font-size: ${h1.fontSize};
    line-height: ${h1.lineHeight};
    letter-spacing: ${h1.letterSpacing};
    font-weight: 600;
    color: ${PRINT.textPrimary};
    margin: 0 0 0.75em;
  }
  .doc-print-body h2 {
    font-family: ${sans};
    font-size: ${h2.fontSize};
    line-height: ${h2.lineHeight};
    letter-spacing: ${h2.letterSpacing};
    font-weight: 600;
    color: ${PRINT.textPrimary};
    margin: 1.25em 0 0.5em;
  }
  .doc-print-body h2:first-of-type { margin-top: 0; }
  .doc-print-body h3 {
    font-family: ${sans};
    font-size: ${h3.fontSize};
    line-height: ${h3.lineHeight};
    letter-spacing: ${h3.letterSpacing};
    font-weight: 600;
    color: ${PRINT.textPrimary};
    margin: 1em 0 0.4em;
  }
  .doc-print-body p { margin: 0.5em 0; }
  .doc-print-body ul, .doc-print-body ol { margin: 0.5em 0; padding-left: 1.5em; }
  .doc-print-body table {
    border-collapse: collapse;
    width: 100%;
    max-width: 100%;
    table-layout: fixed;
    margin: 0.5em 0;
    font-family: ${sans};
    font-size: ${b.fontSize};
    line-height: ${b.lineHeight};
    letter-spacing: ${b.letterSpacing};
  }
  .doc-print-body th, .doc-print-body td { border: 1px solid ${S.codeBlockBorder}; padding: 6px 8px; text-align: left; }
  .doc-print-body th { background: ${S.calloutBackground} !important; font-weight: 600; }
  .doc-print-body a { text-decoration: underline; color: ${PRINT.link}; }
  .doc-print-header-inner { display: flex; align-items: center; gap: 14px; }
  .doc-print-header .doc-print-logo { flex-shrink: 0; width: 44px; height: 36px; color: ${PRINT.textPrimary}; background-image: url("${logoDataUrl}"); background-repeat: no-repeat; background-position: left center; background-size: contain; }
  .doc-print-header .doc-print-logo * { color: inherit; }
  .doc-print-header .doc-print-logo > * { display: none !important; }
  .doc-print-header-titles { display: flex; flex-direction: column; gap: 2px; }
  .doc-print-header-title {
    font-family: ${sans};
    font-size: ${b.fontSize};
    line-height: ${b.lineHeight};
    letter-spacing: ${b.letterSpacing};
    font-weight: 600;
    color: ${PRINT.textPrimary};
  }
  .doc-print-header-subtitle {
    font-family: ${sans};
    font-size: ${n.fontSize};
    line-height: ${n.lineHeight};
    letter-spacing: ${n.letterSpacing};
    color: ${PRINT.textSecondary};
  }
  .doc-print-footer-inner { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; }
  .doc-print-footer a { color: ${PRINT.textSecondary}; text-decoration: underline; }
  .doc-print-footer a:hover { color: ${PRINT.textPrimary}; }
  .doc-print-body .doc-card { border: 1px solid ${S.cardBorder}; border-radius: 8px; padding: 1rem 1.25rem; margin: 0.75em 0; background: ${S.cardBackground} !important; font-family: ${sans}; font-size: ${b.fontSize}; line-height: ${b.lineHeight}; }
  /* Code inside doc-card: single frame — inherit card padding; no nested “inner code panel” */
  .doc-print-body .doc-card pre {
    font-family: ${mono} !important;
    font-size: ${n.fontSize} !important;
    line-height: ${n.lineHeight} !important;
    letter-spacing: ${n.letterSpacing} !important;
    margin: 0.5em 0 0 !important;
    padding: 0 !important;
    background: transparent !important;
    border: none !important;
    border-radius: 0 !important;
    white-space: pre-wrap !important;
    word-wrap: break-word !important;
    overflow-wrap: anywhere !important;
  }
  .doc-print-body .doc-card pre:first-child { margin-top: 0 !important; }
  .doc-print-body .doc-card pre code { background: transparent !important; padding: 0 !important; border: none !important; font-size: inherit !important; }
  .doc-print-body .doc-callout {
    border-left: 4px solid ${PRINT.textPrimary};
    padding: 0.75rem 1rem;
    margin: 0.75em 0;
    background: ${S.calloutBackground} !important;
    font-family: ${sans};
    font-size: ${n.fontSize};
    line-height: ${n.lineHeight};
    letter-spacing: ${n.letterSpacing};
    color: ${PRINT.textSecondary};
  }
  .doc-print-body .doc-callout strong,
  .doc-print-body .doc-callout b {
    color: ${PRINT.textPrimary};
    font-weight: 600;
  }
  .doc-print-body .doc-callout code {
    color: ${PRINT.textPrimary};
    background: ${S.inlineCodeOnCalloutBg};
    border-color: ${PRINT.borderStrong};
  }
  .doc-print-body .doc-callout a {
    color: ${PRINT.link};
  }
  .doc-print-body .doc-cards { display: grid !important; grid-auto-flow: row; align-items: start; gap: 1rem; margin: 0.75em 0; width: 100%; }
  .doc-print-body .doc-cards > *:not(.doc-card) { display: none !important; }
  .doc-print-body .doc-cards .doc-card { margin: 0; min-width: 0; }
  .doc-print-body .doc-cards-1 { grid-template-columns: repeat(1, minmax(0, 1fr)) !important; }
  .doc-print-body .doc-cards-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
  .doc-print-body .doc-cards-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
  .doc-print-body .doc-cards-4 { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }
  .doc-print-body .doc-cards-5 { grid-template-columns: repeat(5, minmax(0, 1fr)) !important; }
  .doc-print-body .doc-cards-6 { grid-template-columns: repeat(6, minmax(0, 1fr)) !important; }
  .doc-print-body .doc-cards-7 { grid-template-columns: repeat(7, minmax(0, 1fr)) !important; }
  .doc-print-body .doc-cards-8 { grid-template-columns: repeat(8, minmax(0, 1fr)) !important; }
  .doc-print-body .doc-table { width: 100%; margin: 0.65em 0; overflow: visible; border-radius: 0; border: none; box-shadow: none; background: transparent !important; padding: 0; }
  .doc-print-body .doc-table table {
    border-collapse: collapse;
    width: 100%;
    max-width: 100%;
    table-layout: fixed;
    font-family: ${sans};
    font-size: ${b.fontSize};
    line-height: ${b.lineHeight};
    letter-spacing: ${b.letterSpacing};
    border: 1px solid ${S.tableBorder};
  }
  .doc-print-body .doc-table th, .doc-print-body .doc-table td { border: 1px solid ${S.tableBorder}; padding: 8px 10px; text-align: left; vertical-align: top; }
  .doc-print-body .doc-table th { background: ${S.tableHeaderBg} !important; color: ${PRINT.textPrimary}; font-weight: 600; }
  .doc-print-body .doc-table thead th { border-radius: 0 !important; }
  .doc-print-body .doc-table tbody td { border-radius: 0 !important; }
  .doc-print-body .doc-table tbody tr:nth-child(even) { background: ${S.tableRowStripe} !important; }
  .doc-print-body .doc-table tbody tr:nth-child(odd) { background: ${S.paper} !important; }
  .doc-print-body .doc-list { padding-left: 1.5rem; margin: 0.75em 0; }
  .doc-print-body .doc-list-compact { padding-left: 1.25rem; margin: 0.5em 0; }
  .doc-print-body .doc-list-compact li { margin: 0.25em 0; }
  .doc-print-body .doc-page-break { page-break-before: always; height: 0; margin: 0; padding: 0; overflow: hidden; }
  .doc-print-body .doc-directive-fence { display: none !important; }
  .doc-print-body .doc-cards .doc-card { min-width: 0 !important; }
`
}

/** Logo as data URL (dark) so header background repeats on every printed page. */
function getLogoDataUrl(): string {
  const svgForPrint = logoSvgRaw.replace(/currentColor/g, lightNeutrals.textPrimary)
  return `data:image/svg+xml,${encodeURIComponent(svgForPrint)}`
}

/**
 * Renders markdown links so `href` is preserved in print/PDF (Chrome “Save as PDF” keeps
 * https/mailto/fragment targets). External URLs open in a new tab in preview only.
 */
function MarkdownLink({ href, children, ...rest }: ComponentPropsWithoutRef<'a'>) {
  const isExternal =
    typeof href === 'string' &&
    (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:'))
  return (
    <a href={href} {...rest} {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  )
}

const markdownRemarkPlugins = [remarkGfm, remarkDirective, remarkDocDirectives]
const markdownRehypePlugins = [rehypeRaw]
const markdownComponents = { a: MarkdownLink }

export function DocumentPreviewPage({ onBack }: { onBack: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [documentTitle, setDocumentTitle] = useState('Document')
  const [headerTitle, setHeaderTitle] = useState(DEFAULT_HEADER_TITLE)
  const [headerSubtitle, setHeaderSubtitle] = useState(DEFAULT_HEADER_SUBTITLE)
  const [footerText, setFooterText] = useState(DEFAULT_FOOTER)
  const [markdown, setMarkdown] = useState(SAMPLE_MARKDOWN)

  const printPageStyle = useMemo(() => getPrintPageStyle(getLogoDataUrl()), [])

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle,
    pageStyle: printPageStyle,
  })

  const loadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const text = ev.target?.result
      if (typeof text === 'string') setMarkdown(text)
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className="max-w-6xl mx-auto p-6 sm:p-8 space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" size="md" onClick={onBack}>
          ← Back
        </Button>
        <h1 className="text-2xl font-semibold text-text-primary">Document preview & export</h1>
      </div>

      <Card variant="outlined" padding="lg">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="doc-title">PDF / print title</Label>
            <Input
              id="doc-title"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              placeholder="Document"
              className="mt-1"
            />
          </div>
          <div className="flex items-end">
            <Label className="sr-only" htmlFor="md-file">Load .md file</Label>
            <Input
              id="md-file"
              type="file"
              accept=".md,text/markdown,text/plain"
              onChange={loadFile}
              className="hidden"
            />
            <Button
              variant="outline"
              size="md"
              onClick={() => document.getElementById('md-file')?.click()}
            >
              Load .md file
            </Button>
          </div>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="header-title">Header line 1 (protocol name)</Label>
            <Input
              id="header-title"
              value={headerTitle}
              onChange={(e) => setHeaderTitle(e.target.value)}
              placeholder="e.g. BloxChain Protocol"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="header-subtitle">Header line 2 (company name)</Label>
            <Input
              id="header-subtitle"
              value={headerSubtitle}
              onChange={(e) => setHeaderSubtitle(e.target.value)}
              placeholder="e.g. Particle Crypto Security LTD"
              className="mt-1"
            />
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="footer-text">Footer (repeats on each page)</Label>
          <Input
            id="footer-text"
            value={footerText}
            onChange={(e) => setFooterText(e.target.value)}
            placeholder="Footer text"
            className="mt-1"
          />
        </div>
      </Card>

      <Card variant="outlined" padding="lg">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Preview</h2>
          <Button variant="primary" size="md" onClick={handlePrint}>
            Export to PDF
          </Button>
        </div>
        <p className="text-sm text-text-secondary mb-3">
          <strong>Export to PDF</strong> opens the browser print dialog. Choose &quot;Save as PDF&quot; to download. Header (with logo) and footer (with website) repeat on every page.
        </p>
        <p className="text-xs text-text-tertiary mb-3">
          PDF export parses raw HTML in markdown (for directives). Only load <strong>trusted</strong> <code className="bg-bg-tertiary px-1 rounded">.md</code> files from sources you control.
        </p>
        <p className="text-xs text-text-tertiary mb-3">
          Section styles: <code className="bg-bg-tertiary px-1 rounded">:::doc-card</code>, <code className="bg-bg-tertiary px-1 rounded">:::doc-callout</code>, <code className="bg-bg-tertiary px-1 rounded">:::doc-cards</code> (columns = number of <code className="bg-bg-tertiary px-1 rounded">:::doc-card</code> blocks, 1–8), <code className="bg-bg-tertiary px-1 rounded">:::doc-table</code>, <code className="bg-bg-tertiary px-1 rounded">:::doc-list</code>, <code className="bg-bg-tertiary px-1 rounded">:::doc-list-compact</code>, <code className="bg-bg-tertiary px-1 rounded">:::doc-page-break</code> (new page in PDF), <code className="bg-bg-tertiary px-1 rounded">:::doc-figure</code> (ASCII / wide monospace, no card). Close with <code className="bg-bg-tertiary px-1 rounded">:::</code>. Enable &quot;Background graphics&quot; when saving PDF.
        </p>
        <div className="grid gap-4 md:grid-cols-[1fr_1.5fr]">
          <div className="min-w-0">
            <Label htmlFor="markdown-source">Markdown source</Label>
            <textarea
              id="markdown-source"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              rows={18}
              className="mt-1 w-full rounded-control border border-border bg-bg-secondary px-3 py-2 font-mono text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus"
              spellCheck={false}
            />
          </div>
          <div className="rounded-control border border-border bg-white p-4 min-h-[320px] min-w-[32rem] overflow-auto">
            <div className="text-sm text-text-secondary mb-2">Rendered preview</div>
            <div className={DOCUMENT_PREVIEW_MARKDOWN_CLASS}>
              <ReactMarkdown remarkPlugins={markdownRemarkPlugins}>{markdown}</ReactMarkdown>
            </div>
          </div>
        </div>
      </Card>

      {/* Printable area: off-screen so cloneable; table thead/tfoot repeat on each printed page */}
      <div
        ref={contentRef}
        className="doc-print-root"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 0,
          width: '100%',
          maxWidth: '100%',
          minWidth: 0,
          boxSizing: 'border-box',
        }}
        aria-hidden
      >
        <table className="doc-print-table">
          <thead>
            <tr>
              <td className="doc-print-header">
                <div className="doc-print-header-inner">
                  <span className="doc-print-logo">
                    <Logo variant="dark" size={48} />
                  </span>
                  <div className="doc-print-header-titles">
                    <span className="doc-print-header-title">{headerTitle}</span>
                    <span className="doc-print-header-subtitle">{headerSubtitle}</span>
                  </div>
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="doc-print-body">
                <div className="doc-print-body">
                  <ReactMarkdown
                  remarkPlugins={markdownRemarkPlugins}
                  rehypePlugins={markdownRehypePlugins}
                  components={markdownComponents}
                >
                  {markdown}
                </ReactMarkdown>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td className="doc-print-footer">
                <div className="doc-print-footer-inner">
                  <span>{footerText}</span>
                  <a href={WEBSITE_URL} target="_blank" rel="noopener noreferrer">{WEBSITE_LABEL}</a>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
