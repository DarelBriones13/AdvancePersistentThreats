// Custom cursor
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
});

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Add staggered animation to nav links
    const links = navLinks.querySelectorAll('a');
    links.forEach((link, index) => {
        if (navLinks.classList.contains('active')) {
            link.style.animation = `slideIn 0.3s ease forwards ${index * 0.1}s`;
        } else {
            link.style.animation = '';
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('article-card')) {
                entry.target.style.animationDelay = `${entry.target.dataset.index * 0.1}s`;
            }
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Terminal typing effect
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize terminal typing effect
const terminalText = document.querySelector('.terminal-text');
if (terminalText) {
    const text = terminalText.textContent;
    typeWriter(terminalText, text);
}

// Add glitch effect to headings
function addGlitchEffect(element) {
    element.addEventListener('mouseover', () => {
        element.style.animation = 'glitch 0.3s infinite';
    });
    
    element.addEventListener('mouseout', () => {
        element.style.animation = '';
    });
}

document.querySelectorAll('.section-title').forEach(addGlitchEffect);

// Article grid population (example data)
const articles = [
    {
        title: 'APT29: Cozy Bear Operations',
        description: 'Analysis of Russian APT group activities',
        image: 'https://socradar.io/wp-content/uploads/2021/11/apt-profile-apt29-cozy-bear.png',
        date: '2024-03-20'
    },
    {
        title: 'Lazarus Group: North Korean Cyber Operations',
        description: 'Deep dive into DPRK-linked cyber attacks',
        image: 'https://www.threatstop.com/hs-fs/hubfs/north_korea_cybercrime.jpg?width=1800&height=1200&name=north_korea_cybercrime.jpg',
        date: '2024-03-19'
    },
    {
        title: 'APT28: Fancy Bear Tactics',
        description: 'Examining Russian military intelligence cyber operations',
        image: 'https://www.stamus-networks.com/hubfs/Stamus-Fancy-Bear.jpg',
        date: '2024-03-18'
    },
    {
        title: 'APT41: Chinese State-Sponsored Attacks',
        description: 'Analysis of Chinese cyber espionage operations',
        image: 'https://socprime.com/wp-content/uploads/Current-Banner-for-blog-red-3.png',
        date: '2024-03-17'
    }
];

// Populate article grid
const articleGrid = document.querySelector('.article-grid');
if (articleGrid) {
    articles.forEach((article, index) => {
        const articleCard = document.createElement('div');
        articleCard.className = 'article-card fade-in';
        articleCard.dataset.index = index;
        articleCard.innerHTML = `
            <div class="article-image">
                <img src="${article.image}" alt="${article.title}">
            </div>
            <div class="article-content">
                <span class="article-date">${article.date}</span>
                <h3>${article.title}</h3>
                <p>${article.description}</p>
            </div>
        `;
        articleGrid.appendChild(articleCard);
        observer.observe(articleCard);
    });
}

// Add hover effect to article cards
document.querySelectorAll('.article-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
        card.style.boxShadow = '0 0 30px var(--primary-glow)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = 'none';
    });
    
    // Add click effect
    card.addEventListener('click', () => {
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 200);
    });
});

// Add typing effect to log entries
const logEntries = document.querySelectorAll('.log-entry');
logEntries.forEach((entry, index) => {
    const text = entry.textContent;
    entry.textContent = '';
    setTimeout(() => {
        typeWriter(entry, text, 30);
    }, index * 1000);
});

// Add parallax effect to hero section
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });
}

// Add random glitch effect to nav logo
const navLogo = document.querySelector('.nav-logo');
if (navLogo) {
    setInterval(() => {
        if (Math.random() > 0.95) {
            navLogo.style.animation = 'glitch 0.3s';
            setTimeout(() => {
                navLogo.style.animation = '';
            }, 300);
        }
    }, 2000);
}

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
});

// Hacking Animation
const hackTrigger = document.getElementById('hackTrigger');
const hackOverlay = document.querySelector('.hack-overlay');
const typingTexts = document.querySelectorAll('.typing-text');

// Sound effect system using Web Audio API
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Store active warning sound nodes
let activeWarningNodes = {
    osc1: null,
    gainNode: null,
    interval: null
};

