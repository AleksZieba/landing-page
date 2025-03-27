document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      const heroHighlight = document.querySelector('.hero-highlight');
      if (!heroHighlight) return;
  
      // Get the full text and clear the element.
      const fullText = heroHighlight.textContent.trim();
      heroHighlight.textContent = '';
  
      // Create a container for the text and a cursor element.
      const textContainer = document.createElement('span');
      const cursor = document.createElement('span');
      cursor.classList.add('cursor');
  
      // Append the text container and then the cursor to keep them on the same line.
      heroHighlight.appendChild(textContainer);
      heroHighlight.appendChild(cursor);
  
      // A simple pseudo random generator seeded with a constant.
      const seeder = function(seed) {
        return function rand() {
          seed *= 1103512545 + 12345;
          seed--;
          seed %= Number.MAX_SAFE_INTEGER;
          return seed / Number.MAX_SAFE_INTEGER;
        };
      };
  
      const rand = seeder(1337);
      let currentIndex = 0;
      let lastTime = performance.now();
      let nextDelay = 50 + rand() * 250;
  
      function typeStep(timestamp) {
        const elapsed = timestamp - lastTime;
        if (elapsed > nextDelay && currentIndex < fullText.length) {
          textContainer.textContent += fullText[currentIndex];
          currentIndex++;
          lastTime = timestamp;
          nextDelay = 50 + rand() * 250;
        }
        if (currentIndex < fullText.length) {
          requestAnimationFrame(typeStep);
        } else {
          // Optionally, you can remove any extra blinking style here once finished.
          cursor.classList.remove('blinking');
        }
      }
  
      requestAnimationFrame(typeStep);
    }, 500);
  });
/*// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      
      // Toggle icon between bars and X
      if (mobileMenu.classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
      } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
      }
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-menu-links a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
      });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for navbar height
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillSection = document.querySelector('.skills-section');
    
    function animateSkills() {
      if (isElementInViewport(skillSection)) {
        skillBars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0';
          setTimeout(() => {
            bar.style.width = width;
          }, 100);
        });
        window.removeEventListener('scroll', animateSkills);
      }
    }
    
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    }
    
    window.addEventListener('scroll', animateSkills);
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const firstName = contactForm.querySelector('input[placeholder="First Name"]').value;
        const lastName = contactForm.querySelector('input[placeholder="Last Name"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!firstName || !lastName || !email || !message) {
          alert('Please fill in all fields');
          return;
        }
        
        // Here you would typically send the form data to a server
        // For this static example, we'll just show a success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
      });
    }
  }); */