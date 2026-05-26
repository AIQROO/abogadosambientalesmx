/**
 * ABOGADOS AMBIENTALES MX
 * Interactive logic + WhatsApp consultation builder + i18n.
 * Plain ES2017 — no build step required.
 */

(function () {
    'use strict';

    const WHATSAPP_NUMBER = '525545697053';
    const lang = document.body.getAttribute('data-lang') === 'es' ? 'es' : 'en';

    const i18n = {
        en: {
            phoneInvalid: 'Please enter a valid phone number (at least 10 digits).',
            sending: 'Opening WhatsApp…',
            success: 'WhatsApp opened in a new tab. A partner will reply within 12 business hours.',
            error: 'Could not open WhatsApp. Please tap the WhatsApp button manually.',
            waMsgIntro: 'Hello, I would like to schedule a strategic consultation.',
            waSector: 'Sector',
            waArea: 'Area',
            waName: 'Name',
            waCompany: 'Company',
            waDetails: 'Details',
            waNotProvided: 'Not provided',
            privacyTitle: 'PRIVACY NOTICE',
            termsTitle: 'LEGAL TERMS & CONDITIONS',
        },
        es: {
            phoneInvalid: 'Por favor, ingrese un teléfono válido (al menos 10 dígitos).',
            sending: 'Abriendo WhatsApp…',
            success: 'WhatsApp se abrió en otra pestaña. Un socio responderá en 12 horas hábiles.',
            error: 'No se pudo abrir WhatsApp. Por favor, toque el botón de WhatsApp manualmente.',
            waMsgIntro: 'Hola, me gustaría agendar una consulta estratégica.',
            waSector: 'Sector',
            waArea: 'Área',
            waName: 'Nombre',
            waCompany: 'Empresa',
            waDetails: 'Detalles',
            waNotProvided: 'No proporcionado',
            privacyTitle: 'AVISO DE PRIVACIDAD',
            termsTitle: 'TÉRMINOS Y CONDICIONES LEGALES',
        }
    };
    const t = i18n[lang];

    document.addEventListener('DOMContentLoaded', () => {

        const body = document.body;
        const mainHeader = document.querySelector('.main-header');
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const navMenu = document.getElementById('navMenu');
        const backToTopBtn = document.getElementById('backToTopBtn');

        // Auto-update copyright year
        const yearEl = document.getElementById('footerYear');
        if (yearEl) yearEl.textContent = new Date().getFullYear();

        // Hero fade-in
        const heroElements = document.querySelectorAll('.hero-content .fade-in-element');
        setTimeout(() => {
            heroElements.forEach(el => el.classList.add('animated'));
        }, 150);

        /* ------------------------------------------------------------------
           Scroll behaviour: header shrink + back-to-top + active nav
           ------------------------------------------------------------------ */
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');

        function highlightActiveNavLink() {
            const scrollY = window.pageYOffset;
            sections.forEach(current => {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 120;
                const sectionId = current.getAttribute('id');
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollPos = window.scrollY;
                    if (mainHeader) mainHeader.classList.toggle('scrolled', scrollPos > 50);
                    if (backToTopBtn) backToTopBtn.classList.toggle('show', scrollPos > 500);
                    highlightActiveNavLink();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        /* ------------------------------------------------------------------
           Mobile navigation drawer
           ------------------------------------------------------------------ */
        if (hamburgerBtn && navMenu) {
            hamburgerBtn.addEventListener('click', () => {
                const isOpen = navMenu.classList.toggle('active');
                hamburgerBtn.classList.toggle('active', isOpen);
                hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
                body.style.overflow = isOpen ? 'hidden' : '';
            });
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburgerBtn.classList.remove('active');
                    navMenu.classList.remove('active');
                    hamburgerBtn.setAttribute('aria-expanded', 'false');
                    body.style.overflow = '';
                });
            });
        }

        /* ------------------------------------------------------------------
           Scroll reveal animations
           ------------------------------------------------------------------ */
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));

        /* ------------------------------------------------------------------
           Multi-step modal: collects context, then opens WhatsApp
           ------------------------------------------------------------------ */
        const strategicModal = document.getElementById('strategicModal');
        const openModalBtns = document.querySelectorAll('.open-modal-btn');
        const closeModalBtns = strategicModal ? strategicModal.querySelectorAll('.modal-close, .close-modal-btn-direct') : [];
        const multiStepForm = document.getElementById('multiStepForm');
        const steps = strategicModal ? strategicModal.querySelectorAll('.modal-step-pane') : [];
        const stepIndicators = strategicModal ? strategicModal.querySelectorAll('.step-dot') : [];
        const stepLines = strategicModal ? strategicModal.querySelectorAll('.step-line') : [];
        const whatsappLaunchBtn = document.getElementById('whatsappLaunchBtn');

        let currentStep = 1;
        let lastFocusedBeforeModal = null;

        function openStrategicModal() {
            if (!strategicModal) return;
            resetModalFlow();
            lastFocusedBeforeModal = document.activeElement;
            strategicModal.classList.add('open');
            strategicModal.setAttribute('aria-hidden', 'false');
            body.style.overflow = 'hidden';
            const firstFocusable = strategicModal.querySelector('input, button');
            if (firstFocusable) setTimeout(() => firstFocusable.focus(), 50);
        }

        function closeStrategicModal() {
            if (!strategicModal) return;
            strategicModal.classList.remove('open');
            strategicModal.setAttribute('aria-hidden', 'true');
            body.style.overflow = '';
            if (lastFocusedBeforeModal && lastFocusedBeforeModal.focus) lastFocusedBeforeModal.focus();
        }

        openModalBtns.forEach(btn => btn.addEventListener('click', openStrategicModal));
        closeModalBtns.forEach(btn => btn.addEventListener('click', closeStrategicModal));

        if (strategicModal) {
            strategicModal.addEventListener('click', (e) => {
                if (e.target === strategicModal) closeStrategicModal();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && strategicModal && strategicModal.classList.contains('open')) {
                closeStrategicModal();
            }
        });

        // Step radios
        const step1Radios = document.querySelectorAll('input[name="modal_sector"]');
        const step2Radios = document.querySelectorAll('input[name="modal_area"]');

        step1Radios.forEach(radio => radio.addEventListener('change', () => {
            const nextBtn = document.querySelector('.modal-step-pane[data-step="1"] .btn-next-step');
            if (nextBtn) nextBtn.disabled = false;
        }));

        step2Radios.forEach(radio => radio.addEventListener('change', () => {
            const nextBtn = document.querySelector('.modal-step-pane[data-step="2"] .btn-next-step');
            if (nextBtn) nextBtn.disabled = false;
        }));

        document.querySelectorAll('#strategicModal .btn-next-step').forEach(btn => {
            btn.addEventListener('click', () => {
                if (currentStep < 3) goToStep(currentStep + 1);
            });
        });

        document.querySelectorAll('#strategicModal .btn-prev-step').forEach(btn => {
            btn.addEventListener('click', () => {
                if (currentStep > 1) goToStep(currentStep - 1);
            });
        });

        if (multiStepForm) {
            multiStepForm.addEventListener('submit', (e) => {
                e.preventDefault();
                handleWhatsAppLaunch();
            });
        }

        function handleWhatsAppLaunch() {
            const sector = (document.querySelector('input[name="modal_sector"]:checked') || {}).value || '—';
            const area = (document.querySelector('input[name="modal_area"]:checked') || {}).value || '—';
            const name = (document.getElementById('modalName') || {}).value || t.waNotProvided;
            const company = (document.getElementById('modalCompany') || {}).value || '';
            const brief = (document.getElementById('modalBrief') || {}).value || '';

            // Build WhatsApp message
            const lines = [
                t.waMsgIntro,
                '',
                `*${t.waSector}:* ${sector}`,
                `*${t.waArea}:* ${area}`,
                `*${t.waName}:* ${name}`,
            ];
            if (company) lines.push(`*${t.waCompany}:* ${company}`);
            if (brief) lines.push(`*${t.waDetails}:* ${brief}`);

            const msg = encodeURIComponent(lines.join('\n'));
            const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;

            // Update summary card
            const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
            setText('summarySector', sector);
            setText('summaryArea', area);
            setText('summaryContact', company ? `${name} — ${company}` : name);

            // Update launch button href
            if (whatsappLaunchBtn) whatsappLaunchBtn.setAttribute('href', waUrl);

            // Open in new tab
            try {
                window.open(waUrl, '_blank', 'noopener,noreferrer');
            } catch (_) {
                // Will fall back to the visible CTA in step 4
            }

            goToStep(4);
        }

        function goToStep(stepIndex) {
            steps.forEach(pane => pane.classList.remove('active'));
            const targetPane = document.querySelector(`.modal-step-pane[data-step="${stepIndex}"]`);
            if (targetPane) targetPane.classList.add('active');
            currentStep = stepIndex;
            updateStepIndicators(stepIndex);
        }

        function updateStepIndicators(activeIndex) {
            stepIndicators.forEach((dot, idx) => {
                const dotStep = idx + 1;
                dot.className = 'step-dot';
                if (dotStep === activeIndex) dot.classList.add('active');
                else if (dotStep < activeIndex) dot.classList.add('completed');
            });
            stepLines.forEach((line, idx) => {
                const lineIndex = idx + 1;
                line.classList.remove('completed');
                if (lineIndex < activeIndex) line.classList.add('completed');
            });
        }

        function resetModalFlow() {
            if (multiStepForm) multiStepForm.reset();
            currentStep = 1;
            const nextBtn1 = document.querySelector('.modal-step-pane[data-step="1"] .btn-next-step');
            const nextBtn2 = document.querySelector('.modal-step-pane[data-step="2"] .btn-next-step');
            if (nextBtn1) nextBtn1.disabled = true;
            if (nextBtn2) nextBtn2.disabled = true;
            goToStep(1);
        }

        /* ------------------------------------------------------------------
           Legal modal (Privacy / Terms)
           ------------------------------------------------------------------ */
        const legalModal = document.getElementById('legalModal');
        const legalContent = document.getElementById('legalContent');
        const openPrivacyBtns = document.querySelectorAll('.open-privacy-btn');
        const openTermsBtns = document.querySelectorAll('.open-terms-btn');
        const closeLegalBtns = document.querySelectorAll('#legalCloseBtn, #legalCloseBtnAction');

        const legalDocs = {
            en: {
                privacy: `
                    <h2>${t.privacyTitle}</h2>
                    <p><strong>Abogados Ambientales MX</strong>, in compliance with applicable Mexican federal data-protection law (LFPDPPP), recognizes the strategic importance of the confidentiality of our clients' and prospective clients' information.</p>

                    <h3>1. Purpose of Data Processing</h3>
                    <p>Data collected through our contact channels — including name, email, phone and technical project details — is treated under strict attorney–client privilege. Primary purposes:</p>
                    <ul>
                        <li>Evaluating the preliminary regulatory viability of high-investment projects.</li>
                        <li>Anticipating contingencies in federal, state or municipal regulatory proceedings.</li>
                        <li>Establishing a confidential channel to schedule strategic legal consultations.</li>
                    </ul>

                    <h3>2. Confidentiality &amp; Security</h3>
                    <p>Our infrastructure relies on transport-layer encryption and strict internal protocols. Only partners and case strategists assigned to your matter will access the shared information.</p>

                    <h3>3. ARCO Rights</h3>
                    <p>You may exercise your rights of Access, Rectification, Cancellation or Opposition by sending a direct request to: <strong>contacto@abogadosambientales.mx</strong>.</p>

                    <h3>4. International Transfers</h3>
                    <p>Data is processed within Mexico. We do not transfer personal data to third parties without your consent, except where required by competent authorities under applicable law.</p>
                `,
                terms: `
                    <h2>${t.termsTitle}</h2>
                    <p>Welcome to the corporate website of <strong>Abogados Ambientales MX</strong>. Use of this site is governed by the following general conditions.</p>

                    <h3>1. No Attorney–Client Relationship</h3>
                    <p>Submitting information through this platform or our intake builder does not establish a formal attorney–client relationship and does not represent binding legal advice. It is a confidential preventive strategic-contact channel.</p>

                    <h3>2. Intellectual Property</h3>
                    <p>All legal texts, logos, corporate graphic design and content architecture displayed on this site are the exclusive property of Abogados Ambientales MX, protected under applicable Mexican and international intellectual-property law.</p>

                    <h3>3. Limitation of Liability</h3>
                    <p>The content displayed on this site is informational and represents corporate positioning. Each project is analyzed individually — operationally, territorially and institutionally — through a formal legal-services engagement.</p>

                    <h3>4. Jurisdiction</h3>
                    <p>Any controversy arising from the use of this site shall be governed by Mexican federal law, with venue in the competent courts of Mexico City.</p>
                `
            },
            es: {
                privacy: `
                    <h2>${t.privacyTitle}</h2>
                    <p><strong>Abogados Ambientales MX</strong>, en cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, reconoce la importancia estratégica de la confidencialidad de la información de nuestros clientes y prospectos.</p>

                    <h3>1. Finalidad del Tratamiento de Datos</h3>
                    <p>Los datos recabados en nuestros canales de contacto, incluyendo nombre, correo electrónico, teléfono y detalles técnicos de proyectos inmobiliarios, hoteleros o industriales, son tratados bajo absoluto secreto profesional. Tienen como fines primordiales:</p>
                    <ul>
                        <li>Evaluar la viabilidad regulatoria inicial de sus proyectos de alta inversión.</li>
                        <li>Anticipar contingencias en procedimientos regulatorios federales, estatales o municipales.</li>
                        <li>Establecer una vía confidencial para agendar consultas legales estratégicas.</li>
                    </ul>

                    <h3>2. Confidencialidad y Seguridad</h3>
                    <p>Nuestra infraestructura cuenta con sistemas de cifrado y estrictos protocolos internos. Únicamente los socios y peritos encargados de la planeación estratégica de su caso tendrán acceso a la información compartida.</p>

                    <h3>3. Derechos ARCO</h3>
                    <p>Usted puede ejercer sus derechos de Acceso, Rectificación, Cancelación u Oposición enviando una solicitud directa a: <strong>contacto@abogadosambientales.mx</strong>.</p>

                    <h3>4. Transferencias</h3>
                    <p>Los datos se procesan en territorio mexicano. No se transfieren datos personales a terceros sin su consentimiento, salvo requerimiento de autoridad competente conforme a la legislación aplicable.</p>
                `,
                terms: `
                    <h2>${t.termsTitle}</h2>
                    <p>Bienvenido al sitio web corporativo de <strong>Abogados Ambientales MX</strong>. El uso de este sitio se rige por las siguientes condiciones generales.</p>

                    <h3>1. Inexistencia de Relación Abogado-Cliente</h3>
                    <p>La transmisión de información a través de esta plataforma o de nuestro agendador estratégico no constituye formalmente una relación contractual de abogado-cliente ni representa una asesoría vinculante definitiva. Representa un canal preventivo de contacto estratégico confidencial.</p>

                    <h3>2. Propiedad Intelectual</h3>
                    <p>Todos los textos jurídicos, logotipos, diseño gráfico corporativo y arquitectura de contenido expuestos en esta web son propiedad exclusiva de Abogados Ambientales MX y se encuentran protegidos bajo la legislación mexicana e internacional de propiedad intelectual.</p>

                    <h3>3. Limitación de Responsabilidad</h3>
                    <p>Los contenidos e informaciones expuestas en este sitio tienen una finalidad orientativa y de posicionamiento corporativo. Cada proyecto se analiza territorial, operativa e institucionalmente de manera individual mediante un contrato formal de servicios jurídicos.</p>

                    <h3>4. Jurisdicción</h3>
                    <p>Cualquier controversia derivada del uso de este sitio se rige por la legislación federal mexicana, con competencia en los tribunales correspondientes de la Ciudad de México.</p>
                `
            }
        };

        function openLegalModal(docType) {
            if (!legalModal || !legalContent) return;
            const docs = legalDocs[lang] || legalDocs.en;
            if (!docs[docType]) return;
            legalContent.innerHTML = docs[docType];
            legalModal.classList.add('open');
            legalModal.setAttribute('aria-hidden', 'false');
            body.style.overflow = 'hidden';
        }

        function closeLegalModal() {
            if (!legalModal) return;
            legalModal.classList.remove('open');
            legalModal.setAttribute('aria-hidden', 'true');
            if (!strategicModal || !strategicModal.classList.contains('open')) {
                body.style.overflow = '';
            }
        }

        openPrivacyBtns.forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); openLegalModal('privacy'); }));
        openTermsBtns.forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); openLegalModal('terms'); }));
        closeLegalBtns.forEach(btn => btn.addEventListener('click', closeLegalModal));

        if (legalModal) {
            legalModal.addEventListener('click', (e) => {
                if (e.target === legalModal) closeLegalModal();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && legalModal && legalModal.classList.contains('open')) {
                closeLegalModal();
            }
        });
    });
})();
