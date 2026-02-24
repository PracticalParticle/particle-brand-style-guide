# Document Styles & Layouts — Demo

This example shows all section styles and layouts. Use `:::styleName` (no space after colons). Close with `:::`.

---

## 1. doc-card (single card)

:::doc-card
**Card** — Rounded border, padding, light background. Use for a single highlighted block of content.

- Bullet one
- Bullet two
:::

---

## 2. doc-callout (highlight / note)

:::doc-callout
**Note:** Use callouts for side notes, warnings, or important highlights. Left border and tinted background.
:::

:::doc-callout
**Tip:** You can use multiple callouts in one document.
:::

---

## 3. doc-cards (flex — wraps)

Cards in a flexible row; they wrap on narrow widths.

:::doc-cards
:::doc-card
**Card A** — flex item
:::
:::doc-card
**Card B** — flex item
:::
:::doc-card
**Card C** — flex item
:::
:::

---

## 4. doc-cards (two columns — 2 cards)

:::doc-cards
:::doc-card
**Row 1, Col 1** — First card.
:::
:::doc-card
**Row 1, Col 2** — Second card.
:::
:::doc-card
**Row 2, Col 1** — Third card.
:::
:::doc-card
**Row 2, Col 2** — Fourth card.
:::
:::

---

## 5. doc-cards (three columns — 3 cards)

:::doc-cards
:::doc-card
**One**
:::
:::doc-card
**Two**
:::
:::doc-card
**Three**
:::
:::

---

## 6. doc-cards (four columns — 4+ cards)

:::doc-cards
:::doc-card
**Row 1, Col 1**
:::
:::doc-card
**Row 1, Col 2**
:::
:::doc-card
**Row 1, Col 3**
:::
:::doc-card
**Row 1, Col 4**
:::
:::doc-card
**Row 2, Col 1**
:::
:::doc-card
**Row 2, Col 2**
:::
:::doc-card
**Row 2, Col 3**
:::
:::doc-card
**Row 2, Col 4**
:::
:::

---

## 7. doc-table (styled table)

:::doc-table
| Feature    | Status   |
| ---------- | -------- |
| Cards      | Supported |
| Callouts   | Supported |
| 2/3/4 cols | Supported |
| Tables     | Supported |
| Lists      | Supported |
:::

---

## 8. doc-list (list with spacing)

:::doc-list
- First item with comfortable spacing
- Second item
- Third item
:::

---

## 9. doc-list-compact (tight list)

:::doc-list-compact
- Compact item one
- Compact item two
- Compact item three
:::

---

## Plain content (no wrapper)

Regular markdown with **bold** and *italic*. No section style — just default document styling.

- Unstyled list
- Another item

| Plain table | Col B |
| ----------- | ----- |
| Row 1       | Data  |
| Row 2       | Data  |

---

*End of styles demo. Load this file in Document preview & export to see all styles and export to PDF.*
