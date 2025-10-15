# BeatsForBop TypeTalk Prototype

Static Vite prototype for the conversational typography exploration.

## Local Dev

```
npm install
npm run dev
```

## Deploying to GitHub Pages

Because this is a static Vite build, deployment is just publishing the `dist` directory.

### 1. Create a Repository
1. In GitHub (personal account that supports Pages) create a new repo, e.g. `typetalk-prototype`.
2. Leave it empty (no README needed) or allow README (will merge later).

### 2. Set the Vite `base` Path
The `vite.config.js` has:
```js
base: '/typetalk-prototype/'
```
If your repository name is different, edit this before building / pushing. For user/organization root pages (repo named `<username>.github.io`) set `base: '/'`.

You can also override at build time:
```
GHPAGES_BASE=/myrepo/ npm run build
```

### 3. Push Code
```
git init
git remote add origin git@github.com:<your-username>/<your-repo>.git
git checkout -b main
git add .
git commit -m "Initial prototype"
git push -u origin main
```

### 4. Enable GitHub Pages
Settings -> Pages -> Build and deployment -> Source: GitHub Actions (the workflow is included: `.github/workflows/deploy.yml`).

### 5. Trigger Deployment
Any push to `main` (or `master`) triggers the workflow. After it runs, the site will be available at:
```
https://<your-username>.github.io/<repo-name>/
```
(Or root if using `<username>.github.io` repo.)

### 6. Custom Domain (Optional)
Add a `CNAME` file in `public/` (create folder) with your domain. GitHub Pages will serve it. Example:
```
public/CNAME -> typography.example.com
```
Rebuild & push.

### 7. Forking From a Non-Pages Account
If the code lives first in an org/account that can't enable Pages:
1. Fork or clone locally.
2. Add your own remote: `git remote add personal git@github.com:<your-username>/<repo>.git`.
3. Push `main` to your personal remote.
4. Enable Pages there (steps above).

### 8. Updating After Changes
Edit code -> commit -> push `main`. Workflow rebuilds & redeploys automatically.

### 9. Troubleshooting
- 404 / missing assets: Ensure `base` matches the repo name (with leading & trailing slash).
- CSS/JS paths broken: You forgot to adjust `base` or deployed without rebuilding.
- Workflow fails: Check Actions logs; ensure Node version and `npm ci` succeed.
- Old cache: Hard refresh (`Cmd+Shift+R`) or bump a query param.

### 10. Manual Local Preview of Production Build
```
npm run build
npm run preview
```

## License / Fonts
Aptos fonts are not committed if proprietary. Ensure you have rights before distributing.

---
Feel free to adjust the `base` and workflow names to suit your project.
