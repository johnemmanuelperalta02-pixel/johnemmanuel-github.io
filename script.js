// =========================================
// THEME TOGGLE (DARK / LIGHT MODE) LOGIC
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.querySelector(".theme-toggle");
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            // Toggle the light mode class on the body element
            document.body.classList.toggle("light-mode");
            
            // Check if light mode is active to swap the SVG icon inside the button
            if (document.body.classList.contains("light-mode")) {
                // Sun Icon for Light Mode
                themeToggleBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                `;
            } else {
                // Moon Icon for Dark Mode
                themeToggleBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                `;
            }
        });
    }
});

// Smooth scrolling for navigation links (automatically includes the new skills link)
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for the fixed navbar height
                behavior: 'smooth'
            });
        }
    });
});

console.log("Skills section successfully added to navigation logic!");

// =========================================
// AUTOMATED TYPING TEXT LOGIC
// =========================================

// Put your name or job title inside this array!
const wordsToType = ["John Emmanuel Peralta", "An Aspiring Developer"]; 
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typedTextSpan = document.getElementById("typed-text");
// Speed configurations (in milliseconds)
const typingSpeed = 150;
const erasingSpeed = 100;
const delayBetweenWords = 2000; 

function typeEffect() {
    const currentWord = wordsToType[wordIndex];
    
    if (isDeleting) {
        // Remove characters
        typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Add characters
        typedTextSpan.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    // Determine logic speed transitions
    let currentSpeed = isDeleting ? erasingSpeed : typingSpeed;

    // Checking if word execution is completely typed out
    if (!isDeleting && charIndex === currentWord.length) {
        currentSpeed = delayBetweenWords; // Pause at full word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % wordsToType.length; // Move to next word array string
        currentSpeed = 500; // Small pause before typing next string
    }

    setTimeout(typeEffect, currentSpeed);
}

// Start the typing animation cycle once DOM loads completely
document.addEventListener("DOMContentLoaded", () => {
    if (typedTextSpan) {
        setTimeout(typeEffect, 1000); // 1-second delay before typing starts
    }
});
