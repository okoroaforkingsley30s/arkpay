# ROADMAP.md

# ArkPay Roadmap

This roadmap defines the planned development path for ArkPay.

ArkPay is currently in the Foundation Phase. The priority is to complete one working end-to-end card issuance workflow before adding advanced integrations.

---

# Phase 1 — Foundation

Status: In Progress

Goal:

Build the core UI foundation and complete one working MVP workflow.

## Completed

- Project initialized
- GitHub repository created
- Production build passed
- Configuration layer created
- Context layer created
- Enterprise layout created
- Reusable UI system created
- Wizard layout created
- Workflow definitions created
- Mock device service created
- Welcome screen migrated to new layout

## Remaining

- Complete documentation foundation
- Rebuild Service Selection page
- Rebuild Customer Verification flow
- Rebuild Customer Details page
- Rebuild Card Preview page
- Rebuild Processing page
- Rebuild Receipt page
- Add audit log placeholder
- Complete New Card workflow

---

# Phase 2 — MVP Card Issuance Workflow

Status: Pending

Goal:

Allow a user to complete a full card issuance flow using mock data and placeholder device calls.

## Target Flow

Welcome

↓

Service Selection

↓

Customer Verification

↓

Customer Details

↓

Card Preview

↓

Processing

↓

Receipt

## MVP Features

- Select Issue New Card
- Enter or select customer data
- Mock customer verification
- Mock biometric verification
- Preview personalized card
- Trigger mock print operation
- Trigger mock chip/magstripe encoding operation
- Generate receipt
- Store mock audit event

## Success Criteria

- User can complete New Card workflow end-to-end
- No broken navigation
- No backend required
- No hardware SDK required
- `npm run build` passes

---

# Phase 3 — Admin Workflow

Status: Pending

Goal:

Allow admin users to prepare card issuance records and monitor kiosk status.

## Features

- Admin dashboard cleanup
- Emboss file upload placeholder
- Pending card request queue
- Card stock tracker
- Device test page
- Audit log page
- Institution setup page

## Success Criteria

- Admin can import mock emboss records
- Admin can view pending requests
- Admin can test mock devices
- Admin can configure institution display values
- `npm run build` passes

---

# Phase 4 — Device SDK Integration

Status: Future

Goal:

Replace mock device calls with real SDK integrations.

## Target Devices

- Seaory S21 card printer
- Smart card reader
- Card encoder
- Contactless reader
- Fingerprint scanner
- Camera
- PIN pad
- Signature pad
- Barcode scanner

## Success Criteria

- ArkPay can test each device
- ArkPay can print a test card
- ArkPay can trigger encoding placeholder or real encoding based on SDK availability
- Device status updates in UI

---

# Phase 5 — Backend Integration

Status: Future

Goal:

Introduce persistent storage and backend services.

## Features

- Institutions
- Branches
- Kiosks
- Users
- Card requests
- Card templates
- Audit logs
- Receipts
- Device logs

## Possible Backend

- Supabase
- PostgreSQL
- Node/API layer

---

# Phase 6 — Bank Integration

Status: Future

Goal:

Connect ArkPay to real bank systems.

## Possible Integrations

- Core Banking System
- Card Management System
- BVN/KYC verification
- HSM-backed card personalization
- Card activation API
- Card status API
- Emboss file import
- API-based card request push

## Important

Bank integration comes only after the local MVP and hardware workflows are stable.

---

# Phase 7 — Enterprise Expansion

Status: Future

Goal:

Expand ArkPay beyond one kiosk.

## Possible Features

- Multi-bank support
- Cloud dashboard
- Remote monitoring
- Remote software updates
- Branch fleet management
- Device health alerts
- Multi-printer support
- Role-based access control
- Reporting and analytics

---

# Current Priority

Complete the Foundation Phase.

Do not expand architecture until the New Card MVP workflow works end-to-end.