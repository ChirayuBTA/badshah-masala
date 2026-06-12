# Badshah Masala — Full Project Handoff

## What This App Is

A mobile-first consumer survey campaign for **Badshah Masala**. Users land on the page, register with their name and phone number, verify via OTP, fill out a 4-section survey about their masala usage and experience with a Badshah promotional activity, and land on a thank-you screen. All responses are stored relationally in PostgreSQL.

The app is designed to run as a single-page mobile experience (max-width `lg`, centred).

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.9 |
| UI Library | React | 19.2.4 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS v4 | 4.x |
| Animation | Framer Motion | 12.x |
| State Management | Zustand | 5.x |
| ORM | Prisma | 6.x |
| Database | PostgreSQL | any recent |
| Excel Export | SheetJS (`xlsx`) | latest |

### Fonts (Google Fonts, loaded via `next/font`)
- **Playfair Display** — display headings (`font-display`, CSS var `--font-playfair`)
- **Plus Jakarta Sans** — body text (`font-body`, CSS var `--font-jakarta`)

### Design Tokens (`src/app/globals.css`)
Tailwind v4 uses `@theme` for custom tokens — not `tailwind.config.js`.

| Token | Hex | Use |
|---|---|---|
| `crimson` | `#BE1E2D` | Primary brand colour, CTAs |
| `crimson-dark` | `#961825` | Active/hover state |
| `saffron` | `#F5A623` | Accents, highlights |
| `spice` | `#E8621A` | Error states, warnings |
| `cardamom` | `#1E5631` | (reserved) |
| `espresso` | `#1A0800` | Primary text |
| `parchment` | `#FFF6EE` | Page background |
| `parchment-dark` | `#F5E8D8` | Card borders, dividers |

---

## Project Structure

```
badshah-masala/
├── prisma/
│   ├── schema.prisma        # Full DB schema
│   └── seed.ts              # Idempotent survey structure seeder
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout — fonts, metadata, viewport
│   │   ├── page.tsx         # Landing page (registration + OTP)
│   │   ├── survey/
│   │   │   └── page.tsx     # Survey page (guarded by OTP step)
│   │   ├── result/
│   │   │   └── page.tsx     # Thank-you screen
│   │   └── api/
│   │       ├── auth/
│   │       │   ├── register/route.ts      # POST — register user + send OTP
│   │       │   ├── verify-otp/route.ts    # POST — verify OTP
│   │       │   └── resend-otp/route.ts    # POST — resend OTP (30s cooldown on client)
│   │       ├── survey/
│   │       │   └── submit/route.ts        # POST — save survey answers
│   │       └── admin/
│   │           └── export-user/route.ts   # POST — download Excel report
│   ├── components/
│   │   ├── landing/
│   │   │   ├── HeroSection.tsx      # Brand header + countdown timer
│   │   │   ├── RegistrationForm.tsx # Name + phone inputs
│   │   │   └── OtpPanel.tsx         # 4-digit OTP entry
│   │   ├── survey/
│   │   │   ├── SurveyShell.tsx      # Section nav, progress, submit CTA
│   │   │   ├── SectionProgress.tsx  # Step indicator bar
│   │   │   ├── QuestionCard.tsx     # Routes question to correct input component
│   │   │   └── answers/
│   │   │       ├── SingleSelect.tsx
│   │   │       ├── MultiSelect.tsx
│   │   │       ├── TextAnswer.tsx
│   │   │       └── ConditionalInput.tsx
│   │   ├── result/
│   │   │   └── ThankYouScreen.tsx   # Final screen after submission
│   │   └── ui/
│   │       ├── Button.tsx           # Primary / ghost variants, loading state
│   │       ├── AnimatedReveal.tsx   # Fade-up entrance wrapper
│   │       ├── CountdownTimer.tsx   # Live countdown to draw date
│   │       ├── OtpDigitInput.tsx    # 4-box OTP input with auto-advance
│   │       └── PhoneInput.tsx       # +91 prefixed phone field
│   ├── data/
│   │   └── survey.ts        # Source-of-truth survey config (sections + questions)
│   ├── lib/
│   │   ├── prisma.ts        # Singleton PrismaClient (dev-safe)
│   │   ├── config.ts        # App-wide constants
│   │   └── utils.ts         # Shared utility helpers
│   └── store/
│       ├── otpStore.ts      # Auth flow state + API calls
│       └── surveyStore.ts   # Survey answers state + submit API call
├── .env.example             # DB connection template
└── package.json
```

