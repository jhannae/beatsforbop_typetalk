import { defineConfig } from 'vite';

// IMPORTANT: Set `base` to your repository name when deploying to GitHub Pages
// If the repository will be username.github.io (user/organization site root), set base: '/' instead.
// Example: if repo is github.com/yourname/typetalk-prototype then base should be '/typetalk-prototype/'
// You can override via env var GHPAGES_BASE if desired: export GHPAGES_BASE="/custom/" before build.

const base = process.env.GHPAGES_BASE || '/beatsforbop_typetalk/'; // CHANGE if your repo name differs

export default defineConfig({
  base,
});
