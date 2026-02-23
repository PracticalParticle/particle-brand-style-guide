import { useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useReactToPrint } from 'react-to-print'
import { Button, Card, Input, Label, Logo } from '../components'

const DEFAULT_HEADER = 'Particle Crypto Security LTD — BloxChain Protocol'
const DEFAULT_FOOTER = 'Confidential — For authorised use only'
const WEBSITE_URL = 'https://particlecs.com'
const WEBSITE_LABEL = 'particlecs.com'
const SAMPLE_MARKDOWN = `# Document Title

This is a **sample document** with markdown. It demonstrates multi-page print with a repeating header and footer.

## Section one

- List item one
- List item two
- List item three

## Section two

| Column A | Column B |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

## Long content for pagination

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.

### Subsection

More content here to force a second page when printing. Repeat this paragraph several times to ensure the table body flows across pages while the header and footer repeat on each printed page.

More content here to force a second page when printing. Repeat this paragraph several times to ensure the table body flows across pages while the header and footer repeat on each printed page.

More content here to force a second page when printing. Repeat this paragraph several times to ensure the table body flows across pages while the header and footer repeat on each printed page.

## Conclusion

Use **Export to PDF** and choose "Save as PDF" in the print dialog. Header and footer will appear on every page.
`

const printPageStyle = `
  @page { size: A4; margin: 20mm; }
  body { font-family: system-ui, sans-serif; color: #0a0a0a; font-size: 12pt; line-height: 1.5; margin: 0; }
  body > * { position: static !important; left: auto !important; width: 100% !important; }
  .doc-print-table { width: 100%; border-collapse: collapse; }
  .doc-print-table thead { display: table-header-group; }
  .doc-print-table tfoot { display: table-footer-group; }
  .doc-print-header, .doc-print-footer { padding: 8px 0; font-size: 10pt; color: #525252; border-bottom: 1px solid #e5e7eb; }
  .doc-print-footer { border-bottom: none; border-top: 1px solid #e5e7eb; }
  .doc-print-body { padding: 12px 0; vertical-align: top; }
  .doc-print-body h1 { font-size: 1.5em; margin: 1em 0 0.5em; }
  .doc-print-body h2 { font-size: 1.25em; margin: 1em 0 0.5em; }
  .doc-print-body h3 { font-size: 1.1em; margin: 0.75em 0 0.5em; }
  .doc-print-body p { margin: 0.5em 0; }
  .doc-print-body ul, .doc-print-body ol { margin: 0.5em 0; padding-left: 1.5em; }
  .doc-print-body table { border-collapse: collapse; width: 100%; margin: 0.5em 0; }
  .doc-print-body th, .doc-print-body td { border: 1px solid #e5e7eb; padding: 6px 8px; text-align: left; }
  .doc-print-body th { background: #f6f7f9; font-weight: 600; }
  .doc-print-header-inner { display: flex; align-items: center; gap: 12px; }
  .doc-print-header .doc-print-logo { flex-shrink: 0; width: 28px; height: auto; color: #0a0a0a; }
  .doc-print-header .doc-print-logo * { color: inherit; }
  .doc-print-footer-inner { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; }
  .doc-print-footer a { color: #525252; text-decoration: none; }
`

export function DocumentPreviewPage({ onBack }: { onBack: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [documentTitle, setDocumentTitle] = useState('Document')
  const [headerText, setHeaderText] = useState(DEFAULT_HEADER)
  const [footerText, setFooterText] = useState(DEFAULT_FOOTER)
  const [markdown, setMarkdown] = useState(SAMPLE_MARKDOWN)

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
    <div className="max-w-4xl mx-auto p-6 sm:p-8 space-y-6">
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
        <div className="mt-4">
          <Label htmlFor="header-text">Header (repeats on each page)</Label>
          <Input
            id="header-text"
            value={headerText}
            onChange={(e) => setHeaderText(e.target.value)}
            placeholder="Header text"
            className="mt-1"
          />
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
        <div className="grid gap-4 md:grid-cols-2">
          <div>
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
          <div className="rounded-control border border-border bg-bg-secondary p-4 min-h-[320px]">
            <div className="text-sm text-text-secondary mb-2">Rendered preview</div>
            <div className="document-preview-pane text-sm text-text-primary [&_h1]:text-xl [&_h1]:font-semibold [&_h1]:mt-2 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-3 [&_h3]:text-base [&_h3]:font-semibold [&_p]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_table]:border-collapse [&_th]:border [&_th]:border-border [&_td]:border [&_td]:border-border [&_th]:px-2 [&_td]:px-2 [&_th]:bg-bg-tertiary">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
            </div>
          </div>
        </div>
      </Card>

      {/* Printable area: off-screen so cloneable; table thead/tfoot repeat on each printed page */}
      <div
        ref={contentRef}
        style={{ position: 'absolute', left: '-9999px', top: 0, width: '210mm' }}
        aria-hidden
      >
        <table className="doc-print-table">
          <thead>
            <tr>
              <td className="doc-print-header">
                <div className="doc-print-header-inner">
                  <span className="doc-print-logo">
                    <Logo variant="dark" size={32} />
                  </span>
                  <span>{headerText}</span>
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="doc-print-body">
                <div className="doc-print-body">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td className="doc-print-footer">
                <div className="doc-print-footer-inner">
                  <span>{footerText}</span>
                  <a href={WEBSITE_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#525252', textDecoration: 'none' }}>{WEBSITE_LABEL}</a>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
