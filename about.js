const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const nextBtn = document.querySelector('.next-step');
const prevBtn = document.querySelector('.prev-step');


const orderData = {
  type: null,
  features: [],
  design: {
    style: 'minimal',
    colors: 'dark',
    animations: 'none',
    typography: 'basic',
    illustrations: 'none',
    uiKit: 'basic',
    brandDesign: [],
    additionalDesign: []
  },
  discounts: {
    prepayment: false,
    promoCode: null,
    promoDiscount: 0
  },
  appliedDiscounts: [],
  total: 0
};


const typePrices = {
  landing: 20000,
  corporate: 50000,
  shop: 80000,
  app: 120000
};


const featurePrices = {
  'feature-cms': 15000,
  'feature-seo': 10000,
  'feature-analytics': 5000,
  'feature-multilang': 20000,
  'feature-blog': 12000,
  'feature-membership': 25000,
  'feature-payment': 20000,
  'feature-api': 30000,
  'feature-admin': 18000,
  'feature-support': 15000
};


const stylePrices = {
  minimal: 0,
  corporate: 10000,
  creative: 15000,
  luxury: 25000,
  custom: 50000
};


const animationPrices = {
  none: 0,
  basic: 5000,
  advanced: 15000,
  premium: 30000,
  micro: 10000
};

const typographyPrices = {
  basic: 0,
  premium: 8000,
  custom: 15000
};

const illustrationPrices = {
  none: 0,
  stock: 5000,
  custom: 30000,
  '3d': 45000
};

const uiKitPrices = {
  basic: 0,
  extended: 12000,
  custom: 25000
};

const brandDesignPrices = {
  'brand-logo': 20000,
  'brand-identity': 35000,
  'brand-book': 45000
};

const additionalDesignPrices = {
  'design-consult': 5000,
  'design-audit': 15000,
  'design-system': 50000
};


let currentStep = 1;


document.addEventListener('DOMContentLoaded', () => {
  initProjectTypeSelection();
  initFeatureSelection();
  initDesignOptions();
  initNavigation();
  initMenu();
  initTypewriter();
  initScrollHeader();
  

  document.querySelector('.color-scheme[data-scheme="dark"]').classList.add('selected');
  

  goToStep(1);
  

  gsap.from(".about-hero h1", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power2.out"
  });
});


function initMenu() {
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });
  }

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
}


function initTypewriter() {
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
}


function initScrollHeader() {
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
}

function initProjectTypeSelection() {
  document.querySelectorAll('.project-type').forEach(type => {
    type.addEventListener('click', () => {

      document.querySelectorAll('.project-type').forEach(t => {
        t.classList.remove('selected');
      });
      

      type.classList.add('selected');
      orderData.type = type.dataset.type;
      

      const brandSection = document.getElementById('brand-design-section');
      if (type.dataset.type === 'corporate') {
        brandSection.style.display = 'block';
      } else {
        brandSection.style.display = 'none';

        document.querySelectorAll('#brand-design-section .feature-checkbox').forEach(cb => {
          cb.checked = false;
        });
        orderData.design.brandDesign = [];
      }
      

      gsap.to(type, {
        scale: 1.05,
        duration: 0.2,
        yoyo: true,
        repeat: 1
      });
      
      calculateTotal();
    });
  });
}


function initFeatureSelection() {
  document.querySelectorAll('.feature-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const featureId = this.id;
      
      if (this.checked) {
        orderData.features.push(featureId);
      } else {
        orderData.features = orderData.features.filter(f => f !== featureId);
      }
      
      calculateTotal();
    });
  });
}


