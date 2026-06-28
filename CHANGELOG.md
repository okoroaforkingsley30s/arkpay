# CHANGELOG.md

# ArkPay Change Log

All notable changes to ArkPay are documented here.

This file records the evolution of the platform from the very first foundation commit.

---

# Version 0.1.0

## Date

28 June 2026

## Milestone

Foundation Phase Started

---

## Completed

### Repository

* GitHub repository created.
* Initial commit completed.
* Main branch configured.
* Production build successful.

---

### Architecture

Created project architecture.

* config/
* constants/
* contexts/
* services/
* components/
* pages/

---

### Configuration

Created:

* kiosk.js

Purpose:

Central application configuration for ArkPay.

---

### Context

Created:

* KioskContext.jsx

Purpose:

Central kiosk state management.

---

### Enterprise Layout

Created:

* Header
* Footer
* InstitutionBanner
* DeviceStatus
* KioskLayout

Purpose:

Standardized layout shared across every ArkPay screen.

---

### UI Design System

Created:

* PrimaryButton
* GlassCard
* StatusBadge
* SectionTitle
* LoadingScreen
* EmptyState

Purpose:

Reusable enterprise UI components.

---

### Workflow

Created:

* WizardLayout
* workflows.js

Purpose:

Standard workflow engine for all banking operations.

---

### Services

Created:

deviceService.js

Current Status:

Mock implementation.

Future:

Hardware SDK integration.

---

### Welcome Screen

Rebuilt using:

* KioskLayout
* GlassCard
* PrimaryButton
* SectionTitle
* StatusBadge

Purpose:

First enterprise-style landing page.

---

# Decisions Made

ArkPay is NOT a Core Banking System.

ArkPay integrates with existing banking infrastructure.

No unnecessary architecture during Foundation.

Kernel postponed.

Managers postponed.

Cloud postponed.

Bank API postponed.

SDK integration postponed.

Focus on completing one working MVP first.

---

# Current MVP

Current workflow:

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

---

# Build Status

Production Build

PASS

GitHub

PASS

---

# Next Milestone

Version 0.2.0

Objective:

Complete the New Card workflow from Welcome to Receipt using placeholder SDK integrations.

---

# Long-Term Vision

Future releases will introduce:

Seaory SDK

Fingerprint SDK

Camera SDK

PIN Pad SDK

Smart Card Reader SDK

Embossing

Chip Encoding

Bank API Integration

Cloud Dashboard

Remote Device Management

These features will only be developed after the MVP is complete.

---

# Project Principle

Every change recorded here must represent a meaningful improvement to ArkPay.

No change should be added unless it successfully builds and has been committed to GitHub.
