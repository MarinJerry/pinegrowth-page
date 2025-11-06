import { useEffect } from 'react';

const useChatWidget = (config = {}) => {
  const {
    api = 'http://127.0.0.1:8001/api/v1/chat/role',
    color = '#61dafb',
    botName = 'Asistente',
    welcome = '¡Hola! ¿Como puedo ayudarte a impulsar tu negocio con IA?'
  } = config;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/chat-widget/index.js';
    script.setAttribute('data-api', api);
    script.setAttribute('data-color', color);
    script.setAttribute('data-bot-name', botName);
    script.setAttribute('data-welcome', welcome);
    
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
      const widget = document.getElementById('adela-widget-container');
      if (widget) widget.remove();
    };
  }, [api, color, botName, welcome]);
};

export default useChatWidget;