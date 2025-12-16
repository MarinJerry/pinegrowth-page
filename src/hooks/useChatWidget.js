import { useEffect } from 'react';

const useChatWidget = (config = {}) => {
  const {
    api = 'http://localhost:8000/api/v1/chat/role',
    color = '#61dafb',
    botName = 'Asistente',
    welcome = '¡Hola! ¿Como puedo ayudarte a impulsar tu negocio con IA?'
  } = config;

  useEffect(() => {
    // Verificar si el widget ya está cargado
    if (window.isPineChatReady) {
      return;
    }

    // Función de fallback en caso de que el widget tarde en cargar
    window.openPineChat = window.openPineChat || function(message) {
      console.log('Chat widget is loading, please wait...');
      // Reintentar después de un breve delay
      setTimeout(() => {
        if (window.openPineChat && typeof window.openPineChat === 'function') {
          window.openPineChat(message);
        }
      }, 500);
    };

    const script = document.createElement('script');
    script.src = '/chat-widget/index.js';
    script.setAttribute('data-api', api);
    script.setAttribute('data-color', color);
    script.setAttribute('data-bot-name', botName);
    script.setAttribute('data-welcome', welcome);
    script.async = true;
    
    script.onload = () => {
      console.log('Pine Chat Widget loaded successfully');
    };
    
    script.onerror = (error) => {
      console.error('Error loading chat widget:', error);
    };
    
    document.body.appendChild(script);
    
    return () => {
      // Solo intentar remover si el script existe
      if (script && script.parentNode) {
        try {
          document.body.removeChild(script);
        } catch (e) {
          // El script ya fue removido, ignorar error
        }
      }
      
      // Remover el contenedor del widget
      const widget = document.getElementById('adela-widget-container');
      if (widget && widget.parentNode) {
        try {
          widget.remove();
        } catch (e) {
          // Ya fue removido, ignorar error
        }
      }
      
      // Limpiar la función global
      if (window.openPineChat) {
        delete window.openPineChat;
      }
      if (window.isPineChatReady) {
        delete window.isPineChatReady;
      }
    };
  }, [api, color, botName, welcome]);
};

export default useChatWidget;