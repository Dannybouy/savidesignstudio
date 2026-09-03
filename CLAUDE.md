# CLAUDE.md

## Response style

Extremely concise. Sacrifice grammar for concision.

- Fragments over sentences. Drop articles, pronouns, filler.
- No preamble, no recap, no "I'll now...". Just the answer or the change.
- No summary of code already shown in the diff.
- Bullets > paragraphs. Skip bullets if one line does it.
- Ask only if genuinely blocked.

## Figma

Source of truth. Don't ask for the link — use this one.

https://www.figma.com/design/jm0AI3c3hpdV4FscFAXz5R/Savi-Design-Studio

- fileKey: `jm0AI3c3hpdV4FscFAXz5R`
- Desktop page: `Landing Page (Main)` — `828:1028`
- Mobile page: `Landing Page (mobile)` — `919:3903`
- Beware: a second `Landing Page (mobile)` (`983:10721`) is the Bootcamp variant. Not the main page.
- Mobile-first. Build the mobile frame, then layer desktop on top via `lg:`.
- Load `/figma-design-to-code` skill before `get_design_context`. Output is reference, not paste-in code.
- Download icon/image assets to `public/`. Never hand-write SVG paths. Asset URLs expire in ~7 days.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (CSS-first, `@theme` in `src/index.css` — no `tailwind.config`)
- Motion (Framer Motion) for animation
- Biome for lint/format (tabs, `pnpm lint:fix`)
- pnpm

## Verifying work

Never run a production build. `pnpm build` is mine to run, not yours.

- Done implementing a feature or component? Stop. Verify in the browser.
- Dev server + browser tools only. Screenshot it, measure it, click it.
- `pnpm lint` is fine. `pnpm build` / `tsc -b` / `vite build` are not.
- Report what you saw in the browser. Don't claim it builds.

## Animation

Motion = Framer Motion. Package is `motion` v13.

```ts
import { motion, AnimatePresence, useScroll } from "motion/react";
```

- Never `from "framer-motion"`. Never install `framer-motion`.
- Animate `transform` / `opacity` only. No layout props (`width`, `top`, `margin`) unless using `layout`.
- Prefer `spring` over duration-based easing for interactive motion.
- Exit anims require `AnimatePresence` + stable `key`.
- Variants for orchestration/stagger, not repeated inline props.

Reduced motion is already handled globally — `<MotionConfig reducedMotion="user">`
wraps the app in `App.tsx`. Motion drops transform/layout animation and keeps the
rest. So pair every transform with `opacity` and the fade survives on its own.

Don't branch variants on `useReducedMotion()`. The hook resolves after first
paint, the swapped variant object never animates, and the element stays stuck at
`opacity: 0`. Reach for the hook only for things `MotionConfig` can't reach —
video autoplay, scroll-linked parallax.

## Conventions

- Components in `src/components/`, PascalCase files.
- Tailwind theme tokens (`--color-*`, `--font-*`) over hardcoded values.
- No new deps without asking.
