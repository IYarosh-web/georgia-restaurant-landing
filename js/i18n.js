import translations from './translations.js';

class I18n {
  constructor() {
    this.currentLang = localStorage.getItem('language') || 'en';
    this.translations = translations;
    this.translateElements();
    this.setupLanguageSwitcher();
  }

  setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('language', lang);
    this.translateElements();
    document.documentElement.setAttribute('lang', lang);
  }

  translate(key) {
    const keys = key.split('.');
    let value = this.translations[this.currentLang];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        console.log('unknown key', key);
        return key;
      }
    }
    
    return value;
  }

  translateElements() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = this.translate(key);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      element.placeholder = this.translate(key);
    });

    document.querySelectorAll('[data-i18n-value]').forEach(element => {
      const key = element.getAttribute('data-i18n-value');
      element.value = this.translate(key);
    });
  }

  setupLanguageSwitcher() {
    const languageSwitcher = document.createElement('div');
    languageSwitcher.className = 'language-switcher';
    
    const languages = [
      { code: 'en', name: 'EN' },
      { code: 'fr', name: 'FR' },
      { code: 'nl', name: 'NL' }
    ];

    languages.forEach(lang => {
      const button = document.createElement('button');
      button.textContent = lang.name;
      button.className = `lang-btn ${this.currentLang === lang.code ? 'active' : ''}`;
      button.addEventListener('click', () => {
        document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        this.setLanguage(lang.code);
      });
      languageSwitcher.appendChild(button);
    });

    // Insert language switcher in the header
    const header = document.querySelector('.header-content');
    header.insertBefore(languageSwitcher, header.querySelector('.nav-desktop'));
  }
}

export default new I18n();