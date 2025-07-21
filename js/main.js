const inner = document.getElementById('header-inner');
window.addEventListener('scroll', () => {
  inner.classList.toggle('scrolled', window.scrollY > 50);
});


document.addEventListener('DOMContentLoaded', () => {
  const openBtn  = document.getElementById('open-demo');
  const closeBtn = document.getElementById('close-demo');
  const dialog   = document.getElementById('demo-dialog');
  const demoBtns = document.querySelectorAll('.open-demo');

  demoBtns.forEach(btn =>
    btn.addEventListener('click', () => dialog.showModal())
  );

  openBtn.addEventListener('click', () => {
    dialog.showModal();
  });

  closeBtn.addEventListener('click', () => {
    dialog.close();
  });

  // Opcional: fecha o dialog se clicar fora do formulário
  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      dialog.close();
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const toggleCheckbox = document.getElementById('menu-toggle');
  const closeBtn       = document.getElementById('btn-close');

  closeBtn.addEventListener('click', () => {
    // desmarca o checkbox, fechando o menu
    toggleCheckbox.checked = false;
  });

  closeBtn.addEventListener('click', () => {
    toggleCheckbox.checked = false;
    document.querySelector('label[for="menu-toggle"]').focus();
  });
});

// Mapa de canais → conteúdo
const channelData = {
  whatsapp: {
    title: "WhatsApp Business API",
    subtitle: "Ofereça um suporte instantâneo e simplificado, conectando-se diretamente com seus clientes do WhatsApp.",
    items: [
      "Envie respostas rápidas a perguntas comuns automaticamente.",
      "Centralize os bate-papos para facilitar o gerenciamento.",
      "Compartilhe chats com sua equipe e assegure respostas a todos.",
      "Acompanhe facilmente o histórico de conversas para fornecer melhor suporte."
    ],
    imgSrc: "../assets/images/people.png",
    imgAlt: "Usuário atendendo via WhatsApp"
  },
  instagram: {
    title: "Instagram",
    subtitle: "Gerencie as conversas do Instagram no mesmo hub, sem a necessidade de aplicativos e dispositivos externos.",
    items: [
      "Todas as conversas organizadas e fáceis de gerenciar.",
      "Aumente suas chances de conversão mantendo-se envolvido com seu público.",
      "Envie respostas aos clientes de forma objetiva e estratégica.",
      "Responda em tempo real e aumente a satisfação."
    ],
    imgSrc: "./assets/images/people-instagram.png",
    imgAlt: "Usuário atendendo via Instagram"
  },
  facebook: {
    title: "Facebook Messenger",
    subtitle: "Com a integração do Facebook Messenger, ofereça um atendimento mais próximo e personalizado.",
    items: [
      "Atenda em massa, com mais agilidade e qualidade.",
      "Conecte o Facebook Messenger ao Neofluxx sem complicações.",
      "Dicas em tempo real para personalizar seu atendimento.",
      "Chats centralizados para uma comunicação alinhada."
    ],
    imgSrc: "./assets/images/people-messenger.png",
    imgAlt: "Usuário atendendo via Facebook"
  },
  telegram: {
    title: "Telegram",
    subtitle: "Atendimento dinâmico e ágil com a integração do Telegram na plataforma.",
    items: [
      "Conecte rapidamente o Telegram ao Neofluxx para uma experiência perfeita.",
      "Atenda com velocidade e foco total no cliente.",
      "Converse no Telegram com mais controle.",
      "Neofluxx adapta mensagens do Telegram às necessidades do cliente."
    ],
    imgSrc: "./assets/images/people-telegram.png",
    imgAlt: "Usuário atendendo via Telegram"
  },
  email: {
    title: "Email",
    subtitle: "Com a integração de e-mail, você garante que todas as mensagens sejam respondidas rapidamente.",
    items: [
      "Facilite o gerenciamento de e-mails com uma plataforma central.",
      "Integre e-mail e responda aos clientes com rapidez.",
      "Liberte sua equipe com automação de emails.",
      "Obtenha insights do e-mail para otimizar sua comunicação."
    ],
    imgSrc: "./assets/images/people-email.png",
    imgAlt: "Usuário atendendo via Email"
  },
  website: {
    title: "Website",
    subtitle: "Integre o chat ao vivo no seu website para oferecer suporte imediato aos usuários.",
    items: [
      "Suporte ao vivo para melhorar a experiência do cliente.",
      "Respostas rápidas no chat ao vivo para usuários envolvidos.",
      "Atenda clientes fora do expediente com chatbots automáticos.",
      "Monitore o chat e feedback para aprimorar seu suporte."
    ],
    imgSrc: "./assets/images/people-website.png",
    imgAlt: "Usuário atendendo via Website"
  },
  sms: {
    title: "SMS",
    subtitle: "Conecte-se com clientes por meio de mensagens de texto de forma simples e prática.",
    items: [
      "Alcance clientes rápido com mensagens claras.",
      "Promoções e lembretes entregues direto ao cliente.",
      "Forneça atualizações rápidas e convenientes, aumentando a satisfação do cliente.",
      "Integre SMS perfeitamente à sua estratégia de comunicação existente."
    ],
    imgSrc: "./assets/images/people-sms.png",
    imgAlt: "Usuário atendendo via SMS"
  },
};