---

## User Flow

```
/ (Landing)
  → user fills name + phone
  → POST /api/auth/register  →  OTP logged to console (dev) / sent via SMS (prod)
  → user enters 4-digit code
      (optional: "Resend code" button — POST /api/auth/resend-otp, 30s cooldown)
  → POST /api/auth/verify-otp  →  step = 'verified'
  → redirect to /survey

/survey
  → 4 sections, one section visible at a time
  → user answers questions, navigates forward/back
  → final section: "Reveal My Prize" button
  → POST /api/survey/submit  →  all answers saved to DB
  → redirect to /result

/result
  → ThankYouScreen — "Thank you, [name]! We've received your responses."
  → "Back to Home" resets all state and navigates to /
```

---

## App Configuration (`src/lib/config.ts`)

| Export | Value | Purpose |
|---|---|---|
| `DEV_MODE` | `true` | Bypasses OTP guard on `/survey` during development |
| `BRAND_NAME` | `'Badshah Masala'` | Display name |
| `PRIZE_NAME` | `'Badshah Premium Masala Gift Hamper'` | Prize display name |
| `WHATSAPP_SHARE_URL` | `'https://wa.me/?text='` | WhatsApp share base URL |

**Before going live:** set `DEV_MODE = false`.

---

## Database Schema (`prisma/schema.prisma`)

### `User`
Stores every registrant. OTP fields are cleared on successful verification.

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `name` | String | From registration form |
| `phone` | String | Unique — 10-digit, no country code |
| `verified` | Boolean | Set to `true` after OTP verification |
| `verifiedAt` | DateTime? | Timestamp of verification |
| `otpCode` | String? | 4-digit code; cleared after verify |
| `otpExpiresAt` | DateTime? | `now + 10 min`; cleared after verify |
| `hasCompletedSurvey` | Boolean | Set to `true` after submit |
| `surveyCompletedAt` | DateTime? | Timestamp of submission |
| `createdAt` | DateTime | Auto |
| `updatedAt` | DateTime | Auto |

### Survey Structure (seeded, read-only at runtime)

**`SurveySection`** — the 4 top-level sections.

| Column | Type |
|---|---|
| `id` | String (matches `section.id` in `survey.ts`) |
| `title` | String |
| `subtitle` | String |
| `order` | Int |

**`SurveyQuestion`** — every question and compound sub-part.

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | |
| `key` | String | Matches `question.id` in `survey.ts` |
| `sectionId` | String FK | |
| `type` | Enum | `SINGLE \| MULTI \| TEXT \| CONDITIONAL \| COMPOUND` |
| `label` | String | |
| `required` | Boolean | |
| `order` | Int | |
| `parentId` | UUID? | Set for compound sub-parts |

Unique constraint: `(sectionId, key)`.

**`QuestionOption`** — selectable options for SINGLE / MULTI / CONDITIONAL questions.

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | |
| `questionId` | UUID FK | |
| `key` | String | Matches `option.id` in `survey.ts` |
| `label` | String | |
| `order` | Int | |
| `isConditionalTrigger` | Boolean | If true, selecting this option reveals a text input |
| `conditionalLabel` | String? | Label for the revealed text input |
| `conditionalPlaceholder` | String? | Placeholder for the revealed text input |

Unique constraint: `(questionId, key)`.

### Survey Responses (written at submit time)

**`SurveyResponse`** — one row per completed submission.

| Column | Type |
|---|---|
| `id` | UUID |
| `userId` | UUID FK (unique — one response per user) |
| `submittedAt` | DateTime |

**`SurveyAnswer`** — one row per answered question per response.

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | |
| `surveyResponseId` | UUID FK | |
| `questionId` | UUID FK | |
| `textValue` | String? | TEXT questions and conditional text inputs |

Unique constraint: `(surveyResponseId, questionId)`.

**`SelectedOption`** — one row per selected option per answer (supports MULTI).

| Column | Type |
|---|---|
| `id` | UUID |
| `surveyAnswerId` | UUID FK |
| `optionId` | UUID FK |

Unique constraint: `(surveyAnswerId, optionId)`.

---

## Survey Data (`src/data/survey.ts`)

This file is the single source of truth for the survey. It drives both the frontend UI and the database seed. Never define questions in two places.

### Question Types

