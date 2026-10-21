# 🌐 Vortex Download Manager — Official Landing Page & Website

This folder contains the complete, standalone static website for **Vortex Download Manager (VDM)**, optimized for **GitHub Pages** hosting with zero build steps or external dependencies.

---

## 🚀 Live Features Included
- **New 3D Retail Box Mockup**: Features the sleek dark software packaging with tornado vortex branding, multi-browser badges, and core feature pillars.
- **Automatic GitHub Release Sync**:
  - Automatically queries the GitHub Releases API (`BreadBoard-Dev/vortex-releases`).
  - Seamlessly updates the version tag (`v1.0.2`, `v1.0.3`, etc.), direct `.exe` installer download link, file size, and release date in real time without needing to edit the HTML!
  - Built-in fallback ensuring it gracefully displays `v1.0.2` if offline or rate-limited.
- **Customer Snapshots Only**: All developer/internal license manager tools have been removed; displays 13 user-facing screenshots with full Lightbox modal (`←`, `→`, `Esc`).
- **Pricing & Licensing Breakdown**: Clear comparison between 30-Day Free Trial, 1-Year Giveaway (WinningPC / GOTD), and ₹200 INR Perpetual Lifetime License with direct Razorpay checkout (`https://rzp.io/rzp/VDMPP`).
- **Download Hub**: Windows installer and browser extensions download links.
- **FAQ Accordion & Support**: Interactive FAQ and official contact (`VDM.BREADBOARD@proton.me`).

---

## 📦 How to Publish to GitHub Pages (3 Steps)

### Step 1: Create a Public Repository on GitHub
Create a new **Public** repository named:
```text
vortex-website
```
*(or `vortex-releases` if hosting directly alongside releases)*

### Step 2: Push the `vortex-website` Folder
Open PowerShell in this directory:
```powershell
cd "c:\Users\Prasad Gawas\Downloads\antigravity\notes\vortex-website"
git init
git add .
git commit -m "feat: release v1.0.2 landing page with auto release sync and updated mockup"
git branch -M main
git remote add origin https://github.com/BreadBoard-Dev/vortex-website.git
git push -u origin main
```

### Step 3: Turn on GitHub Pages
1. Go to your repository **Settings** → **Pages** (under *Code and automation*).
2. Under **Build and deployment**, select:
   - Source: **Deploy from a branch**
   - Branch: **`main`** / Folder: **`/ (root)`**
3. Click **Save**.

Your website will be live in ~60 seconds at:
```text
https://BreadBoard-Dev.github.io/vortex-website/
```
*(Every future GitHub release published under `vortex-releases` will automatically reflect on your live website!)*
