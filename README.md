# Liquid Archive

Liquid Archive is a premium landing page for a digital asset management brand built with React and Vite. The design is tailored for creative agencies, studios and digital-first businesses that want a polished, premium online presence.

## Features

- Modern luxury dark UI
- Responsive landing page layout
- Product preview dashboard mockup
- Pricing, testimonials and CTA sections
- GitHub Pages deployment setup

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## GitHub setup

1. Create a new repository on GitHub.
2. In the project folder, run:

```bash
git init
git branch -M main
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repository-url>
git push -u origin main
```

3. In GitHub, enable GitHub Pages and choose GitHub Actions as the deployment source.
4. The repository already includes a Pages deployment workflow in `.github/workflows/deploy.yml`.

## Deployment

This project is configured with a static deployment workflow for GitHub Pages. The build output is generated in the `dist` directory and deployed automatically on pushes to the `main` branch.