| Type | Frontend component | Answer stored as |
|---|---|---|
| `single` | `SingleSelect` | `SelectedOption` row |
| `multi` | `MultiSelect` | N `SelectedOption` rows |
| `text` | `TextAnswer` | `SurveyAnswer.textValue` |
| `conditional` | `ConditionalInput` | `SelectedOption` + optional `SurveyAnswer.textValue` |
| `compound` | `QuestionCard` (renders parts) | Parts saved individually |

### The 4 Sections

1. **Tell Us About Yourself** (`about-you`) — age group, household grocery buyer
2. **Your Masala Choices** (`masala-usage`) — brands used (multi), primary brand. Option order: Everest → MDH → Catch → Badshah → Ramdev → Other (Badshah is intentionally not first to avoid primacy bias)
3. **The Badshah Experience** (`activity-recall`) — where they saw the activity, interaction details (compound), trial pack (conditional)
4. **After the Activity** (`trial-impact`) — tried product, flavour impression, purchase intent, switch reasons (multi), favourite dish (text, optional), recommendation

### How Compound Questions Work

A compound question (e.g. `brand-interaction`) has `parts: []`. Each part is seeded as its own `SurveyQuestion` row with `parentId` pointing to the compound question. Parts are stored by their own `id` directly in the Zustand answers map — the compound question itself has no answer row.

### How Conditional Questions Work

A conditional question (e.g. `received-trial`) shows a free-text input when the trigger option is selected (`conditionalTriggerId`). In the Zustand store:
- `answers['received-trial']` = selected option key (e.g. `'yes'`)
- `answers['received-trial_conditional']` = free text (e.g. `'Chana Masala 50g'`)

The submit API splits out `_conditional` suffixed keys before saving.

---

## API Routes

All routes are under `src/app/api/` and use the Next.js 15+ Route Handler convention (`export async function POST(request: Request)`).

---

### `POST /api/auth/register`

Registers or re-registers a user and sends an OTP.

**Request body:**
```json
{ "name": "Priya Sharma", "phone": "9876543210" }
```

**Behaviour:**
- If a `User` with this phone exists and `hasCompletedSurvey = true` → `409 { error: 'survey_already_completed' }`
- Otherwise: upserts the `User` row (creates on first visit, updates name/OTP on re-register)
- Generates a random 4-digit OTP, sets `otpCode` and `otpExpiresAt = now + 10 min`
- **Dev:** logs `[OTP] <phone>: <code>` to the server console
- **Prod:** calls `sendSms()` placeholder — integrate your SMS provider here
- Returns `200 { success: true }`

---

### `POST /api/auth/verify-otp`

Verifies the OTP and marks the user as verified.

**Request body:**
```json
{ "phone": "9876543210", "code": "4827" }
```

**Behaviour:**
- `404` if user not found
- `400 { error: 'invalid_code' }` if `user.otpCode !== code`
- `400 { error: 'expired' }` if `otpExpiresAt < now`
- On success: sets `verified = true`, `verifiedAt = now`, clears `otpCode` and `otpExpiresAt`
- Returns `200 { success: true, userId: "<uuid>" }`

---

### `POST /api/auth/resend-otp`

Regenerates and resends the OTP for a phone number that has already registered but not yet verified (or re-entered the flow). The client enforces a 30-second cooldown — the server does not rate-limit.

**Request body:**
```json
{ "phone": "9876543210" }
```

**Behaviour:**
- `400 { error: 'phone_required' }` if phone is missing
- `404 { error: 'user_not_found' }` if no User exists for this phone
- `409 { error: 'survey_already_completed' }` if `hasCompletedSurvey = true`
- Generates a new 4-digit OTP, overwrites `otpCode` and `otpExpiresAt = now + 10 min` on the User row
- Dev: logs `[DEV] Resend OTP for <phone>: <code>` to console
- Returns `200 { success: true }`

**Note:** The "Back to form" path (user changes their mind and re-registers with the same number) goes through `/api/auth/register`, not this endpoint. This endpoint is only for resending to an existing, already-registered phone.

---

### `POST /api/survey/submit`

Saves the complete survey response for a verified user.

**Request body:**
```json
{
  "phone": "9876543210",
  "answers": {
    "age-group": "25-34",
    "brands-used": ["badshah", "everest"],
    "received-trial": "yes",
    "received-trial_conditional": "Chana Masala 50g",
    "favourite-dish": "Dal makhani"
  }
}
```

