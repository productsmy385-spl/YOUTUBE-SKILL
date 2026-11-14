# Design System

## Palette from supplied reference
| Token | Hex | Use |
|---|---|---|
| `--brand-black` | `#000000` | Primary dark canvas, navigation |
| `--brand-deep-red` | `#830000` | Secondary surfaces, deep panels |
| `--brand-red` | `#BC0202` | Primary actions, active navigation, key chart series |
| `--brand-hot-red` | `#FF0000` | Sparse emphasis, recording/progress/urgent state |
| `--brand-white` | `#FFFFFF` | Text and high-contrast surfaces |

Create semantic tokens (`--background`, `--foreground`, `--card`, `--muted`, `--primary`, `--destructive`, `--border`, chart tokens) in `app/globals.css`. Do not apply pure red to large text blocks or large backgrounds; reserve it for focus and emphasis. Verify WCAG contrast for every text/background pairing.

## Typography
Requested typeface: **Montana**. Use it only if the exact font file/source and license are provided/verified. Define a central font variable with Montana first and a readable fallback. Keep UI tables, metadata and small labels in a highly legible sans-serif if Montana is decorative.

## Visual language
- Cinematic black surfaces, deep-red layers, restrained red glow.
- Strong hierarchy: large page title, clear section headings, concise helper text.
- Media-first cards with real preview frames and visible generation state.
- Timeline and storyboard surfaces should be information-dense but not cramped.
- Use red as a signal, not as decoration on every element.
- Status colors must remain semantically distinguishable from brand accents.

## Reuse from DropX Admin
- Sidebar/header/footer and responsive navigation.
- `PageHeader`, card/form primitives, tables, dialogs, dropdowns, toasts, skeletons, empty states.
- Existing chart theme helpers and next-themes setup.
- Lucide icon conventions.
- Existing page composition pattern: server `page.tsx`, client `view.tsx` where needed.

## Accessibility
Maintain visible focus rings, keyboard access, semantic headings, labelled form controls, accessible dialogs, reduced-motion support and sufficient contrast. Do not rely on color alone to communicate status.
