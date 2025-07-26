document.addEventListener('DOMContentLoaded', () => {

  gsap.registerPlugin(ScrollTrigger);


  const cursor = document.querySelector('.cursor');
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });


  const typewriterElement = document.querySelector('.typewriter');
  if (typewriterElement) {
    const fullText = typewriterElement.textContent;
    typewriterElement.textContent = '';
    typewriterElement.style.visibility = 'visible';
    
    let i = 0;
    const typingSpeed = 50;

    function typeWriter() {
      if (i < fullText.length) {
        typewriterElement.textContent += fullText.charAt(i);
        i++;
        setTimeout(typeWriter, typingSpeed);
      } else {
        typewriterElement.classList.add('finished-typing');
      }
    }

    setTimeout(typeWriter, 500);
  }


  const button = document.querySelector('.hero-button');
  if (button) {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, { 
        scale: 1.05,
        duration: 0.3
      });
    });
    button.addEventListener('mouseleave', () => {
      gsap.to(button, { 
        scale: 1,
        duration: 0.3
      });
    });
  }


  if (document.getElementById('hero-canvas')) {
    initThreeJS();
  }


  gsap.to(".spell", {
    scrollTrigger: {
      trigger: ".spell",
      start: "top 70%",
      toggleActions: "play none none none"
    },
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out"
  });


  const dust = document.querySelector('.magic-dust');
  document.addEventListener('mousemove', (e) => {
    dust.style.backgroundPosition = `${e.clientX * 0.05}px ${e.clientY * 0.05}px`;
  });
  initScrollAnimations();
});