// 2) Seletores
const icons      = document.querySelectorAll(".icons-three .icon");
const titleEl    = document.querySelector(".wrapper-items .title");
const subtitleEl = document.querySelector(".wrapper-items .subtitle");
const container  = document.querySelector(".wrapper-items .items-container");
const imageEl    = document.getElementById("channel-image");

// 3) Função para renderizar
function renderChannel(channel) {
  const data = channelData[channel];
  if (!data) return;


  // Coloca os elementos em fade-out
  container.classList.add("fade-out");
  //imageEl.classList.add("fade-out");

  setTimeout(() => {
    // Atualiza título e subtítulo
    titleEl.textContent    = data.title;
    subtitleEl.textContent = data.subtitle;

    // Limpa e preenche lista de itens
    container.innerHTML = "";
    data.items.forEach(text => {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `
        <img src="./assets/icons/rectok.svg" alt="ok">
        <p>${text}</p>
      `;
      container.appendChild(div);
    });

    // Atualiza imagem
    imageEl.src   = data.imgSrc;
    imageEl.alt   = data.imgAlt;

    container.classList.remove("fade-out");
    //imageEl.classList.remove("fade-out");

  }, 350);

  
}

// 4) Associa eventos de hover
icons.forEach(icon => {
  icon.addEventListener("mouseenter", () => {
    const channel = icon.dataset.channel;
    renderChannel(channel);
  });
});

// 5) Inicialização: renderiza o primeiro canal
if (icons.length) {
  const first = icons[0].dataset.channel;
  renderChannel(first);
}

document.addEventListener('DOMContentLoaded', () => {
  const toggleCheckbox = document.getElementById('menu-toggle');
  const closeBtn = document.getElementById('btn-close');

  toggleCheckbox.addEventListener('change', () => {
    document.body.classList.toggle('no-scroll', toggleCheckbox.checked);
  });

  closeBtn.addEventListener('click', () => {
    toggleCheckbox.checked = false;
    document.body.classList.remove('no-scroll');
  });
});

// Máscara para campo de WhatsApp
document.addEventListener('DOMContentLoaded', () => {
  const whatsappInput = document.getElementById('demo-whatsapp');
  
  if (whatsappInput) {
    // Função para aplicar a máscara de telefone
    function applyPhoneMask(value) {
      // Remove tudo que não é dígito
      const numbers = value.replace(/\D/g, '');
      
      // Aplica a máscara baseada na quantidade de dígitos
      if (numbers.length <= 2) {
        return `(${numbers}`;
      } else if (numbers.length <= 7) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
      } else {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
      }
    }
    
    // Função para validar o número de WhatsApp
    function validateWhatsApp(value) {
      const numbers = value.replace(/\D/g, '');
      return numbers.length === 11;
    }
    
    // Event listener para formatação em tempo real
    whatsappInput.addEventListener('input', (e) => {
      const cursorPosition = e.target.selectionStart;
      const oldValue = e.target.value;
      const newValue = applyPhoneMask(e.target.value);
      
      e.target.value = newValue;
      
      // Ajusta a posição do cursor
      const newCursorPosition = cursorPosition + (newValue.length - oldValue.length);
      e.target.setSelectionRange(newCursorPosition, newCursorPosition);
      
      // Remove classes de validação durante a digitação
      e.target.classList.remove('valid', 'invalid');
    });
    
    // Event listener para validação quando o campo perde o foco
    whatsappInput.addEventListener('blur', (e) => {
      const isValid = validateWhatsApp(e.target.value);
      
      if (e.target.value.length > 0) {
        if (isValid) {
          e.target.classList.add('valid');
          e.target.classList.remove('invalid');
        } else {
          e.target.classList.add('invalid');
          e.target.classList.remove('valid');
        }
      } else {
        e.target.classList.remove('valid', 'invalid');
      }
    });
    
    // Previne a entrada de caracteres não numéricos
    whatsappInput.addEventListener('keydown', (e) => {
      // Permite: backspace, delete, tab, escape, enter
      if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
          // Permite: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
          (e.keyCode === 65 && e.ctrlKey === true) ||
          (e.keyCode === 67 && e.ctrlKey === true) ||
          (e.keyCode === 86 && e.ctrlKey === true) ||
          (e.keyCode === 88 && e.ctrlKey === true) ||
          // Permite: home, end, left, right
          (e.keyCode >= 35 && e.keyCode <= 39)) {
        return;
      }
      // Garante que é um número
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
      }
    });
  }
});

