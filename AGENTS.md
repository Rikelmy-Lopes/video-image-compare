# AI Agent Specification: React Media Comparison App

## Objective
Build a cross-desktop application using **React (TypeScript)** that enables users to compare two media files (images) side-by-side using an interactive Before/After split slider, with synchronized zoom and pan capabilities across both media panels.

---

## Technical Stack & Dependencies

- **Frontend:** React (TypeScript), Vite, Tailwind CSS
- **Icons:** Lucide React (`lucide-react`)
- **State Management:** Zustand (or React Context)
- **Pan/Zoom Library:** `@use-gesture/react` with `react-spring` (or `panzoom` / custom canvas/transform matrices)

---

## Key Features & Requirements

### 1. File Handling & Input
- Drag-and-drop support for loading local media into Left ("Before") and Right ("After") slots.
- Supported file types:
  - **Images:** PNG, JPG, JPEG, WEBP, AVIF, GIF

### 2. Comparison Modes
- **Split Slider (Before / After):**
  - A vertical slider bar that can be dragged horizontally across the viewer.
  - Left side renders the "Before" media; Right side renders the "After" media, clipped precisely at the slider position.
- **Side-by-Side (Optional Toggle):**
  - Displays Left and Right media in separate, adjacent viewports.

### 3. Synchronized Pan & Zoom
- **Unified Transform State:** Scale (zoom) and translation offset $(X, Y)$ must be synchronized between both panels.
- **Controls:**
  - Click-and-drag to pan across both images simultaneously.
  - "Reset View" button to center and reset zoom/pan to 1:1 or fit-to-screen.
  - "100% Zoom" button for pixel-perfect comparison.

---

## Architecture & Implementation Steps

### Step 1: Main Layout
- **Header/Toolbar:** File picker buttons, Zoom levels indicator, Reset buttons, Mode switcher.
- **Main Canvas Viewport:** Holds the interactive viewer layer.

### Step 2: Split Slider & Clip Path Logic
- Use a wrapper container with relative positioning.
- Render "After" media in the background layer.
- Render "Before" media in an overlay layer clipped using CSS `clip-path: inset(0 ${100 - splitPercent}% 0 0)`.
- Apply transform matrix `transform: translate(Xpx, Ypx) scale(S)` simultaneously to both media elements inside the wrapper.

### Step 3: Synchronized Pan/Zoom Layer
- Wrap the viewports in a gesture layer handling wheel and drag events.
- Update global target coordinates $(x, y, scale)$ on drag/zoom.
- Ensure the zoom center originates from the mouse cursor position.

---

## Verification & Acceptance Criteria
1. **Responsiveness:** Resizing the app window scales media appropriately without breaking the clip path or zoom bounds.
