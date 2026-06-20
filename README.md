# Quantum Transition Labs

Quantum Transition Labs builds advanced post‑quantum security solutions to help organizations migrate safely into the quantum era. We focus on PQC integration, cryptographic modernization, blockchain security, and AI‑driven risk analysis to deliver practical, future‑proof protection.

**Live site:** [qtransitionlabs.com](https://www.qtransitionlabs.com)

## Local development

Preview the site locally with Jekyll (GitHub Pages compatible):

```bash
# Install Ruby dependencies (first time only)
bundle install

# Serve with live reload
bundle exec jekyll serve

# Open http://localhost:4000
```

Requires Ruby 3.x and Bundler. The `github-pages` gem pins Jekyll and plugin versions to match GitHub Pages production builds.

## Project structure

| Path | Purpose |
|------|---------|
| `_config.yml` | Site metadata, SEO, and Jekyll configuration |
| `_layouts/default.html` | Shared layout with navigation, SEO tags, and theme toggle |
| `_includes/nav.html` | Sticky header navigation partial |
| `assets/css/dark.css` | Theme tokens (dark/light mode) |
| `assets/css/components.css` | Navigation, layout, shared components |
| `assets/css/pages.css` | Page-specific styles (services, team, research, contact) |
| `assets/css/home.css` | Homepage hero and capability sections |
| `*.md` | Site pages (index, services, team, research, contact) |

## Deployment

The site deploys automatically via GitHub Pages on push to `main`. Custom domain is configured in `CNAME`.
