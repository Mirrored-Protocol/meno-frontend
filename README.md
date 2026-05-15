# Meno Frontend

Meno is the frontend application for a Stellar-native digital asset marketplace platform. This repository currently contains the original Next.js prototype that we are actively stabilizing and evolving into the real `meno-frontend` product.

## Current State

The app already includes:

1. A landing page and marketplace browse experience
2. Wallet-aware navigation
3. Collection ranking and featured asset UI
4. NFT detail, cart, and off-ramp themed prototype flows

The app is still mid-transition and currently has a mix of:

1. Real frontend structure
2. Mock marketplace data
3. Simulated buy and payout flows
4. Ethereum-oriented auth and pricing assumptions that will be replaced during the Stellar migration

## Immediate Goals

1. Keep the frontend bootable and easy to run locally
2. Replace broken or mismatched dependencies
3. Remove placeholder documentation
4. Prepare the codebase for the move toward Stellar-native wallet and transaction flows

## Local Development

### Prerequisites

1. Node.js 20+
2. npm 10+

### Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

The current prototype does not require any environment variables to run.

`.env.example` is included as a placeholder so we have a consistent convention when real frontend secrets and public config are introduced.

Likely future variables:

1. Public wallet integration config
2. API base URL
3. Analytics or monitoring keys

## Project Notes

1. `app/` contains the Next.js app router entrypoints
2. `components/` contains marketplace UI, nav, modal, and cart flows
3. `data/` currently contains mock marketplace datasets
4. `lib/Web3AuthContext.js` contains the current prototype wallet session provider

## Roadmap Context

Planning docs for the broader revamp live in:

1. `PRD.md`
2. `progress.md`
3. `todo.md`

The multi-repo workspace plan also exists in `/home/jadonamite/Drips/Morgana/meno-workspace`.
