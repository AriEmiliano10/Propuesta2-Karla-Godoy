import {
  SERVICE_PLANS,
} from './data.js';

export const modalViews = {
  renderBookingModal() {
    const s = this.state;
    const selectedPlan = s.preselectedPlan || SERVICE_PLANS[0];
    const isOnline = s.preselectedModality === 'online';

    return `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in text-left">
        <div class="relative w-full max-w-2xl bg-[#FAF9F6] rounded-3xl shadow-2xl border border-[#d0bdac] overflow-hidden max-h-[90vh] flex flex-col">
          
          <!-- Header Bar of Modal -->
          <div class="bg-[#2D2A26] text-[#FAF9F6] p-5 border-b border-white/10 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <img 
                src="./assets/images/logo.svg" 
                alt="Logo Karla Godoy" 
                decoding="async"
                class="h-12 w-auto object-contain" 
              />
              <div>
                <h2 class="font-serif text-lg sm:text-xl font-bold text-white">Solicitud de Registro de Cita</h2>
                <p class="font-sans text-[9px] text-[#C5A059] uppercase tracking-widest font-bold">Karla Godoy · Nutrióloga Clínica</p>
              </div>
            </div>

            <button id="close-booking-modal" class="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <!-- Form Body -->
          <div class="p-6 sm:p-8 overflow-y-auto flex-1">
            <form id="booking-submit-form" class="space-y-6">
              
              <!-- Service select field -->
              <div>
                <label class="block text-[10px] font-sans font-bold text-[#856654] uppercase tracking-widest mb-2.5">
                  1. Elige tu consulta o programa
                </label>
                <select 
                  id="booking-service" 
                  class="w-full px-4 py-3 rounded-2xl bg-white border border-[#d0bdac] text-[#4f0911] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#916066]"
                >
                  ${SERVICE_PLANS.map(p => `
                    <option value="${p.id}" ${selectedPlan.id === p.id ? 'selected' : ''}>
                      ${p.title} — $${p.price} ${p.currency}
                    </option>
                  `).join('')}
                </select>
              </div>

              <!-- Modality switcher toggler -->
              <div>
                <label class="block text-[10px] font-sans font-bold text-[#856654] uppercase tracking-widest mb-2.5">
                  2. Elige tu modalidad
                </label>
                <div class="grid grid-cols-2 gap-35">
                  <button 
                    type="button"
                    id="modal-modality-online"
                    class="py-3 px-4 rounded-2xl font-sans text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 border transition-all ${isOnline ? 'bg-[#2D2A26] text-[#FAF9F6] border-[#856654]' : 'bg-[#F2EFE9] text-[#2c2421] border-[#d0bdac]'}"
                  >
                    <i data-lucide="video" class="w-4 h-4 text-[#C5A059]"></i> Online (Videollamada)
                  </button>
                  <button 
                    type="button"
                    id="modal-modality-presencial"
                    class="py-3 px-4 rounded-2xl font-sans text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 border transition-all ${!isOnline ? 'bg-[#2D2A26] text-[#FAF9F6] border-[#856654]' : 'bg-[#F2EFE9] text-[#2c2421] border-[#d0bdac]'}"
                  >
                    <i data-lucide="map-pin" class="w-4 h-4 text-[#C5A059]"></i> Presencial (Consultorio)
                  </button>
                </div>
              </div>

              <!-- Scheduling metrics -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-[10px] font-sans font-bold text-[#856654] uppercase tracking-widest mb-2">3. Fecha recomendada</label>
                  <input 
                    id="booking-date" 
                    type="date" 
                    value="${s.bookingForm.date}" 
                    class="w-full px-4 py-3 rounded-2xl bg-white border border-[#d0bdac] text-[#4f0911] font-sans text-sm pb-3"
                  />
                </div>
                <div>
                  <label class="block text-[10px] font-sans font-bold text-[#856654] uppercase tracking-widest mb-2">4. Horario sugerido</label>
                  <select 
                    id="booking-time" 
                    class="w-full px-4 py-3 rounded-2xl bg-white border border-[#d0bdac] text-[#4f0911] font-sans text-sm"
                  >
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:30 AM" selected>10:30 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="03:30 PM">03:30 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                    <option value="06:30 PM">06:30 PM</option>
                  </select>
                </div>
              </div>

              <!-- Personal patient details -->
              <div class="space-y-4 pt-2 border-t border-[#d0bdac]/35">
                <label class="block text-[10px] font-sans font-bold text-[#856654] uppercase tracking-widest">
                  5. Información del Paciente
                </label>
                
                <div>
                  <input 
                    id="booking-name" 
                    type="text" 
                    placeholder="Tu nombre completo" 
                    required 
                    class="w-full px-4 py-3 rounded-2xl bg-white border border-[#d0bdac] text-[#4f0911] font-sans text-sm focus:outline-none"
                  />
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input 
                    id="booking-email" 
                    type="email" 
                    placeholder="Tu correo electrónico" 
                    required 
                    class="w-full px-4 py-3 rounded-2xl bg-white border border-[#d0bdac] text-[#4f0911] font-sans text-sm focus:outline-none"
                  />
                  <input 
                    id="booking-phone" 
                    type="tel" 
                    placeholder="Tu celular (WhatsApp)" 
                    required 
                    class="w-full px-4 py-3 rounded-2xl bg-white border border-[#d0bdac] text-[#4f0911] font-sans text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label class="block text-[10px] font-sans font-medium text-[#856654] mb-1.5">Objetivo Nutricional Primario</label>
                  <select 
                    id="booking-goal" 
                    class="w-full px-4 py-3 rounded-2xl bg-white border border-[#d0bdac] text-[#4f0911] font-sans text-sm"
                  >
                    <option value="Pérdida de Grasa & Inflamación">Pérdida de Grasa & Inflamación</option>
                    <option value="Aumento de Masa Corporal">Aumentar Masa Muscular</option>
                    <option value="Regulación Hormonal y Tiroidea">Salud Hormonal y Tiroidea</option>
                    <option value="Salud Intestinal y de Colon">Salud Digestiva e Intestinal</option>
                  </select>
                </div>

                <div>
                  <textarea 
                    id="booking-notes" 
                    placeholder="¿Alguna condición de salud relevante o notas para mí?" 
                    rows="2.5" 
                    class="w-full px-4 py-3 rounded-2xl bg-white border border-[#d0bdac] text-[#4f0911] font-sans text-sm focus:outline-none"
                  ></textarea>
                </div>
              </div>

              <!-- Button submissers -->
              <div class="pt-4 border-t border-[#d0bdac]/35 flex flex-col sm:flex-row gap-3">
                <button 
                  type="submit" 
                  class="flex-1 py-4 bg-[#4f0911] hover:bg-[#713132] text-white font-sans text-xs uppercase tracking-widest font-bold rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md"
                >
                  <i data-lucide="message-circle" class="w-4 h-4 fill-current"></i> Confirmar & Enviar por WhatsApp
                </button>
                <button 
                  type="button" 
                  id="cancel-booking-btn" 
                  class="px-6 py-4 border border-[#d0bdac] hover:bg-[#d0bdac]/10 text-[#4f0911] font-sans text-xs uppercase tracking-widest font-bold rounded-full transition"
                >
                  Cancelar
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    `;
  },

  renderEbookModal() {
    const book = this.state.previewEbook;
    if (!book) return '';

    return `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in text-left">
        <div class="relative w-full max-w-3xl bg-[#FAF9F6] rounded-[36px] shadow-2xl border border-[#d0bdac] overflow-hidden max-h-[90vh] flex flex-col">
          
          <div class="bg-[#2D2A26] text-white p-5 flex items-center justify-between border-b border-white/10 shrink-0">
            <div class="flex items-center gap-3">
              <span class="bg-[#916066] text-white text-[8px] font-sans font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                Vista de Contenidos E-Book
              </span>
            </div>
            <button id="close-ebook-modal" class="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <div class="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              <!-- Left: Image Cover -->
              <div class="md:col-span-4 aspect-[3/4] rounded-2xl overflow-hidden border border-[#d0bdac] shadow-md bg-cream">
                <img src="${book.coverImage}" alt="${book.title}" loading="lazy" decoding="async" class="w-full h-full object-cover"/>
              </div>

              <!-- Right: Specs and metadata -->
              <div class="md:col-span-8 space-y-4">
                <div class="space-y-1">
                  <h3 class="font-serif text-2xl sm:text-3xl font-bold text-[#4f0911] leading-tight">${book.title}</h3>
                  <h4 class="font-sans text-xs text-[#856654] font-medium leading-relaxed">${book.subtitle}</h4>
                </div>

                <p class="font-sans text-xs text-[#2C2421]/90 leading-relaxed font-light">
                  ${book.description}
                </p>

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
                      <span class="font-serif italic text-[#C5A059] font-bold mr-1">0${i+1}.</span>
                      <span>${c.replace(/Capítulo \d+:\s*/i, '')}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>

            </div>

            <div class="bg-[#916066]/5 p-4 rounded-2xl border-l-2 border-[#916066] text-left">
              <span class="font-sans text-[9px] text-[#916066] uppercase tracking-widest font-bold block mb-1">Para quién está Diseñado</span>
              <p class="font-sans text-xs text-[#713132] italic font-light">${book.targetAudience}</p>
            </div>

          </div>

          <div class="p-6 border-t border-[#d0bdac]/35 bg-[#FAF9F6] shrink-0">
            <button 
              onclick="window.app.handleBuyEbookWhatsApp('${book.id}')"
              class="w-full py-4 text-center rounded-full bg-[#4f0911] hover:bg-[#713132] text-white font-sans text-xs uppercase tracking-widest font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
            >
              <i data-lucide="download" class="w-4 h-4 text-[#d0bdac]"></i> Adquirir E-Book ($${book.price} | Descarga Inmediata)
            </button>
          </div>

        </div>
      </div>
    `;
  },
};
