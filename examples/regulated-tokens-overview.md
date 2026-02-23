# Regulated Token Implementation

**Regulatory requirements, blockchain constraints, and compliance by architecture**

---

**Particle Crypto Security LTD** provides secure, compliant infrastructure for digital assets. **BloxChain Protocol** is our governance and control layer for regulated smart accounts on public blockchains, serving institutions and enterprises that require audit trails, access controls, and regulatory alignment.

## Overview

:::doc-cards-2
:::doc-card
**The challenge**

Banks and regulators expect identity (KYC/AML), the ability to freeze or reverse transactions (court orders, sanctions), and a clear audit trail. Public blockchains are pseudonymous, largely immutable, and global—which conflicts with these expectations.
:::
:::doc-card
**The approach**

An institution-grade token can run on public chains when a **policy-enforced control layer** provides identity at the account level, enforceable interventions (freeze, pause, redemption), and a full audit trail—closing the gap between traditional banking (strong control, high cost) and current web3 (efficiency without sufficient control).
:::
:::

### What institutions and regulators need

Three requirements underpin supervisory acceptance: **identity** (who holds and moves value; KYC/AML at the account layer); **enforceability** (freeze, pause, redeem on court order or sanctions); and **audit trail** (chain plus policy and logs). A programmable governed layer delivers these on public chains while preserving settlement efficiency.

### Requirement vs. model

:::doc-table
| Requirement          | Traditional banking | Current web3   | Programmable governed token   |
| -------------------- | ------------------- | -------------- | ----------------------------- |
| Identity / KYC       | Centralised         | Pseudonymous   | Enforced at account/access    |
| Freeze / pause       | Yes                 | Rare           | Policy-based, auditable       |
| Audit trail          | Ledger + reports    | Chain only     | Chain + policy + logs         |
| Legal enforceability | High                | Variable/weak  | By design (control layer)     |
| Settlement finality  | Defined             | Probabilistic  | Configurable / clear          |
:::

:::doc-callout
**Bottom line.** A programmable governed layer delivers chain efficiency with the identity, control, and auditability that regulators and institutions require.
:::

:::doc-page-break
:::

## Reference: Requirements, Constraints & Benefits

### What stakeholders need

:::doc-cards-2
:::doc-card
**Banks** — Identity & KYC/AML; pause, freeze, reverse (court orders, sanctions, fraud); settlement finality and dispute resolution; capital/liquidity treatment aligned with core banking.
:::
:::doc-card
**Regulators** — Supervision & reporting; enforceable sanctions, freezes, court orders; stability and consumer protection (reserves, redemption, disclosure); clear legal characterisation.
:::
:::

### Blockchain constraints → design response

:::doc-table
| Constraint               | Regulatory need            | Design response |
| ------------------------ | -------------------------- | ---------------- |
| Immutability             | Freeze, reverse, court orders | Control layer: restrict or pause without changing base-layer consensus |
| Pseudonymity             | KYC/AML, attribution       | Identity at account/access layer; only compliant actors move regulated value |
| Global vs jurisdictional | Sanctions, licensing       | Programmable policies encoding jurisdiction-specific rules, enforced on-chain |
| Probabilistic finality   | Legal certainty, disputes  | Defined finality, time locks, multi-party approval |
| Smart contract risk      | Upgrade and key safety     | Formal verification, upgrade under strict governance, time-locked critical actions |
:::

### How the three models compare

:::doc-table
| Dimension             | Traditional banking   | Current web3 tokens        | Programmable governed token           |
| --------------------- | --------------------- | -------------------------- | ------------------------------------- |
| Settlement speed      | Days (e.g. T+2)       | Minutes–hours              | Minutes–hours, defined finality        |
| Operational cost      | High                  | Lower; compliance ad hoc   | Lower; compliance by design            |
| Regulatory acceptance | High                  | Mixed / cautious           | Higher when control and audit are explicit |
:::

### Value proposition

Compliance by architecture · Segregation of duties · Intervention windows (time locks, approval workflows) · Institutional fit (banks, custodians, issuers, treasury) · Public-chain benefits retained (transparency, shared settlement, composability).

### Who benefits

:::doc-table
| Audience   | Benefit |
| ---------- | ------- |
| Banks      | Lower ops cost; clearer capital/liquidity treatment; ability to issue or use regulated stablecoins and tokenised assets with enforceable controls. |
| Regulators | Supervisory visibility; enforceable sanctions and court orders; basis for licensing and consumer protection. |
| Ecosystem  | One governed layer for multiple token types under a consistent compliance model. |
:::

*Confidential — for authorised use only.*
