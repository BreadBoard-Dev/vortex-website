# 🌐 Vortex Download Manager — Official Landing Page & Website

This folder contains the complete, production-ready static website for **Vortex Download Manager (VDM)**, specifically optimized for **GitHub Pages** hosting with zero build steps or external dependencies.

---

## 🚀 Live Features Included
- **Hero & 3D Cover Mockup**: Displays the official 3D retail product box with glowing badges and quick actions.
- **Interactive Snapshot Showcase**: Categorized filter tabs (All, Dashboard, Settings, Licensing, Developer Tools) and a full-screen **Lightbox modal** with keyboard navigation (`←`, `→`, `Esc`).
- **All 16 High-Res Snapshots**: Bundled in `snapshots/` folder covering the desktop UI, visualizer, settings, and license managers.
- **Pricing & Licensing Breakdown**: Clear comparison between 30-Day Free Trial, 1-Year Giveaway (WinningPC / GOTD), and ₹200 INR Perpetual Lifetime License with direct Razorpay integration link (`https://rzp.io/rzp/VDMPP`).
- **Download Hub**: Windows installer (`VortexDownloader_v1.0.1_Setup.exe`) and browser extensions download links.
- **FAQ Accordion & Support**: Interactive FAQ and official contact (`VDM.BREADBOARD@proton.me`).

---

## 📦 How to Publish to GitHub Pages (3 Steps)

### Option A: Create a Dedicated Website Repository (Recommended)

1. On GitHub, create a new **Public** repository named:
   ```text
   vortex-website
   ```
   *(or `vortex-dm.github.io` for a root user domain)*

2. In this folder (`vortex-website`), initialize git and push:
   ```bash
   cd vortex-website
   git init
   git add .
   git commit -m "feat: initial release of Vortex DM landing page"
   git branch -M main
   git remote add origin https://github.com/BreadBoard-Dev/vortex-website.git
   git push -u origin main
   ```

3. In your new GitHub repository:
   - Go to **Settings** → **Pages** (under "Code and automation").
   - Under **Build and deployment**:
     - Source: **Deploy from a branch**
     - Branch: **`main`** / Folder: **`/ (root)`**
   - Click **Save**.

Your website will be live in ~60 seconds at:
```text
https://BreadBoard-Dev.github.io/vortex-website/
```

---

### Option B: Host directly from the Public Releases Repository
If you created `vortex-releases`, you can place these files on the `gh-pages` branch or the `/docs` folder in `vortex-releases` to keep downloads and the website under one single repo!

---

## 📁 Directory Structure
```
vortex-website/
├── index.html        # Main landing page (HTML5, semantic, SEO-friendly)
├── style.css         # Modern dark tech theme, glassmorphism, responsive grid
├── script.js         # Lightbox gallery, category filter, FAQ accordion, mobile nav
├── README.md         # Deployment & hosting guide
└── snapshots/        # All 16 high-resolution product & interface screenshots
    ├── 01_vortex_main_dashboard.png
    ├── 02_vortex_segment_visualizer_telemetry.png
    ├── 03_vortex_add_download_dialog.png
    ├── 04_vortex_browser_integration_manager.png
    ├── 05_vortex_settings_engine_limits.png
    ├── 06_vortex_settings_browser_tab.png
    ├── 07_vortex_settings_license_giveaway.png
    ├── 08_vortex_settings_updates_about.png
    ├── 09_vortex_license_modal_giveaway.png
    ├── 10_vortex_license_modal_lifetime.png
    ├── 11_vortex_update_checker_uptodate.png
    ├── 12_vortex_checksum_integrity_verifier.png
    ├── 13_vortex_license_manager_single_key.png
    ├── 14_vortex_license_manager_batch_generator.png
    ├── 15_vortex_license_manager_revocation_feed.png
    └── 16_vortex_product_cover_box.png
```
