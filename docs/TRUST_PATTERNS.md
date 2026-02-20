# Trust Patterns — Crypto & Security Products

This document describes UX patterns that build trust and reduce abandonment in crypto and security-focused applications. Use these patterns in BloxChain Protocol and related Particle products.

## Why Trust Patterns Matter

- **Visible security** correlates with higher transaction completion and user confidence; users prefer clear security cues over invisible protection.
- **Simplicity** reduces abandonment; avoid jargon and unnecessary complexity in critical flows.
- **Clear feedback** and recovery paths prevent confusion and support reversible actions where possible.

---

## 1. Security Status Indicators

Communicate verification and risk at a glance.

### Recommended patterns

- **Verified**: Use semantic success (e.g. `Badge variant="success"`) with a check or shield icon. Label: "Verified", "Secured", or "Confirmed".
- **Pending verification**: Use warning or neutral badge with clock/loading icon. Label: "Pending", "Verifying…", "In review".
- **Warning / risk**: Use warning or error badge with alert icon. Label: "Review required", "Unusual activity", "Expires soon".

### Implementation

- Use existing **Badge** and **Alert** components with semantic colors (`success`, `warning`, `error`, `info`).
- Pair color with text and icons; never rely on color alone (accessibility).
- Place status near the relevant entity (e.g. next to address, account, or transaction).

### Example (conceptual)

```tsx
<Badge variant="success">Verified</Badge>
<Badge variant="warning">Pending verification</Badge>
<Alert variant="warning">Review this transaction before confirming.</Alert>
```

---

## 2. Transaction Preview Pattern

Show amount, recipient, fee, and confirm/cancel before execution.

### Structure

1. **Amount**: Prominent, tabular numbers; include unit (e.g. ETH, USDC).
2. **Recipient / address**: Short preview (e.g. `0x1234…5678`) with optional "View full address" expandable.
3. **Fee / gas**: Clearly labeled; explain if unusual.
4. **Actions**: Primary = Confirm (e.g. `Button variant="primary"`), Secondary = Cancel (e.g. `Button variant="secondary"` or ghost).

### Best practices

- Use **Modal** with `variant="confirmation"` or `variant="warning"` for destructive or high-value actions.
- Provide a transaction summary (e.g. Card or list) before the confirm button.
- For irreversible actions, use explicit copy: "This action cannot be undone" and require confirmation.
- Show pending state after submit (e.g. Spinner, "Confirming…") and then success or error with next steps.

### Error recovery

- On failure: Clear message (e.g. Alert variant="error") with cause and actionable next step (e.g. "Retry", "Check balance", "Contact support").
- Offer Undo or time-limited revert where the system allows it.

---

## 3. Error Recovery Patterns

Make errors understandable and recoverable.

### Principles

- **Message**: Plain language; avoid raw error codes unless the user can act on them.
- **Action**: One primary next step (Retry, Edit input, Go to settings, Contact support).
- **Placement**: Inline near the field or in a dismissible Alert/Toast; modal only for blocking errors.

### Implementation

- Use **Alert** for persistent errors, **Toast** for transient feedback.
- Use **form-error** and **form-helper** classes for field-level validation.
- Link to help docs or support where relevant.

### Example (conceptual)

```tsx
<Alert variant="error" title="Transaction failed">
  Your transaction could not be completed. Check that you have enough balance and try again.
  <Button variant="secondary" size="sm">Retry</Button>
</Alert>
```

---

## 4. Progressive Disclosure

Reveal technical detail only when needed.

### Patterns

- **Tooltips**: Use **Tooltip** for short explanations (e.g. "Gas fee paid to the network").
- **Expandable sections**: Use **Accordion** or collapsible Card for "Technical details", "Full address", "Contract data".
- **Defaults**: Show simple summary by default; "Advanced" or "Show more" reveals hashes, nonces, contract calls.

### Best practices

- Keep primary actions and key info (amount, recipient, status) always visible.
- Use consistent labels ("Advanced", "Technical details") so users learn where to look.
- Ensure expanded content is still accessible (focus, screen readers).

---

## Component Mapping

| Pattern              | Use existing components     |
|----------------------|-----------------------------|
| Security status      | Badge, Alert                |
| Transaction preview  | Modal, Card, Button         |
| Error recovery       | Alert, Toast, form-error    |
| Progressive disclosure | Tooltip, Accordion, Card |

---

## Future Components (optional)

- **SecurityStatusBadge**: Dedicated variant or composition for Verified / Pending / Warning.
- **TransactionPreview**: Reusable layout (amount, address preview, fee, actions) for confirm screens.

These can be added later; current Badge, Alert, Modal, and Card are sufficient to implement the patterns above.