function createHackSound() {
    // Create oscillators for data transfer sound
    const carrier = audioContext.createOscillator();
    const modulator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    // Create modulation node
    const modulationGain = audioContext.createGain();
    modulationGain.gain.value = 50; // Modulation depth
    
    // Configure carrier oscillator (main tone)
    carrier.type = 'sine';
    carrier.frequency.setValueAtTime(1000, audioContext.currentTime);
    
    // Configure modulator oscillator (data-like modulation)
    modulator.type = 'square';
    modulator.frequency.setValueAtTime(50, audioContext.currentTime);
    
    // Configure filter for data-like quality
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1000, audioContext.currentTime);
    filter.Q.setValueAtTime(5, audioContext.currentTime);
    
    // Configure volume envelope for data packet effect
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15);
    
    // Connect nodes for frequency modulation
    modulator.connect(modulationGain);
    modulationGain.connect(carrier.frequency);
    carrier.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Start and stop the sound
    carrier.start();
    modulator.start();
    carrier.stop(audioContext.currentTime + 0.15);
    modulator.stop(audioContext.currentTime + 0.15);
}

function createWarningSound() {
    // Stop any existing warning sound
    stopWarningSound();
    
    // Create oscillator for warning sound
    const osc1 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Configure oscillator for warning sound
    osc1.type = 'sine'; // Clean sine wave for a clear beep
    osc1.frequency.setValueAtTime(1200, audioContext.currentTime); // Higher frequency for alert
    
    // Configure volume envelope for warning effect
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    
    // Connect nodes
    osc1.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Start the oscillator
    osc1.start();
    
    // Store active nodes
    activeWarningNodes = { osc1, gainNode };
    
    // Create beep pattern
    let isBeeping = false;
    function toggleBeep() {
        if (!activeWarningNodes.osc1) return; // Stop if sound was stopped
        
        const time = audioContext.currentTime;
        if (isBeeping) {
            // Fade out
            activeWarningNodes.gainNode.gain.setValueAtTime(0.2, time);
            activeWarningNodes.gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
        } else {
            // Fade in
            activeWarningNodes.gainNode.gain.setValueAtTime(0.001, time);
            activeWarningNodes.gainNode.gain.exponentialRampToValueAtTime(0.2, time + 0.1);
        }
        isBeeping = !isBeeping;
    }
    
    // Create beep pattern interval
    activeWarningNodes.interval = setInterval(toggleBeep, 400); // 400ms for each beep
    toggleBeep(); // Start first beep immediately
}

function stopWarningSound() {
    if (activeWarningNodes.osc1) {
        const time = audioContext.currentTime;
        // Clear interval
        if (activeWarningNodes.interval) {
            clearInterval(activeWarningNodes.interval);
        }
        // Fade out
        activeWarningNodes.gainNode.gain.setValueAtTime(activeWarningNodes.gainNode.gain.value, time);
        activeWarningNodes.gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.5);
        
        // Stop oscillator after fade out
        activeWarningNodes.osc1.stop(time + 0.5);
        
        // Clear active nodes
        activeWarningNodes = { osc1: null, gainNode: null, interval: null };
    }
}

function playClickSound() {
    // Resume audio context if it was suspended (browser requirement)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    createHackSound();
}

function playWarningSound() {
    // Resume audio context if it was suspended (browser requirement)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    createWarningSound();
}

// Add click sound to all clickable elements
document.addEventListener('click', (e) => {
    // Only play sound for actual clickable elements
    if (e.target.tagName === 'A' || 
        e.target.tagName === 'BUTTON' || 
        e.target.classList.contains('nav-toggle') ||
        e.target.classList.contains('article-card') ||
        e.target.classList.contains('nav-logo')) {
        playClickSound();
    }
});

// Modify the hack trigger event listener to include warning sound
if (hackTrigger && hackOverlay) {
    hackTrigger.addEventListener('click', () => {
        // Play warning sound
        playWarningSound();
        
        // Show overlay
        hackOverlay.classList.add('active');
        
        // Trigger typing animations with delays
        typingTexts.forEach((text, index) => {
            setTimeout(() => {
                text.classList.add('visible');
            }, index * 1000); // Stagger the animations
        });

        // Hide overlay and stop warning sound after all animations complete
        setTimeout(() => {
            hackOverlay.classList.remove('active');
            // Reset typing animations
            typingTexts.forEach(text => {
                text.classList.remove('visible');
            });
            // Stop the warning sound
            stopWarningSound();
        }, 8000); // Total animation duration
    });
}

// Loading Animation
const loadingOverlay = document.querySelector('.loading-overlay');
const loadingStatus = document.querySelector('.loading-status');
const loadingSteps = [
    'Initializing system...',
    'Loading security protocols...',
    'Establishing secure connection...',
    'Accessing database...',
    'System ready!'
];

