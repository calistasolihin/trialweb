/**
 * ==========================================================================
 * Portfolio Interactive Scripts
 * Theme: Soft Claymorphism (Calista Solihin)
 * 
 * Features:
 * 1. Sidebar Navigation: ScrollSpy & Active State via IntersectionObserver
 * 2. About Section: Single-Run Typing Animation ("Hi, I'm Calista Solihin")
 * 3. Hero Character: 9-Directional Eye Tracking follows mouse cursor
 * 4. Interactive Lanyard: Mouse-Follow Hover Sway + Spring Drag Physics
 * 5. Project Slider: Smooth horizontal scroll via scrollBy
 * 6. Project Modal: Fullscreen preview popup with backdrop blur & Escape key support
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1 & 2. Active Navigation (ScrollSpy) & About Typing Animation
  // Menggunakan 1 instance IntersectionObserver terpadu untuk efisiensi
  // ==========================================================================
  const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
  const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');
  let isManualScrolling = false;
  let manualScrollTimeout = null;

  // State untuk Typing Animation di About
  let hasTypedAbout = false;
  const typingTextElement = document.getElementById('aboutTypingText');
  const textToType = "Hi, I'm Calista Solihin";

  function setActiveSection(sectionId) {
    // Hapus status active dari semua menu untuk menghindari menu aktif ganda
    navItems.forEach((item) => item.classList.remove('active'));
    navLinks.forEach((link) => {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    });

    // Cari link yang href-nya sesuai dengan ID section yang sedang aktif
    const targetLink = document.querySelector(`.sidebar-nav a[href="#${sectionId}"]`);
    if (targetLink) {
      targetLink.classList.add('active');
      targetLink.setAttribute('aria-current', 'page');
      const parentItem = targetLink.closest('.nav-item');
      if (parentItem) {
        parentItem.classList.add('active');
      }
    }
  }

  // Animasi Mengetik Huruf per Huruf (70-90ms)
  function startAboutTyping() {
    if (!typingTextElement || hasTypedAbout) return;
    hasTypedAbout = true; // Hanya berjalan 1 kali seumur hidup halaman

    let charIndex = 0;
    typingTextElement.textContent = '';

    function typeNextChar() {
      if (charIndex < textToType.length) {
        typingTextElement.textContent += textToType.charAt(charIndex);
        charIndex++;
        // Kecepatan random realistis antara 70-90 ms per karakter
        const delay = Math.floor(Math.random() * 21) + 70;
        setTimeout(typeNextChar, delay);
      }
    }

    typeNextChar();
  }

  // Smooth scroll saat menu diklik
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        if (targetId) {
          setActiveSection(targetId);

          // Kunci observer sementara agar tidak terjadi jittering saat scrolling berlangsung
          isManualScrolling = true;
          clearTimeout(manualScrollTimeout);
          manualScrollTimeout = setTimeout(() => {
            isManualScrolling = false;
          }, 850);
        }
      }
    });
  });

  // IntersectionObserver dengan threshold 0.5 (saat section terlihat 50% di viewport)
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      threshold: 0.5,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      if (isManualScrolling) return;

      let mostVisibleEntry = null;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!mostVisibleEntry || entry.intersectionRatio > mostVisibleEntry.intersectionRatio) {
            mostVisibleEntry = entry;
          }
        }
      });

      if (mostVisibleEntry) {
        const activeId = mostVisibleEntry.target.getAttribute('id');
        if (activeId) {
          setActiveSection(activeId);

          // Jalankan typing animation saat section #about terlihat cukup jelas
          if (activeId === 'about' && !hasTypedAbout) {
            startAboutTyping();
          }
        }
      }
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // ==========================================================================
  // 3. Eye Tracking dengan 9 Gambar Sprite Karakter
  // ==========================================================================
  const heroCharacter = document.getElementById('heroCharacter');

  if (heroCharacter) {
    // Path 9 sprite karakter sesuai arah pandangan mata
    const spriteMap = {
      'center': 'asset/image/character-center.png',
      'up': 'asset/image/character-up.png',
      'down': 'asset/image/character-down.png',
      'left': 'asset/image/character-left.png',
      'right': 'asset/image/character-right.png',
      'up-left': 'asset/image/character-up-left.png',
      'up-right': 'asset/image/character-up-right.png',
      'down-left': 'asset/image/character-down-left.png',
      'down-right': 'asset/image/character-down-right.png',
    };

    // Preload semua 9 gambar ke memori agar tidak berkedip (no flicker) saat transisi
    const preloadedImages = {};
    Object.entries(spriteMap).forEach(([dir, path]) => {
      const img = new Image();
      img.src = path;
      preloadedImages[dir] = img;
    });

    let currentDirection = 'center';
    let isTrackingTicking = false;

    // Deadzone threshold (pixel) agar mata tidak bergetar jika mouse dekat dengan wajah
    const CENTER_THRESHOLD = 75;

    function setDirection(newDirection) {
      if (newDirection !== currentDirection && spriteMap[newDirection]) {
        currentDirection = newDirection;
        // Hanya update src jika gambar yang dibutuhkan berbeda, tanpa menggeser posisi elemen
        heroCharacter.src = spriteMap[newDirection];
      }
    }

    window.addEventListener(
      'mousemove',
      (e) => {
        if (!isTrackingTicking) {
          requestAnimationFrame(() => {
            const rect = heroCharacter.getBoundingClientRect();

            // Titik acuan tengah karakter (area mata/wajah)
            const charCenterX = rect.left + rect.width / 2;
            const charCenterY = rect.top + rect.height * 0.36;

            const dx = e.clientX - charCenterX;
            const dy = e.clientY - charCenterY;
            const distance = Math.hypot(dx, dy);

            let targetDir = 'center';

            // Jika mouse keluar dari deadzone, bagi menjadi 8 sektor sudut
            if (distance > CENTER_THRESHOLD) {
              const angle = Math.atan2(dy, dx) * (180 / Math.PI); // -180 s/d 180 derajat

              if (angle >= -22.5 && angle < 22.5) {
                targetDir = 'right';
              } else if (angle >= 22.5 && angle < 67.5) {
                targetDir = 'down-right';
              } else if (angle >= 67.5 && angle < 112.5) {
                targetDir = 'down';
              } else if (angle >= 112.5 && angle < 157.5) {
                targetDir = 'down-left';
              } else if (angle >= 157.5 || angle < -157.5) {
                targetDir = 'left';
              } else if (angle >= -157.5 && angle < -112.5) {
                targetDir = 'up-left';
              } else if (angle >= -112.5 && angle < -67.5) {
                targetDir = 'up';
              } else if (angle >= -67.5 && angle < -22.5) {
                targetDir = 'up-right';
              }
            }

            setDirection(targetDir);
            isTrackingTicking = false;
          });

          isTrackingTicking = true;
        }
      },
      { passive: true }
    );

    // Kembalikan ke pandangan lurus ke depan saat kursor meninggalkan jendela browser
    document.addEventListener('mouseleave', () => {
      setDirection('center');
    });
  }

  // ==========================================================================
  // 4. Interactive Lanyard (Mouse-Follow Hover Sway + Elastic Spring Drag)
  // ==========================================================================
  const aboutSection = document.getElementById('about');
  const lanyardWrapper = document.getElementById('aboutLanyardWrapper');

  if (aboutSection && lanyardWrapper) {
    let currentX = 0;
    let currentY = 0;
    let currentRotation = 0;

    // Hover sway saat mouse melintas di section #about (ketika tidak sedang di-drag)
    let hoverTargetX = 0;
    let hoverTargetRot = 0;
    let hoverX = 0;
    let hoverRot = 0;

    // State Dragging
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let lastClientX = 0;
    let lastTime = 0;
    let velocityX = 0;
    let springRafId = null;

    // Helper untuk menerapkan transform CSS dengan transform-origin: top center
    function applyLanyardTransform(x, y, rotation) {
      lanyardWrapper.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
    }

    // Gerakan halus mengikuti kursor di area #about
    aboutSection.addEventListener(
      'mousemove',
      (e) => {
        if (isDragging) return;

        const rect = aboutSection.getBoundingClientRect();
        const relativeX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const clampedRelX = Math.max(-1, Math.min(1, relativeX));

        // Maksimum gerakan horizontal ~60px, rotasi ~8 derajat
        hoverTargetX = clampedRelX * 60;
        hoverTargetRot = clampedRelX * 8;
      },
      { passive: true }
    );

    aboutSection.addEventListener('mouseleave', () => {
      if (!isDragging) {
        hoverTargetX = 0;
        hoverTargetRot = 0;
      }
    });

    // Loop animasi hover sway halus
    function updateHoverSway() {
      if (!isDragging && !springRafId) {
        hoverX += (hoverTargetX - hoverX) * 0.08;
        hoverRot += (hoverTargetRot - hoverRot) * 0.08;
        applyLanyardTransform(currentX + hoverX, currentY, currentRotation + hoverRot);
      }
      requestAnimationFrame(updateHoverSway);
    }
    requestAnimationFrame(updateHoverSway);

    // Logika Drag Lanyard
    function startDrag(clientX, clientY) {
      if (springRafId) {
        cancelAnimationFrame(springRafId);
        springRafId = null;
      }

      isDragging = true;
      lanyardWrapper.classList.add('grabbing');

      // Simpan offset titik klik agar gambar tidak melompat
      dragStartX = clientX - currentX;
      dragStartY = clientY - currentY;

      lastClientX = clientX;
      lastTime = performance.now();
      velocityX = 0;
    }

    function moveDrag(clientX, clientY) {
      if (!isDragging) return;

      const now = performance.now();
      const dt = Math.max(now - lastTime, 1);
      velocityX = (clientX - lastClientX) / dt;
      lastClientX = clientX;
      lastTime = now;

      // Izinkan translasi X dan Y
      currentX = clientX - dragStartX;
      currentY = clientY - dragStartY;

      // Rotasi mengikuti kecepatan horizontal mouse (-30 s/d 30 derajat)
      const targetRot = Math.max(-30, Math.min(30, velocityX * 24));
      currentRotation += (targetRot - currentRotation) * 0.35;

      applyLanyardTransform(currentX, currentY, currentRotation);
    }

    function endDrag() {
      if (!isDragging) return;
      isDragging = false;
      lanyardWrapper.classList.remove('grabbing');

      // Reset hover offset
      hoverX = 0;
      hoverRot = 0;
      hoverTargetX = 0;
      hoverTargetRot = 0;

      // Animasi pegas / spring-like easing: posisi terakhir tetap, rotasi kembali ke 0 derajat
      let springRot = currentRotation;
      let springVelocity = -springRot * 0.15;
      const stiffness = 0.12;
      const damping = 0.82;

      function stepSpring() {
        if (isDragging) return;

        const force = -stiffness * springRot;
        springVelocity = (springVelocity + force) * damping;
        springRot += springVelocity;
        currentRotation = springRot;

        applyLanyardTransform(currentX, currentY, currentRotation);

        if (Math.abs(springRot) > 0.08 || Math.abs(springVelocity) > 0.04) {
          springRafId = requestAnimationFrame(stepSpring);
        } else {
          currentRotation = 0;
          applyLanyardTransform(currentX, currentY, 0);
          springRafId = null;
        }
      }

      springRafId = requestAnimationFrame(stepSpring);
    }

    // Mouse Drag Listeners
    lanyardWrapper.addEventListener('mousedown', (e) => {
      e.preventDefault(); // Cegah native browser ghost drag
      startDrag(e.clientX, e.clientY);
    });

    window.addEventListener('mousemove', (e) => {
      if (isDragging) moveDrag(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) endDrag();
    });

    // Touch Drag Listeners (Mobile)
    lanyardWrapper.addEventListener(
      'touchstart',
      (e) => {
        if (e.touches.length === 1) {
          e.preventDefault();
          const t = e.touches[0];
          startDrag(t.clientX, t.clientY);
        }
      },
      { passive: false }
    );

    window.addEventListener(
      'touchmove',
      (e) => {
        if (isDragging && e.touches.length === 1) {
          e.preventDefault();
          const t = e.touches[0];
          moveDrag(t.clientX, t.clientY);
        }
      },
      { passive: false }
    );

    window.addEventListener('touchend', () => {
      if (isDragging) endDrag();
    });

    window.addEventListener('touchcancel', () => {
      if (isDragging) endDrag();
    });
  }

  // ==========================================================================
  // 5. Project Slider (CSS Scroll-Snap + smooth scrollBy)
  // ==========================================================================
  const projectSlider = document.getElementById('projectSlider');
  const projectPrevBtn = document.getElementById('projectPrevBtn');
  const projectNextBtn = document.getElementById('projectNextBtn');

  if (projectSlider && projectPrevBtn && projectNextBtn) {
    function getScrollStep() {
      const firstCard = projectSlider.querySelector('.project-card');
      if (firstCard) {
        // Lebar card + gap (28px)
        return firstCard.offsetWidth + 28;
      }
      return 320;
    }

    projectPrevBtn.addEventListener('click', () => {
      projectSlider.scrollBy({
        left: -getScrollStep(),
        behavior: 'smooth',
      });
    });

    projectNextBtn.addEventListener('click', () => {
      projectSlider.scrollBy({
        left: getScrollStep(),
        behavior: 'smooth',
      });
    });
  }

  // ==========================================================================
  // 6. Project Modal Popup (Backdrop Blur, Scale Animation & Keyboard Support)
  // ==========================================================================
  const projectModal = document.getElementById('projectModal');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalNumber = document.getElementById('modalNumber');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalDesc = document.getElementById('modalDesc');
  const modalPreviewIcon = document.getElementById('modalPreviewIcon');
  const projectCards = document.querySelectorAll('.project-card');

  const projectDescriptions = {
    1: 'Aplikasi mobile banking inovatif dengan widget saldo claymorphism, transfer instan, dan visualisasi pengeluaran interaktif.',
    2: 'Dashboard analitik real-time yang memadukan soft clay cards modular, grafik performa, dan telemetri data yang intuitif.',
    3: 'Ekosistem e-commerce berbasis SaaS dengan katalog produk taktil, interaksi keranjang belanja cepat, dan checkout aman.',
    4: 'Eksplorasi portofolio kreatif dengan eye tracking karakter 9 arah, badge lanyard berfisika pegas, dan desain claymorphism.',
    5: 'Sistem token desain 3D yang menghasilkan elevasi taktil konsisten, bayangan claymorphism lembut, dan palet warna pastel yang harmonis.',
  };

  function openProjectModal(card) {
    if (!projectModal) return;

    const number = card.querySelector('.card-number')?.textContent || '01';
    const title = card.querySelector('.card-title')?.textContent || 'Project';
    const category = card.querySelector('.card-category')?.textContent || 'Showcase';
    const icon = card.querySelector('.project-icon');
    const id = card.getAttribute('data-project-id') || '1';

    if (modalNumber) modalNumber.textContent = number;
    if (modalTitle) modalTitle.textContent = title;
    if (modalCategory) modalCategory.textContent = category;
    if (modalDesc) modalDesc.textContent = projectDescriptions[id] || 'Karya interaktif yang dibangun dengan standar front-end modern.';

    if (modalPreviewIcon && icon) {
      modalPreviewIcon.className = icon.className + ' modal-preview-icon';
    }

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Kunci scroll halaman saat modal aktif
  }

  function closeProjectModal() {
    if (!projectModal || !projectModal.classList.contains('active')) return;
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Kembalikan scroll halaman
  }

  // Buka modal saat area gambar card diklik atau ditekan Enter/Space (A11y)
  projectCards.forEach((card) => {
    const imageBox = card.querySelector('.card-image-box');
    if (imageBox) {
      imageBox.addEventListener('click', () => openProjectModal(card));
      imageBox.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openProjectModal(card);
        }
      });
    }
  });

  // 1. Tutup modal via tombol X
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  // 2. Tutup modal via klik area overlay gelap di luar konten
  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeProjectModal);
  }

  // 3. Tutup modal via tombol Escape pada keyboard
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
    }
  });

  // Tutup modal saat tombol aksi CTA di dalam modal diklik
  const modalCtaBtn = document.getElementById('modalCtaBtn');
  if (modalCtaBtn) {
    modalCtaBtn.addEventListener('click', closeProjectModal);
  }
});
