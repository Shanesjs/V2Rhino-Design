# CMS Enabled Rhino Design

Mission: Convert a static image gallery into a dynamic, client-manageable system.

## Project Information
Project Repository: [https://github.com/Shanesjs/CMS_Enabled_Rhino_Design](https://github.com/Shanesjs/CMS_Enabled_Rhino_Design)

## System Overview
This project uses **Decap CMS** for a Git-based, serverless content management solution. All dynamic image data is stored in `public/content.json` and rendered dynamically via `main_v2.js`.

### Deployment & Hosting Tips
- **GitHub Pages**: Since this project utilizes a subfolder (/CMS_Enabled_Rhino_Design/), paths are set to be **relative** (`./`) in the `vite.config.js` and dynamic fetches. Ensure your custom domain is set if you want to avoid subfolder path issues.
- **VPS Hosting**: When moving to your VPS, simply build the project (`npm run build`) and point your web server (Nginx/Apache) to the `docs` folder. The relative paths will ensure everything works without additional reconfiguration.
- **CMS Auth Proxy**: To use Decap CMS on sites not hosted on Netlify (like GitHub Pages), you may need a small OAuth proxy to handle the login flow. We recommend using a free service like [Decap CMS OAuth Proxy](https://github.com/vencis/decap-cms-github-proxy) for the initial setup.

## Administration
Access the admin panel at `/admin` to:
1. Upload new gallery items.
2. Edit existing captions and titles.
3. Replace the primary team photo.
