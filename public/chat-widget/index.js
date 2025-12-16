(function(){
  // Minimal embeddable chat widget
  // Usage: <script src="/path/index.js" data-api="https://..." data-color="#0b9" data-bot-name="Bot" data-welcome="Hola!"></script>

  const SCRIPT = document.currentScript || (function(){
    const scripts = document.getElementsByTagName('script');
    return scripts[scripts.length-1];
  })();

  // Verificar que SCRIPT existe antes de continuar
  if (!SCRIPT) {
    console.error('Pine Chat Widget: No se pudo obtener el script actual');
    return;
  }

  const config = {
    api: SCRIPT.getAttribute('data-api') || null,
    color: SCRIPT.getAttribute('data-color') || '#0b93f6',
    botName: SCRIPT.getAttribute('data-bot-name') || 'Assistant',
    welcome: SCRIPT.getAttribute('data-welcome') || 'Hola! ¿En qué puedo ayudarte?'
  };

  // Create container
  const container = document.createElement('div');
  container.id = 'adela-widget-container';
  // use Shadow DOM to avoid CSS collisions
  const shadow = container.attachShadow ? container.attachShadow({mode: 'open'}) : container;

  // Attach styles
  const styleLink = document.createElement('style');
  styleLink.textContent = `/* styles will be injected by style.css contents */`;
  shadow.appendChild(styleLink);

  // Insert base HTML
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `<!---- WIDGET HTML PLACEHOLDER ---->`;
  shadow.appendChild(wrapper);

  // Append container to body
  document.body.appendChild(container);

  // Fetch CSS from same directory as script if possible
  (function injectCSS(){
    try{
      const src = (SCRIPT && SCRIPT.src) || '/chat-widget/index.js';
      const base = src.split('/').slice(0,-1).join('/');
      const cssPath = base + '/style.css';
      fetch(cssPath).then(r=>{ if(r.ok) return r.text(); throw new Error('no css'); }).then(css=>{
        styleLink.textContent = css.replace(/__ADELA/g, '');
      }).catch(()=>{
        // fallback: embed default minimal css
        styleLink.textContent = `:host{all:initial} #aw-root{font-family:Arial, Helvetica, sans-serif}`;
      });
    }catch(e){
      styleLink.textContent = `:host{all:initial} #aw-root{font-family:Arial, Helvetica, sans-serif}`;
    }
  })();

  // Build HTML structure and behavior
  (function build(){
    const root = shadow.querySelector('div');
    root.id = 'aw-root';
    root.innerHTML = `
      <div id="adela-widget" aria-hidden="false">
        <button id="aw-toggle" aria-label="Open chat">
          <span id="aw-bot-initial">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="currentColor"/>
              <circle cx="9" cy="9" r="1.5" fill="white"/>
              <circle cx="15" cy="9" r="1.5" fill="white"/>
              <path d="M8 14s1 2 4 2 4-2 4-2" stroke="white" stroke-width="1.5" stroke-linecap="round" fill="none"/>
            </svg>
          </span>
          <span id="aw-bot-name">${config.botName}</span>
        </button>
        <div id="aw-panel" role="dialog" aria-modal="true" aria-label="Chat window">
          <div id="aw-header">
            <div id="aw-header-left">
              <div id="aw-header-avatar">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="currentColor"/>
                  <circle cx="9" cy="9" r="1.5" fill="white"/>
                  <circle cx="15" cy="9" r="1.5" fill="white"/>
                  <path d="M8 14s1 2 4 2 4-2 4-2" stroke="white" stroke-width="1.5" stroke-linecap="round" fill="none"/>
                </svg>
              </div>
              <div id="aw-header-title">${config.botName}</div>
            </div>
            <button id="aw-close" aria-label="Close chat">×</button>
          </div>
          <div id="aw-messages" role="log" aria-live="polite"></div>
          <div id="aw-input">
            <textarea id="aw-text" placeholder="Escribe un mensaje..."></textarea>
            <button id="aw-send" aria-label="Enviar">Enviar</button>
          </div>
        </div>
      </div>
    `;

    const toggle = shadow.getElementById('aw-toggle');
    const panel = shadow.getElementById('aw-panel');
    const closeBtn = shadow.getElementById('aw-close');
    const sendBtn = shadow.getElementById('aw-send');
    const textEl = shadow.getElementById('aw-text');
    const messagesEl = shadow.getElementById('aw-messages');

    // Apply color
    const color = config.color;
    const botAvatar = shadow.getElementById('aw-header-avatar');
    const botInitial = shadow.getElementById('aw-bot-initial');
    botAvatar && (botAvatar.style.backgroundColor = color);
    botInitial && (botInitial.style.backgroundColor = color);
    toggle && (toggle.style.backgroundColor = color);

    // Session
    const STORAGE_KEY = 'adela_widget_session_id';
    function genId(){
      return 's_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    }
    let session = localStorage.getItem(STORAGE_KEY);
    if(!session){ session = genId(); localStorage.setItem(STORAGE_KEY, session); }

    // Welcome message
    addBotMessage(config.welcome);
    
    // Mensaje de seguimiento después de 3 segundos
    setTimeout(() => {
      addBotMessage('**Algunas áreas donde podemos ayudarte:**\n\n• **Automatización de ventas** - CRM inteligente y seguimiento automático\n• **Chatbots para atención al cliente** - Respuestas 24/7\n• **Análisis de datos con IA** - Insights para tu negocio\n• **Procesos administrativos** - Reduce tareas repetitivas\n\n¿Cuál de estas áreas te interesa más para tu negocio?');
    }, 3000);

    // Función para procesar markdown y convertirlo a HTML limpio
    function formatMarkdownToHTML(text) {
      // Primero, limpiar el texto
      let formatted = text
        // Remover asteriscos sueltos al inicio/final
        .replace(/^\*+\s*/, '')
        .replace(/\s*\*+$/, '')
        
        // Negritas **texto** o __texto__
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/__(.*?)__/g, '<strong>$1</strong>')
        
        // Cursivas *texto* (pero no si está en una lista)
        .replace(/(?<![\s•→])\*(.*?)\*(?!\s*[\n•→])/g, '<em>$1</em>')
        .replace(/(?<![\s•→])_(.*?)_(?!\s*[\n•→])/g, '<em>$1</em>')
        
        // Enlaces [texto](url)
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
        
        // Listas con - o * (mejoradas)
        .replace(/^[\s]*[-*]\s+(.+)$/gm, '<div style="margin:2px 0;">• $1</div>')
        
        // Listas numeradas
        .replace(/^[\s]*(\d+)\.\s+(.+)$/gm, '<div style="margin:2px 0;">$1. $2</div>')
        
        // Código inline `código`
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        
        // Títulos ### Título
        .replace(/^#{1,3}\s+(.+)$/gm, '<strong style="display:block;margin:8px 0 4px 0;color:#0a0a0a;">$1</strong>')
        
        // Párrafos separados por líneas vacías
        .replace(/\n\s*\n/g, '<br><br>')
        
        // Saltos de línea simples
        .replace(/\n/g, '<br>');

      // Limpiar espacios extra y múltiples <br>
      formatted = formatted
        .replace(/<br\s*\/?>\s*<br\s*\/?>\s*<br\s*\/?>/g, '<br><br>')
        .trim();

      return formatted;
    }

    // Función para sanitizar HTML básico (solo permitir tags seguros)
    function sanitizeHTML(html) {
      const allowedTags = ['strong', 'em', 'br', 'div', 'code', 'a'];
      const temp = document.createElement('div');
      temp.innerHTML = html;
      
      // Remover scripts y eventos
      const scripts = temp.querySelectorAll('script');
      scripts.forEach(s => s.remove());
      
      // Limpiar atributos peligrosos
      const allElements = temp.querySelectorAll('*');
      allElements.forEach(el => {
        if (!allowedTags.includes(el.tagName.toLowerCase())) {
          el.replaceWith(...el.childNodes);
          return;
        }
        // Remover atributos que no sean href, target, rel, style básico
        const attrs = [...el.attributes];
        attrs.forEach(attr => {
          if (!['href', 'target', 'rel', 'style'].includes(attr.name)) {
            el.removeAttribute(attr.name);
          }
        });
      });
      
      return temp.innerHTML;
    }

    function addBotMessage(text){
      const b = document.createElement('div');
      b.className = 'aw-msg aw-bot';
      
      try {
        // Procesar el markdown y convertirlo a HTML
        const formattedText = formatMarkdownToHTML(text);
        const safeHTML = sanitizeHTML(formattedText);
        b.innerHTML = safeHTML;
      } catch (error) {
        // En caso de error, mostrar texto plano
        b.textContent = text;
      }
      
      messagesEl.appendChild(b);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function addUserMessage(text){
      const u = document.createElement('div');
      u.className = 'aw-msg aw-user';
      u.textContent = text;
      messagesEl.appendChild(u);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function setTyping(on){
      let t = shadow.getElementById('aw-typing');
      if(on){
        if(!t){
          t = document.createElement('div'); t.id='aw-typing'; t.className='aw-msg aw-bot'; t.textContent='Escribiendo...';
          messagesEl.appendChild(t);
        }
      }else{ if(t) t.remove(); }
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    async function sendMessage(){
      const text = textEl.value.trim();
      if(!text) return;
      addUserMessage(text);
      textEl.value = '';
      setTyping(true);
      try{
        const payload = { 
          agent_name: "Asesor Comercial PineGrowth Honduras",
          expertise_areas: [
            "venta consultiva B2B de soluciones tecnológicas",
            "desarrollo de software a medida",
            "soluciones de inteligencia artificial aplicada",
            "automatización de procesos empresariales",
            "transformación digital para PYMEs",
            "chatbots y asistentes virtuales con IA",
            "sistemas de gestión empresarial"
          ],
          message: text,
          personality: "Agente de ventas profesional, consultivo, empático y enfocado en entender las necesidades del cliente antes de proponer soluciones. Hablas en español profesional de Honduras. Tu prioridad es agendar sesiones comerciales con clientes potenciales calificados.",
          temperature: 0.4,
          tone: "Profesional, directo pero amigable, orientado a generar confianza y agendar reuniones",
          objectives: [
            "Identificar si el prospecto es PYME, emprendedor o empresa mediana en Honduras o Latinoamérica",
            "Descubrir el problema o necesidad específica del cliente (eficiencia, ventas, automatización, control)",
            "Calificar el nivel de urgencia y presupuesto aproximado del proyecto",
            "Presentar brevemente cómo PineGrowth puede resolver su necesidad específica",
            "Cerrar la conversación agendando una sesión de diagnóstico gratuita con el equipo comercial",
            "Capturar datos de contacto: nombre completo, empresa, teléfono, email y mejor horario"
          ],
          company_context: {
            company_name: "PineGrowth Honduras",
            website: "https://pinehn.com",
            location: "Honduras, con proyectos en toda Latinoamérica",
            years_experience: "Más de 5 años desarrollando soluciones tecnológicas",
            services: [
              "Desarrollo de software a medida para gestión empresarial",
              "Agentes de IA especializados para automatizar procesos",
              "Chatbots inteligentes para atención al cliente 24/7",
              "Sistemas de automatización de ventas y CRM",
              "Análisis de datos con IA para toma de decisiones",
              "Consultoría en transformación digital"
            ],
            value_proposition: "Desarrollamos soluciones de software e inteligencia artificial a la medida que aumentan la eficiencia operativa, incrementan ventas y mejoran el control de tu negocio. Convertimos procesos manuales en automatizados.",
            target_clients: "PYMEs, emprendedores y empresas medianas que buscan crecer mediante tecnología",
            differentiators: [
              "Soluciones 100% personalizadas a tu modelo de negocio",
              "Implementación rápida con metodología ágil",
              "Soporte técnico continuo en español",
              "Precios competitivos para el mercado latinoamericano"
            ]
          },
          cta_policy: {
            primary_cta: "Agendar una sesión de diagnóstico gratuita de 30 minutos con nuestro equipo comercial",
            secondary_cta: "Solicitar una cotización personalizada",
            urgency_message: "Tenemos disponibilidad limitada esta semana para sesiones de diagnóstico",
            contact_collection: "Para agendar necesito: nombre completo, empresa, teléfono/WhatsApp, email y tu mejor horario (mañana/tarde)"
          },
          response_constraints: {
            max_paragraphs: 2,
            include_cta: true,
            avoid_technical_overload: true,
            always_ask_qualifying_questions: true,
            escalate_to_human: "Después de capturar datos de contacto completos, confirmar que un ejecutivo comercial se comunicará en máximo 24 horas"
          },
          behavioral_rules: [
            "Siempre presenta soluciones enfocadas en el beneficio de negocio, no en tecnología pura",
            "Usa ejemplos concretos de cómo hemos ayudado a otros clientes similares",
            "Si el cliente pregunta por precios, indica que depende del alcance y ofrece sesión de diagnóstico",
            "No prometas fechas de entrega sin consultar con el equipo, mejor agenda reunión",
            "Si el cliente no está listo, pregunta cuándo sería buen momento para retomar contacto"
          ],
          user_id: session
        };
        
        const res = await fetch(config.api, { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(payload) });
        if(!res.ok) throw new Error('Network error');
        const data = await res.json();
        // Manejo más robusto de diferentes formatos de respuesta
        const reply = data.response || data.reply || data.message || data.content || 'Disculpa, tengo problemas técnicos. Puedes contactar directamente a Pine en https://pine.hn.com';
        setTyping(false);
        addBotMessage(reply);
      }catch(err){
        setTyping(false);
        addBotMessage('Disculpa, tengo problemas técnicos. Puedes contactar directamente a Pine en https://pine.hn.com o escribir a contacto@pine.hn.com');
      }
    }

    // Helper functions for opening/closing
    function openChat() {
      panel.classList.add('aw-open');
      setTimeout(() => textEl.focus(), 300);
    }
    
    function closeChat() {
      panel.classList.remove('aw-open');
    }
    
    // Events
    toggle.addEventListener('click', ()=>{
      if (panel.classList.contains('aw-open')) {
        closeChat();
      } else {
        openChat();
      }
    });
    closeBtn.addEventListener('click', closeChat);
    sendBtn.addEventListener('click', sendMessage);
    textEl.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); sendMessage(); }
      if(e.key === 'Escape'){ closeChat(); }
    });

    // make accessible: focus handling
    toggle.addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' ') { e.preventDefault(); toggle.click(); } });

    // Responsive: close when clicking outside
    document.addEventListener('click', (e)=>{
      if(!container.contains(e.target) && panel.classList.contains('aw-open')){
        closeChat();
      }
    });

    // Función global para abrir el chat desde cualquier parte de la página
    window.openPineChat = function(message = null) {
      console.log('openPineChat called with message:', message);
      
      // Abrir el panel del chat usando la función helper
      openChat();
      
      // Si se proporciona un mensaje, pre-llenarlo en el input
      if (message) {
        setTimeout(() => {
          textEl.value = message;
          textEl.focus();
        }, 350);
      }
    };

    // También exponer una función para verificar si el chat está disponible
    window.isPineChatReady = true;
    
    console.log('Pine Chat Widget initialized and ready');

  })();

})();
