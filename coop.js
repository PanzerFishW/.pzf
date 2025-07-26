document.addEventListener('DOMContentLoaded', () => {

  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });
  }


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


  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  const coopForm = document.getElementById('cooperation-form');
  if (coopForm) {
    coopForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = {
        name: document.getElementById('coop-name').value,
        email: document.getElementById('coop-email').value,
        phone: document.getElementById('coop-phone').value,
        type: document.getElementById('coop-type').value,
        message: document.getElementById('coop-message').value
      };
      

      console.log('Форма отправлена:', formData);
      alert('Ваша заявка отправлена! Мы свяжемся с вами в ближайшее время.');
      coopForm.reset();
      

      gsap.fromTo('.submit-button', 
        { backgroundColor: '#4BB543' },
        { 
          backgroundColor: 'linear-gradient(90deg, var(--primary), var(--secondary))',
          duration: 2,
          delay: 1
        }
      );
    });
  }


  gsap.from(".coop-hero h1", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power2.out"
  });

  gsap.from(".coop-card", {
    scrollTrigger: {
      trigger: ".coop-grid",
      start: "top 70%",
      toggleActions: "play none none none"
    },
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "power2.out"
  });

  gsap.from(".process-step", {
    scrollTrigger: {
      trigger: ".coop-process",
      start: "top 70%",
      toggleActions: "play none none none"
    },
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "power2.out"
  });
});