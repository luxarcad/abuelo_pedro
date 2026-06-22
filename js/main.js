"use strict";

/* =========================================================
   LEGADO 77 - MAIN JS
   Lógica general:
   - Navegación
   - Loader
   - Música
   - Galería
   - Videos
   - Modales
   - Datos familiares
========================================================= */

(() => {
    /* =========================
       DATA EDITABLE
    ========================== */

    const familySections = [
        {
            id: "barbie",
            number: "01",
            name: "Barbie",
            description: "Recuerdos, fotos y momentos compartidos por la familia de Barbie.",
            cover: "images/barbie/cover.jpg",
            gallery: [
                "images/barbie/1.jpg",
                "images/barbie/2.jpg",
                "images/barbie/3.jpg",
                "images/barbie/4.jpg"
            ],
            videos: [
                {
                    title: "Mensaje de Barbie",
                    src: "videos/barbie/1.mp4",
                    poster: "images/barbie/cover.jpg"
                }
            ]
        },
        {
            id: "carlos",
            number: "02",
            name: "Carlos",
            description: "Recuerdos, fotos y momentos compartidos por la familia de Carlos.",
            cover: "images/carlos/cover.jpg",
            gallery: [
                "images/carlos/1.jpg",
                "images/carlos/2.jpg",
                "images/carlos/3.jpg",
                "images/carlos/4.jpg"
            ],
            videos: [
                {
                    title: "Mensaje de Carlos",
                    src: "videos/carlos/1.mp4",
                    poster: "images/carlos/cover.jpg"
                }
            ]
        },
        {
            id: "edson",
            number: "03",
            name: "Edson",
            description: "Recuerdos, fotos y momentos compartidos por la familia de Edson.",
            cover: "images/edson/cover.jpg",
            gallery: [
                "images/edson/1.jpg",
                "images/edson/2.jpg",
                "images/edson/3.jpg",
                "images/edson/4.jpg"
            ],
            videos: [
                {
                    title: "Mensaje de Edson",
                    src: "videos/edson/1.mp4",
                    poster: "images/edson/cover.jpg"
                }
            ]
        },
        {
            id: "maria",
            number: "04",
            name: "María",
            description: "Recuerdos, fotos y momentos compartidos por la familia de María.",
            cover: "images/maria/cover.jpg",
            gallery: [
                "images/maria/1.jpg",
                "images/maria/2.jpg",
                "images/maria/3.jpg",
                "images/maria/4.jpg"
            ],
            videos: [
                {
                    title: "Mensaje de María",
                    src: "videos/maria/1.mp4",
                    poster: "images/maria/cover.jpg"
                }
            ]
        },
        {
            id: "mariel",
            number: "05",
            name: "Mariel",
            description: "Recuerdos, fotos y momentos compartidos por la familia de Mariel.",
            cover: "images/mariel/cover.jpg",
            gallery: [
                "images/mariel/1.jpg",
                "images/mariel/2.jpg",
                "images/mariel/3.jpg",
                "images/mariel/4.jpg"
            ],
            videos: [
                {
                    title: "Mensaje de Mariel",
                    src: "videos/mariel/1.mp4",
                    poster: "images/mariel/cover.jpg"
                }
            ]
        },
        {
            id: "may",
            number: "06",
            name: "May",
            description: "Recuerdos, fotos y momentos compartidos por la familia de May.",
            cover: "images/may/cover.jpg",
            gallery: [
                "images/may/1.jpg",
                "images/may/2.jpg",
                "images/may/3.jpg",
                "images/may/4.jpg"
            ],
            videos: [
                {
                    title: "Mensaje de May",
                    src: "videos/may/1.mp4",
                    poster: "images/may/cover.jpg"
                }
            ]
        },
        {
            id: "quique",
            number: "07",
            name: "Quique",
            description: "Recuerdos, fotos y momentos compartidos por la familia de Quique.",
            cover: "images/quique/cover.jpg",
            gallery: [
                "images/quique/1.jpg",
                "images/quique/2.jpg",
                "images/quique/3.jpg",
                "images/quique/4.jpg"
            ],
            videos: [
                {
                    title: "Mensaje de Quique",
                    src: "videos/quique/1.mp4",
                    poster: "images/quique/cover.jpg"
                }
            ]
        }
    ];

    const grandchildren = [
        {
            name: "Nieto / Nieta 01",
            phrase: "Una luz más en esta constelación familiar.",
            icon: "bi-star-fill"
        },
        {
            name: "Nieto / Nieta 02",
            phrase: "Una historia nueva nacida del mismo legado.",
            icon: "bi-stars"
        },
        {
            name: "Nieto / Nieta 03",
            phrase: "Un recuerdo vivo dentro de esta familia.",
            icon: "bi-brightness-high-fill"
        },
        {
            name: "Nieto / Nieta 04",
            phrase: "Una sonrisa que también forma parte de esta historia.",
            icon: "bi-star-fill"
        },
        {
            name: "Nieto / Nieta 05",
            phrase: "Una nueva generación que sigue caminando con su ejemplo.",
            icon: "bi-stars"
        },
        {
            name: "Nieto / Nieta 06",
            phrase: "Otro capítulo escrito desde el cariño familiar.",
            icon: "bi-brightness-high-fill"
        },
        {
            name: "Nieto / Nieta 07",
            phrase: "Una estrella más dentro de este cielo familiar.",
            icon: "bi-star-fill"
        },
        {
            name: "Nieto / Nieta 08",
            phrase: "Una parte importante de este legado.",
            icon: "bi-stars"
        },
        {
            name: "Nieto / Nieta 09",
            phrase: "Un motivo más para celebrar esta vida.",
            icon: "bi-brightness-high-fill"
        },
        {
            name: "Nieto / Nieta 10",
            phrase: "Un cariño que también nació de esta raíz.",
            icon: "bi-star-fill"
        },
        {
            name: "Nieto / Nieta 11",
            phrase: "Una generación que guarda sus enseñanzas.",
            icon: "bi-stars"
        },
        {
            name: "Nieto / Nieta 12",
            phrase: "Una memoria futura que empieza aquí.",
            icon: "bi-brightness-high-fill"
        }
    ];

    const siteConfig = {
        audioTitle: "Canción principal",
        audioSrc: "music/cancion-principal.mp3",
        fallbackImageText: "Recuerdo familiar"
    };

    /* =========================
       HELPERS
    ========================== */

    const $ = (selector, parent = document) => parent.querySelector(selector);
    const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

    const escapeHTML = (value = "") => {
        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    };

    const normalizeText = (value = "") => {
        return String(value).trim();
    };

    const getFamilyById = (id) => {
        return familySections.find((family) => family.id === id) || null;
    };

    const createPlaceholderImage = (text = "Imagen no disponible") => {
        const safeText = escapeHTML(text);

        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
                <defs>
                    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#080706"/>
                        <stop offset="45%" stop-color="#19130c"/>
                        <stop offset="100%" stop-color="#3a2612"/>
                    </linearGradient>
                    <radialGradient id="glow" cx="50%" cy="40%" r="60%">
                        <stop offset="0%" stop-color="#d6a84f" stop-opacity="0.35"/>
                        <stop offset="100%" stop-color="#d6a84f" stop-opacity="0"/>
                    </radialGradient>
                </defs>

                <rect width="1200" height="800" fill="url(#bg)"/>
                <rect width="1200" height="800" fill="url(#glow)"/>

                <circle cx="600" cy="330" r="95" fill="none" stroke="#d6a84f" stroke-width="8" opacity="0.8"/>
                <path d="M555 335 L590 370 L655 292" fill="none" stroke="#d6a84f" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>

                <text x="600" y="515" font-family="Georgia, serif" font-size="48" fill="#f4ead2" text-anchor="middle">
                    ${safeText}
                </text>

                <text x="600" y="575" font-family="Arial, sans-serif" font-size="26" fill="#d6a84f" text-anchor="middle" opacity="0.85">
                    Imagen pendiente
                </text>
            </svg>
        `;

        return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
    };

    const handleImageError = (img, text = siteConfig.fallbackImageText) => {
        if (!img || img.dataset.fallbackApplied === "true") return;

        img.dataset.fallbackApplied = "true";
        img.src = createPlaceholderImage(text);
        img.alt = text;
    };

    const applyImageFallbacks = (parent = document) => {
        $$("img", parent).forEach((img) => {
            img.addEventListener("error", () => {
                const altText = img.getAttribute("alt") || siteConfig.fallbackImageText;
                handleImageError(img, altText);
            });
        });
    };

    const lockPageScroll = () => {
        document.documentElement.classList.add("is-locked");
        document.body.classList.add("is-locked");
    };

    const unlockPageScroll = () => {
        document.documentElement.classList.remove("is-locked");
        document.body.classList.remove("is-locked");
    };

    const scrollToSection = (targetId) => {
        const target = $(targetId);

        if (!target) return;

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

    const flattenGalleryItems = () => {
        return familySections.flatMap((family) => {
            return family.gallery.map((src, index) => ({
                familyId: family.id,
                familyName: family.name,
                src,
                title: `${family.name} - Recuerdo ${index + 1}`
            }));
        });
    };

    const flattenVideoItems = () => {
        return familySections.flatMap((family) => {
            return family.videos.map((video, index) => ({
                familyId: family.id,
                familyName: family.name,
                title: video.title || `${family.name} - Video ${index + 1}`,
                src: video.src,
                poster: video.poster || family.cover
            }));
        });
    };

    /* =========================
       LOADER / INTRO
    ========================== */

    const initLoader = () => {
        const loader = $("#loader");

        if (!loader) return;

        const hideLoader = () => {
            loader.classList.add("loader--hidden");

            window.setTimeout(() => {
                loader.hidden = true;
            }, 700);
        };

        window.addEventListener("load", hideLoader, { once: true });

        window.setTimeout(hideLoader, 2800);
    };

    const initIntro = () => {
        const intro = $("#intro");
        const startButton = $("#startExperienceBtn");

        if (!intro || !startButton) return;

        startButton.addEventListener("click", () => {
            intro.classList.add("intro--hidden");
            intro.setAttribute("aria-hidden", "true");

            window.setTimeout(() => {
                intro.hidden = true;
                scrollToSection("#hero");
            }, 650);
        });
    };

    /* =========================
       NAV
    ========================== */

    const initNavigation = () => {
        const header = $("#mainHeader");
        const menuToggle = $("#menuToggle");
        const navMenu = $("#navMenu");

        if (menuToggle && navMenu) {
            menuToggle.addEventListener("click", () => {
                const isOpen = navMenu.classList.toggle("is-open");

                menuToggle.setAttribute("aria-expanded", String(isOpen));

                const icon = $("i", menuToggle);

                if (icon) {
                    icon.className = isOpen ? "bi bi-x-lg" : "bi bi-list";
                }
            });
        }

        $$('a[href^="#"]').forEach((link) => {
            link.addEventListener("click", (event) => {
                const href = link.getAttribute("href");

                if (!href || href === "#") return;

                const target = $(href);

                if (!target) return;

                event.preventDefault();

                if (navMenu) {
                    navMenu.classList.remove("is-open");
                }

                if (menuToggle) {
                    menuToggle.setAttribute("aria-expanded", "false");

                    const icon = $("i", menuToggle);

                    if (icon) {
                        icon.className = "bi bi-list";
                    }
                }

                scrollToSection(href);
            });
        });

        let ticking = false;

        const updateHeader = () => {
            if (header) {
                header.classList.toggle("is-scrolled", window.scrollY > 20);
            }

            ticking = false;
        };

        window.addEventListener("scroll", () => {
            if (!ticking) {
                window.requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });

        updateHeader();
    };

    /* =========================
       BACK TO TOP
    ========================== */

    const initBackToTop = () => {
        const button = $("#backToTop");

        if (!button) return;

        const updateButton = () => {
            button.classList.toggle("is-visible", window.scrollY > 650);
        };

        button.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

        window.addEventListener("scroll", updateButton);
        updateButton();
    };

    /* =========================
       AUDIO
    ========================== */

    const initAudioPlayer = () => {
        const player = $("#musicPlayer");
        const audio = $("#mainAudio");
        const playButton = $("#musicToggle");
        const muteButton = $("#musicMute");
        const songTitle = $("#currentSongTitle");

        if (!player || !audio || !playButton || !muteButton) return;

        if (songTitle) {
            songTitle.textContent = siteConfig.audioTitle;
        }

        const source = $("source", audio);

        if (source && siteConfig.audioSrc) {
            source.src = siteConfig.audioSrc;
            audio.load();
        }

        const setPlayIcon = (isPlaying) => {
            const icon = $("i", playButton);

            if (!icon) return;

            icon.className = isPlaying ? "bi bi-pause-fill" : "bi bi-play-fill";
            playButton.setAttribute(
                "aria-label",
                isPlaying ? "Pausar música" : "Reproducir música"
            );
        };

        const setMuteIcon = () => {
            const icon = $("i", muteButton);

            if (!icon) return;

            if (audio.muted || audio.volume === 0) {
                icon.className = "bi bi-volume-mute-fill";
                muteButton.setAttribute("aria-label", "Activar sonido");
            } else {
                icon.className = "bi bi-volume-up-fill";
                muteButton.setAttribute("aria-label", "Silenciar música");
            }
        };

        playButton.addEventListener("click", async () => {
            try {
                if (audio.paused) {
                    await audio.play();
                    setPlayIcon(true);
                    player.classList.add("is-playing");
                } else {
                    audio.pause();
                    setPlayIcon(false);
                    player.classList.remove("is-playing");
                }
            } catch (error) {
                console.warn("El navegador bloqueó la reproducción del audio:", error);
                player.classList.add("has-error");
            }
        });

        muteButton.addEventListener("click", () => {
            audio.muted = !audio.muted;
            setMuteIcon();
        });

        audio.addEventListener("play", () => {
            setPlayIcon(true);
            player.classList.add("is-playing");
        });

        audio.addEventListener("pause", () => {
            setPlayIcon(false);
            player.classList.remove("is-playing");
        });

        audio.addEventListener("ended", () => {
            setPlayIcon(false);
            player.classList.remove("is-playing");
        });

        audio.addEventListener("volumechange", setMuteIcon);

        setPlayIcon(false);
        setMuteIcon();
    };

    /* =========================
       FAMILY CARDS
    ========================== */

    const hydrateFamilyCards = () => {
        familySections.forEach((family) => {
            const card = $(`[data-family="${family.id}"]`);

            if (!card) return;

            const image = $(".family-card__image", card);
            const number = $(".family-card__number", card);
            const title = $("h3", card);
            const description = $("p", card);
            const button = $("[data-open-family]", card);

            if (image) {
                image.src = family.cover;
                image.alt = `Recuerdo familiar de ${family.name}`;
            }

            if (number) {
                number.textContent = family.number;
            }

            if (title) {
                title.textContent = family.name;
            }

            if (description) {
                description.textContent = family.description;
            }

            if (button) {
                button.dataset.openFamily = family.id;
            }
        });
    };

    /* =========================
       GRANDCHILDREN
    ========================== */

    const renderGrandchildren = () => {
        const grid = $("#grandchildrenGrid");

        if (!grid) return;

        grid.innerHTML = grandchildren.map((item) => {
            return `
                <article class="grandchild-card">
                    <span class="grandchild-card__star" aria-hidden="true">
                        <i class="bi ${escapeHTML(item.icon)}"></i>
                    </span>

                    <h3>${escapeHTML(item.name)}</h3>

                    <p>${escapeHTML(item.phrase)}</p>
                </article>
            `;
        }).join("");
    };

    /* =========================
       GALLERY
    ========================== */

    const renderGallery = (filter = "all") => {
        const grid = $("#galleryGrid");

        if (!grid) return;

        const galleryItems = flattenGalleryItems();

        const filteredItems = filter === "all"
            ? galleryItems
            : galleryItems.filter((item) => item.familyId === filter);

        if (!filteredItems.length) {
            grid.innerHTML = `
                <div class="empty-state">
                    <i class="bi bi-images"></i>
                    <h3>No hay recuerdos en esta sección todavía</h3>
                    <p>Cuando agregues imágenes al arreglo de JavaScript aparecerán aquí.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = filteredItems.map((item, index) => {
            return `
                <article 
                    class="gallery-item" 
                    data-gallery-item 
                    data-family="${escapeHTML(item.familyId)}"
                    style="--delay-index: ${index};"
                >
                    <button 
                        class="gallery-item__button" 
                        type="button"
                        data-open-image
                        data-src="${escapeHTML(item.src)}"
                        data-title="${escapeHTML(item.title)}"
                    >
                        <img 
                            src="${escapeHTML(item.src)}" 
                            alt="${escapeHTML(item.title)}"
                            loading="lazy"
                        />

                        <span class="gallery-item__overlay">
                            <span>${escapeHTML(item.familyName)}</span>
                            <strong>Ver recuerdo</strong>
                        </span>
                    </button>
                </article>
            `;
        }).join("");

        applyImageFallbacks(grid);
    };

    const initGalleryFilters = () => {
        const buttons = $$(".filter-btn");

        if (!buttons.length) return;

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const filter = button.dataset.filter || "all";

                buttons.forEach((item) => item.classList.remove("is-active"));
                button.classList.add("is-active");

                renderGallery(filter);
            });
        });
    };

    /* =========================
       VIDEOS
    ========================== */

    const renderVideos = () => {
        const grid = $("#videoGrid");

        if (!grid) return;

        const videos = flattenVideoItems();

        if (!videos.length) {
            grid.innerHTML = `
                <div class="empty-state">
                    <i class="bi bi-camera-video"></i>
                    <h3>No hay videos todavía</h3>
                    <p>Agrega videos en las carpetas y registra sus rutas en main.js.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = videos.map((video, index) => {
            return `
                <article 
                    class="video-card" 
                    data-family="${escapeHTML(video.familyId)}"
                    style="--delay-index: ${index};"
                >
                    <button 
                        class="video-card__preview"
                        type="button"
                        data-open-video
                        data-src="${escapeHTML(video.src)}"
                        data-title="${escapeHTML(video.title)}"
                        data-poster="${escapeHTML(video.poster)}"
                    >
                        <img 
                            src="${escapeHTML(video.poster)}" 
                            alt="${escapeHTML(video.title)}"
                            loading="lazy"
                        />

                        <span class="video-card__play" aria-hidden="true">
                            <i class="bi bi-play-fill"></i>
                        </span>
                    </button>

                    <div class="video-card__content">
                        <span>${escapeHTML(video.familyName)}</span>
                        <h3>${escapeHTML(video.title)}</h3>
                    </div>
                </article>
            `;
        }).join("");

        applyImageFallbacks(grid);
    };

    /* =========================
       FAMILY MODAL
    ========================== */

    const openFamilyModal = (familyId) => {
        const family = getFamilyById(familyId);
        const modal = $("#familyModal");
        const title = $("#familyModalTitle");
        const description = $("#familyModalDescription");
        const body = $("#familyModalBody");

        if (!family || !modal || !title || !description || !body) return;

        title.textContent = family.name;
        description.textContent = family.description;

        const galleryHTML = family.gallery.length
            ? `
                <div class="modal-gallery">
                    ${family.gallery.map((src, index) => `
                        <button 
                            class="modal-gallery__item"
                            type="button"
                            data-open-image
                            data-src="${escapeHTML(src)}"
                            data-title="${escapeHTML(family.name)} - Recuerdo ${index + 1}"
                        >
                            <img 
                                src="${escapeHTML(src)}" 
                                alt="${escapeHTML(family.name)} - Recuerdo ${index + 1}"
                                loading="lazy"
                            />
                        </button>
                    `).join("")}
                </div>
            `
            : `
                <div class="empty-state">
                    <i class="bi bi-images"></i>
                    <h3>No hay fotos todavía</h3>
                    <p>Agrega imágenes en images/${escapeHTML(family.id)}/ y registra sus nombres en main.js.</p>
                </div>
            `;

        const videosHTML = family.videos.length
            ? `
                <div class="modal-video-list">
                    ${family.videos.map((video, index) => `
                        <button
                            class="modal-video-item"
                            type="button"
                            data-open-video
                            data-src="${escapeHTML(video.src)}"
                            data-title="${escapeHTML(video.title || `${family.name} - Video ${index + 1}`)}"
                            data-poster="${escapeHTML(video.poster || family.cover)}"
                        >
                            <i class="bi bi-play-circle-fill"></i>
                            <span>${escapeHTML(video.title || `${family.name} - Video ${index + 1}`)}</span>
                        </button>
                    `).join("")}
                </div>
            `
            : "";

        body.innerHTML = `
            <section class="modal-section">
                <h3>Fotos</h3>
                ${galleryHTML}
            </section>

            <section class="modal-section">
                <h3>Videos</h3>
                ${videosHTML || `
                    <div class="empty-state empty-state--small">
                        <i class="bi bi-camera-video"></i>
                        <p>No hay videos registrados para esta rama familiar.</p>
                    </div>
                `}
            </section>
        `;

        applyImageFallbacks(body);

        modal.hidden = false;
        modal.classList.add("is-open");
        lockPageScroll();
    };

    const closeFamilyModal = () => {
        const modal = $("#familyModal");
        const body = $("#familyModalBody");

        if (!modal) return;

        modal.classList.remove("is-open");

        window.setTimeout(() => {
            modal.hidden = true;

            if (body) {
                body.innerHTML = "";
            }

            unlockPageScroll();
        }, 250);
    };

    /* =========================
       MEDIA MODAL
    ========================== */

    const openImageModal = ({ src, title }) => {
        const modal = $("#mediaModal");
        const body = $("#mediaModalBody");

        if (!modal || !body || !src) return;

        const safeTitle = normalizeText(title) || "Recuerdo familiar";

        body.innerHTML = `
            <figure class="media-viewer__figure">
                <img 
                    src="${escapeHTML(src)}" 
                    alt="${escapeHTML(safeTitle)}"
                />

                <figcaption>${escapeHTML(safeTitle)}</figcaption>
            </figure>
        `;

        applyImageFallbacks(body);

        modal.hidden = false;
        modal.classList.add("is-open");
        lockPageScroll();
    };

    const openVideoModal = ({ src, title, poster }) => {
        const modal = $("#mediaModal");
        const body = $("#mediaModalBody");

        if (!modal || !body || !src) return;

        const safeTitle = normalizeText(title) || "Video familiar";

        body.innerHTML = `
            <div class="media-viewer__video">
                <video 
                    src="${escapeHTML(src)}"
                    poster="${escapeHTML(poster || "")}"
                    controls
                    playsinline
                    preload="metadata"
                    autoplay
                ></video>

                <h3>${escapeHTML(safeTitle)}</h3>
            </div>
        `;

        modal.hidden = false;
        modal.classList.add("is-open");
        lockPageScroll();

        const video = $("video", body);

        if (video) {
            video.play().catch((error) => {
                console.warn("El navegador no permitió autoplay del video:", error);
            });
        }
    };

    const closeMediaModal = () => {
        const modal = $("#mediaModal");
        const body = $("#mediaModalBody");

        if (!modal || !body) return;

        const video = $("video", body);

        if (video) {
            video.pause();
            video.removeAttribute("src");
            video.load();
        }

        modal.classList.remove("is-open");

        window.setTimeout(() => {
            body.innerHTML = "";
            modal.hidden = true;

            const familyModal = $("#familyModal");

            if (!familyModal || familyModal.hidden) {
                unlockPageScroll();
            }
        }, 250);
    };

    const initGlobalModalEvents = () => {
        document.addEventListener("click", (event) => {
            const familyButton = event.target.closest("[data-open-family]");
            const imageButton = event.target.closest("[data-open-image]");
            const videoButton = event.target.closest("[data-open-video]");
            const closeFamilyButton = event.target.closest("[data-close-modal]");
            const closeMediaButton = event.target.closest("[data-close-media]");

            if (familyButton) {
                const familyId = familyButton.dataset.openFamily;
                openFamilyModal(familyId);
                return;
            }

            if (imageButton) {
                openImageModal({
                    src: imageButton.dataset.src,
                    title: imageButton.dataset.title
                });
                return;
            }

            if (videoButton) {
                openVideoModal({
                    src: videoButton.dataset.src,
                    title: videoButton.dataset.title,
                    poster: videoButton.dataset.poster
                });
                return;
            }

            if (closeFamilyButton) {
                closeFamilyModal();
                return;
            }

            if (closeMediaButton) {
                closeMediaModal();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key !== "Escape") return;

            const mediaModal = $("#mediaModal");
            const familyModal = $("#familyModal");

            if (mediaModal && !mediaModal.hidden) {
                closeMediaModal();
                return;
            }

            if (familyModal && !familyModal.hidden) {
                closeFamilyModal();
            }
        });
    };

    /* =========================
       ACCESSIBILITY / SMALL FIXES
    ========================== */

    const initReducedMotionClass = () => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        document.documentElement.classList.toggle("prefers-reduced-motion", prefersReducedMotion);
    };

    const initExternalAssetWarnings = () => {
        const requiredImages = [
            "images/general/abuelo-principal.jpg",
            "images/general/unam.png",
            "images/general/pumas.png"
        ];

        requiredImages.forEach((src) => {
            const img = new Image();

            img.onerror = () => {
                console.warn(`Imagen pendiente o no encontrada: ${src}`);
            };

            img.src = src;
        });
    };

    /* =========================
       INIT
    ========================== */

    const init = () => {
        initReducedMotionClass();
        initLoader();
        initIntro();
        initNavigation();
        initBackToTop();
        initAudioPlayer();

        hydrateFamilyCards();
        renderGrandchildren();
        renderGallery("all");
        renderVideos();

        initGalleryFilters();
        initGlobalModalEvents();
        applyImageFallbacks();
        initExternalAssetWarnings();

        document.documentElement.classList.add("js-ready");
    };

    document.addEventListener("DOMContentLoaded", init);
})();