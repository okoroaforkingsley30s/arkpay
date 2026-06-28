# DECISIONS.md

# ArkPay Engineering Decisions

This document records important architectural and product decisions made during ArkPay development.

Every significant decision should include the reasoning behind it.

---

# Decision 001

## ArkPay is NOT a Core Banking System

Status:

Accepted

Reason:

Banks already provide:

* Core Banking System
* Card Management System
* Customer Database
* HSM
* Customer Accounts
* Card Products

ArkPay's responsibility is to integrate with these systems rather than replace them.

---

# Decision 002

## Build the MVP before expanding architecture

Status:

Accepted

Reason:

A working product provides more value than a large architecture with little functionality.

Foundation should focus on completing one working New Card workflow.

Additional architecture will only be introduced when required.

---

# Decision 003

## No unnecessary abstractions

Status:

Accepted

Reason:

Avoid creating layers that do not currently solve a business problem.

Examples postponed:

* Kernel
* WorkflowManager
* DeviceManager
* SessionManager
* SDKManager
* BankManager

These may be introduced in future versions if the product requires them.

---

# Decision 004

## Use reusable UI components

Status:

Accepted

Reason:

Maintain one consistent design system across ArkPay.

Reusable components include:

* PrimaryButton
* GlassCard
* StatusBadge
* SectionTitle
* LoadingScreen
* EmptyState
* KioskLayout
* WizardLayout

Pages should reuse these instead of creating one-off UI.

---

# Decision 005

## Device SDKs are mocked during Foundation

Status:

Accepted

Reason:

The hardware SDKs are not yet available.

Development continues using placeholder device services until:

* Seaory SDK
* Fingerprint SDK
* Camera SDK
* Smart Card Reader SDK
* PIN Pad SDK

are integrated.

This allows UI and workflows to be completed independently.

---

# Decision 006

## Documentation lives inside the repository

Status:

Accepted

Reason:

Documentation evolves with the code.

The following files are maintained in the project root:

* README.md
* ARKPAY.md
* ARCHITECTURE.md
* ROADMAP.md
* DECISIONS.md
* CHANGELOG.md

All documentation should be committed together with the code.

---

# Decision 007

## One complete feature before the next

Status:

Accepted

Reason:

Avoid partially implemented modules.

Every feature must:

* Be complete.
* Pass `npm run build`.
* Be committed.
* Be pushed to GitHub.

Only then should the next feature begin.

---

# Decision 008

## Build for enterprise, deliver incrementally

Status:

Accepted

Reason:

ArkPay is intended to become an enterprise platform.

However, enterprise architecture should grow alongside real product requirements, not ahead of them.

The Foundation Phase remains intentionally simple while establishing a scalable direction.

---

# Future Decisions

Every future architectural or product decision should be added to this document with:

* Decision number
* Status
* Reason
* Date (optional)
* Impact (optional)

This document represents the engineering memory of ArkPay.
