class KarlaApp {
  constructor() {
    this.state = {
      isBookingOpen: false,
      preselectedPlan: null,
      preselectedModality: 'online',
      previewEbook: null,
      showBrandBanner: false,
      mobileMenuOpen: false,
      activeBrandTab: 'palette',
      activeModality: 'online',
      whatsappOpen: false,
      faqIndexOpen: null,
    };

    this.init();
  }

  get currentPage() {
    const hash = window.location.hash;
    if (hash === '#sobre-mi') return 'sobre-mi';
    if (hash === '#consultas') return 'consultas';
    if (hash === '#ebooks') return 'ebooks';
    return 'home';
  }

  init() {
    this.render();
    this.setupScrollListener();
    window.addEventListener('hashchange', () => {
      this.state.mobileMenuOpen = false;
      this.render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  setupScrollListener() {
    window.addEventListener('scroll', () => {
      const navbar = document.getElementById('navbar-container');
      if (!navbar) return;
      if (window.scrollY > 20) {
        navbar.classList.add('bg-[#FAF9F6]/90', 'backdrop-blur-md', 'shadow-sm', 'py-3');
        navbar.classList.remove('bg-transparent', 'py-5');
      } else {
        navbar.classList.add('bg-transparent', 'py-5');
        navbar.classList.remove('bg-[#FAF9F6]/90', 'backdrop-blur-md', 'shadow-sm', 'py-3');
      }
    });
  }

  // ─── Handlers ────────────────────────────────────────────────────────────

  handleOpenBooking(planId = null, modality = 'online') {
    this.state.preselectedPlan = planId ? SERVICE_PLANS.find(p => p.id === planId) || null : null;
    this.state.preselectedModality = modality;
    this.state.isBookingOpen = true;
    this.state.bookingForm = {
      serviceId: planId || SERVICE_PLANS[0].id,
      modality,
      date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      timeSlot: '11:00 AM',
    };
    this.render();
  }

  handleWhatsAppSubmit(e) {
    e.preventDefault();
    const serviceId   = document.getElementById('booking-service').value;
    const modality    = this.state.preselectedModality;
    const date        = document.getElementById('booking-date').value;
    const timeSlot    = document.getElementById('booking-time').value;
    const fullName    = document.getElementById('booking-name').value;
    const email       = document.getElementById('booking-email').value;
    const phone       = document.getElementById('booking-phone').value;
    const mainGoal    = document.getElementById('booking-goal').value;
    const notes       = document.getElementById('booking-notes').value;
    const selectedPlan = SERVICE_PLANS.find(p => p.id === serviceId) || SERVICE_PLANS[0];

    const text = encodeURIComponent(
      `Hola Karla Godoy!\n` +
      `Quiero agendar una cita con los siguientes datos:\n\n` +
      `👤 Nombre: ${fullName || 'Paciente'}\n` +
      `📧 Email: ${email || 'No proporcionado'}\n` +
      `📋 Plan: ${selectedPlan.title}\n` +
      `💻 Modalidad: ${modality.toUpperCase()}\n` +
      `📅 Fecha: ${date} | Horario: ${timeSlot}\n` +
      `📱 Teléfono: ${phone}\n` +
      `🎯 Objetivo: ${mainGoal}\n` +
      `${notes ? `📝 Notas: ${notes}\n` : ''}` +
      `Quedo a la espera de la confirmación de datos de pago. Gracias!`
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    this.state.isBookingOpen = false;
    this.render();
  }

  handleBuyEbookWhatsApp(ebookId) {
    const ebook = EBOOKS_DATA.find(eb => eb.id === ebookId) || EBOOKS_DATA[0];
    const text = encodeURIComponent(
      `Hola Karla Godoy! Me interesa adquirir tu Ebook interactivo:\n\n` +
      `📚 Título: ${ebook.title}\n` +
      `🏷️ Subtítulo: ${ebook.subtitle}\n` +
      `💰 Precio: $${ebook.price} ${ebook.currency}\n\n` +
      `Por favor compárteme los detalles de transferencia o link de pago. ¡Gracias!`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  }

  handleToggleFaq(idx) {
    this.state.faqIndexOpen = this.state.faqIndexOpen === idx ? null : idx;
    this.render();
  }

  // ─── Render principal ─────────────────────────────────────────────────────

  render() {
    const appDiv = document.getElementById('app-root');
    if (!appDiv) return;

    const pages = {
      'home':      () => this.renderHomePage(),
      'sobre-mi':  () => this.renderSobreMiPage(),
      'consultas': () => this.renderConsultasPage(),
      'ebooks':    () => this.renderEbooksPage(),
    };

    appDiv.innerHTML = `
      ${this.renderNavbar()}
      ${this.state.showBrandBanner ? this.renderBrandIdentityBanner() : ''}
      ${(pages[this.currentPage] || pages['home'])()}
      ${this.renderFooter()}
      ${this.renderWhatsAppWidget()}
      ${this.state.isBookingOpen ? this.renderBookingModal() : ''}
      ${this.state.previewEbook ? this.renderEbookModal() : ''}
    `;

    lucide.createIcons();
    this.attachDomEvents();
  }

  // ─── Páginas ──────────────────────────────────────────────────────────────

  renderHomePage() {
    return `
      ${this.renderHero()}
      ${this.renderAchievementsSection()}
      ${this.renderConsultaMethodSection()}
      ${this.renderTestimonialsSection()}
      ${this.renderServicesSection()}
      ${this.renderFaqSection()}
    `;
  }

  renderSobreMiPage() {
    return `${this.renderAboutSection()}`;
  }

  renderConsultasPage() {
    return `${this.renderServicesSection()}`;
  }

  renderEbooksPage() {
    return `${this.renderEbooksSection()}`;
  }

  // ─── Secciones compartidas ────────────────────────────────────────────────

  renderNavbar() {
    const isHome      = this.currentPage === 'home';
    const isSobreMi   = this.currentPage === 'sobre-mi';
    const isConsultas = this.currentPage === 'consultas';
    const isEbooks    = this.currentPage === 'ebooks';

    const linkClass = (active) =>
      `font-sans text-[11px] uppercase tracking-widest font-bold transition-colors ${active ? 'text-[#4f0911]' : 'text-[#713132] hover:text-[#4f0911]'}`;

    return `
      <header id="navbar-container" class="fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-transparent py-5">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between">
            <a href="./index.html" class="flex items-center">
              <img src="./assets/logo.svg" alt="Logo Karla Godoy" class="h-16 w-auto object-contain" />
            </a>

            <nav class="hidden md:flex items-center gap-8">
              <a href="#"           class="${linkClass(isHome)}">Inicio</a>
              <a href="#sobre-mi"   class="${linkClass(isSobreMi)}">Sobre Karla</a>
              <a href="#consultas"  class="${linkClass(isConsultas)}">Consultas</a>
              <a href="#ebooks"     class="${linkClass(isEbooks)}">E-Books</a>
            </nav>

            <div class="hidden md:flex items-center gap-4">
              <button id="nav-booking-btn" class="px-6 py-3 rounded-full bg-[#4f0911] hover:bg-[#713132] text-[#FAF9F6] font-sans text-xs uppercase tracking-widest font-bold transition-all shadow-md">
                Agendar Cita
              </button>
            </div>

            <button id="mobile-menu-toggle" class="md:hidden p-2 rounded-xl bg-white/40 border border-[#d0bdac]/40 text-[#4f0911]">
              <i data-lucide="${this.state.mobileMenuOpen ? 'x' : 'menu'}" class="w-6 h-6"></i>
            </button>
          </div>
        </div>

        <div class="${this.state.mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-[#FAF9F6] border-b border-[#d0bdac]/40 p-4 space-y-3 shadow-lg absolute w-full left-0 top-full">
          <a href="#"          class="mobile-nav-link block px-4 py-2 rounded-xl text-sm font-sans font-medium text-[#2c2421] hover:bg-[#916066]/10 hover:text-[#4f0911]">Inicio</a>
          <a href="#sobre-mi"  class="mobile-nav-link block px-4 py-2 rounded-xl text-sm font-sans font-medium text-[#2c2421] hover:bg-[#916066]/10 hover:text-[#4f0911]">Sobre Karla</a>
          <a href="#consultas" class="mobile-nav-link block px-4 py-2 rounded-xl text-sm font-sans font-medium text-[#2c2421] hover:bg-[#916066]/10 hover:text-[#4f0911]">Consultas</a>
          <a href="#ebooks"    class="mobile-nav-link block px-4 py-2 rounded-xl text-sm font-sans font-medium text-[#2c2421] hover:bg-[#916066]/10 hover:text-[#4f0911]">E-Books</a>
          <div class="pt-2 border-t border-[#d0bdac]/30">
            <button id="mobile-booking-btn" class="w-full text-center py-3 bg-[#4f0911] text-[#FAF9F6] text-xs font-bold uppercase tracking-widest rounded-full shadow-md">
              Agendar Cita
            </button>
          </div>
        </div>
      </header>
    `;
  }

  renderBrandIdentityBanner() {
    const isPalette = this.state.activeBrandTab === 'palette';
    return `
      <section class="py-6 bg-[#2D2A26] border-y border-[#d0bdac]/20 text-[#FAF9F6] transition-all">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="space-y-1.5 text-center md:text-left max-w-lg">
              <div class="flex items-center justify-center md:justify-start gap-2 text-[#C5A059] font-sans text-[10px] tracking-widest uppercase font-bold">
                <i data-lucide="info" class="w-3.5 h-3.5"></i> Concepto de Marca & Manual de Identidad
              </div>
              <h2 class="font-serif text-xl font-bold tracking-tight text-white">Diseño Premium para Nutrición, Bienestar & Estética</h2>
              <p class="font-sans text-xs text-white/75 leading-relaxed font-light">
                Esta propuesta de interfaz aplica conceptos avanzados de psicología de color para el sector de salud & belleza.
              </p>
            </div>
            <div class="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0 justify-end">
              <div class="bg-white/5 border border-white/10 p-1 rounded-full flex">
                <button id="tab-btn-palette" class="px-4 py-1.5 text-[10px] uppercase font-sans font-bold tracking-widest rounded-full transition-all ${isPalette ? 'bg-[#4f0911] text-white' : 'text-white/60 hover:text-white'}">
                  Paleta de Colores
                </button>
                <button id="tab-btn-concept" class="px-4 py-1.5 text-[10px] uppercase font-sans font-bold tracking-widest rounded-full transition-all ${!isPalette ? 'bg-[#4f0911] text-white' : 'text-white/60 hover:text-white'}">
                  Misión Tipográfica
                </button>
              </div>
              <button id="close-brand-banner" class="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors" title="Ocultar propuesta">
                <i data-lucide="x" class="w-4 h-4"></i>
              </button>
            </div>
          </div>

          <div class="mt-6 pt-6 border-t border-white/10 text-left">
            ${isPalette ? `
              <div class="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
                ${BRAND_COLORS.map(color => `
                  <div class="bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col gap-2.5">
                    <div class="w-full h-9 rounded-xl shadow-inner border border-white/10" style="background-color: ${color.hex}"></div>
                    <div class="space-y-0.5">
                      <p class="font-serif text-xs text-white">${color.name}</p>
                      <p class="font-sans text-[9px] text-[#C5A059] font-semibold">${color.hex} | ${color.rgb}</p>
                      <p class="font-sans text-[9px] text-white/50 leading-tight block pt-1 border-t border-white/5 font-light">${color.usage}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : `
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
                <div class="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-1">
                  <span class="text-[9px] uppercase font-bold text-[#C5A059] tracking-widest">Serif Elegia</span>
                  <p class="font-serif text-2xl text-white">Cormorant Garamond</p>
                  <p class="text-[10px] text-white/60 font-light">Títulos elegantes y cabeceras de secciones. Comunica estatus y conocimiento clínico.</p>
                </div>
                <div class="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-1">
                  <span class="text-[9px] uppercase font-bold text-[#C5A059] tracking-widest">San-Serif Funcional</span>
                  <p class="font-sans font-medium text-lg text-white">Plus Jakarta Sans</p>
                  <p class="text-[10px] text-white/60 font-light">Cuerpo del texto, formularios y subtítulos. Máxima legibilidad y frescura moderna.</p>
                </div>
                <div class="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-1">
                  <span class="text-[9px] uppercase font-bold text-[#C5A059] tracking-widest">Caligrafía de Acento</span>
                  <p class="font-serif italic text-white text-xl">Letra Itálica Fluida</p>
                  <p class="text-[10px] text-white/60 font-light">Acentos visuales que evocan suavidad, feminidad y estética personalizada.</p>
                </div>
              </div>
            `}
          </div>
        </div>
      </section>
    `;
  }

  renderFooter() {
    return `
      <footer class="bg-[#2D2A26] text-[#FAF9F6] pt-16 pb-12 border-t border-[#d0bdac]/20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/10 pb-12 text-left">

            <div class="md:col-span-5 space-y-5">
              <img src="./assets/logo.svg" alt="Logo Karla Godoy" class="h-12 w-auto object-contain"/>
              <p class="font-sans text-xs text-white/60 leading-relaxed max-w-sm font-light">
                Consultorio clínico enfocado en nutrición de precisión, regulación endocrina y estrategias personalizadas basadas en evidencia científica.
              </p>
            </div>

            <div class="md:col-span-3 space-y-4">
              <h5 class="font-sans text-[10px] text-[#C5A059] uppercase tracking-widest font-bold">Navegación</h5>
              <div class="flex flex-col gap-2 font-sans text-xs text-white/70 font-light">
                <a href="#"          class="hover:text-white transition-colors">Inicio</a>
                <a href="#sobre-mi"  class="hover:text-white transition-colors">Sobre Karla</a>
                <a href="#consultas" class="hover:text-white transition-colors">Consultas & Paquetes</a>
                <a href="#ebooks"    class="hover:text-white transition-colors">E-Books Digitales</a>
              </div>
            </div>

            <div class="md:col-span-4 space-y-4">
              <h5 class="font-sans text-[10px] text-[#C5A059] uppercase tracking-widest font-bold">Horarios & Ubicación</h5>
              <div class="space-y-2.5 font-sans text-xs text-white/70 font-light">
                <p class="flex items-center gap-2"><i data-lucide="clock" class="w-4 h-4 text-[#C5A059]"></i> Lunes a Viernes: 09:00 AM - 07:00 PM</p>
                <p class="flex items-center gap-2"><i data-lucide="map-pin" class="w-4 h-4 text-[#C5A059]"></i> Av. Horacio 1500, Polanco, CDMX, México</p>
                <p class="flex items-center gap-2"><i data-lucide="mail" class="w-4 h-4 text-[#C5A059]"></i> contacto@karlagodoynutricion.com</p>
              </div>
            </div>

          </div>

          <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-[11px] text-white/40">
            <p>© ${new Date().getFullYear()} Karla Godoy · Nutrición & Bienestar. Todos los derechos reservados.</p>
            <div class="flex gap-6">
              <a href="#" class="hover:underline">Aviso de Privacidad</a>
              <a href="#" class="hover:underline">Términos y Condiciones</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  renderWhatsAppWidget() {
    const isOpen = this.state.whatsappOpen;
    return `
      <div class="fixed bottom-6 right-6 z-40 font-sans flex flex-col items-end gap-3 select-none">
        <div id="whatsapp-info-panel" class="${isOpen ? 'block' : 'hidden'} bg-white rounded-3xl shadow-2xl border border-[#d0bdac]/50 max-w-[280px] text-left overflow-hidden animate-fade-in">
          <div class="bg-[#4f0911] text-[#FAF9F6] p-4 flex items-center gap-3">
            <div class="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm">KG</div>
            <div>
              <p class="font-serif font-bold text-sm text-white">Karla Godoy</p>
              <p class="text-[9px] text-white/60 leading-none">Nutrióloga certificada</p>
            </div>
          </div>
          <div class="p-4 space-y-3 bg-[#FAF9F6]">
            <p class="text-xs text-[#2C2421]/90 font-light leading-relaxed">Hola, ¡bienvenido! ✨ Cuéntame en qué puedo ayudarte con tu salud y bienestar hoy.</p>
            <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola Karla! Me interesa recibir información sobre tus consultas.')}" target="_blank"
              class="w-full py-2 bg-[#25D366] text-white rounded-xl text-center text-xs font-bold font-sans tracking-wide block hover:bg-[#20ba5a] transition-all">
              Iniciar Chat Directo
            </a>
          </div>
        </div>
        <button id="whatsapp-widget-toggle" class="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center relative cursor-pointer">
          <i data-lucide="message-circle" class="w-7 h-7 fill-current"></i>
          <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#4f0911] border-2 border-white animate-pulse"></span>
        </button>
      </div>
    `;
  }

  // ─── Secciones de contenido ───────────────────────────────────────────────

  renderHero() {
    return `
      <section class="relative pt-32 pb-16 md:pt-44 md:pb-32 bg-[#FAF9F6] overflow-hidden">
        <div class="absolute top-20 right-0 w-96 h-96 bg-[#916066]/5 rounded-full blur-3xl -z-10"></div>
        <div class="absolute bottom-10 left-10 w-80 h-80 bg-[#d0bdac]/20 rounded-full blur-3xl -z-10"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div class="lg:col-span-7 space-y-8 text-left">
              <div class="space-y-4">
                <h1 class="font-serif leading-[1.1] tracking-tight">
                  <span class="block text-5xl sm:text-6xl lg:text-[70px] font-bold text-[#4f0911]">Nutrición Clínica<br/>de Precisión</span>
                  <span class="block text-3xl sm:text-4xl lg:text-5xl font-normal text-[#916066]/70 mt-2">Para transformar tu salud desde la raíz.</span>
                </h1>
              </div>

              <div class="space-y-3">
                <p class="font-serif text-xl sm:text-2xl text-[#4f0911] font-semibold leading-snug">
                  Tu cuerpo no necesita otra dieta.<br/>
                  <span class="font-normal italic text-[#713132]">Necesita una estrategia diseñada exclusivamente para ti.</span>
                </p>
                <p class="font-sans text-base text-[#713132]/90 leading-relaxed max-w-xl font-light">
                  Analizo todo tu cuerpo para resolver el problema desde la raíz. Integro nutrición clínica, deportiva y funcional para mejorar tu composición corporal, equilibrio hormonal, rendimiento y salud metabólica — con un plan basado en evidencia científica.
                </p>
              </div>

              <div class="flex flex-wrap items-center gap-4">
                <button id="hero-booking-btn" class="px-8 py-4 bg-[#4f0911] hover:bg-[#713132] text-[#FAF9F6] font-sans text-xs uppercase tracking-widest font-bold rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                  Agendar Cita <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </button>
                <a href="#consultas" class="px-8 py-4 border border-[#d0bdac] hover:bg-[#d0bdac]/10 text-[#4f0911] font-sans text-xs uppercase tracking-widest font-bold rounded-full transition-all">
                  Ver Paquetes
                </a>
              </div>

              <div class="pt-8 border-t border-[#d0bdac]/40 grid grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <h4 class="font-serif text-2xl sm:text-3xl font-bold text-[#4f0911]">+1,200</h4>
                  <p class="font-sans text-[10px] sm:text-xs text-[#856654] uppercase tracking-wider font-semibold">Pacientes Atendidos</p>
                </div>
                <div>
                  <h4 class="font-serif text-2xl sm:text-3xl font-bold text-[#4f0911]">100%</h4>
                  <p class="font-sans text-[10px] sm:text-xs text-[#856654] uppercase tracking-wider font-semibold">Personalizado</p>
                </div>
                <div>
                  <h4 class="font-serif text-2xl sm:text-3xl font-bold text-[#4f0911]">Clínico</h4>
                  <p class="font-sans text-[10px] sm:text-xs text-[#856654] uppercase tracking-wider font-semibold">Base Científica</p>
                </div>
              </div>
            </div>

            <div class="lg:col-span-5 relative flex justify-center">
              <div class="relative w-full max-w-[380px] aspect-[4/5] rounded-[40px] overflow-hidden border border-[#d0bdac] bg-white p-3.5 shadow-2xl">
                <img
                  src="./assets/karla.jpg"
                  alt="Karla Godoy - Nutrióloga"
                  class="w-full h-full object-cover rounded-[28px] grayscale-[15%] hover:grayscale-0 transition-all duration-700"
                  onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1594824813566-78853a8125a1?auto=format&fit=crop&q=80&w=800';"
                />
              </div>
              <div class="absolute -top-4 -left-4 bg-[#FAF9F6] border border-[#d0bdac] p-3 rounded-2xl shadow-xl flex items-center gap-2 max-w-[160px]">
                <div class="w-8 h-8 rounded-full bg-[#FAF9F6] flex items-center justify-center border border-[#d0bdac]/30">
                  <i data-lucide="award" class="w-4 h-4 text-[#C5A059]"></i>
                </div>
                <div>
                  <p class="font-[Cormorant_Garamond] font-bold text-xs text-[#4f0911] leading-none mb-0.5">Certificada</p>
                  <p class="font-sans text-[9px] text-[#856654] tracking-wider leading-none">Nutrióloga Clínica</p>
                </div>
              </div>
              <div class="absolute bottom-10 -right-4 bg-[#4f0911] text-[#FAF9F6] p-4 rounded-3xl shadow-xl flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-white">
                  <i data-lucide="check" class="w-4 h-4"></i>
                </div>
                <div>
                  <p class="font-serif font-bold text-[13px] text-white leading-none">Resultados Reales</p>
                  <p class="font-sans text-[9px] text-white/70 tracking-wider">Plan Integral</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    `;
  }

  renderAchievementsSection() {
    const logros = [
      { icon: 'trending-down', text: 'Mejora tu composición corporal',        color: '#916066' },
      { icon: 'flame',         text: 'Reduce inflamación',                    color: '#C5A059' },
      { icon: 'dumbbell',      text: 'Conserva y aumenta masa muscular',      color: '#916066' },
      { icon: 'activity',      text: 'Equilibra tu salud hormonal',           color: '#C5A059' },
      { icon: 'zap',           text: 'Optimiza tu salud metabólica',          color: '#916066' },
      { icon: 'sun',           text: 'Recupera tu energía',                   color: '#C5A059' },
      { icon: 'heart',         text: 'Favorece tu fertilidad y prepárate para un embarazo saludable', color: '#916066' },
      { icon: 'trophy',        text: 'Mejora tu rendimiento deportivo',       color: '#C5A059' },
      { icon: 'smile',         text: 'Aprende a comer sin restricciones',     color: '#916066' },
    ];

    return `
      <section class="py-20 bg-[#2D2A26] relative overflow-hidden">

        <!-- Fondo decorativo -->
        <div class="absolute top-0 left-0 w-96 h-96 bg-[#4f0911]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-[#916066]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

          <!-- Header -->
          <div class="text-center mb-16 space-y-4">
            <h2 class="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
              ¿Qué puedes lograr <span class="italic font-normal text-[#C5A059]">conmigo?</span>
            </h2>
            <div class="w-16 h-0.5 bg-[#916066] mx-auto"></div>
          </div>

          <!-- Grid de logros -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            ${logros.map((logro, i) => `
              <div class="group relative bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-[#916066]/40 transition-all duration-300">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border" style="background-color: ${logro.color}20; border-color: ${logro.color}40;">
                    <i data-lucide="${logro.icon}" class="w-5 h-5" style="color: ${logro.color}"></i>
                  </div>
                  <p class="font-sans text-sm text-white/85 font-light leading-relaxed pt-2.5">${logro.text}</p>
                </div>
                <!-- Línea decorativa inferior -->
                <div class="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#916066]/30 to-transparent"></div>
              </div>
            `).join('')}
          </div>

          <!-- Cierre -->
          <div class="mt-16 max-w-2xl mx-auto text-center space-y-3 border-t border-white/10 pt-12">
            <p class="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
              No transformo únicamente tu físico.
            </p>
            <p class="font-sans text-sm text-white/65 font-light leading-relaxed">
              Transformo la manera en la que entiendes y cuidas tu cuerpo.
            </p>
            <p class="font-serif italic text-[#C5A059] text-lg">
              "Cuando entiendes lo que tu cuerpo necesita, los resultados dejan de depender de la fuerza de voluntad."
            </p>
          </div>

        </div>
      </section>
    `;
  }

  renderConsultaMethodSection() {
    const pasos = [
      { num: '01', title: 'Valoración clínica integral',              desc: 'Evaluación completa de tu historial médico, hábitos y estilo de vida.' },
      { num: '02', title: 'Interpretación de laboratorios y antecedentes', desc: 'Analizamos tus estudios para entender lo que está pasando dentro de tu cuerpo.' },
      { num: '03', title: 'Análisis de composición corporal',          desc: 'Medición precisa de masa muscular, grasa, agua y metabolismo basal.' },
      { num: '04', title: 'Estrategia nutricional personalizada',      desc: 'Basada en principios de crononutrición, respetando tus horarios, ritmo de vida y objetivos.' },
      { num: '05', title: 'Guía de suplementación basada en evidencia', desc: 'Solo lo que tu cuerpo realmente necesita, sin excesos ni modas.' },
      { num: '06', title: 'Recomendación de movimiento',               desc: 'Adaptada a tu condición y estilo de vida — desde personas sedentarias hasta atletas de alto rendimiento.' },
      { num: '07', title: 'Educación nutricional',                     desc: 'Para que entiendas tu cuerpo y no dependas de dietas para siempre.' },
    ];

    return `
      <section class="py-20 bg-[#FDFBF7] border-t border-[#d0bdac]/20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            <div class="lg:col-span-5 space-y-4 text-left lg:sticky lg:top-28">
              <span class="font-serif italic text-xl text-[#916066] tracking-tight block">Lo que incluye tu consulta</span>
              <h2 class="font-serif text-4xl sm:text-5xl font-bold text-[#4f0911] leading-tight">
                En mi consulta no recibes<br/>
                <span class="italic font-normal text-[#713132]">una dieta estándar.</span>
              </h2>
              <p class="font-sans text-base text-[#2C2421]/80 leading-relaxed font-light">
                Recibes una estrategia integral diseñada exclusivamente para ti.
              </p>
              <div class="pt-4">
                <button id="method-booking-btn" class="px-6 py-3 rounded-full bg-[#4f0911] hover:bg-[#713132] text-[#FAF9F6] text-xs font-sans font-bold uppercase tracking-widest transition-all shadow-md">
                  Agendar mi Consulta
                </button>
              </div>
            </div>

            <div class="lg:col-span-7 space-y-4">
              ${pasos.map(paso => `
                <div class="flex items-start gap-5 bg-[#FAF9F6] rounded-[24px] border border-[#d0bdac]/40 px-6 py-5 hover:shadow-sm transition-all">
                  <span class="font-serif text-2xl font-bold text-[#d0bdac] shrink-0 leading-none mt-0.5">${paso.num}</span>
                  <div class="space-y-1">
                    <h4 class="font-serif font-bold text-base text-[#4f0911]">${paso.title}</h4>
                    <p class="font-sans text-xs text-[#856654] leading-relaxed font-light">${paso.desc}</p>
                  </div>
                </div>
              `).join('')}
            </div>

          </div>
        </div>
      </section>
    `;
  }

  renderAboutSection() {
    return `
      <section id="sobre-mi" class="py-20 bg-[#FAF9F6]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            <div class="lg:col-span-6 space-y-6 text-left">
              <span class="font-serif italic text-xl text-[#916066] tracking-tight block">La historia de la creadora</span>
              <h2 class="font-serif text-4xl sm:text-5xl font-bold text-[#4f0911] leading-tight">
                Hola, soy Karla Godoy <br/>
                <span class="italic font-normal text-[#713132]">Nutrióloga Clínica</span>
              </h2>
              <p class="font-sans text-base text-[#2C2421]/90 leading-relaxed font-light">
                Mi misión es redefinir cómo la gente entiende la nutrición. Entiendo la alimentación no de forma matemática o restrictiva, sino como un elemento biológico profundamente conectado a nuestras hormonas, emociones y estilo de vida.
              </p>
              <p class="font-sans text-base text-[#2C2421]/90 leading-relaxed font-light">
                Cada consulta y e-book que entrego tiene el respaldo científico de años de práctica clínica, ayudando a cientos de personas a equilibrar su digestión, desinflamar su organismo y potenciar su energía vital de raíz.
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 rounded-full bg-[#FAF9F6] border border-[#d0bdac]/40 text-[#916066] flex items-center justify-center shrink-0">
                    <i data-lucide="shield-check" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <h5 class="font-serif font-bold text-sm text-[#4f0911]">Enfoque Basado en Evidencia</h5>
                    <p class="font-sans text-[11px] text-[#856654]">Nutrición respaldada clínicamente.</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 rounded-full bg-[#FAF9F6] border border-[#d0bdac]/40 text-[#916066] flex items-center justify-center shrink-0">
                    <i data-lucide="heart-handshake" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <h5 class="font-serif font-bold text-sm text-[#4f0911]">Acompañamiento Empático</h5>
                    <p class="font-sans text-[11px] text-[#856654]">Siempre juntos en tu proceso.</p>
                  </div>
                </div>
              </div>
              <div class="pt-4">
                <button id="about-booking-btn" class="px-6 py-3 rounded-full border border-[#4f0911] text-[#4f0911] hover:bg-[#4f0911] hover:text-[#FAF9F6] text-xs font-sans font-bold uppercase tracking-widest transition-all">
                  Agendar mi Consulta
                </button>
              </div>
            </div>

            <div class="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="bg-[#FDFBF7] p-8 rounded-[32px] border border-[#d0bdac]/50 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between sm:min-h-[220px]">
                <div class="w-12 h-12 rounded-2xl bg-[#4f0911]/10 text-[#4f0911] flex items-center justify-center mb-6">
                  <i data-lucide="dna" class="w-6 h-6"></i>
                </div>
                <div class="space-y-1.5">
                  <h4 class="font-serif text-lg font-bold text-[#4f0911]">1. Nutrición Celular</h4>
                  <p class="font-sans text-xs text-[#713132]/85 leading-relaxed font-light">Alimentamos a tus células para sanar tu digestión, restaurar tu tiroides y reactivar tu metabolismo con micronutrientes selectos.</p>
                </div>
              </div>
              <div class="bg-[#FDFBF7] p-8 rounded-[32px] border border-[#d0bdac]/50 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between sm:min-h-[220px]">
                <div class="w-12 h-12 rounded-2xl bg-[#916066]/10 text-[#916066] flex items-center justify-center mb-6">
                  <i data-lucide="brain" class="w-6 h-6"></i>
                </div>
                <div class="space-y-1.5">
                  <h4 class="font-serif text-lg font-bold text-[#4f0911]">2. Relación Alimentaria</h4>
                  <p class="font-sans text-xs text-[#713132]/85 leading-relaxed font-light">Liberamos la ansiedad por comer y desarmamos el ciclo de culpabilidad mediante alimentación consciente y plena.</p>
                </div>
              </div>
              <div class="bg-[#FDFBF7] p-8 rounded-[32px] border border-[#d0bdac]/50 shadow-sm hover:shadow-md transition-all duration-300 sm:col-span-2 flex flex-col sm:flex-row items-start gap-6">
                <div class="w-12 h-12 rounded-2xl bg-[#856654]/10 text-[#856654] flex items-center justify-center shrink-0">
                  <i data-lucide="flower" class="w-6 h-6"></i>
                </div>
                <div class="space-y-2">
                  <h4 class="font-serif text-lg font-bold text-[#4f0911]">3. Longevidad, Anti-Aging & Estética</h4>
                  <p class="font-sans text-xs text-[#713132]/85 leading-relaxed font-light">La belleza exterior es el reflejo de la desinflamación y balance celular interior. Nutrimos tu piel, cabello, uñas y metabolismo con antioxidantes naturales de alta potencia.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    `;
  }

  renderServicesSection() {
    return `
      <section id="consultas" class="py-20 bg-[#FDFBF7] border-t border-[#d0bdac]/20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div class="text-center max-w-2xl mx-auto space-y-4 mb-14">
            <span class="font-serif italic text-xl text-[#916066] tracking-tight block">Empieza a entender lo que tu cuerpo necesita</span>
            <h2 class="font-serif text-4xl sm:text-5xl font-bold text-[#4f0911] leading-tight">Nuestros Paquetes</h2>
            <p class="font-sans text-sm text-[#713132]/90 leading-relaxed font-light">
              Cada paquete está diseñado para darte acompañamiento real, no solo una dieta.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            ${SERVICE_PLANS.map(plan => {
              const isPopular = plan.popular;
              return `
                <div class="relative bg-[#FAF9F6] rounded-[36px] border ${isPopular ? 'border-[#916066] ring-2 ring-[#916066]/10' : 'border-[#d0bdac]/60'} p-8 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-lg text-left">
                  ${isPopular ? `<span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#916066] text-white font-sans text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm">MÁS RECOMENDADO ⭐</span>` : ''}
                  ${plan.savings ? `<span class="absolute -top-3 right-6 bg-[#4f0911] text-[#C5A059] font-sans text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">${plan.savings}</span>` : ''}

                  <div class="space-y-6">
                    <div class="space-y-2 border-b border-[#d0bdac]/35 pb-5">
                      <span class="font-sans text-[10px] text-[#916066] uppercase tracking-widest font-bold block">${plan.duration}</span>
                      <h3 class="font-serif text-2xl font-bold text-[#4f0911] leading-tight">${plan.title}</h3>
                      <p class="font-sans text-xs text-[#856654] leading-normal font-light">${plan.subtitle}</p>
                    </div>

                    <p class="font-sans text-xs text-[#713132] font-semibold italic bg-[#916066]/5 rounded-xl p-3 border-l-2 border-[#916066]">${plan.recommendedFor}</p>

                    <div class="space-y-3 pt-2">
                      <span class="font-sans text-[9px] text-[#856654]/70 uppercase tracking-widest font-bold block">¿Qué Incluye?</span>
                      <ul class="space-y-2.5">
                        ${plan.features.map(feature => `
                          <li class="flex items-start gap-2.5 text-xs font-sans text-[#2C2421]/90 leading-normal font-light">
                            <i data-lucide="check" class="w-4 h-4 text-[#916066] shrink-0 mt-0.5"></i>
                            <span>${feature}</span>
                          </li>
                        `).join('')}
                      </ul>
                    </div>
                  </div>

                  <div class="pt-8">
                    <button
                      class="service-book-btn w-full py-4 text-center rounded-full font-sans text-xs uppercase tracking-widest font-bold transition-all shadow-sm ${isPopular ? 'bg-[#4f0911] text-[#FAF9F6] hover:bg-[#713132]' : 'bg-[#F2EFE9] text-[#2D2A26] border border-[#d0bdac] hover:bg-white'}"
                      data-plan-id="${plan.id}"
                    >
                      Reservar Este Paquete
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

        </div>
      </section>
    `;
  }

  renderEbooksSection() {
    return `
      <section id="e-books" class="py-20 bg-[#FAF9F6]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div class="text-center max-w-2xl mx-auto space-y-4 mb-14">
            <span class="font-serif italic text-xl text-[#916066] tracking-tight block">Biblioteca virtual de autor</span>
            <h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4f0911] tracking-tight">E-Books Interactivos Clínicos</h2>
            <p class="font-sans text-sm text-[#713132]/95 leading-relaxed font-light">
              Guías completas paso a paso, recetarios sin azúcar refinada y protocolos de salud hormonal diseñados para educarte y empoderar tus decisiones de bienestar diario.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            ${EBOOKS_DATA.map(ebook => `
              <div class="bg-[#FDFBF7] rounded-[32px] border border-[#d0bdac]/45 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left">
                <div>
                  <div class="relative aspect-[4/3] w-full overflow-hidden group">
                    <img src="${ebook.coverImage}" alt="${ebook.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    <span class="absolute top-3 left-3 bg-[#4f0911] text-[#FAF9F6] text-[8px] font-sans font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">${ebook.badge}</span>
                    <div class="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between">
                      <span class="font-sans text-[10px] text-white/90 flex items-center gap-1.5 uppercase font-medium tracking-wide">
                        <i data-lucide="book-open" class="w-3.5 h-3.5 text-[#C5A059]"></i> ${ebook.pages} Páginas
                      </span>
                      <span class="font-sans text-[10px] uppercase font-bold text-[#C5A059]">PDF Interactivo</span>
                    </div>
                  </div>
                  <div class="p-6 space-y-3.5">
                    <div class="space-y-1">
                      <h3 class="font-serif text-xl sm:text-2xl font-bold text-[#4f0911] leading-tight line-clamp-1">${ebook.title}</h3>
                      <p class="font-sans text-[11px] text-[#856654] font-medium leading-relaxed min-h-[32px] line-clamp-2">${ebook.subtitle}</p>
                    </div>
                    <p class="font-sans text-xs text-[#2C2421]/90 leading-relaxed font-light line-clamp-3">${ebook.description}</p>
                    <div class="flex items-baseline gap-1.5 pt-2">
                      <span class="font-sans text-[10px] text-[#856654] uppercase tracking-wider font-semibold">Valor único:</span>
                      <span class="font-serif text-2xl font-bold text-[#4f0911]">$${ebook.price}</span>
                      <span class="font-sans text-[10px] text-[#856654] uppercase font-bold">${ebook.currency}</span>
                    </div>
                  </div>
                </div>
                <div class="p-6 pt-0 space-y-2">
                  <button class="ebook-preview-btn w-full py-3 text-center rounded-xl bg-[#F2EFE9] text-[#4f0911] font-sans text-xs uppercase tracking-widest font-bold hover:bg-[#d0bdac]/25 transition-all" data-ebook-id="${ebook.id}">
                    Ver Contenidos & Temario
                  </button>
                  <button class="ebook-buy-btn w-full py-3.5 text-center rounded-xl bg-[#4f0911] hover:bg-[#713132] text-white font-sans text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm" data-ebook-id="${ebook.id}">
                    <i data-lucide="download" class="w-3.5 h-3.5 text-[#d0bdac]"></i> Adquirir E-Book
                  </button>
                </div>
              </div>
            `).join('')}
          </div>

        </div>
      </section>
    `;
  }

  renderTestimonialsSection() {
    return `
      <section id="testimonios" class="py-20 bg-[#FDFBF7] border-t border-[#d0bdac]/20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div class="text-center max-w-2xl mx-auto space-y-4 mb-14">
            <span class="font-serif italic text-xl text-[#916066] tracking-tight block">Historias de éxito reales</span>
            <h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4f0911] tracking-tight">Testimonios de Pacientes</h2>
            <p class="font-sans text-sm text-[#713132]/95 leading-relaxed font-light">
              La mayor recompensa de mi profesión es ver la transformación integral en la vida y vitalidad de quienes confían en mi guía clínica.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            ${TESTIMONIALS_DATA.map(test => `
              <div class="bg-[#FAF9F6] p-8 rounded-[40px] border border-[#d0bdac]/50 shadow-sm flex flex-col justify-between text-left">
                <div class="space-y-6">
                  <div class="flex items-center gap-4 border-b border-[#d0bdac]/35 pb-5">
                    <img src="${test.image}" alt="${test.name}" class="w-14 h-14 rounded-full object-cover border border-[#d0bdac]"/>
                    <div>
                      <h4 class="font-serif font-bold text-lg text-[#4f0911] leading-none mb-1">${test.name}</h4>
                      <p class="font-sans text-[10px] text-[#856654] font-medium leading-none">${test.age} años | ${test.duration}</p>
                      <p class="font-sans text-[9px] text-[#916066] font-bold uppercase tracking-wider mt-1.5 block">${test.goal}</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-0.5 text-[#C5A059]">
                    ${Array(test.rating).fill('<i data-lucide="star" class="w-4 h-4 fill-current"></i>').join('')}
                  </div>
                  <p class="font-sans text-[13px] text-[#2C2421]/90 leading-relaxed font-light italic">"${test.quote}"</p>
                </div>
                <div class="grid grid-cols-3 gap-2 pt-6 mt-6 border-t border-[#d0bdac]/35 text-center">
                  ${test.metrics.map(metric => `
                    <div class="bg-[#916066]/5 p-2 rounded-2xl border border-[#d0bdac]/20">
                      <p class="font-sans text-[8px] text-[#856654] uppercase tracking-wide leading-tight">${metric.label}</p>
                      <p class="font-serif text-sm font-bold text-[#4f0911] mt-0.5">${metric.value}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>

        </div>
      </section>
    `;
  }

  renderFaqSection() {
    return `
      <section class="py-20 bg-[#FAF9F6] border-t border-[#d0bdac]/35">
        <div class="max-w-4xl mx-auto px-4 sm:px-6">
          <div class="text-center max-w-2xl mx-auto space-y-4 mb-14">
            <span class="font-serif italic text-xl text-[#916066] tracking-tight block">Dudas comunes aclaradas</span>
            <h2 class="font-serif text-3xl sm:text-4xl font-bold text-[#4f0911] tracking-tight">Preguntas Frecuentes</h2>
          </div>
          <div class="space-y-4">
            ${FAQ_ITEMS.map((faq, index) => {
              const isOpen = this.state.faqIndexOpen === index;
              return `
                <div class="bg-[#FDFBF7] rounded-[24px] border ${isOpen ? 'border-[#916066]' : 'border-[#d0bdac]/45'} overflow-hidden shadow-sm transition-all">
                  <button class="faq-toggle-btn w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#916066]/5 transition-all" data-faq-index="${index}">
                    <span class="font-serif font-bold text-base sm:text-lg text-[#4f0911]">${faq.q}</span>
                    <span class="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-[#d0bdac]/30 text-[#4f0911] shrink-0 ml-4">
                      <i data-lucide="${isOpen ? 'chevron-up' : 'chevron-down'}" class="w-4 h-4"></i>
                    </span>
                  </button>
                  <div class="${isOpen ? 'block' : 'hidden'} px-6 pb-6 pt-1 border-t border-black/5">
                    <p class="font-sans text-xs text-[#713132]/90 leading-relaxed font-light">${faq.a}</p>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </section>
    `;
  }

  renderBookingModal() {
    const s = this.state;
    const selectedPlan = s.preselectedPlan || SERVICE_PLANS[0];
    const isOnline = s.preselectedModality === 'online';

    return `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in text-left">
        <div class="relative w-full max-w-2xl bg-[#FAF9F6] rounded-3xl shadow-2xl border border-[#d0bdac] overflow-hidden max-h-[90vh] flex flex-col">

          <div class="bg-[#2D2A26] text-[#FAF9F6] p-5 border-b border-white/10 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <img src="./assets/logo.svg" alt="Logo Karla Godoy" class="h-12 w-auto object-contain"/>
              <div>
                <h2 class="font-serif text-lg sm:text-xl font-bold text-white">Solicitud de Registro de Cita</h2>
                <p class="font-sans text-[9px] text-[#C5A059] uppercase tracking-widest font-bold">Karla Godoy · Nutrióloga Clínica</p>
              </div>
            </div>
            <button id="close-booking-modal" class="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <div class="p-6 sm:p-8 overflow-y-auto flex-1">
            <form id="booking-submit-form" class="space-y-6">
              <div>
                <label class="block text-[10px] font-sans font-bold text-[#856654] uppercase tracking-widest mb-2.5">1. Elige tu paquete</label>
                <select id="booking-service" class="w-full px-4 py-3 rounded-2xl bg-white border border-[#d0bdac] text-[#4f0911] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#916066]">
                  ${SERVICE_PLANS.map(p => `<option value="${p.id}" ${selectedPlan.id === p.id ? 'selected' : ''}>${p.title}</option>`).join('')}
                </select>
              </div>

              <div>
                <label class="block text-[10px] font-sans font-bold text-[#856654] uppercase tracking-widest mb-2.5">2. Modalidad</label>
                <div class="grid grid-cols-2 gap-3">
                  <button type="button" id="modal-modality-online" class="py-3 px-4 rounded-2xl font-sans text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 border transition-all ${isOnline ? 'bg-[#2D2A26] text-[#FAF9F6] border-[#856654]' : 'bg-[#F2EFE9] text-[#2c2421] border-[#d0bdac]'}">
                    <i data-lucide="video" class="w-4 h-4 text-[#C5A059]"></i> Online
                  </button>
                  <button type="button" id="modal-modality-presencial" class="py-3 px-4 rounded-2xl font-sans text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 border transition-all ${!isOnline ? 'bg-[#2D2A26] text-[#FAF9F6] border-[#856654]' : 'bg-[#F2EFE9] text-[#2c2421] border-[#d0bdac]'}">
                    <i data-lucide="map-pin" class="w-4 h-4 text-[#C5A059]"></i> Presencial
                  </button>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-[10px] font-sans font-bold text-[#856654] uppercase tracking-widest mb-2">3. Fecha</label>
                  <input id="booking-date" type="date" value="${s.bookingForm.date}" class="w-full px-4 py-3 rounded-2xl bg-white border border-[#d0bdac] text-[#4f0911] font-sans text-sm"/>
                </div>
                <div>
                  <label class="block text-[10px] font-sans font-bold text-[#856654] uppercase tracking-widest mb-2">4. Horario</label>
                  <select id="booking-time" class="w-full px-4 py-3 rounded-2xl bg-white border border-[#d0bdac] text-[#4f0911] font-sans text-sm">
                    <option>09:00 AM</option>
                    <option selected>10:30 AM</option>
                    <option>12:00 PM</option>
                    <option>03:30 PM</option>
                    <option>05:00 PM</option>
                    <option>06:30 PM</option>
                  </select>
                </div>
              </div>

              <div class="space-y-4 pt-2 border-t border-[#d0bdac]/35">
                <label class="block text-[10px] font-sans font-bold text-[#856654] uppercase tracking-widest">5. Información del Paciente</label>
                <input id="booking-name" type="text" placeholder="Tu nombre completo" required class="w-full px-4 py-3 rounded-2xl bg-white border border-[#d0bdac] text-[#4f0911] font-sans text-sm focus:outline-none"/>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input id="booking-email" type="email" placeholder="Tu correo electrónico" required class="w-full px-4 py-3 rounded-2xl bg-white border border-[#d0bdac] text-[#4f0911] font-sans text-sm focus:outline-none"/>
                  <input id="booking-phone" type="tel" placeholder="Tu celular (WhatsApp)" required class="w-full px-4 py-3 rounded-2xl bg-white border border-[#d0bdac] text-[#4f0911] font-sans text-sm focus:outline-none"/>
                </div>
                <select id="booking-goal" class="w-full px-4 py-3 rounded-2xl bg-white border border-[#d0bdac] text-[#4f0911] font-sans text-sm">
                  <option>Pérdida de Grasa & Inflamación</option>
                  <option>Aumentar Masa Muscular</option>
                  <option>Salud Hormonal y Tiroidea</option>
                  <option>Salud Digestiva e Intestinal</option>
                  <option>Rendimiento Deportivo</option>
                  <option>Fertilidad & Embarazo Saludable</option>
                </select>
                <textarea id="booking-notes" placeholder="¿Alguna condición de salud relevante o notas para mí?" rows="3" class="w-full px-4 py-3 rounded-2xl bg-white border border-[#d0bdac] text-[#4f0911] font-sans text-sm focus:outline-none"></textarea>
              </div>

              <div class="pt-4 border-t border-[#d0bdac]/35 flex flex-col sm:flex-row gap-3">
                <button type="submit" class="flex-1 py-4 bg-[#4f0911] hover:bg-[#713132] text-white font-sans text-xs uppercase tracking-widest font-bold rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md">
                  <i data-lucide="message-circle" class="w-4 h-4 fill-current"></i> Confirmar & Enviar por WhatsApp
                </button>
                <button type="button" id="cancel-booking-btn" class="px-6 py-4 border border-[#d0bdac] hover:bg-[#d0bdac]/10 text-[#4f0911] font-sans text-xs uppercase tracking-widest font-bold rounded-full transition">
                  Cancelar
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    `;
  }

  renderEbookModal() {
    const book = this.state.previewEbook;
    if (!book) return '';

    return `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in text-left">
        <div class="relative w-full max-w-3xl bg-[#FAF9F6] rounded-[36px] shadow-2xl border border-[#d0bdac] overflow-hidden max-h-[90vh] flex flex-col">

          <div class="bg-[#2D2A26] text-white p-5 flex items-center justify-between border-b border-white/10 shrink-0">
            <span class="bg-[#916066] text-white text-[8px] font-sans font-bold uppercase tracking-widest px-3 py-1 rounded-full">Vista de Contenidos E-Book</span>
            <button id="close-ebook-modal" class="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <div class="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div class="md:col-span-4 aspect-[3/4] rounded-2xl overflow-hidden border border-[#d0bdac] shadow-md">
                <img src="${book.coverImage}" alt="${book.title}" class="w-full h-full object-cover"/>
              </div>
              <div class="md:col-span-8 space-y-4">
                <div>
                  <h3 class="font-serif text-2xl sm:text-3xl font-bold text-[#4f0911] leading-tight">${book.title}</h3>
                  <h4 class="font-sans text-xs text-[#856654] font-medium leading-relaxed mt-1">${book.subtitle}</h4>
                </div>
                <p class="font-sans text-xs text-[#2C2421]/90 leading-relaxed font-light">${book.description}</p>
                <div class="flex flex-wrap gap-4 text-[10px] font-sans text-[#856654] uppercase tracking-wider font-bold">
                  <span class="flex items-center gap-1"><i data-lucide="book" class="w-4 h-4 text-[#916066]"></i> ${book.pages} Páginas</span>
                  <span class="flex items-center gap-1"><i data-lucide="sparkles" class="w-4 h-4 text-[#916066]"></i> Formato HQ PDF</span>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5 border-t border-[#d0bdac]/35">
              <div class="space-y-3">
                <h5 class="font-sans text-[10px] text-[#916066] uppercase tracking-widest font-bold">Beneficios del Material</h5>
                <ul class="space-y-2">
                  ${book.benefits.map(b => `
                    <li class="flex items-start gap-2.5 text-xs font-sans text-[#2C2421]/90 font-light leading-normal">
                      <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"></i>
                      <span>${b}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
              <div class="space-y-3">
                <h5 class="font-sans text-[10px] text-[#916066] uppercase tracking-widest font-bold">Capítulos Incluidos</h5>
                <ul class="space-y-1.5">
                  ${book.tableOfContents.map((c, i) => `
                    <li class="flex items-start gap-2 text-xs font-sans text-[#2C2421]/80 font-light leading-normal">
                      <span class="font-serif italic text-[#C5A059] font-bold mr-1">0${i + 1}.</span>
                      <span>${c.replace(/Capítulo \d+:\s*/i, '')}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>

            <div class="bg-[#916066]/5 p-4 rounded-2xl border-l-2 border-[#916066]">
              <span class="font-sans text-[9px] text-[#916066] uppercase tracking-widest font-bold block mb-1">Para quién está Diseñado</span>
              <p class="font-sans text-xs text-[#713132] italic font-light">${book.targetAudience}</p>
            </div>
          </div>

          <div class="p-6 border-t border-[#d0bdac]/35 bg-[#FAF9F6] shrink-0">
            <button id="ebook-modal-buy-btn" data-ebook-id="${book.id}"
              class="w-full py-4 text-center rounded-full bg-[#4f0911] hover:bg-[#713132] text-white font-sans text-xs uppercase tracking-widest font-bold shadow-md transition-all flex items-center justify-center gap-1.5">
              <i data-lucide="download" class="w-4 h-4 text-[#d0bdac]"></i> Adquirir E-Book ($${book.price} | Descarga Inmediata)
            </button>
          </div>

        </div>
      </div>
    `;
  }

  // ─── Eventos ──────────────────────────────────────────────────────────────

  attachDomEvents() {
    // Banner de marca
    document.getElementById('toggle-brand-banner')?.addEventListener('click', () => {
      this.state.showBrandBanner = !this.state.showBrandBanner;
      this.render();
    });
    document.getElementById('mobile-toggle-brand-banner')?.addEventListener('click', () => {
      this.state.showBrandBanner = !this.state.showBrandBanner;
      this.state.mobileMenuOpen = false;
      this.render();
    });
    document.getElementById('tab-btn-palette')?.addEventListener('click', () => {
      this.state.activeBrandTab = 'palette';
      this.render();
    });
    document.getElementById('tab-btn-concept')?.addEventListener('click', () => {
      this.state.activeBrandTab = 'concept';
      this.render();
    });
    document.getElementById('close-brand-banner')?.addEventListener('click', () => {
      this.state.showBrandBanner = false;
      this.render();
    });

    // Menú hamburguesa
    document.getElementById('mobile-menu-toggle')?.addEventListener('click', () => {
      this.state.mobileMenuOpen = !this.state.mobileMenuOpen;
      this.render();
    });

    // Botones de agendar cita
    ['nav-booking-btn', 'hero-booking-btn', 'about-booking-btn', 'method-booking-btn'].forEach(id => {
      document.getElementById(id)?.addEventListener('click', () => this.handleOpenBooking());
    });
    document.getElementById('mobile-booking-btn')?.addEventListener('click', () => {
      this.state.mobileMenuOpen = false;
      this.handleOpenBooking();
    });

    // Tarjetas de servicio
    document.querySelectorAll('.service-book-btn').forEach(btn => {
      btn.addEventListener('click', () => this.handleOpenBooking(btn.dataset.planId));
    });

    // Ebooks
    document.querySelectorAll('.ebook-preview-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.state.previewEbook = EBOOKS_DATA.find(eb => eb.id === btn.dataset.ebookId) || null;
        this.render();
      });
    });
    document.querySelectorAll('.ebook-buy-btn').forEach(btn => {
      btn.addEventListener('click', () => this.handleBuyEbookWhatsApp(btn.dataset.ebookId));
    });
    document.getElementById('ebook-modal-buy-btn')?.addEventListener('click', (e) => {
      this.handleBuyEbookWhatsApp(e.currentTarget.dataset.ebookId);
    });
    document.getElementById('close-ebook-modal')?.addEventListener('click', () => {
      this.state.previewEbook = null;
      this.render();
    });

    // FAQ
    document.querySelectorAll('.faq-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => this.handleToggleFaq(Number(btn.dataset.faqIndex)));
    });

    // WhatsApp widget
    document.getElementById('whatsapp-widget-toggle')?.addEventListener('click', () => {
      this.state.whatsappOpen = !this.state.whatsappOpen;
      this.render();
    });

    // Modal de cita
    document.getElementById('modal-modality-online')?.addEventListener('click', () => {
      this.state.preselectedModality = 'online';
      this.render();
    });
    document.getElementById('modal-modality-presencial')?.addEventListener('click', () => {
      this.state.preselectedModality = 'presencial';
      this.render();
    });
    document.getElementById('close-booking-modal')?.addEventListener('click', () => {
      this.state.isBookingOpen = false;
      this.render();
    });
    document.getElementById('cancel-booking-btn')?.addEventListener('click', () => {
      this.state.isBookingOpen = false;
      this.render();
    });
    document.getElementById('booking-submit-form')?.addEventListener('submit', (e) => {
      this.handleWhatsAppSubmit(e);
    });
  }
}

window.app = new KarlaApp();
