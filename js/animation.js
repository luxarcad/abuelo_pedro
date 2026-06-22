"use strict";

/* =========================================================
   LEGADO 77 - ANIMATION JS
   Animaciones:
   - GSAP
   - ScrollTrigger
   - Three.js
   - Canvas final de partículas
========================================================= */

(() => {
    const COLORS = {
        gold: 0xd6a84f,
        goldSoft: 0xf4d88b,
        green: 0x0b6b3a,
        red: 0x9f1d2e,
        blue: 0x001e60,
        white: 0xf4ead2,
        dark: 0x080706
    };

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const $ = (selector, parent = document) => parent.querySelector(selector);
    const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

    const hasThree = () => typeof window.THREE !== "undefined";
    const hasGSAP = () => typeof window.gsap !== "undefined";

    const getCanvasSize = (canvas) => {
        const parent = canvas.parentElement;
        const parentRect = parent ? parent.getBoundingClientRect() : null;
        const rect = canvas.getBoundingClientRect();

        const width = Math.max(
            rect.width,
            parentRect?.width || 0,
            window.innerWidth,
            320
        );

        const height = Math.max(
            rect.height,
            parentRect?.height || 0,
            420
        );

        return { width, height };
    };

    const setupRenderer = (canvas) => {
        const THREE = window.THREE;
        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setClearColor(0x000000, 0);

        return renderer;
    };

    const resizeThreeScene = ({ canvas, renderer, camera }) => {
        const { width, height } = getCanvasSize(canvas);

        renderer.setSize(width, height, false);

        if (camera.isPerspectiveCamera) {
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }
    };

    /* =========================
       GSAP GENERAL
    ========================== */

    const initGSAPAnimations = () => {
        if (!hasGSAP() || prefersReducedMotion) return;

        const gsap = window.gsap;
        const ScrollTrigger = window.ScrollTrigger;

        if (ScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);
        }

        gsap.defaults({
            ease: "power3.out",
            duration: 0.9
        });

        gsap.from(".intro__content > *", {
            opacity: 0,
            y: 28,
            stagger: 0.16,
            delay: 0.25
        });

        gsap.from(".hero__text > *", {
            opacity: 0,
            y: 35,
            stagger: 0.14,
            delay: 0.3
        });

        gsap.from(".portrait-card", {
            opacity: 0,
            scale: 0.88,
            rotate: 3,
            delay: 0.55,
            duration: 1.1
        });

        const animatedElements = [
            ".section-heading",
            ".stat-card",
            ".family-card",
            ".grandchild-card",
            ".value-card",
            ".leadership-card",
            ".video-card",
            ".gallery-item",
            ".letter-card",
            ".mexico-card",
            ".library__text",
            ".library__visual",
            ".pumas__text",
            ".pumas__visual",
            ".finale__content"
        ];

        animatedElements.forEach((selector) => {
            $$(selector).forEach((element) => {
                gsap.from(element, {
                    opacity: 0,
                    y: 55,
                    duration: 0.95,
                    scrollTrigger: ScrollTrigger
                        ? {
                            trigger: element,
                            start: "top 86%",
                            toggleActions: "play none none reverse"
                        }
                        : undefined
                });
            });
        });

        $$(".book").forEach((book, index) => {
            gsap.to(book, {
                y: index % 2 === 0 ? -12 : 12,
                rotate: index % 2 === 0 ? 1.5 : -1.5,
                duration: 2.5 + index * 0.25,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });

        gsap.to(".portrait-card__badge", {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        gsap.to(".section-kicker", {
            backgroundPosition: "200% center",
            duration: 4,
            repeat: -1,
            ease: "none"
        });
    };

    /* =========================
       INTRO CANVAS - THREE
    ========================== */

    const initIntroCanvas = () => {
        const canvas = $("#intro-canvas");

        if (!canvas || !hasThree() || prefersReducedMotion) return;

        const THREE = window.THREE;
        const renderer = setupRenderer(canvas);
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(65, 1, 0.1, 100);
        camera.position.z = 7;

        const group = new THREE.Group();
        scene.add(group);

        const particleCount = window.innerWidth < 768 ? 450 : 900;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        const colorChoices = [
            new THREE.Color(COLORS.gold),
            new THREE.Color(COLORS.goldSoft),
            new THREE.Color(COLORS.green),
            new THREE.Color(COLORS.red)
        ];

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            positions[i3] = (Math.random() - 0.5) * 18;
            positions[i3 + 1] = (Math.random() - 0.5) * 10;
            positions[i3 + 2] = (Math.random() - 0.5) * 10;

            const color = colorChoices[Math.floor(Math.random() * colorChoices.length)];

            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.035,
            transparent: true,
            opacity: 0.9,
            vertexColors: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(geometry, material);
        group.add(particles);

        const ringGeometry = new THREE.TorusGeometry(2.2, 0.018, 16, 120);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: COLORS.gold,
            transparent: true,
            opacity: 0.55
        });

        const ringOne = new THREE.Mesh(ringGeometry, ringMaterial);
        const ringTwo = new THREE.Mesh(ringGeometry, ringMaterial.clone());

        ringTwo.rotation.x = Math.PI / 2.4;
        ringTwo.rotation.y = Math.PI / 3.2;
        ringTwo.material.opacity = 0.3;

        group.add(ringOne, ringTwo);

        const resize = () => resizeThreeScene({ canvas, renderer, camera });
        window.addEventListener("resize", resize);
        resize();

        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);

            if (canvas.closest("[hidden]")) return;

            const elapsed = clock.getElapsedTime();

            group.rotation.y = elapsed * 0.035;
            group.rotation.x = Math.sin(elapsed * 0.25) * 0.08;

            particles.rotation.y = elapsed * 0.018;

            ringOne.rotation.z = elapsed * 0.18;
            ringTwo.rotation.z = -elapsed * 0.14;

            renderer.render(scene, camera);
        };

        animate();
    };

    /* =========================
       HERO CANVAS - THREE
    ========================== */

    const initHeroCanvas = () => {
        const canvas = $("#hero-canvas");

        if (!canvas || !hasThree() || prefersReducedMotion) return;

        const THREE = window.THREE;
        const renderer = setupRenderer(canvas);
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
        camera.position.set(0, 0, 7);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
        const pointLight = new THREE.PointLight(COLORS.gold, 1.35, 16);
        pointLight.position.set(3, 4, 5);

        scene.add(ambientLight, pointLight);

        const group = new THREE.Group();
        scene.add(group);

        const createRing = (radius, tube, color, opacity, rotation) => {
            const geometry = new THREE.TorusGeometry(radius, tube, 24, 160);
            const material = new THREE.MeshStandardMaterial({
                color,
                roughness: 0.4,
                metalness: 0.65,
                transparent: true,
                opacity
            });

            const mesh = new THREE.Mesh(geometry, material);

            mesh.rotation.x = rotation.x;
            mesh.rotation.y = rotation.y;
            mesh.rotation.z = rotation.z;

            return mesh;
        };

        const ringOne = createRing(1.6, 0.035, COLORS.gold, 0.65, {
            x: Math.PI / 2.2,
            y: 0.15,
            z: 0
        });

        const ringTwo = createRing(2.15, 0.025, COLORS.green, 0.45, {
            x: Math.PI / 2.7,
            y: Math.PI / 4,
            z: 0.35
        });

        const ringThree = createRing(2.65, 0.02, COLORS.red, 0.38, {
            x: Math.PI / 2.1,
            y: -Math.PI / 3,
            z: -0.15
        });

        const centerGeometry = new THREE.IcosahedronGeometry(0.72, 2);
        const centerMaterial = new THREE.MeshStandardMaterial({
            color: COLORS.gold,
            roughness: 0.28,
            metalness: 0.85,
            transparent: true,
            opacity: 0.85
        });

        const center = new THREE.Mesh(centerGeometry, centerMaterial);

        group.add(ringOne, ringTwo, ringThree, center);

        const sparkGeometry = new THREE.BufferGeometry();
        const sparkCount = 220;
        const sparkPositions = new Float32Array(sparkCount * 3);

        for (let i = 0; i < sparkCount; i++) {
            const i3 = i * 3;
            const radius = 2.8 + Math.random() * 2.5;
            const angle = Math.random() * Math.PI * 2;

            sparkPositions[i3] = Math.cos(angle) * radius;
            sparkPositions[i3 + 1] = (Math.random() - 0.5) * 4.2;
            sparkPositions[i3 + 2] = Math.sin(angle) * radius;
        }

        sparkGeometry.setAttribute("position", new THREE.BufferAttribute(sparkPositions, 3));

        const sparkMaterial = new THREE.PointsMaterial({
            color: COLORS.goldSoft,
            size: 0.03,
            transparent: true,
            opacity: 0.75,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const sparks = new THREE.Points(sparkGeometry, sparkMaterial);
        group.add(sparks);

        const resize = () => resizeThreeScene({ canvas, renderer, camera });
        window.addEventListener("resize", resize);
        resize();

        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);

            const elapsed = clock.getElapsedTime();

            group.rotation.y = elapsed * 0.09;
            group.rotation.x = Math.sin(elapsed * 0.35) * 0.1;

            ringOne.rotation.z = elapsed * 0.32;
            ringTwo.rotation.z = -elapsed * 0.22;
            ringThree.rotation.z = elapsed * 0.16;

            center.rotation.x = elapsed * 0.25;
            center.rotation.y = elapsed * 0.38;

            sparks.rotation.y = elapsed * 0.035;

            renderer.render(scene, camera);
        };

        animate();
    };

    /* =========================
       CONSTELACIÓN NIETOS - THREE
    ========================== */

    const initGrandchildrenCanvas = () => {
        const canvas = $("#grandchildren-canvas");

        if (!canvas || !hasThree() || prefersReducedMotion) return;

        const THREE = window.THREE;
        const renderer = setupRenderer(canvas);
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
        camera.position.z = 8;

        const group = new THREE.Group();
        scene.add(group);

        const pointsCount = 70;
        const positions = [];
        const linePositions = [];

        for (let i = 0; i < pointsCount; i++) {
            const x = (Math.random() - 0.5) * 12;
            const y = (Math.random() - 0.5) * 7;
            const z = (Math.random() - 0.5) * 4;

            positions.push(x, y, z);

            if (i > 0 && i % 3 !== 0) {
                const previousIndex = (i - 1) * 3;

                linePositions.push(
                    positions[previousIndex],
                    positions[previousIndex + 1],
                    positions[previousIndex + 2],
                    x,
                    y,
                    z
                );
            }
        }

        const starGeometry = new THREE.BufferGeometry();
        starGeometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(positions, 3)
        );

        const starMaterial = new THREE.PointsMaterial({
            color: COLORS.goldSoft,
            size: 0.07,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const stars = new THREE.Points(starGeometry, starMaterial);

        const lineGeometry = new THREE.BufferGeometry();
        lineGeometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(linePositions, 3)
        );

        const lineMaterial = new THREE.LineBasicMaterial({
            color: COLORS.gold,
            transparent: true,
            opacity: 0.18
        });

        const lines = new THREE.LineSegments(lineGeometry, lineMaterial);

        group.add(lines, stars);

        const resize = () => resizeThreeScene({ canvas, renderer, camera });
        window.addEventListener("resize", resize);
        resize();

        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);

            const elapsed = clock.getElapsedTime();

            group.rotation.y = Math.sin(elapsed * 0.15) * 0.18;
            group.rotation.x = Math.cos(elapsed * 0.11) * 0.08;

            starMaterial.opacity = 0.68 + Math.sin(elapsed * 1.8) * 0.22;

            renderer.render(scene, camera);
        };

        animate();
    };

    /* =========================
       BALÓN / PUMAS - THREE
    ========================== */

    const initFootballCanvas = () => {
        const canvas = $("#football-canvas");

        if (!canvas || !hasThree() || prefersReducedMotion) return;

        const THREE = window.THREE;
        const renderer = setupRenderer(canvas);
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
        camera.position.z = 5.8;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        const keyLight = new THREE.PointLight(COLORS.gold, 1.2, 16);

        keyLight.position.set(3, 4, 5);

        scene.add(ambientLight, keyLight);

        const group = new THREE.Group();
        scene.add(group);

        const ballGeometry = new THREE.SphereGeometry(1.35, 48, 48);
        const ballMaterial = new THREE.MeshStandardMaterial({
            color: COLORS.blue,
            roughness: 0.34,
            metalness: 0.25
        });

        const ball = new THREE.Mesh(ballGeometry, ballMaterial);

        const wireGeometry = new THREE.SphereGeometry(1.365, 24, 24);
        const wireMaterial = new THREE.MeshBasicMaterial({
            color: COLORS.gold,
            wireframe: true,
            transparent: true,
            opacity: 0.45
        });

        const wire = new THREE.Mesh(wireGeometry, wireMaterial);

        const ringMaterial = new THREE.MeshBasicMaterial({
            color: COLORS.goldSoft,
            transparent: true,
            opacity: 0.65
        });

        const ringOne = new THREE.Mesh(
            new THREE.TorusGeometry(1.47, 0.015, 12, 100),
            ringMaterial
        );

        const ringTwo = new THREE.Mesh(
            new THREE.TorusGeometry(1.47, 0.015, 12, 100),
            ringMaterial.clone()
        );

        ringOne.rotation.x = Math.PI / 2;
        ringTwo.rotation.y = Math.PI / 2;

        group.add(ball, wire, ringOne, ringTwo);

        const resize = () => resizeThreeScene({ canvas, renderer, camera });
        window.addEventListener("resize", resize);
        resize();

        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);

            const elapsed = clock.getElapsedTime();

            group.rotation.y = elapsed * 0.42;
            group.rotation.x = Math.sin(elapsed * 0.7) * 0.18;

            wire.rotation.y = -elapsed * 0.22;
            ringOne.rotation.z = elapsed * 0.35;
            ringTwo.rotation.x = elapsed * 0.28;

            renderer.render(scene, camera);
        };

        animate();
    };

    /* =========================
       FINAL PARTICLES - CANVAS 2D
    ========================== */

    const initFinalCanvas = () => {
        const canvas = $("#final-canvas");

        if (!canvas || prefersReducedMotion) return;

        const ctx = canvas.getContext("2d", { alpha: true });

        if (!ctx) return;

        let width = 0;
        let height = 0;
        let particles = [];
        let animationFrame = null;

        const particleCount = window.innerWidth < 768 ? 260 : 520;

        const resize = () => {
            const parent = canvas.parentElement;
            const rect = parent ? parent.getBoundingClientRect() : canvas.getBoundingClientRect();

            width = Math.max(rect.width, window.innerWidth, 320);
            height = Math.max(rect.height, 420);

            canvas.width = Math.floor(width * Math.min(window.devicePixelRatio || 1, 2));
            canvas.height = Math.floor(height * Math.min(window.devicePixelRatio || 1, 2));
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(Math.min(window.devicePixelRatio || 1, 2), Math.min(window.devicePixelRatio || 1, 2));

            createParticles();
        };

        const getTextPoints = () => {
            const offscreen = document.createElement("canvas");
            const offCtx = offscreen.getContext("2d");

            offscreen.width = width;
            offscreen.height = height;

            const fontSize = Math.min(width * 0.28, 190);

            offCtx.clearRect(0, 0, width, height);
            offCtx.fillStyle = "#ffffff";
            offCtx.textAlign = "center";
            offCtx.textBaseline = "middle";
            offCtx.font = `900 ${fontSize}px Georgia, serif`;
            offCtx.fillText("77", width / 2, height / 2);

            const imageData = offCtx.getImageData(0, 0, width, height).data;
            const points = [];
            const gap = window.innerWidth < 768 ? 9 : 7;

            for (let y = 0; y < height; y += gap) {
                for (let x = 0; x < width; x += gap) {
                    const index = (Math.floor(y) * width + Math.floor(x)) * 4;
                    const alpha = imageData[index + 3];

                    if (alpha > 128) {
                        points.push({ x, y });
                    }
                }
            }

            return points;
        };

        const createParticles = () => {
            const points = getTextPoints();

            particles = Array.from({ length: particleCount }, (_, index) => {
                const target = points[index % points.length] || {
                    x: width / 2,
                    y: height / 2
                };

                return {
                    x: Math.random() * width,
                    y: Math.random() * height,
                    tx: target.x + (Math.random() - 0.5) * 5,
                    ty: target.y + (Math.random() - 0.5) * 5,
                    vx: 0,
                    vy: 0,
                    size: Math.random() * 2.4 + 1.2,
                    alpha: Math.random() * 0.55 + 0.35
                };
            });
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            ctx.fillStyle = "rgba(8, 7, 6, 0.12)";
            ctx.fillRect(0, 0, width, height);

            particles.forEach((particle) => {
                const dx = particle.tx - particle.x;
                const dy = particle.ty - particle.y;

                particle.vx += dx * 0.006;
                particle.vy += dy * 0.006;

                particle.vx *= 0.86;
                particle.vy *= 0.86;

                particle.x += particle.vx;
                particle.y += particle.vy;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(214, 168, 79, ${particle.alpha})`;
                ctx.fill();
            });

            animationFrame = requestAnimationFrame(draw);
        };

        const startWhenVisible = () => {
            if (!("IntersectionObserver" in window)) {
                draw();
                return;
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !animationFrame) {
                        draw();
                    }

                    if (!entry.isIntersecting && animationFrame) {
                        cancelAnimationFrame(animationFrame);
                        animationFrame = null;
                    }
                });
            }, {
                threshold: 0.15
            });

            observer.observe(canvas);
        };

        window.addEventListener("resize", resize);
        resize();
        startWhenVisible();
    };

    /* =========================
       PARALLAX SUAVE
    ========================== */

    const initPointerParallax = () => {
        if (prefersReducedMotion || !hasGSAP()) return;

        const gsap = window.gsap;
        const hero = $("#hero");
        const portrait = $(".portrait-card");
        const pumasVisual = $(".pumas__visual");

        if (!hero) return;

        hero.addEventListener("pointermove", (event) => {
            const rect = hero.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            if (portrait) {
                gsap.to(portrait, {
                    x: x * 18,
                    y: y * 18,
                    rotateY: x * 6,
                    rotateX: -y * 6,
                    duration: 0.65,
                    ease: "power2.out"
                });
            }

            if (pumasVisual) {
                gsap.to(pumasVisual, {
                    x: x * -10,
                    y: y * -10,
                    duration: 0.75,
                    ease: "power2.out"
                });
            }
        });

        hero.addEventListener("pointerleave", () => {
            if (portrait) {
                gsap.to(portrait, {
                    x: 0,
                    y: 0,
                    rotateY: 0,
                    rotateX: 0,
                    duration: 0.8,
                    ease: "power2.out"
                });
            }
        });
    };

    /* =========================
       MAGNET BUTTONS
    ========================== */

    const initMagneticButtons = () => {
        if (prefersReducedMotion || !hasGSAP()) return;

        const gsap = window.gsap;
        const buttons = $$(".btn, .family-card__button, .filter-btn");

        buttons.forEach((button) => {
            button.addEventListener("pointermove", (event) => {
                const rect = button.getBoundingClientRect();
                const x = event.clientX - rect.left - rect.width / 2;
                const y = event.clientY - rect.top - rect.height / 2;

                gsap.to(button, {
                    x: x * 0.12,
                    y: y * 0.18,
                    duration: 0.35,
                    ease: "power2.out"
                });
            });

            button.addEventListener("pointerleave", () => {
                gsap.to(button, {
                    x: 0,
                    y: 0,
                    duration: 0.45,
                    ease: "elastic.out(1, 0.45)"
                });
            });
        });
    };

    /* =========================
       INIT
    ========================== */

    const init = () => {
        initGSAPAnimations();

        initIntroCanvas();
        initHeroCanvas();
        initGrandchildrenCanvas();
        initFootballCanvas();
        initFinalCanvas();

        initPointerParallax();
        initMagneticButtons();

        document.documentElement.classList.add("animations-ready");
    };

    document.addEventListener("DOMContentLoaded", init);
})();