// API Demo Request - Solicitação de demonstração
document.addEventListener('DOMContentLoaded', () => {
  const demoForm = document.querySelector('.demo-form');
  const submitBtn = document.querySelector('.submit-btn');
  const dialog = document.getElementById('demo-dialog');
  
  if (demoForm && submitBtn) {
    // Função para validar email
    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    
    // Função para validar WhatsApp (11 dígitos)
    function validateWhatsApp(phone) {
      const numbers = phone.replace(/\D/g, '');
      return numbers.length === 11;
    }
    
    // Função para mostrar mensagem de feedback
    function showMessage(message, type = 'success') {
      // Remove mensagem anterior se existir
      const existingMessage = demoForm.querySelector('.feedback-message');
      if (existingMessage) {
        existingMessage.remove();
      }
      
      // Cria nova mensagem
      const messageDiv = document.createElement('div');
      messageDiv.className = `feedback-message ${type}`;
      messageDiv.style.cssText = `
        padding: 12px;
        margin: 10px 0;
        border-radius: 4px;
        font-size: 14px;
        text-align: center;
        ${type === 'success' ? 
          'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : 
          'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
        }
      `;
      messageDiv.textContent = message;
      
      // Insere a mensagem antes do botão
      submitBtn.parentNode.insertBefore(messageDiv, submitBtn);
      
      // Remove a mensagem após 5 segundos
      setTimeout(() => {
        if (messageDiv.parentNode) {
          messageDiv.remove();
        }
      }, 5000);
    }
    
    // Função para fazer a chamada à API
    async function submitDemoRequest(formData) {
      try {
        const response = await fetch('https://demo-solicitation-neofluxx.neofluxx01.workers.dev/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': '123456'
          },
          body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        
        const result = await response.json();
        return { success: true, data: result };
        
      } catch (error) {
        console.error('Erro ao enviar solicitação:', error);
        return { success: false, error: error.message };
      }
    }
    
    // Event listener para o submit do formulário
    demoForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Captura os valores dos campos
      const nameInput = document.getElementById('demo-name');
      const emailInput = document.getElementById('demo-email');
      const whatsappInput = document.getElementById('demo-whatsapp');
      const agreeCheckbox = document.getElementById('demo-agree');
      
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const whatsapp = whatsappInput.value.trim();
      const agreed = agreeCheckbox.checked;
      
      // Validações
      if (!name) {
        showMessage('Por favor, preencha seu nome.', 'error');
        nameInput.focus();
        return;
      }
      
      if (!email) {
        showMessage('Por favor, preencha seu e-mail.', 'error');
        emailInput.focus();
        return;
      }
      
      if (!validateEmail(email)) {
        showMessage('Por favor, insira um e-mail válido.', 'error');
        emailInput.focus();
        return;
      }
      
      if (!whatsapp) {
        showMessage('Por favor, preencha seu WhatsApp.', 'error');
        whatsappInput.focus();
        return;
      }
      
      if (!validateWhatsApp(whatsapp)) {
        showMessage('Por favor, insira um número de WhatsApp válido (11 dígitos).', 'error');
        whatsappInput.focus();
        return;
      }
      
      if (!agreed) {
        showMessage('Por favor, aceite os termos para continuar.', 'error');
        agreeCheckbox.focus();
        return;
      }
      
      // Prepara os dados para envio
      const formData = {
        nome: name,
        email: email,
        phone: whatsapp.replace(/\D/g, '') // Remove formatação, envia apenas números
      };
      
      // Estado de loading
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Enviando...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
      
      try {
        // Faz a chamada à API
        const result = await submitDemoRequest(formData);
        
        if (result.success) {
          showMessage('Solicitação enviada com sucesso! Entraremos em contato em breve.', 'success');
          
          // Limpa o formulário
          demoForm.reset();
          
          // Fecha o modal após 2 segundos
          setTimeout(() => {
            dialog.close();
          }, 2000);
          
        } else {
          showMessage('Erro ao enviar solicitação. Tente novamente.', 'error');
        }
        
      } catch (error) {
        showMessage('Erro de conexão. Verifique sua internet e tente novamente.', 'error');
      } finally {
        // Restaura o estado do botão
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      }
    });
  }
});
