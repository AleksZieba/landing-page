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
