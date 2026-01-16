document.addEventListener('DOMContentLoaded', () => {
    
    // --- Countdown Timer ---
    const eventDate = new Date("March 28, 2026 09:00:00").getTime();
    
    const timeElements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };

    function updateTimer() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            // Event passed
            document.querySelector('.countdown-container').innerHTML = "<div>Event Started!</div>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Add leading zeros
        timeElements.days.innerText = days < 10 ? `0${days}` : days;
        timeElements.hours.innerText = hours < 10 ? `0${hours}` : hours;
        timeElements.minutes.innerText = minutes < 10 ? `0${minutes}` : minutes;
        timeElements.seconds.innerText = seconds < 10 ? `0${seconds}` : seconds;
    }

    setInterval(updateTimer, 1000);
    updateTimer(); // Run immediate once

    // --- Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    const icon = themeToggle.querySelector('.material-icons-round');

    // Check saved preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlEl.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        icon.innerText = theme === 'light' ? 'dark_mode' : 'light_mode';
    }

    // --- Registration Modal ---
    const modal = document.getElementById('reg-modal');
    const registerBtns = [
        document.getElementById('register-btn-hero'),
        document.getElementById('register-btn-footer')
    ];
    const closeBtns = [
        document.querySelector('.close-modal'),
        document.querySelector('.close-btn-action')
    ];

    registerBtns.forEach(btn => {
        if(btn) {
            btn.addEventListener('click', () => {
                modal.classList.add('active');
            });
        }
    });

    closeBtns.forEach(btn => {
        if(btn) {
            btn.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }
    });

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

});