**Behaviour:**
- `404` if user not found
- `403 { error: 'not_verified' }` if `user.verified = false`
- `409 { error: 'already_completed' }` if `user.hasCompletedSurvey = true`
- Splits `_conditional` suffixed keys into a separate map
- Creates one `SurveyResponse` row
- For each answer key, finds the `SurveyQuestion` by `key` (using `findFirst`)
- Saves per type:
  - `SINGLE` / `CONDITIONAL`: creates `SurveyAnswer` (with `textValue` from `_conditional` if present) + one `SelectedOption`
  - `MULTI`: creates `SurveyAnswer` + one `SelectedOption` per array element
  - `TEXT`: creates `SurveyAnswer` with `textValue`
  - Unknown keys are silently skipped
- Sets `user.hasCompletedSurvey = true`, `user.surveyCompletedAt = now`
- Returns `200 { success: true }`

---

### `POST /api/admin/export-user`

Downloads a two-sheet Excel report for a specific user.

**Request body:**
```json
{ "phone": "9876543210" }
```

**Response:** Binary `.xlsx` file — `Content-Disposition: attachment; filename="user_9876543210.xlsx"`

**Sheet 1 — User Info:**

| Field | Value |
|---|---|
| Name | Priya Sharma |
| Phone | 9876543210 |
| Verified | Yes |
| Verified At | 2026-06-12 10:30:00 |
| Survey Completed | Yes |
| Survey Submitted At | 2026-06-12 10:31:45 |
| Account Created At | 2026-06-12 10:28:00 |

**Sheet 2 — Survey Answers:**

| Section | Question | Type | Answer |
|---|---|---|---|
| Tell Us About Yourself | What is your age group? | Single | 25–34 |
| Your Masala Choices | Which masala brands do you currently use? | Multi | Badshah, Everest |
| The Badshah Experience | Tell us more › Which brand did the promoter represent? | Text | Badshah |
| The Badshah Experience | Did you receive a trial pack or sample? | Conditional | Yes — Chana Masala 50g |

Compound sub-parts appear as `Parent label › Part label`. Conditional answers show `Option — conditional text` in one cell.

**Example curl:**
```bash
curl -X POST http://localhost:3000/api/admin/export-user \
  -H "Content-Type: application/json" \
  -d '{"phone":"9876543210"}' \
  -o user_report.xlsx
```

---

## State Management (`src/store/`)

### `useOtpStore`

Manages the entire auth flow from registration through OTP verification.

| State | Type | Description |
|---|---|---|
| `name` | string | From registration form |
| `phone` | string | 10-digit, no country code |
| `step` | `'form' \| 'otp' \| 'verified'` | Controls which panel is shown |
| `userId` | string \| null | Set after successful OTP verification |
| `isLoading` | boolean | True during `sendOtp` / `verifyOtp` |
| `isResending` | boolean | True during `resendOtp` (kept separate so the verify button stays enabled) |
| `lastSentAt` | number \| null | `Date.now()` timestamp set when OTP is sent or resent — used by `OtpPanel` to compute the 30s cooldown |
| `otpError` | string \| null | Error message shown in OTP panel |
| `apiError` | string \| null | Error shown in registration form (e.g. duplicate user) |

| Action | Description |
|---|---|
| `sendOtp()` | Calls `POST /api/auth/register`. On 409: sets `apiError`. On success: sets `step = 'otp'`, records `lastSentAt` |
| `verifyOtp(code)` | Calls `POST /api/auth/verify-otp`. On error: sets `otpError`. On success: sets `step = 'verified'`, stores `userId` |
| `resendOtp()` | Calls `POST /api/auth/resend-otp`. On 409: sets `apiError`. On success: resets `lastSentAt` (restarts the 30s cooldown) |
| `reset()` | Resets all state to initial values |

**OtpPanel cooldown logic** (`src/components/landing/OtpPanel.tsx`):  
A `useEffect` watches `lastSentAt`. When it changes, it computes `remaining = 30 − ⌊(now − lastSentAt) / 1000⌋` and ticks down via `setInterval`. The Resend button shows `"Resend code in Xs"` while cooling down, `"Sending…"` while `isResending`, and `"Resend code"` when available.

### `useSurveyStore`

Manages section navigation and answer collection.

| State | Type | Description |
|---|---|---|
| `currentSectionIndex` | number | 0-based index of the visible section |
| `answers` | `Record<string, string \| string[]>` | Keyed by question `id` from `survey.ts` |
| `isSubmitting` | boolean | True during submit API call |

| Action | Description |
|---|---|
| `setAnswer(id, value)` | Stores a single answer |
| `nextSection()` | Advances section index (capped at last) |
| `prevSection()` | Decrements section index (capped at 0) |
| `submit()` | Calls `POST /api/survey/submit` with `phone` from `useOtpStore.getState()` |
| `reset()` | Resets to initial state |

