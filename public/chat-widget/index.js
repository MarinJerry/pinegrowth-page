(function(){
  // Minimal embeddable chat widget
  // Usage: <script src="/path/index.js" data-api="https://..." data-color="#0b9" data-bot-name="Bot" data-welcome="Hola!"></script>

  const SCRIPT = document.currentScript || (function(){
    const scripts = document.getElementsByTagName('script');
    return scripts[scripts.length-1];
  })();

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
      const src = SCRIPT.src || '';
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
          <span id="aw-bot-initial">${config.botName.charAt(0) || 'A'}</span>
          <span id="aw-bot-name">${config.botName}</span>
        </button>
        <div id="aw-panel" role="dialog" aria-modal="true" aria-label="Chat window">
          <div id="aw-header">
            <div id="aw-header-left">
              <div id="aw-header-avatar">${config.botName.charAt(0) || 'A'}</div>
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

    function addBotMessage(text){
      const b = document.createElement('div');
      b.className = 'aw-msg aw-bot';
      b.textContent = text;
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
        const payload = { message: text, session_id: session };
        const res = await fetch(config.api, { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(payload) });
        if(!res.ok) throw new Error('Network error');
        const data = await res.json();
        const reply = data.response;
        setTyping(false);
        addBotMessage(reply || 'Lo siento, no entendí eso.');
      }catch(err){
        setTyping(false);
        addBotMessage('Lo siento, no pude conectar con el servicio.');
      }
    }

    // Events
    toggle.addEventListener('click', ()=>{
      container.classList.toggle('aw-open');
      panel.classList.toggle('aw-open');
    });
    closeBtn.addEventListener('click', ()=>{ panel.classList.remove('aw-open'); container.classList.remove('aw-open'); });
    sendBtn.addEventListener('click', sendMessage);
    textEl.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); sendMessage(); }
      if(e.key === 'Escape'){ panel.classList.remove('aw-open'); container.classList.remove('aw-open'); }
    });

    // make accessible: focus handling
    toggle.addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' ') { e.preventDefault(); toggle.click(); } });

    // Responsive: close when clicking outside
    document.addEventListener('click', (e)=>{
      if(!container.contains(e.target) && panel.classList.contains('aw-open')){
        panel.classList.remove('aw-open'); container.classList.remove('aw-open');
      }
    });

  })();

})();
