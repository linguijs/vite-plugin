# Contributing to vite-plugin-lingui

Thank you for considering contributing to vite-plugin-lingui! This guide will help you get started with contributing to this Vite plugin for Lingui.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Code Style](#code-style)
- [Reporting Issues](#reporting-issues)

## Getting Started

Before contributing, please:

1. Check existing [issues](https://github.com/collaborar/vite-plugin-lingui/issues) to see if your bug report or feature request already exists
2. For significant changes, consider opening an issue first to discuss the approach
3. Fork the repository and create a feature branch

## Development Setup

1. **Clone your fork:**

   ```sh
   git clone https://github.com/YOUR_USERNAME/vite-plugin-lingui.git
   cd vite-plugin-lingui
   ```

2. **Install dependencies:**

   ```sh
   pnpm install
   ```

3. **Start development mode:**
   ```sh
   pnpm run dev
   ```
   This runs the build in stub mode for faster development iteration.

## Making Changes

1. **Create a feature branch:**

   ```sh
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

2. **Make your changes:**
   - Keep changes focused and atomic
   - Write clear, descriptive commit messages
   - Follow existing code patterns and conventions

3. **Build the project:**

   ```sh
   pnpm run build
   ```

4. **Format your code:**
   ```sh
   pnpm run format
   ```

## Testing

Currently, the project uses manual testing. When making changes:

1. Test your changes with a real Vite project that uses Lingui
2. Verify that the plugin works correctly with different configurations
3. Test both development and production builds
4. Check that TypeScript types are correct

Example test setup:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { lingui } from "@collaborar/vite-plugin-lingui";

export default defineConfig({
  plugins: [
    lingui({
      // Test different configurations
      path: "custom/lang/path",
      command: "herd php artisan lingui:make-json",
    }),
  ],
});
```

## Submitting Changes

1. **Push your branch:**

   ```sh
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request:**
   - Use a clear, descriptive title
   - Describe what changes you made and why
   - Reference any related issues
   - Include examples if applicable

3. **PR Requirements:**
   - Code must be formatted (`pnpm run format`)
   - Build must pass (`pnpm run build`)
   - All changes should be documented

## Code Style

- Follow existing TypeScript/JavaScript conventions
- Use meaningful variable and function names
- Keep functions small and focused
- Use Prettier for formatting (`pnpm run format`)

## Reporting Issues

When reporting issues, please include:

- **Environment details:** Node.js version, pnpm/yarn version, OS
- **Vite version** and other relevant plugin versions
- **Plugin configuration** you're using
- **Expected behavior** vs **actual behavior**
- **Minimal reproduction case** if possible
- **Error messages** and stack traces

## Development Notes

- The plugin is built with [unbuild](https://github.com/unjs/unbuild)
- It supports both CommonJS and ESM exports
- TypeScript types are generated automatically
- The main plugin code is in `src/index.ts`

## Questions?

If you have questions about contributing, feel free to:

- Open an issue for discussion
- Check existing issues and pull requests
- Reach out to the maintainers

Thank you for contributing! 🎉
