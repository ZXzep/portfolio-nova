# AI Project Context — Punnathat's Creative Universe Portfolio

## What this project is

This repository is the new unified portfolio for **Punnathat Samoprong**.

The goal is to merge two older portfolios into one cohesive, premium portfolio. It must not feel like separate "designer" and "developer" websites. The positioning is:

> **Creative Technologist / Designer Who Codes**

Punnathat can define a visual direction, design the complete user experience, understand business and technical systems, and build the result into a working product.

The new project lives at:

```text
D:\Github\portfolio-nova
```

## Source portfolios

Use content from both existing portfolios. Do not replace real content with generic placeholder projects.

### 1. Visual design and original case studies

```text
D:\Github\my-portfolio
```

This older static portfolio contains:

- Graphic design work
- UX/UI case studies
- Brand and visual identity projects
- 3D work
- Project images and detailed project pages
- Mind DoJo
- AI Codelabs
- KUMI Shop
- Thai Traditional Typography
- Horklong
- Freelance GP
- Other original design projects and assets

Important folders and files:

```text
index.html
project-*.html
assets/img/
assets/minddojo/
assets/ttt/
assets/ta/
assets/horklong/
assets/freelance-gp/
assets/pdf/
```

### 2. Current developer and professional portfolio

```text
D:\Github\portfolio
```

This newer Next.js portfolio contains:

- Current professional positioning
- Developer projects
- Current contact and social links
- Profile image
- Production application links
- Current technical skills
- Polaris
- Potter Mobile Pawn
- Potter Mobile+
- AI Solutions Marketplace
- Other recent software projects

Important folders and files:

```text
src/app/page.tsx
src/app/globals.css
public/
public/artifacts/
```

## Resume source of truth

Use the latest resume below for employment history, education, contact information, technical skills, and current project descriptions:

```text
D:\Work\Profile\Claude Resume\Punnathat_Samoprong_Resume.pdf
```

The copy placed inside the new project is:

```text
public/Punnathat_Samoprong_Resume.pdf
```

When information conflicts, use this priority:

1. Latest resume
2. Newer portfolio at `D:\Github\portfolio`
3. Original portfolio at `D:\Github\my-portfolio`

Do not invent employers, metrics, project outcomes, technologies, dates, or links.

## Current career information

- Name: **Punnathat Samoprong**
- Location: Bangkok (Ladkrabang), Thailand
- Email: `zephyrxzep@gmail.com`
- Phone: `+66 098-707-0173`
- GitHub: `https://github.com/ZXzep`
- LinkedIn: `https://www.linkedin.com/in/punnathat-samoprong/`
- Education: KMITL, Information Technology, Multimedia & Game Development, 2021–2025
- Current role: MA Programmer at Bigwork, January 2026–Present
- Previous roles:
  - Middle UX/UI & Graphic Designer at Codelabs Tech, August 2025–November 2025
  - Graphic Designer at Mind DoJo, April 2025–July 2025

## Core creative direction

The design concept is called **The Creative Universe**.

The site should feel like a journey through a sophisticated digital universe:

- Near-black background
- Warm white typography
- Editorial scale and hierarchy
- Electric violet and deep blue universe glow
- Coral/magenta for visual design
- Electric blue for UX/UI
- Acid green for development
- Layered stars, atmospheric depth, subtle grain, and restrained motion
- Thin technical lines, coordinates, section numbers, and small uppercase labels
- Project imagery remains the main visual focus

Avoid:

- A childish space theme
- Generic cyberpunk styling
- Random glowing blobs
- Excessive gradients
- Excessive rounded cards
- Glassmorphism everywhere
- Generic code rain
- Effects that reduce readability or performance

## Required site structure

The portfolio is one continuous experience with the following sections:

```text
00  ORIGIN
01  IDENTITY
02  CAPABILITIES
03  SELECTED WORK
04  ARCHIVE
05  CONTACT
```

### Origin

Hero message:

```text
I DESIGN EXPERIENCES
AND BUILD THEM REAL.
```

Supporting role:

```text
DESIGNER × DEVELOPER
```

### Identity

Explain the combination of:

- Design judgment
- UX thinking
- Information Technology background
- Multimedia and Game Development education
- Full-stack development
- ERP and business-system experience
- Structured problem solving

### Capabilities

Use three connected disciplines:

- Visual
- Experience
- Code

Treat 3D as a capability that can enhance all three disciplines.

### Selected Work

Prioritize real, substantial work such as:

- Potter Mobile Pawn
- Potter Mobile+
- Cinema Ticket Booking System
- Polaris
- Mind DoJo
- AI Solutions Marketplace / Codelabs
- Strong UX/UI, graphic design, branding, and 3D work from the original portfolio

Featured projects should use large cinematic layouts, not a basic card grid.

### Archive

Include older work from both source portfolios. Support filters:

```text
ALL / DESIGN / UX/UI / CODE / 3D
```

### Contact

Use the closing message:

```text
LET'S CREATE
SOMETHING UNREAL.
```

## Technical direction

Current implementation:

- Next.js / Vinext
- React
- TypeScript
- Tailwind CSS
- Canvas 2D for the layered star field
- CSS transforms and animation for the central universe object

Recommended approach:

- Keep project content in one structured data source
- Build reusable components for navigation, project stories, archive rows, and effects
- Prefer lightweight Canvas 2D and CSS effects
- Add Three.js or React Three Fiber only if a real interactive 3D object materially improves the experience
- Isolate visual effects so they can be disabled on low-performance devices
- Respect `prefers-reduced-motion`
- Do not hijack scrolling
- Preserve visible keyboard focus
- Keep mobile layouts fast and readable
- Lazy-load below-the-fold project media
- Maintain stable layout while images load

## Content rules for future AI work

1. Read this file before changing the portfolio.
2. Inspect both source portfolios before removing or rewriting content.
3. Preserve all meaningful projects from both portfolios, even if only selected projects appear on the home page.
4. Use the archive or case-study pages for projects that do not fit the featured section.
5. Use real images, links, tools, dates, and descriptions from the source projects.
6. Keep design and development under one identity.
7. Do not describe Punnathat as only a graphic designer or only a developer.
8. Do not fabricate measurable outcomes. If no verified metric exists, describe the concrete problem solved and system delivered.
9. Keep project content easy to replace or expand later.
10. Preserve the downloadable latest resume.

## Current status

- The new repository has been initialized.
- A first Creative Universe home page has been implemented.
- The page includes Origin, Identity, Capabilities, Selected Work, Archive, and Contact.
- A layered Canvas star field and responsive navigation are implemented.
- Content from the two older portfolios and latest resume has begun to be consolidated.
- The production build currently completes successfully.

## Recommended next work

1. Audit every project page and asset in both old portfolios.
2. Move all project metadata into a single typed data file.
3. Add complete case-study routes using this structure:

   ```text
   Overview → Problem → Role → Process → Design Decisions → Development → Result
   ```

4. Replace any temporary featured image mapping with the exact image for each project.
5. Verify every external project and social link.
6. Add accessible archive previews for pointer and keyboard users.
7. Optimize large images and add responsive sizes.
8. Test desktop, tablet, and mobile layouts.
9. Run the production build after every substantial change.

## Local development

From the project directory:

```bash
npm run dev
```

The local site normally runs at:

```text
http://localhost:3000/
```
