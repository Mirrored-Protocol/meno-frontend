# Meno Frontend Handoff

## Purpose

This document is the continuation anchor for the `meno-frontend` implementation work. It is meant to let a new chat or contributor continue immediately without re-discovering the repo split, recent commits, current assumptions, or known loose ends.

## Repo and Remote Context

Local frontend working repo:

`/home/jadonamite/Drips/Morgana/Meno`

Primary org repo:

`git@github.com:Mirrored-Protocol/meno-frontend.git`

Current pushed branch:

`main`

Local remote names in this repo:

1. `origin` -> `git@github.com:jadonamite/Meno.git`
2. `mirrored` -> `git@github.com:Mirrored-Protocol/meno-frontend.git`

Important:

Push active work to `mirrored/main`.

## Platform Split

The project has been split conceptually into three repos under the `Mirrored-Protocol` org:

1. `meno-frontend`
2. `meno-backend`
3. `meno-contracts`

There is also a local planning workspace here:

`/home/jadonamite/Drips/Morgana/meno-workspace`

That workspace contains:

1. platform-level `README.md`
2. `PRD.md`
3. `progress.md`
4. `todo.md`
5. placeholder backend/contracts/frontend folders

## What Has Been Done

Three implementation commits have already been made and pushed to `mirrored/main`:

1. `c49bb3f` `Stabilize prototype wallet flow`
2. `601e8ea` `Shift pricing UI toward Stellar`
3. `3718a0a` `Reframe payout flow for Stellar transition`

## What Those Commits Changed

### 1. Prototype Wallet Stabilization

Files:

1. `lib/Web3AuthContext.js`
2. `components/nav/LoginModal.jsx`
3. `components/nav/profile/WalletDisplay.jsx`
4. `README.md`
5. `.gitignore`
6. `.env.example`
7. `package.json`

Summary:

1. Removed the fragile dependency on the wrong Web3Auth/Reown/EVM stack for basic boot flow.
2. Replaced it with a local prototype wallet session provider stored in `localStorage`.
3. Updated login UI to use a prototype wallet flow and Stellar-oriented labels.
4. Replaced the default README with project-specific frontend documentation.

### 2. Pricing/UI Direction Shift

Files:

1. `lib/utils.js`
2. `components/CollectionTableRow.jsx`
3. `components/NFTCard.jsx`
4. `components/ShoppingCartProvider.jsx`
5. `components/NFTDetailPage.jsx`
6. `components/Hero.jsx`

Summary:

1. Added shared display helpers for asset pricing.
2. Replaced many visible `ETH` labels with a prototype `XLM` display direction.
3. Reduced Ethereum-centric copy across key browse and purchase surfaces.

### 3. Payout Flow Reframing

Files:

1. `components/BankWithdrawalForm.jsx`
2. `components/TermsAgreement.jsx`
3. `components/ActionSection.jsx`

Summary:

1. Reframed the flow away from a fake ETH-to-USD off-ramp.
2. Updated copy so the flow reads as a prototype payout/settlement request.
3. Preserved the existing UX structure while reducing misleading blockchain assumptions.

## Current Product State

The frontend is still a prototype, but it is now less tightly coupled to the wrong chain assumptions.

Still true:

1. Marketplace data is mock data.
2. Purchase flow is simulated.
3. Payout flow is simulated.
4. Wallet integration is not real Stellar integration yet.
5. Many components still contain Ethereum-era terminology or logic.

Already improved:

1. Boot path is less brittle.
2. Remote activity is visible through recent commits.
3. The most visible price and payout screens are more aligned with the Stellar transition.

## Important Local-Only Files

These files exist in the local frontend repo and are currently untracked:

1. `PRD.md`
2. `progress.md`
3. `todo.md`

They were created earlier during planning and have **not** been committed in the frontend repo.

This matters because:

1. They are easy to forget.
2. They may conflict conceptually with the richer workspace-level planning docs in `meno-workspace/`.
3. The next chat should decide whether to:
   a. commit them here,
   b. delete them from this repo,
   c. or replace them with links to the workspace docs.

## Known Gaps and Risks

1. `npm install` did not complete cleanly in-session, so a fresh install/build verification is still needed.
2. `package-lock.json` has not yet been deliberately refreshed after the dependency cleanup direction changed.
3. The wallet provider is currently a deliberate prototype stub, not a real Stellar wallet integration.
4. Many components still contain words like `NFT`, `off-ramp`, `ETH`, `Ethereum`, or EVM-shaped assumptions deeper in the codebase.
5. The backend and contracts repos exist remotely, but implementation there has barely started.

## Recommended Next Steps

### Frontend Next

1. Continue removing Ethereum-specific language and assumptions from remaining screens.
2. Replace alert-based interaction feedback with structured UI states.
3. Decide whether NFT naming remains intentional or should move to a broader "digital asset" language.
4. Verify install/build/lint locally and fix the next blocker that appears.
5. Start defining frontend data contracts for collections, assets, listings, and payouts.

### Backend Next

1. Choose stack and persistence strategy.
2. Define the first minimal API entities.
3. Commit an actual backend scaffold into `meno-backend`.

### Contracts Next

1. Choose the Stellar contract toolchain.
2. Define which marketplace actions must be on-chain.
3. Commit the first contracts scaffold into `meno-contracts`.

## Working Rules for the Next Chat

1. Be autonomous.
2. Commit regularly.
3. Push regularly to `mirrored/main` after meaningful frontend progress.
4. Do not overwrite or discard the untracked planning docs without making an explicit decision.
5. Prefer small, visible implementation slices over large speculative rewrites.

## Suggested Immediate Task

Continue in the frontend repo by auditing the remaining Ethereum-centric copy and logic:

1. search for `ETH`
2. search for `Ethereum`
3. search for `off-ramp`
4. search for `Web3Auth`
5. search for hardcoded conversion rates and EVM-style balances

Then:

1. fix a coherent set of files
2. commit
3. push to `mirrored/main`
