# Asif Gill — profile and writing

A lightweight static profile and blog landing page for Professor Asif Gill. It is
designed for GitHub Pages and has no build step or runtime dependencies.

## Preview locally

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000>.

## Publish on Grace's GitHub

1. Create an empty GitHub repository, such as `asif-gill-profile`.
2. Add that repository as the Git remote and push the `main` branch.
3. In **Settings → Pages**, choose **Deploy from a branch**, then select `main`
   and `/ (root)`.

For a user site at `https://USERNAME.github.io`, name the repository
`USERNAME.github.io`. For a project repository, GitHub publishes it under
`https://USERNAME.github.io/REPOSITORY/`.

## Transfer to Asif

Once Asif has a repository, either transfer this repository in
**Settings → General → Danger Zone → Transfer ownership**, or add Asif's empty
repository as a new remote and push `main`. GitHub Pages must then be enabled in
the destination repository's settings.

## Updating content

- Main profile content: `index.html`
- Complete searchable publication archive: `publications.html`
- Static publication metadata: `assets/publications.json`
- Writing index: `blog/index.html`
- Locally hosted articles: `blog/*.html`
- Colours, typography and layout: `assets/styles.css`
- Menu and current footer year: `assets/script.js`

Biographical and research details in this draft were researched from public
academic and professional sources, then written directly into the site so it
stands on its own. Profile copy should be reviewed and approved by Asif before
the site is presented as his official page.

## Refreshing the publication archive

The site includes a local snapshot of all public works in Asif's ORCID record.
Refresh it without adding any runtime dependency:

```bash
python3 scripts/update_publications.py
```

The generated JSON is committed to the repository, so the published website
does not call ORCID or any other publication API.
