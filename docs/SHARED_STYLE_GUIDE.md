# Using the style guide as a shared dependency

This repo is intended as a **single source of truth** for the design system. Consuming projects (e.g. marketing site, app, docs) should reference it via **git submodule** or a **file dependency**—**not** by copying the style guide code into each project.

## Why shared, not copied

- **One place to update**: Fix a bug or add a component once; all projects get it when they pull.
- **Consistent UX**: Same components and tokens everywhere.
- **No drift**: Avoid maintaining parallel copies that diverge.

## Option A: Git submodule (recommended)

Use a submodule so the style guide lives inside each consumer repo at a fixed path and tracks a specific commit.

### 1. Add the submodule to a consumer project

From the **root of the consumer repo** (e.g. `particle-cs-website`):

**If you already have a copied `particle-brand-style-guide` folder:** remove it (or rename it), then add the real repo as a submodule at the same path so `package.json` can keep using `"file:./particle-brand-style-guide"`:

```bash
# Remove or rename existing copy (if any)
rm -rf particle-brand-style-guide   # or: mv particle-brand-style-guide particle-brand-style-guide.bak

# Add the style guide repo as a submodule (replace URL with your actual style guide repo URL)
git submodule add <STYLE_GUIDE_REPO_URL> particle-brand-style-guide
```

**If starting from scratch:**

```bash
git submodule add <STYLE_GUIDE_REPO_URL> particle-brand-style-guide
```

Example with GitHub:

```bash
git submodule add https://github.com/your-org/particle-brand-style-guide.git particle-brand-style-guide
```

### 2. Install the package in the consumer

In the consumer’s `package.json`, depend on the local submodule path:

```json
{
  "dependencies": {
    "@particle-crypto/style-guide": "file:./particle-brand-style-guide"
  }
}
```

Then:

```bash
cd particle-brand-style-guide && npm install && npm run build && cd ..
npm install
```

The consumer now uses the **built** style guide from the submodule (no local copy of source elsewhere).

### 3. Clone a repo that already has the submodule

```bash
git clone <CONSUMER_REPO_URL>
cd <CONSUMER_REPO>
git submodule update --init --recursive
cd particle-brand-style-guide && npm install && npm run build && cd ..
npm install
```

### 4. Get latest style guide changes (consumers)

When the style guide repo has new commits:

```bash
# From consumer repo root
git submodule update --remote particle-brand-style-guide
cd particle-brand-style-guide && npm install && npm run build && cd ..
npm install
```

Then commit the updated submodule pointer in the consumer repo:

```bash
git add particle-brand-style-guide
git commit -m "chore: update style guide submodule"
```

### 5. Make and push style guide changes (maintainers)

1. **In the style guide repo** (standalone clone or `particle-brand-style-guide` submodule directory):
   ```bash
   cd particle-brand-style-guide
   # make changes, then:
   npm run build
   git add .
   git commit -m "feat: add ContentList section"
   git push origin main
   ```

2. **In each consumer repo**, pull the new submodule commit (see step 4 above) and run `npm install` after building the submodule.

## Option B: Sibling repo with file dependency

If the style guide and consumer repos live next to each other (e.g. same parent folder) and you don’t use submodules:

```json
{
  "dependencies": {
    "@particle-crypto/style-guide": "file:../particle-brand-style-guide"
  }
}
```

After changing the style guide, build it and reinstall in the consumer:

```bash
cd ../particle-brand-style-guide && npm run build
cd ../particle-cs-website && npm install
```

## Build requirement

Consumers must use the **built** package. The style guide’s `package.json` should point to the build output (e.g. `dist/`). Ensure the style guide is built before installing in the consumer:

```bash
cd particle-brand-style-guide
npm install
npm run build
cd ..
npm install
```

## Summary

| Action | Where | Command |
|--------|--------|--------|
| Add style guide to a new project | Consumer repo | `git submodule add <URL> particle-brand-style-guide` then `"file:./particle-brand-style-guide"` in package.json |
| Get latest style guide | Consumer repo | `git submodule update --remote particle-brand-style-guide` then build submodule + `npm install` |
| Make style guide changes | Style guide repo | Edit, `npm run build`, commit, push |
| Clone consumer that has submodule | Consumer repo | `git clone` then `git submodule update --init --recursive` |

Keep the style guide **generic** (no product-specific copy in components or default story data). Consuming projects supply their own content and data.