function initDesignOptions() {

  document.getElementById('design-style').addEventListener('change', function() {
    orderData.design.style = this.value;
    calculateTotal();
  });

  document.querySelectorAll('.color-scheme').forEach(scheme => {
    scheme.addEventListener('click', function() {
      document.querySelectorAll('.color-scheme').forEach(s => {
        s.classList.remove('selected');
      });
      this.classList.add('selected');
      orderData.design.colors = this.dataset.scheme;
      calculateTotal();
    });
  });

  document.getElementById('animation-level').addEventListener('change', function() {
    orderData.design.animations = this.value;
    calculateTotal();
  });

  document.getElementById('typography').addEventListener('change', function() {
    orderData.design.typography = this.value;
    calculateTotal();
  });

  document.getElementById('illustrations').addEventListener('change', function() {
    orderData.design.illustrations = this.value;
    calculateTotal();
  });

  document.getElementById('ui-kit').addEventListener('change', function() {
    orderData.design.uiKit = this.value;
    calculateTotal();
  });

  document.querySelectorAll('#brand-design-section .feature-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const featureId = this.id;
      if (this.checked) {
        orderData.design.brandDesign.push(featureId);
      } else {
        orderData.design.brandDesign = orderData.design.brandDesign.filter(f => f !== featureId);
      }
      calculateTotal();
    });
  });

  document.querySelectorAll('.additional-design-options .feature-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const featureId = this.id;
      if (this.checked) {
        orderData.design.additionalDesign.push(featureId);
      } else {
        orderData.design.additionalDesign = orderData.design.additionalDesign.filter(f => f !== featureId);
      }
      calculateTotal();
    });
  });

  document.getElementById('full-prepayment').addEventListener('change', function() {
    orderData.discounts.prepayment = this.checked;
    calculateTotal();
  });

  document.getElementById('apply-promo').addEventListener('click', function() {
    const promoInput = document.getElementById('promo-code-input');
    const promoCode = promoInput.value.trim();
    
    if (!promoCode) return;
    
    const validPromos = {
      'WELCOME10': 5000,
      'SUMMER2025': 10000,
      'MAGIC15': orderData.total * 0.15
    };
    
    if (validPromos[promoCode]) {
      orderData.discounts.promoCode = promoCode;
      orderData.discounts.promoDiscount = typeof validPromos[promoCode] === 'function' 
        ? validPromos[promoCode]() 
        : validPromos[promoCode];
      alert('Промокод применен!');
    } else {
      alert('Промокод недействителен');
    }
    
    calculateTotal();
  });
}

