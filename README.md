# Asif Gill — author profile

A lightweight static author profile for Professor Asif Gill. GitHub Pages
builds the site with Jekyll; the published site has no backend or runtime
dependencies.

## Publish on Grace's GitHub

1. Create an empty GitHub repository, such as `asif-gill-profile`.
2. Add that repository as the Git remote and push the `main` branch.
3. In **Settings → Pages**, choose **Deploy from a branch**, then select `main`
   and `/ (root)`, or enable GitHub Actions and run the **Build website**
   workflow manually.

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
- About page: `about.html`
- Projects and frameworks: `projects.html`
- Books index and detail pages: `books.html`, `_books/*.md`
- Searchable journal-article and preprint archive: `articles.html`
- Interviews, podcasts and videocasts: `media.html`
- Contact and professional links: `contact.html`
- Static publication metadata: `assets/publications.json`
- External blog redirect: `blog/index.html`
- Simple typography and layout: `assets/simple.css`

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

The repository validates the Jekyll site on every push. Deployment runs only
when the **Build website** workflow is started manually, after Pages has been
enabled for a public repository.

The Blog navigation links to Asif's established site at
`https://aqgill.blogspot.com/`.
