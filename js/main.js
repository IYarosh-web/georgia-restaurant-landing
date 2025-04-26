// Main JavaScript File
import './i18n.js';

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMobile = document.querySelector('.nav-mobile');
  
  if (mobileMenuToggle && navMobile) {
    mobileMenuToggle.addEventListener('click', function() {
      navMobile.classList.toggle('active');
      document.body.classList.toggle('menu-open');
      
      const spans = this.querySelectorAll('span');
      
      if (navMobile.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }
  
  // Sticky header
  const header = document.querySelector('.header');
  let scrollPos = 0;
  
  function checkScrollPosition() {
    const currentScrollPos = window.pageYOffset;
    
    if (currentScrollPos > 80) {
      header.style.padding = '10px 0';
      header.style.backgroundColor = 'rgba(31, 31, 31, 0.95)';
    } else {
      header.style.padding = '16px 0';
      header.style.backgroundColor = 'rgba(31, 31, 31, 0.8)';
    }
    
    scrollPos = currentScrollPos;
  }
  
  window.addEventListener('scroll', checkScrollPosition);
  checkScrollPosition();
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Close mobile menu if open
          if (navMobile && navMobile.classList.contains('active')) {
            navMobile.classList.remove('active');
            mobileMenuToggle.querySelectorAll('span').forEach(span => {
              span.style.transform = 'none';
              span.style.opacity = '1';
            });
          }
          
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Active menu item on scroll
  const sections = document.querySelectorAll('section[id]');
  
  function setActiveMenuItem() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector('.nav-desktop a[href*=' + sectionId + ']')?.classList.add('active');
        document.querySelector('.nav-mobile a[href*=' + sectionId + ']')?.classList.add('active');
      } else {
        document.querySelector('.nav-desktop a[href*=' + sectionId + ']')?.classList.remove('active');
        document.querySelector('.nav-mobile a[href*=' + sectionId + ']')?.classList.remove('active');
      }
    });
  }
  
  window.addEventListener('scroll', setActiveMenuItem);
  setActiveMenuItem();
  
  // Fade-in animation on scroll
  const fadeElements = document.querySelectorAll('.fade-in');
  
  function checkFade() {
    fadeElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', checkFade);
  checkFade(); // Check on page load
  
  // Current year in footer
  const yearElement = document.querySelector('.footer-bottom p');
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
  }
  
  // Handle form submission
  const reservationForm = document.querySelector('.reservation-form form');
  if (reservationForm) {
    reservationForm.addEventListener('submit', function(event) {
      event.preventDefault();
      // In a real implementation, you would send the form data to your server
      // For demonstration purposes, we'll just display a success message
      alert(i18n.translate('contact.form.success'));
      this.reset();
    });
  }
});