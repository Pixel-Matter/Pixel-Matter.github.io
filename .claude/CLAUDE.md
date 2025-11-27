# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a GitHub Pages site hosted at pixelmatter.org. It's a static website repository that contains interactive educational tools, primarily focused on chemistry education.

## Repository Structure

- `tools/` - Directory containing interactive educational tools
  - `tools/hemija/` - Interactive Periodic Table application ("Hemija" = Chemistry in Serbian)
    - `index.html` - HTML page that loads React and Babel from CDN
    - `periodic-table.jsx` - React application with full periodic table implementation
  - `tools/index.html` - Index page listing all available tools
- `CNAME` - Custom domain configuration (pixelmatter.org)

## Deployment

This is a GitHub Pages repository. Changes pushed to the `main` branch are automatically deployed to pixelmatter.org. No build process is required.

## Architecture

### Hemija (Periodic Table) Tool

The periodic table application is a client-side React application with the following architecture:

**Technology Stack:**
- React 18 (loaded via CDN)
- Babel Standalone (for in-browser JSX transformation)
- No build step - JSX is transformed in the browser

**Key Components:**
- `PeriodicTableApp` - Main application component (exported globally via `window.PeriodicTableApp`)
- `ElementCell` - Renders individual element cells in the periodic table
- `ElementInfo` - Displays detailed information about a selected element
- `AtomVisualization` - SVG-based atom visualization with animated electron orbits
- `QuizMode` - Interactive quiz component for testing chemistry knowledge

**Data Structure:**
- `elementsData` - Array containing first 54 elements (periods 1-5)
- Each element includes: number, symbol, names (Russian and Serbian), mass, category, group, period, electron configuration, protons, neutrons, electronegativity, and state

**Features:**
- Bilingual support (Serbian and Russian)
- Interactive periodic table with category filtering
- Detailed element information with electron shell configuration
- Animated atom models with nucleus visualization
- Quiz mode with multiple question types
- Fullscreen mode support

## Development Guidelines

### Working with the Hemija Tool

**File Loading:**
- The `index.html` file in `tools/hemija/` loads `periodic-table.jsx` via a `<script type="text/babel">` tag
- The JSX file must export `PeriodicTableApp` and expose it on `window` object: `window.PeriodicTableApp = PeriodicTableApp;`
- React and ReactDOM are available globally via CDN

**Testing Changes:**
- Open `tools/hemija/index.html` directly in a browser to test locally
- Changes to JSX files will be reflected on page reload (Babel transpiles in-browser)

**Electron Shell Visualization:**
- Uses SVG with radial gradients for electron clouds
- Nucleus particles arranged using Fermat spiral algorithm
- Shell names: K, L, M, N, O (corresponding to periods 1-5)

### Adding New Tools

1. Create a new directory under `tools/` (e.g., `tools/newtool/`)
2. Add an `index.html` file in the new directory
3. Update `tools/index.html` to include a link to the new tool
4. Follow the same pattern as Hemija - use CDN-loaded libraries when possible

## Localization

The Hemija application supports multiple languages:
- Serbian (Cyrillic) - Primary language
- Russian - Secondary language

The `texts` object in `periodic-table.jsx` contains all UI strings. When adding new strings, ensure both languages are updated.

## Common Tasks

**To test the periodic table locally:**
Open `tools/hemija/index.html` in a web browser directly from the filesystem.

**To add a new element:**
Add a new object to the `elementsData` array in `periodic-table.jsx` with all required properties.

**To modify element categories:**
Update the `categoryColors` object which defines colors and names for each element category (alkali, alkaline, transition, metal, metalloid, nonmetal, halogen, noble).

**To add a new quiz question type:**
Modify the `generateQuestion` function in the `QuizMode` component, adding a new case to the switch statement.