let currentStep = 0;
const stepInterval = setInterval(() => {
    if (currentStep < loadingSteps.length) {
        loadingStatus.textContent = loadingSteps[currentStep];
        currentStep++;
    } else {
        clearInterval(stepInterval);
        setTimeout(() => {
            loadingOverlay.classList.add('fade-out');
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500);
        }, 1000);
    }
}, 800);

// Theme Toggle
const themeSwitch = document.getElementById('theme-switch');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Set initial theme
document.documentElement.setAttribute('data-theme', prefersDarkScheme.matches ? 'dark' : 'light');
themeSwitch.checked = !prefersDarkScheme.matches;

// Theme toggle handler
themeSwitch.addEventListener('change', () => {
    const theme = themeSwitch.checked ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeSwitch.checked = savedTheme === 'light';
}

// Add parallax effect to sections
document.querySelectorAll('section').forEach(section => {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        section.style.backgroundPositionY = `${rate}px`;
    });
});

// Matrix Rain Animation for Hero Section
function startMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    const fontSize = 18;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);
    const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    function draw() {
        ctx.fillStyle = 'rgba(0,0,0,0.08)';
        ctx.fillRect(0, 0, width, height);
        ctx.font = fontSize + 'px "Share Tech Mono", "Source Code Pro", monospace';
        ctx.fillStyle = '#00ff00';
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    let animationId;
    function animate() {
        draw();
        animationId = requestAnimationFrame(animate);
    }
    animate();

    // Responsive resize
    window.addEventListener('resize', () => {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    });
}

document.addEventListener('DOMContentLoaded', startMatrixRain);
window.addEventListener('load', startMatrixRain);

