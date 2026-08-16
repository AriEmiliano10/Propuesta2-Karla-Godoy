import {
  EBOOKS_DATA,
  SERVICE_PLANS,
  WHATSAPP_NUMBER,
} from './data.js';

export const appHelpers = {
  getDefaultBookingForm(planId = null, modality = 'online') {
    return {
      serviceId: planId || SERVICE_PLANS[0].id,
      modality,
      date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      timeSlot: '11:00 AM',
      fullName: '',
      email: '',
      phone: '',
      mainGoal: 'Pérdida de Grasa & Inflamación',
      notes: '',
    };
  },

  setModality(modality, syncActiveModality = false) {
    this.state.preselectedModality = modality;
    if (syncActiveModality) {
      this.state.activeModality = modality;
    }
    this.render();
  },

  closeBookingModal() {
    this.state.isBookingOpen = false;
    this.render();
  },

  updateNavbarStyle() {
    const navbar = document.getElementById('navbar-container');
    if (!navbar) return;

    const isScrolled = window.scrollY > 20;
    if (isScrolled) {
      navbar.classList.add('bg-[#FAF9F6]/90', 'backdrop-blur-md', 'shadow-sm', 'py-3');
      navbar.classList.remove('bg-transparent', 'py-5');
      return;
    }

    navbar.classList.add('bg-transparent', 'py-5');
    navbar.classList.remove('bg-[#FAF9F6]/90', 'backdrop-blur-md', 'shadow-sm', 'py-3');
  },

  setupGlobalScrollListener() {
    window.addEventListener('scroll', () => {
      if (this.scrollTicking) return;

      this.scrollTicking = true;
      window.requestAnimationFrame(() => {
        this.updateNavbarStyle();

        const nextActiveMenu = this.getActiveMenuFromScroll();
        if (nextActiveMenu !== this.state.activeMenu) {
          this.state.activeMenu = nextActiveMenu;
          this.render();
        }

        this.scrollTicking = false;
      });
    }, { passive: true });
  },

  getActiveMenuFromScroll() {
    const sections = [
      { id: 'inicio', menu: 'inicio' },
      { id: 'sobre-mi', menu: 'metodo' },
      { id: 'consultas', menu: 'servicios' },
      { id: 'e-books', menu: 'paquetes' },
      { id: 'agenda-cta', menu: 'agenda' },
    ];

    const threshold = window.scrollY + 180;
    let activeMenu = 'inicio';

    sections.forEach(section => {
      const sectionEl = document.getElementById(section.id);
      if (sectionEl && sectionEl.offsetTop <= threshold) {
        activeMenu = section.menu;
      }
    });

    return activeMenu;
  },

  calculateNutrition() {
    const inputs = this.state.calculatorInputs;
    let bmr = 10 * inputs.weightKg + 6.25 * inputs.heightCm - 5 * inputs.age;
    if (inputs.gender === 'female') {
      bmr -= 161;
    } else {
      bmr += 5;
    }

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      intense: 1.725,
    };

    const tdee = Math.round(bmr * activityMultipliers[inputs.activityLevel]);

    let targetCalories = tdee;
    let recommendation = '';

    if (inputs.goal === 'fat_loss') {
      targetCalories = Math.round(tdee * 0.82);
      recommendation = 'Estrategia de déficit calórico moderado guiado para preservar masa muscular y optimizar la combustión de grasa sin afectar tiroides ni cortisol.';
    } else if (inputs.goal === 'muscle_gain') {
      targetCalories = Math.round(tdee * 1.10);
      recommendation = 'Estrategia de superávit normocalórico enfocado en síntesis de proteína magra y ganancia muscular progresiva.';
    } else if (inputs.goal === 'hormonal_balance') {
      targetCalories = tdee;
      recommendation = 'Estrategia normocalórica antiinflamatoria diseñada para estabilizar glucosa en sangre, regular sensibilidad a la insulina y apoyar balance hormonal.';
    } else {
      targetCalories = tdee;
      recommendation = 'Plan de mantenimiento y flexibilidad metabólica para sostener tu peso actual con máxima vitalidad.';
    }

    const proteinGrams = Math.round(inputs.weightKg * 1.8);
    const fatsGrams = Math.round((targetCalories * 0.3) / 9);
    const carbsGrams = Math.round((targetCalories - (proteinGrams * 4 + fatsGrams * 9)) / 4);

    this.state.calculatorResult = {
      bmr: Math.round(bmr),
      tdee,
      targetCalories,
      proteinGrams,
      carbsGrams: Math.max(carbsGrams, 50),
      fatsGrams,
      recommendation,
    };

    this.render();
    document.getElementById('calculator-result-card')?.scrollIntoView({ behavior: 'smooth' });
  },

  handleOpenBooking(planId = null, modality = 'online') {
    this.state.preselectedPlan = planId
      ? SERVICE_PLANS.find(p => p.id === planId) || null
      : null;

    this.state.preselectedModality = modality;
    this.state.isBookingOpen = true;
    this.state.bookingForm = this.getDefaultBookingForm(planId, modality);
    this.state.bookingStep = 'form';
    this.render();
  },

  handleWhatsAppSubmit(e) {
    e.preventDefault();

    const getInputValue = (id, fallback = '') => document.getElementById(id)?.value || fallback;

    const serviceId = getInputValue('booking-service', SERVICE_PLANS[0].id);
    const modality = this.state.preselectedModality;
    const date = getInputValue('booking-date', this.state.bookingForm.date);
    const timeSlot = getInputValue('booking-time', '11:00 AM');
    const fullName = getInputValue('booking-name').trim();
    const email = getInputValue('booking-email').trim();
    const phone = getInputValue('booking-phone').trim();
    const mainGoal = getInputValue('booking-goal', 'Pérdida de Grasa & Inflamación');
    const notes = getInputValue('booking-notes').trim();

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
    this.closeBookingModal();
  },

  handleBuyEbookWhatsApp(ebookId) {
    const ebook = EBOOKS_DATA.find(eb => eb.id === ebookId) || EBOOKS_DATA[0];
    const text = encodeURIComponent(
      `Hola Karla Godoy! Me interesa adquirir tu Ebook interactivo:\n\n` +
      `📚 Título: ${ebook.title}\n` +
      `🏷️ Subtítulo: ${ebook.subtitle}\n` +
      `💰 Precio: $${ebook.price} ${ebook.currency}\n\n` +
      `Por favor compárteme los detalles de transferencia o link de pago para empezar a disfrutar del material. ¡Gracias!`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  },

  handleOpenPreviewEbook(ebookId) {
    this.state.previewEbook = EBOOKS_DATA.find(eb => eb.id === ebookId) || null;
    this.render();
  },

  handleClosePreviewEbook() {
    this.state.previewEbook = null;
    this.render();
  },

  handleToggleFaq(idx) {
    this.state.faqIndexOpen = this.state.faqIndexOpen === idx ? null : idx;
    this.render();
  },

  attachDomEvents() {
    const onClick = (id, handler) => {
      document.getElementById(id)?.addEventListener('click', handler);
    };

    ['nav-booking-btn', 'hero-booking-btn', 'about-booking-btn', 'sales-cta-booking-btn', 'mobile-sticky-booking-btn']
      .forEach(id => onClick(id, () => this.handleOpenBooking()));

    onClick('mobile-booking-btn', () => {
      this.state.mobileMenuOpen = false;
      this.handleOpenBooking();
    });

    onClick('mobile-menu-toggle', () => {
      this.state.mobileMenuOpen = !this.state.mobileMenuOpen;
      this.render();
    });

    onClick('service-modality-online', () => this.setModality('online', true));
    onClick('service-modality-presencial', () => this.setModality('presencial', true));

    onClick('whatsapp-widget-toggle', () => {
      this.state.whatsappOpen = !this.state.whatsappOpen;
      this.render();
    });

    ['close-booking-modal', 'cancel-booking-btn'].forEach(id => onClick(id, () => this.closeBookingModal()));
    onClick('modal-modality-online', () => this.setModality('online'));
    onClick('modal-modality-presencial', () => this.setModality('presencial'));

    document.getElementById('booking-submit-form')?.addEventListener('submit', (e) => {
      this.handleWhatsAppSubmit(e);
    });

    onClick('close-ebook-modal', () => {
      this.state.previewEbook = null;
      this.render();
    });

    onClick('calc-gender-female', () => {
      this.state.calculatorInputs.gender = 'female';
      this.render();
    });

    onClick('calc-gender-male', () => {
      this.state.calculatorInputs.gender = 'male';
      this.render();
    });

    onClick('calculate-btn', () => {
      const ageInput = document.getElementById('calc-age');
      const weightInput = document.getElementById('calc-weight');
      const heightInput = document.getElementById('calc-height');
      const activityInput = document.getElementById('calc-activity');
      const goalInput = document.getElementById('calc-goal');

      this.state.calculatorInputs.age = Number(ageInput?.value) || 30;
      this.state.calculatorInputs.weightKg = Number(weightInput?.value) || 60;
      this.state.calculatorInputs.heightCm = Number(heightInput?.value) || 165;
      this.state.calculatorInputs.activityLevel = activityInput?.value || 'moderate';
      this.state.calculatorInputs.goal = goalInput?.value || 'fat_loss';

      this.calculateNutrition();
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const nextActive = link.getAttribute('data-nav-key');
        if (nextActive) {
          this.state.activeMenu = nextActive;
        }

        if (link.classList.contains('mobile-nav-link')) {
          this.state.mobileMenuOpen = false;
        }
        this.render();
      });
    });
  },
};
