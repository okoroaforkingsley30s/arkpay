export const WORKFLOWS = {
  NEW_CARD: {
    id: "new-card",
    title: "Issue New Card",
    description: "Issue a brand new personalized debit or prepaid card.",
    steps: [
      {
        id: "service",
        title: "Service",
        short: "Select Service",
      },
      {
        id: "verification",
        title: "Verification",
        short: "Customer Identity",
      },
      {
        id: "customer",
        title: "Customer",
        short: "Account Details",
      },
      {
        id: "biometric",
        title: "Biometric",
        short: "Face & Fingerprint",
      },
      {
        id: "preview",
        title: "Preview",
        short: "Confirm Details",
      },
      {
        id: "personalization",
        title: "Personalization",
        short: "Encode & Print",
      },
      {
        id: "receipt",
        title: "Receipt",
        short: "Complete",
      },
    ],
  },

  REPLACE_CARD: {
    id: "replace-card",
    title: "Replace Card",
    description: "Replace a lost, stolen, damaged, or expired card.",
    steps: [
      {
        id: "service",
        title: "Service",
        short: "Replacement Type",
      },
      {
        id: "verification",
        title: "Verification",
        short: "Identity Check",
      },
      {
        id: "old-card",
        title: "Existing Card",
        short: "Locate Card",
      },
      {
        id: "biometric",
        title: "Biometric",
        short: "Authenticate",
      },
      {
        id: "preview",
        title: "Preview",
        short: "Verify",
      },
      {
        id: "personalization",
        title: "Personalization",
        short: "Print Card",
      },
      {
        id: "receipt",
        title: "Receipt",
        short: "Finished",
      },
    ],
  },

  PIN_CHANGE: {
    id: "pin-change",
    title: "PIN Services",
    description: "Securely change or reset a customer's card PIN.",
    steps: [
      {
        id: "verification",
        title: "Verification",
        short: "Identity",
      },
      {
        id: "card",
        title: "Card",
        short: "Insert Card",
      },
      {
        id: "pin",
        title: "New PIN",
        short: "Create PIN",
      },
      {
        id: "confirmation",
        title: "Confirmation",
        short: "Verify PIN",
      },
      {
        id: "receipt",
        title: "Receipt",
        short: "Complete",
      },
    ],
  },
};

export const CARD_TYPES = [
  {
    id: "debit",
    name: "Debit Card",
  },
  {
    id: "prepaid",
    name: "Prepaid Card",
  },
  {
    id: "virtual",
    name: "Virtual Card",
  },
  {
    id: "corporate",
    name: "Corporate Card",
  },
];

export const REPLACEMENT_REASONS = [
  "Lost Card",
  "Stolen Card",
  "Damaged Card",
  "Expired Card",
  "Captured by ATM",
  "Name Change",
  "Chip Failure",
  "Magnetic Stripe Failure",
];

export const CARD_STATUSES = [
  "Active",
  "Inactive",
  "Blocked",
  "Hotlisted",
  "Expired",
];