document.addEventListener('DOMContentLoaded', () => {
  const spellSection = document.querySelector('.spell');
  
  if (spellSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    observer.observe(spellSection);
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const offerButton = document.querySelector('.cta-button');
  if (offerButton) {
    offerButton.addEventListener('mouseenter', () => {
      gsap.to(offerButton, { scale: 1.05, duration: 0.3 });
    });
    offerButton.addEventListener('mouseleave', () => {
      gsap.to(offerButton, { scale: 1, duration: 0.3 });
    });
  }


  gsap.utils.toArray('.step').forEach((step, i) => {
    gsap.from(step, {
      scrollTrigger: {
        trigger: '.fast-magic-offer',
        start: "top 70%",
        toggleActions: "play none none none"
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.2,
      ease: "power2.out"
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {

  const messengerBtns = document.querySelectorAll('.messenger-btn');
  let selectedMessenger = null;
  
  messengerBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      messengerBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      selectedMessenger = this.dataset.messenger;
    });
  });
  

  document.getElementById('send-messenger').addEventListener('click', function() {
    const contact = document.getElementById('user-contact').value.trim();
    const description = document.getElementById('project-description').value.trim();
    
    if (!contact) {
      alert('Пожалуйста, укажите ваш Telegram или номер телефона');
      return;
    }
    
    if (!selectedMessenger) {
      alert('Пожалуйста, выберите мессенджер');
      return;
    }
    
    sendToTelegram({
      type: 'messenger',
      messenger: selectedMessenger,
      contact: contact,
      description: description
    });
  });
  

  document.getElementById('request-call').addEventListener('click', function() {
    const phone = document.getElementById('phone-number').value.trim();
    const time = document.getElementById('call-time').value;
    const description = document.getElementById('call-description').value.trim();
    
    if (!phone) {
      alert('Пожалуйста, укажите ваш номер телефона');
      return;
    }
    
    if (!time) {
      alert('Пожалуйста, выберите удобное время для звонка');
      return;
    }
    
    sendToTelegram({
      type: 'call',
      phone: phone,
      time: time,
      description: description
    });
  });
  

  function sendToTelegram(data) {
    const botToken = '7892942632:AAHmrok9tG1-Fe0br4tg1u9o2LaLUYyeVIw';
    const chatId = '743619189';
    
    let message = 'Новая заявка:\n';
    
    if (data.type === 'messenger') {
      message += `Тип: Через мессенджер\n`;
      message += `Мессенджер: ${data.messenger}\n`;
      message += `Контакт: ${data.contact}\n`;
      message += `Описание: ${data.description || 'Не указано'}\n`;

      if (window.location.hash === '#contacts' && document.getElementById('speedWizardSection')?.classList.contains('hidden') === false) {
        message += `Промокод: SpeedWizard\n`;
      }
    } else {
      message += `Тип: Заказ звонка\n`;
      message += `Телефон: ${data.phone}\n`;
      message += `Время: ${data.time}\n`;
      message += `Описание: ${data.description || 'Не указано'}\n`;

      if (window.location.hash === '#contacts' && document.getElementById('speedWizardSection')?.classList.contains('hidden') === false) {
        message += `Промокод: SpeedWizard\n`;
      }
    }
    

    const button = data.type === 'messenger' 
      ? document.getElementById('send-messenger')
      : document.getElementById('request-call');
    
    const originalText = button.innerHTML;
    button.innerHTML = 'Отправка... <i class="fas fa-spinner fa-spin"></i>';
    button.disabled = true;
    

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    })
    .then(response => response.json())
    .then(data => {
      alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');

      if (data.type === 'messenger') {
        document.getElementById('user-contact').value = '';
        document.getElementById('project-description').value = '';
        messengerBtns.forEach(b => b.classList.remove('active'));
      } else {
        document.getElementById('phone-number').value = '';
        document.getElementById('call-time').value = '';
        document.getElementById('call-description').value = '';
      }
    })
    .catch(error => {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.');
    })
    .finally(() => {
      button.innerHTML = originalText;
      button.disabled = false;
    });
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('consultationPopup');
  const popupTrigger = popup.querySelector('.popup-trigger');
  const closePopup = popup.querySelector('.close-popup');
  

  setTimeout(() => {
    popup.classList.add('active');
  }, 10000); 
  

  popupTrigger.addEventListener('click', () => {
    popup.classList.toggle('active');
  });
  
  closePopup.addEventListener('click', (e) => {
    e.stopPropagation();
    popup.classList.remove('active');
  });
  

  document.addEventListener('click', (e) => {
    if (!popup.contains(e.target)) {
      popup.classList.remove('active');
    }
  });
  

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      popup.classList.remove('active');
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const speedWizardBtn = document.getElementById('speedWizardBtn');
  const speedWizardSection = document.getElementById('speedWizardSection');
  
  if (speedWizardBtn && speedWizardSection) {
    speedWizardBtn.addEventListener('click', () => {

      document.querySelector('#contacts').scrollIntoView({
        behavior: 'smooth'
      });
      

      setTimeout(() => {
        speedWizardSection.classList.remove('hidden');
        speedWizardSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 800);
    });
  }
});


function initThreeJS() {

}


function initScrollAnimations() {

}


document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {

      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      

      item.classList.toggle('active');
    });
  });
});

setTimeout(() => {
  const hint = document.createElement('div');
  hint.className = 'constructor-hint';
  hint.innerHTML = `
    <p>Не можете сформулировать задачу?</p>
    <a href="about.html">Попробуйте наш конструктор →</a>
    <button class="close-hint">&times;</button>
  `;
  document.body.appendChild(hint);
  
  document.querySelector('.close-hint').addEventListener('click', () => {
    hint.remove();
  });
}, 20000);


const privacyOverlay = document.getElementById('privacyOverlay');
const privacyAccept = document.getElementById('privacyAccept');
const privacyDecline = document.getElementById('privacyDecline');

function checkPrivacyAgreement() {
  if (!localStorage.getItem('privacyAgreed')) {
    setTimeout(() => {
      privacyOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; 
    }, 1000);
  }
}

function setPrivacyAgreement(agreed) {
  localStorage.setItem('privacyAgreed', agreed);
  privacyOverlay.classList.remove('active');
  document.body.style.overflow = ''; 
  
  if (agreed === 'false') {

    console.log('Пользователь не согласился с условиями');
  }
}

if (privacyAccept && privacyDecline) {
  privacyAccept.addEventListener('click', () => setPrivacyAgreement('true'));
  privacyDecline.addEventListener('click', () => setPrivacyAgreement('false'));
}


checkPrivacyAgreement();

