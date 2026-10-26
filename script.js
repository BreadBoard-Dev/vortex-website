document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // AUTOMATIC GITHUB RELEASE DETECTOR
  // Automatically keeps version, download links, file sizes, and notes up-to-date
  // ==========================================================================
  const REPOS = [
    'BreadBoard-Dev/vortex-releases',
    'BreadBoard-Dev/vortex-dm'
  ];

  // Default fallback values if offline, rate-limited, or pre-release
  const DEFAULT_RELEASE = {
    version: '1.0.6',
    tag: 'v1.0.6',
    title: 'Vortex Download Manager v1.0.6',
    publishedAt: 'October 2026',
    downloadUrl: 'https://github.com/BreadBoard-Dev/vortex-releases/releases/download/v1.0.6/VortexDownloader_v1.0.6_Setup.exe',
    fileName: 'VortexDownloader_v1.0.6_Setup.exe',
    fileSize: '~140 MB',
    releaseUrl: 'https://github.com/BreadBoard-Dev/vortex-releases/releases/latest',
    body: 'Automated segmented download acceleration, dynamic chunk work-stealing, and browser integration.'
  };

  async function fetchLatestRelease() {
    let releaseData = null;

    for (const repo of REPOS) {
      try {
        const response = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
          headers: { 'Accept': 'application/vnd.github.v3+json' }
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.tag_name) {
            const rawTag = data.tag_name;
            const cleanVersion = rawTag.startsWith('v') ? rawTag.substring(1) : rawTag;
            
            // Find Windows installer asset (.exe)
            let installerAsset = null;
            if (Array.isArray(data.assets) && data.assets.length > 0) {
              installerAsset = data.assets.find(a => a.name.toLowerCase().endsWith('.exe'));
            }

            const downloadUrl = installerAsset 
              ? installerAsset.browser_download_url 
              : `https://github.com/${repo}/releases/download/${rawTag}/VortexDownloader_${rawTag}_Setup.exe`;

            const fileName = installerAsset ? installerAsset.name : `VortexDownloader_${rawTag}_Setup.exe`;
            const fileSize = installerAsset ? (installerAsset.size / (1024 * 1024)).toFixed(1) + ' MB' : '~140 MB';

            let formattedDate = DEFAULT_RELEASE.publishedAt;
            if (data.published_at) {
              const d = new Date(data.published_at);
              formattedDate = d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
            }

            releaseData = {
              version: cleanVersion,
              tag: rawTag.startsWith('v') ? rawTag : `v${rawTag}`,
              title: data.name || `Vortex Download Manager v${cleanVersion}`,
              publishedAt: formattedDate,
              downloadUrl: downloadUrl,
              fileName: fileName,
              fileSize: fileSize,
              releaseUrl: data.html_url || `https://github.com/${repo}/releases/latest`,
              body: data.body || DEFAULT_RELEASE.body
            };
            break;
          }
        }
      } catch (err) {
        console.warn(`Could not fetch releases from ${repo}:`, err);
      }
    }

    applyReleaseToPage(releaseData || DEFAULT_RELEASE);
  }

  function applyReleaseToPage(rel) {
    // 1. Version labels (e.g. "v1.0.6")
    document.querySelectorAll('[data-release-version]').forEach(el => {
      el.textContent = rel.tag;
    });

    // 2. Numeric version only (e.g. "1.0.2")
    document.querySelectorAll('[data-release-num]').forEach(el => {
      el.textContent = rel.version;
    });

    // 3. Download link URLs
    document.querySelectorAll('[data-release-download]').forEach(el => {
      el.setAttribute('href', rel.downloadUrl);
    });

    // 4. Installer File Name
    document.querySelectorAll('[data-release-filename]').forEach(el => {
      el.textContent = `🪟 ${rel.fileName}`;
    });

    // 5. File Size
    document.querySelectorAll('[data-release-size]').forEach(el => {
      el.textContent = `Windows Inno Setup Installer • ${rel.fileSize}`;
    });

    // 6. Release Date
    document.querySelectorAll('[data-release-date]').forEach(el => {
      el.textContent = rel.publishedAt;
    });

    // 7. Full Release page URL
    document.querySelectorAll('[data-release-url]').forEach(el => {
      el.setAttribute('href', rel.releaseUrl);
    });

    // 8. Dynamic Release Banner if notes are present
    const notesContainer = document.getElementById('latestReleaseNotes');
    if (notesContainer && rel.body) {
      notesContainer.innerHTML = `
        <div class="release-auto-badge">
          <span class="live-dot"></span> Live from GitHub: <strong>${rel.tag}</strong> (${rel.publishedAt})
        </div>
      `;
    }
  }

  // Trigger automatic check
  fetchLatestRelease();

  // ==========================================================================
  // GALLERY DATA (12 PURE APPLICATION UI SNAPSHOTS)
  // All internal developer tools & retail cover tiles removed
  // ==========================================================================
  const galleryItems = [
    {
      src: 'snapshots/01_vortex_main_dashboard.png',
      title: 'Main Download Dashboard',
      category: 'dashboard',
      badge: 'Core UI',
      desc: 'Real-time task queue with dynamic transfer speeds, file category classification, and individual task controls.'
    },
    {
      src: 'snapshots/02_vortex_segment_visualizer_telemetry.png',
      title: 'Dynamic Segment Visualizer',
      category: 'dashboard',
      badge: 'Telemetry',
      desc: 'Real-time telemetry showing parallel socket streams, byte boundaries, and dynamic chunk work-stealing splits.'
    },
    {
      src: 'snapshots/03_vortex_add_download_dialog.png',
      title: 'Add Download Dialog',
      category: 'dashboard',
      badge: 'Task Creation',
      desc: 'Custom download task setup supporting 1 to 32 parallel sockets, session cookies, referer headers, and destination paths.'
    },
    {
      src: 'snapshots/04_vortex_browser_integration_manager.png',
      title: 'Browser Integration Hub',
      category: 'settings',
      badge: 'Extensions',
      desc: 'One-click native messaging bridge setup and health monitor for Chrome, Edge, Brave, and Firefox.'
    },
    {
      src: 'snapshots/05_vortex_settings_engine_limits.png',
      title: 'Engine & Bandwidth Limits',
      category: 'settings',
      badge: 'Performance',
      desc: 'Fine-tune token-bucket rate limits, socket buffers, disk pre-allocation, and maximum concurrent connections.'
    },
    {
      src: 'snapshots/06_vortex_settings_browser_tab.png',
      title: 'Browser Extension Settings',
      category: 'settings',
      badge: 'Integration',
      desc: 'Configure automated browser download interception, media stream sniffer badges, and domain exclude lists.'
    },
    {
      src: 'snapshots/07_vortex_settings_license_giveaway.png',
      title: '1-Year Giveaway Status',
      category: 'license',
      badge: 'Giveaway',
      desc: 'Promotional giveaway license view displaying active validity status, countdown of remaining days, and anti-rollback verification.'
    },
    {
      src: 'snapshots/08_vortex_settings_updates_about.png',
      title: 'Updates & About Engine',
      category: 'settings',
      badge: 'System Info',
      desc: 'System info, version status, official developer contact, and direct update channel controls.'
    },
    {
      src: 'snapshots/09_vortex_license_modal_giveaway.png',
      title: 'Giveaway Key Activation',
      category: 'license',
      badge: 'Promotion',
      desc: 'In-app activation screen for Giveaway of the Day promotional 1-Year license keys.'
    },
    {
      src: 'snapshots/10_vortex_license_modal_lifetime.png',
      title: 'Perpetual Lifetime Activation',
      category: 'license',
      badge: 'Lifetime',
      desc: 'Instant lifetime license activation dialog with direct Razorpay payment link integration (₹200 INR).'
    },
    {
      src: 'snapshots/11_vortex_update_checker_uptodate.png',
      title: 'In-App Update Checker',
      category: 'tools',
      badge: 'Updates',
      desc: 'Instant release checking against official feeds, verifying the current build is up-to-date.'
    },
    {
      src: 'snapshots/12_vortex_checksum_integrity_verifier.png',
      title: 'Checksum Integrity Verifier',
      category: 'tools',
      badge: 'Security',
      desc: 'Built-in cryptographic hash calculator supporting SHA-256, SHA-1, and MD5 file integrity verification.'
    }
  ];

  const galleryGrid = document.getElementById('galleryGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function renderGallery(filter = 'all') {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';
    const filtered = filter === 'all' 
      ? galleryItems 
      : galleryItems.filter(item => item.category === filter);

    filtered.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'gallery-item';
      card.innerHTML = `
        <div class="gallery-thumb-wrap">
          <img class="gallery-thumb" src="${item.src}" alt="${item.title}" loading="lazy">
          <span class="gallery-overlay-badge">${item.badge}</span>
        </div>
        <div class="gallery-info">
          <span class="gallery-category">${item.category}</span>
          <h4 class="gallery-title">${item.title}</h4>
        </div>
      `;
      card.addEventListener('click', () => openLightbox(galleryItems.indexOf(item)));
      galleryGrid.appendChild(card);
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGallery(btn.dataset.filter);
    });
  });

  // Lightbox Implementation
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    if (lightboxModal) {
      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function updateLightbox() {
    const item = galleryItems[currentIndex];
    if (lightboxImg && item) {
      lightboxImg.src = item.src;
      lightboxCaption.innerHTML = `<strong>${item.title}</strong> — ${item.desc}`;
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      updateLightbox();
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % galleryItems.length;
      updateLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      updateLightbox();
    }
    if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % galleryItems.length;
      updateLightbox();
    }
  });

  renderGallery('all');

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  // Mobile navigation toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '72px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(10, 14, 23, 0.98)';
        navLinks.style.padding = '20px';
        navLinks.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
      }
    });
  }

  // ==========================================================================
  // CLIENT-SIDE INSPECT & DEVTOOLS HARDENING
  // Deters casual inspection, viewing page source, and shortcut tampering
  // ==========================================================================
  document.addEventListener('contextmenu', (e) => e.preventDefault());
  document.addEventListener('keydown', (e) => {
    // Disable F12, Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+Shift+C, Ctrl+U (Source)
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key)) ||
      (e.ctrlKey && ['u', 'U', 's', 'S'].includes(e.key))
    ) {
      e.preventDefault();
      return false;
    }
  });
});