---

## Seed File (`prisma/seed.ts`)

Populates `SurveySection`, `SurveyQuestion`, and `QuestionOption` from `src/data/survey.ts`. All upserts — safe to re-run at any time.

**Run with:**
```bash
npx prisma db seed
```

**Seeding logic:**
1. Upserts each `SurveySection` by `id`
2. For each question in the section, upserts `SurveyQuestion` by `(sectionId, key)` — the question's `id` from `survey.ts` becomes the `key` column
3. For SINGLE / MULTI questions: upserts `QuestionOption` rows by `(questionId, key)` — the option's `id` becomes the `key`
4. For CONDITIONAL questions: same as above, but also sets `isConditionalTrigger`, `conditionalLabel`, `conditionalPlaceholder` on the trigger option
5. For COMPOUND questions: recursively seeds each part as a child `SurveyQuestion` with `parentId` set

**Important:** The seed uses `node --experimental-strip-types` (Node 22 native TypeScript, no bundler). Imports use explicit `.ts` extensions — this is intentional and required by Node's ESM resolver in this mode. `tsc --noEmit` will flag it; that is expected.

---

## Initial Setup (from scratch)

```bash
# 1. Install dependencies
npm install

# 2. Create your .env file
cp .env.example .env
# Edit .env and set: DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/badshah_masala"

# 3. Apply the schema
npx prisma migrate dev --name init
# or for a quick push without migration history:
npx prisma db push

# 4. Seed the survey structure
npx prisma db seed

# 5. Start the dev server
npm run dev
```

### Verify the seed worked
```bash
npx prisma studio
```
Expect: 4 sections, all questions + sub-parts, all options with conditional metadata.

---

## Dev Notes

### DEV_MODE
`src/lib/config.ts` exports `DEV_MODE = true`. When true, `/survey/page.tsx` skips the `step === 'verified'` guard, so you can access the survey directly without going through OTP. **Set to `false` before deploying.**

### OTP in development
OTPs are never sent via SMS in development. The 4-digit code is printed to the Next.js server console:
```
[OTP] 9876543210: 4827
```

### Windows + WSL mixed environment
`node_modules` installed from WSL contains Linux binaries (esbuild etc.). Running commands from Windows CMD/PowerShell will fail because the Windows binary is missing.

**Fix:** Run `npm install` from Windows CMD (not WSL) to get the correct esbuild binary, then both environments work.

### Adding an SMS provider
Open `src/app/api/auth/register/route.ts` and implement the `sendSms(phone, code)` function. The call is already gated by `process.env.NODE_ENV === 'production'`.

---

## File Change Log (complete)

| File | Status |
|---|---|
| `prisma/schema.prisma` | Created |
| `prisma/seed.ts` | Created |
| `src/lib/prisma.ts` | Created |
| `src/lib/config.ts` | Maintained |
| `.env.example` | Created |
| `.gitignore` | Updated (added `!.env.example`) |
| `package.json` | Updated (prisma seed script, xlsx, tsx devDep) |
| `tsconfig.json` | Updated (added `allowImportingTsExtensions: true` for seed `.ts` imports) |
| `src/app/api/auth/register/route.ts` | Created |
| `src/app/api/auth/verify-otp/route.ts` | Created |
| `src/app/api/auth/resend-otp/route.ts` | Created |
| `src/app/api/survey/submit/route.ts` | Created |
| `src/app/api/admin/export-user/route.ts` | Created |
| `src/store/otpStore.ts` | Replaced (now async, real API calls) |
| `src/store/surveyStore.ts` | Replaced (now async, real API calls, reset added) |
| `src/store/resultStore.ts` | Deleted |
| `src/components/landing/RegistrationForm.tsx` | Updated (async sendOtp, isLoading, apiError) |
| `src/components/landing/OtpPanel.tsx` | Updated (resendOtp with 30s cooldown timer, separate isResending state) |
| `src/components/survey/SurveyShell.tsx` | Updated (removed resultStore dependency) |
| `src/components/result/ThankYouScreen.tsx` | Created |
| `src/components/result/WinScreen.tsx` | Deleted |
| `src/components/result/NoWinScreen.tsx` | Deleted |
| `src/components/result/Confetti.tsx` | Deleted |
| `src/app/result/page.tsx` | Replaced (renders ThankYouScreen only) |