function initNavigation() {
  nextBtn.addEventListener('click', () => {
    if (currentStep === 4) {
      submitOrder();
    } else {
      goToStep(currentStep + 1);
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  });
}

function goToStep(step) {
  if (step > currentStep) {
    if (currentStep === 1 && !orderData.type) {
      alert('Пожалуйста, выберите тип проекта');
      return;
    }
  }

  document.querySelectorAll('.constructor-step').forEach(s => {
    s.classList.remove('active');
  });
  document.querySelectorAll('.step-indicator .step').forEach(s => {
    s.classList.remove('active');
  });

  currentStep = step;
  document.querySelector(`.constructor-step[data-step="${step}"]`).classList.add('active');
  document.querySelector(`.step-indicator .step[data-step="${step}"]`).classList.add('active');

  prevBtn.disabled = currentStep === 1;
  nextBtn.textContent = currentStep === 4 ? 'Завершить' : 'Далее';

  if (currentStep === 4) {
    updateOrderSummary();
  }
}

function calculateDiscounts() {
  let discount = 0;
  orderData.appliedDiscounts = [];
  
  if (orderData.discounts.prepayment) {
    discount += orderData.total * 0.1;
    orderData.appliedDiscounts.push('Скидка за предоплату: 10%');
  }
  
  if (orderData.discounts.promoCode) {
    discount += orderData.discounts.promoDiscount;
    orderData.appliedDiscounts.push(`Промокод "${orderData.discounts.promoCode}": -${orderData.discounts.promoDiscount}₽`);
  }
  
  if (orderData.total > 100000) {
    const bigOrderDiscount = Math.floor(orderData.total / 50000) * 0.05;
    discount += orderData.total * bigOrderDiscount;
    orderData.appliedDiscounts.push(`Скидка за большой заказ: ${bigOrderDiscount * 100}%`);
  }
  
  return discount;
}

function calculateTotal() {
  let total = 0;

  total += typePrices[orderData.type] || 0;
  
  orderData.features.forEach(feature => {
    total += featurePrices[feature] || 0;
  });
  
  total += stylePrices[orderData.design.style] || 0;
  total += typographyPrices[orderData.design.typography] || 0;
  total += illustrationPrices[orderData.design.illustrations] || 0;
  total += uiKitPrices[orderData.design.uiKit] || 0;
  
  orderData.design.brandDesign.forEach(item => {
    total += brandDesignPrices[item] || 0;
  });
  
  orderData.design.additionalDesign.forEach(item => {
    total += additionalDesignPrices[item] || 0;
  });

  if (orderData.design.colors === 'custom') {
    total += 5000;
  }
  
  total += animationPrices[orderData.design.animations] || 0;
  
  orderData.total = total;
  const discount = calculateDiscounts();
  orderData.total = Math.max(0, orderData.total - discount);
  
  return orderData.total;
}

function updateOrderSummary() {
  document.getElementById('summary-type').textContent = getTypeName(orderData.type) || 'Не выбран';
  document.getElementById('summary-features').textContent = 
    orderData.features.length > 0 ? orderData.features.map(getFeatureName).join(', ') : 'Нет';
  document.getElementById('summary-style').textContent = getDesignStyleName(orderData.design.style);
  document.getElementById('summary-colors').textContent = getColorSchemeName(orderData.design.colors);
  document.getElementById('summary-animations').textContent = getAnimationName(orderData.design.animations);
  document.getElementById('summary-typography').textContent = getTypographyName(orderData.design.typography);
  document.getElementById('summary-illustrations').textContent = getIllustrationName(orderData.design.illustrations);
  document.getElementById('summary-ui-kit').textContent = getUiKitName(orderData.design.uiKit);
  document.getElementById('summary-total').textContent = `${orderData.total.toLocaleString()}₽`;
}

function getTypeName(type) {
  const types = {
    landing: 'Лендинг',
    corporate: 'Корпоративный сайт',
    shop: 'Интернет-магазин',
    app: 'Мобильное приложение'
  };
  return types[type] || 'Не выбран';
}

function getFeatureName(featureId) {
  const features = {
    'feature-cms': 'CMS система',
    'feature-seo': 'SEO оптимизация',
    'feature-analytics': 'Аналитика',
    'feature-multilang': 'Мультиязычность',
    'feature-blog': 'Блог',
    'feature-membership': 'Система пользователей',
    'feature-payment': 'Платежная система',
    'feature-api': 'API',
    'feature-admin': 'Админ-панель',
    'feature-support': 'Техподдержка'
  };
  return features[featureId] || featureId;
}

function getDesignStyleName(style) {
  const styles = {
    minimal: 'Минимализм',
    corporate: 'Корпоративный',
    creative: 'Креативный',
    luxury: 'Премиум',
    custom: 'Индивидуальный'
  };
  return styles[style] || 'Не выбран';
}

function getColorSchemeName(colors) {
  const schemes = {
    dark: 'Темная',
    light: 'Светлая',
    custom: 'Индивидуальная'
  };
  return schemes[colors] || 'Не выбрана';
}

function getAnimationName(anim) {
  const animations = {
    none: 'Без анимаций',
    basic: 'Базовые',
    advanced: 'Продвинутые',
    premium: 'Премиум',
    micro: 'Микроанимации'
  };
  return animations[anim] || 'Не выбраны';
}

function getTypographyName(type) {
  const types = {
    basic: 'Базовые шрифты',
    premium: 'Премиум шрифты',
    custom: 'Индивидуальный подбор'
  };
  return types[type] || 'Не выбрано';
}

function getIllustrationName(ill) {
  const ills = {
    none: 'Без иллюстраций',
    stock: 'Стоковые изображения',
    custom: 'Кастомные иллюстрации',
    '3d': '3D-графика'
  };
  return ills[ill] || 'Не выбрано';
}

function getUiKitName(kit) {
  const kits = {
    basic: 'Базовый UI-кит',
    extended: 'Расширенный UI-кит',
    custom: 'Полный кастомный'
  };
  return kits[kit] || 'Не выбрано';
}

function submitOrder() {
  const name = document.getElementById('order-name').value.trim();
  const email = document.getElementById('order-email').value.trim();
  const phone = document.getElementById('order-phone').value.trim();
  const comments = document.getElementById('order-comments').value.trim();

  if (!name || !email || !phone) {
    alert('Пожалуйста, заполните все обязательные поля');
    return;
  }

  console.log('Заказ оформлен:', {
    ...orderData,
    customer: { name, email, phone, comments }
  });

  alert('Заказ успешно оформлен! Мы свяжемся с вами в ближайшее время.');
}