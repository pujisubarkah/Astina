# Punycode Deprecation Warning Fix

This project includes solutions to handle the Node.js punycode deprecation warning that appears in Node.js v22 and newer.

## Problem
You may see this error when running the development server:
```
[DEP0040] DeprecationWarning: The punycode module is deprecated. Please use a userland alternative instead.
```

## Solutions Implemented

### 1. Alternative Development Scripts
We've added alternative npm scripts that suppress the deprecation warning:

**For Windows (recommended):**
```bash
npm run dev:win
```

**Cross-platform (using cross-env):**
```bash
npm run dev:quiet
```

**Regular development (with warnings):**
```bash
npm run dev
```

### 2. Dependencies Updated
- Added `punycode` userland package as a replacement
- Updated `googleapis`, `dropbox`, and `@google-cloud/storage` to latest versions
- Added `cross-env` for cross-platform environment variable handling

### 3. Nuxt Configuration
Updated `nuxt.config.ts` with additional configuration to handle the deprecation warnings.

### 4. Polyfill Plugin
Created `plugins/punycode-polyfill.client.ts` to provide client-side polyfill support.

## Usage
For daily development, use:
```bash
npm run dev:win
```

This will start the development server without the deprecation warnings while maintaining full functionality.

## Long-term Solution
The warning will be resolved when all dependencies update to use the userland `punycode` package instead of the built-in Node.js module. This is a temporary workaround until the ecosystem fully migrates.