// Function to create spider SVG
function createSpiderSVG() {
    return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="4" fill="#00ff00" stroke="#00ff00" stroke-width="1"/>
        <path d="M12 8L8 4" stroke="#00ff00" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M12 8L16 4" stroke="#00ff00" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M12 16L8 20" stroke="#00ff00" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M12 16L16 20" stroke="#00ff00" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M8 12L4 12" stroke="#00ff00" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M16 12L20 12" stroke="#00ff00" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="12" cy="12" r="1" fill="#00ff00"/>
        <circle cx="8" cy="8" r="0.5" fill="#00ff00"/>
        <circle cx="16" cy="8" r="0.5" fill="#00ff00"/>
        <circle cx="8" cy="16" r="0.5" fill="#00ff00"/>
        <circle cx="16" cy="16" r="0.5" fill="#00ff00"/>
    </svg>`;
}

// Function to create spiders
function createSpiders() {
    const spidersContainer = document.querySelector('.roaming-spiders');
    spidersContainer.innerHTML = '';
    
    for (let i = 0; i < 6; i++) {
        const spider = document.createElement('div');
        spider.className = 'spider';
        spider.innerHTML = createSpiderSVG();
        spidersContainer.appendChild(spider);
    }
}

// Function to show spiders
function showSpiders() {
    const spiders = document.querySelectorAll('.spider');
    spiders.forEach(spider => {
        spider.classList.add('visible');
    });
}

// Function to hide spiders
function hideSpiders() {
    const spiders = document.querySelectorAll('.spider');
    spiders.forEach(spider => {
        spider.classList.remove('visible');
    });
}

// Modify the existing hackTrigger click handler
document.getElementById('hackTrigger').addEventListener('click', function() {
    const hackOverlay = document.querySelector('.hack-overlay');
    hackOverlay.classList.add('active');
    createSpiders();
    setTimeout(showSpiders, 100);
    
    // Play the warning sound
    playWarningSound();
    
    // Show typing text with delay
    const typingTexts = document.querySelectorAll('.typing-text');
    typingTexts.forEach((text, index) => {
        setTimeout(() => {
            text.classList.add('visible');
        }, index * 2000);
    });
    
    // Hide overlay after all animations
    setTimeout(() => {
        hideSpiders();
        setTimeout(() => {
            hackOverlay.classList.remove('active');
        }, 300);
    }, 10000);
});

// Chat Icon Functionality
const chatIcon = document.getElementById('chatIcon');
const chatMessage = document.getElementById('chatMessage');
const closeChat = document.querySelector('.close-chat');
const chatTexts = document.querySelectorAll('.chat-content .typing-text');

function toggleChat() {
    chatMessage.classList.toggle('active');
    if (chatMessage.classList.contains('active')) {
        // Play click sound
        playClickSound();

        // Show initial messages (reset and animate)
        const initialMessages = document.querySelectorAll('.message.system .typing-text');
        initialMessages.forEach(text => text.classList.remove('visible'));
        initialMessages.forEach((text, index) => {
            setTimeout(() => {
                text.classList.add('visible');
            }, index * 1000);
        });

        // Focus input
        setTimeout(() => {
            chatInput.focus();
        }, initialMessages.length * 1000);
    } else {
        // Reset messages
        const messages = document.querySelectorAll('.message');
        messages.forEach(message => {
            message.remove();
        });

        // Recreate initial message
        const initialMessage = document.createElement('div');
        initialMessage.className = 'message system';
        initialMessage.innerHTML = `
            <p class="typing-text">&gt; Initializing secure communication...</p>
            <p class="typing-text">&gt; Establishing encrypted channel...</p>
            <p class="typing-text">&gt; Connection established.</p>
            <p class="typing-text">&gt; Welcome to APT Research. How can I assist you today?</p>
        `;
        chatContent.appendChild(initialMessage);
        // Animate the initial messages after adding them
        const newInitialMessages = initialMessage.querySelectorAll('.typing-text');
        newInitialMessages.forEach((text, index) => {
            setTimeout(() => {
                text.classList.add('visible');
            }, index * 1000);
        });
    }
}

chatIcon.addEventListener('click', toggleChat);
closeChat.addEventListener('click', toggleChat);

// Close chat when clicking outside
document.addEventListener('click', (e) => {
    if (!chatIcon.contains(e.target) && 
        !chatMessage.contains(e.target) && 
        chatMessage.classList.contains('active')) {
        toggleChat();
    }
});

// Chat Functionality
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendMessage');
const chatContent = document.getElementById('chatContent');

// AI Response System
const aiResponses = {
    greetings: [
        "Hello! How can I assist you with APT research today?",
        "Greetings! What would you like to know about Advanced Persistent Threats?",
        "Welcome! I'm here to help you understand APT operations and defense strategies."
    ],
    apt: [
        "Advanced Persistent Threats (APTs) are sophisticated cyber attacks that target specific organizations or nations.",
        "APTs are characterized by their persistence, stealth, and strategic targeting of valuable information.",
        "APT groups often have significant resources and operate with specific objectives over extended periods."
    ],
    defense: [
        "Defending against APTs requires a multi-layered security approach.",
        "Key defense strategies include network segmentation, threat intelligence, and continuous monitoring.",
        "Regular security assessments and employee training are crucial for APT defense."
    ],
    default: [
        "I understand you're interested in APTs. Could you please be more specific?",
        "That's an interesting question about cybersecurity. Let me help you understand more about APTs.",
        "I can provide more detailed information about APT operations, defense strategies, or specific APT groups."
    ]
};

function getAIResponse(message) {
    message = message.toLowerCase();
    
    if (message.match(/hello|hi|hey|greetings/)) {
        return aiResponses.greetings[Math.floor(Math.random() * aiResponses.greetings.length)];
    }
    
    if (message.match(/apt|threat|attack|cyber/)) {
        return aiResponses.apt[Math.floor(Math.random() * aiResponses.apt.length)];
    }
    
    if (message.match(/defense|protect|security|prevent/)) {
        return aiResponses.defense[Math.floor(Math.random() * aiResponses.defense.length)];
    }
    
    return aiResponses.default[Math.floor(Math.random() * aiResponses.default.length)];
}

function addMessage(message, isUser = false) {
    console.log('addMessage called:', { message, isUser }); // DEBUG LOG
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'system'}`;
    
    const messageText = document.createElement('p');
    messageText.textContent = isUser ? message : `> ${message}`;
    messageDiv.appendChild(messageText);
    
    chatContent.appendChild(messageDiv);
    chatContent.scrollTop = chatContent.scrollHeight;
    
    // Animate the message
    setTimeout(() => {
        messageText.classList.add('visible');
    }, 100);
}

function handleUserMessage() {
    const message = chatInput.value.trim();
    if (message) {
        // Play click sound
        playClickSound();
        
        // Add user message
        addMessage(message, true);
        
        // Clear input
        chatInput.value = '';
        
        // Simulate AI thinking
        setTimeout(() => {
            // Add AI response
            const response = getAIResponse(message);
            addMessage(response);
        }, 1000);
    }
}

// Event Listeners
sendButton.addEventListener('click', handleUserMessage);

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserMessage();
    }
}); 