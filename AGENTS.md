# AI Agent Specification & Developer Guide: Media Comparer Pro

## Project Overview
**Media Comparer Pro** is a high-performance web application built with **React (TypeScript)** and **Vite** designed for precise visual comparison of images. It provides two core analysis modes—an interactive Before/After split slider and a side-by-side view—with fully synchronized pan and zoom capabilities across both media panels.

---

## Technical Stack & Dependencies

- **Frontend Framework:** React 18 (`react`, `react-dom`) with TypeScript
- **Build Tool:** Vite (`vite`)
- **Styling:** Tailwind CSS (`tailwindcss`, `postcss`, `autoprefixer`, `clsx`, `tailwind-merge`)
- **Icons:** Lucide React (`lucide-react`)
- **State Management:** Zustand (`zustand`)

---

## Project Directory Structure

```text
C:\Users\SI30\Coding\Javascript\video-image-compare\
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
├── AGENTS.md
└── src\
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── store\
    │   └── useStore.ts
    ├── components\
    │   ├── Header.tsx
    │   ├── DropZone.tsx
    │   ├── ViewerContainer.tsx
    │   ├── SplitViewer.tsx
    │   ├── SideBySideViewer.tsx
    │   └── StatusBar.tsx
    └── utils\
        └── sampleImages.ts
```

---

## Architecture & Core Modules

### 1. Global State Management (`src/store/useStore.ts`)
Powered by **Zustand**, the store manages:
- **Media Data:** `leftImage` & `rightImage` (name, URL, natural width, height, file size).
- **View Modes:** `comparisonMode` (`'split'` | `'side-by-side'`).
- **Split Position:** `splitPosition` (0% to 100% for the split slider).
- **Transform State:** `scale` (zoom factor from 0.1 to 10) and `position` (`{ x, y }` translation offset).
- **Interaction Flags:** `isDragging`, `dragStart`.
- **Actions:** Setters, `resetView`, `zoomIn`, `zoomOut`, `loadDemoImages`, `swapImages`.

### 2. Viewers & Layout
- **`App.tsx`:** Root component orchestrating the `Header`, conditional body (`ViewerContainer` vs `DropZone`), and `StatusBar`. Auto-loads demo images on initial mount for instant out-of-the-box preview.
- **`Header.tsx`:** Top toolbar handling file uploads (`Before` and `After`), comparison mode toggles, zoom controls (+ / - / reset), image swapping, and demo loading.
- **`DropZone.tsx`:** Initial drop zone and file selector shown when no images are loaded.
- **`ViewerContainer.tsx`:** Unified gesture container managing mouse wheel zoom (centered on cursor position) and click-and-drag panning. Delegates to `SplitViewer` or `SideBySideViewer`.
- **`SplitViewer.tsx`:** Renders the "After" image as a background layer and the "Before" image as an overlay clipped via CSS `clip-path: inset(0 ${100 - splitPosition}% 0 0)`. Includes a draggable vertical divider with a handle.
- **`SideBySideViewer.tsx`:** Renders adjacent panels for the Before and After images sharing the identical transform state (`scale` and `position`).
- **`StatusBar.tsx`:** Footer bar displaying active image filenames, dimensions, current pan coordinates, zoom level, and keyboard/mouse shortcut hints.

---

## Development & Build Commands

- **Start Development Server:**
  ```bash
  npm run dev
  ```
- **Type Check & Production Build:**
  ```bash
  npm run build
  ```
- **Preview Production Build:**
  ```bash
  npm run preview
  ```

---

## AI Agent Guidelines & Contribution Rules
1. **Type Safety:** Maintain strict TypeScript typing across all components, store states, and utility functions. Avoid `any` casts.
2. **Styling Consistency:** Use Tailwind CSS classes adhering to the established dark theme (`dark-900`, `dark-800`, `slate-*`, `sky-*`, `amber-*`).
3. **Synchronized Transforms:** Any new pan/zoom or viewport features must maintain synchronization across both comparison panels.
4. **State Integrity:** Keep business logic centralized within Zustand (`useStore.ts`) rather than component local state where appropriate.
