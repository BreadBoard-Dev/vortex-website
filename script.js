document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // GALLERY DATA & LIGHTBOX
  // ==========================================================================
  const galleryItems = [
    {
      src: 'snapshots/01_vortex_main_dashboard.png',
      title: 'Main Download Dashboard',
      category: 'dashboard',
      badge: 'Core UI',
      desc: 'Real-time task queue with transfer speeds, dynamic progress bars, file categorization, and instant controls.'
    },
    {
      src: 'snapshots/02_vortex_segment_visualizer_telemetry.png',
      title: 'Dynamic Segment Visualizer',
      category: 'dashboard',
      badge: 'Telemetry',
      desc: 'Live telemetry displaying individual socket connections, chunk byte ranges, and dynamic work-stealing re-segmentation.'
    },
    {
      src: 'snapshots/03_vortex_add_download_dialog.png',
      title: 'Add Download Dialog',
      category: 'dashboard',
      badge: 'Task Creation',
      desc: 'Custom download configuration supporting custom thread counts (1-32), session cookies, referer headers, and destination paths.'
    },
    {
      src: 'snapshots/04_vortex_browser_integration_manager.png',
      title: 'Browser Integration Hub',
      category: 'settings',
      badge: 'Extensions',
      desc: 'One-click native messaging bridge setup and health check for Google Chrome, Microsoft Edge, Brave, and Mozilla Firefox.'
    },
    {
      src: 'snapshots/05_vortex_settings_engine_limits.png',
      title: 'Engine & Bandwidth Limits',
      category: 'settings',
      badge: 'Performance',
      desc: 'Fine-tune token-bucket rate limits, socket buffers, pre-allocation disk strategies, and maximum concurrent connections.'
    },
    {
      src: 'snapshots/06_vortex_settings_browser_tab.png',
      title: 'Browser Extension Settings',
      category: 'settings',
      badge: 'Integration',
      desc: 'Configure automated browser download interception, media stream sniffer badges, and excluded domain lists.'
    },
    {
      src: 'snapshots/07_vortex_settings_license_giveaway.png',
      title: '1-Year Giveaway Status',
      category: 'license',
      badge: 'Giveaway',
      desc: 'Official giveaway license view showing active status, remaining validity days countdown, and anti-rollback verification.'
    },
    {
      src: 'snapshots/08_vortex_settings_updates_about.png',
      title: 'Updates & About Engine',
      category: 'settings',
      badge: 'System Info',
      desc: 'System info, active build version v1.0.1, official developer contacts, and direct update channel controls.'
    },
    {
      src: 'snapshots/09_vortex_license_modal_giveaway.png',
      title: 'Giveaway Key Activation',
      category: 'license',
      badge: 'Promotion',
      desc: 'Dedicated activation screen for WinningPC and Giveaway of the Day promotional 1-Year license keys.'
    },
    {
      src: 'snapshots/10_vortex_license_modal_lifetime.png',
      title: 'Perpetual Lifetime Activation',
      category: 'license',
      badge: 'Lifetime',
      desc: 'Instant lifetime license activation with direct Razorpay payment link integration (₹200 INR).'
    },
    {
      src: 'snapshots/11_vortex_update_checker_uptodate.png',
      title: 'In-App Update Checker',
      category: 'settings',
      badge: 'Updates',
      desc: 'Fast, secure version check against official update feeds with silent fallback verification.'
    },
    {
      src: 'snapshots/12_vortex_checksum_integrity_verifier.png',
      title: 'Checksum Integrity Verifier',
      category: 'tools',
      badge: 'Security',
      desc: 'Built-in cryptographic hash calculator supporting SHA-256, SHA-1, and MD5 verification for downloaded files.'
    },
    {
      src: 'snapshots/13_vortex_license_manager_single_key.png',
      title: 'Developer License Manager',
      category: 'tools',
      badge: 'Dev Utility',
      desc: 'Standalone developer tool for cryptographic ECDSA key issuance, license inspection, and hardware ID signing.'
    },
    {
      src: 'snapshots/14_vortex_license_manager_batch_generator.png',
      title: 'Batch Giveaway Generator',
      category: 'tools',
      badge: 'Promotions',
      desc: 'High-speed batch key generator for promotional distribution campaigns (WinningPC, GOTD) with exportable feeds.'
    },
    {
      src: 'snapshots/15_vortex_license_manager_revocation_feed.png',
      title: 'Remote Revocation Engine',
      category: 'tools',
      badge: 'Security',
      desc: 'IDM-style remote revocation feed manager ensuring unauthorized or leaked keys are protected against.'
    },
    {
      src: 'snapshots/16_vortex_product_cover_box.png',
      title: '3D Retail Product Cover',
      category: 'dashboard',
      badge: 'Cover Mockup',
      desc: 'Official 3D retail software box mockup featuring electric cyber gradient, glowing vortex branding, and #1 Download Manager badge.'
    }
  ];

  const galleryGrid = document.getElementById('galleryGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  // Render Gallery Items
  function renderGallery(filter = 'all') {
    galleryGrid.innerHTML = '';
    const filtered = filter === 'all' 
      ? galleryItems 
      : galleryItems.filter(item => item.category === filter);

    filtered.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'gallery-item';
      card.dataset.index = galleryItems.indexOf(item);
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

  // Filter Buttons
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
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    const item = galleryItems[currentIndex];
    lightboxImg.src = item.src;
    lightboxCaption.innerHTML = `<strong>${item.title}</strong> — ${item.desc}`;
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightbox();
  });

  lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
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

  // Initialize Gallery
  renderGallery('all');

  // ==========================================================================
  // FAQ ACCORDION
  // ==========================================================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // Mobile navigation toggle (simple smooth toggle)
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle) {
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
});
