document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Logic
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Smooth follow for outline
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover effect for interactive elements (cursor expands)
    const interactiveElements = document.querySelectorAll('a, button, .platform-item, .glass-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        });

        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.borderColor = 'var(--accent-color)';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Add fade-in-up class dynamically if not present but desired
                // or toggle specific classes
            }
        });
    }, observerOptions);

    // Platform Hover Effects (enhanced js logic if needed, currently CSS handles most)
    const platforms = document.querySelectorAll('.platform-item');
    platforms.forEach(p => {
        p.addEventListener('mouseenter', () => {
            // Optional: Dim others
            platforms.forEach(other => {
                if (other !== p) other.style.opacity = '0.5';
            });
        });
        p.addEventListener('mouseleave', () => {
            platforms.forEach(other => {
                other.style.opacity = '1';
            });
        });
    });

    // Contact Modal Logic
    const modal = document.getElementById('contact-modal');
    const openBtn = document.getElementById('open-contact-modal');
    const closeBtn = document.querySelector('.close-btn');
    const contactForm = document.getElementById('contact-form');

    if (openBtn && modal && closeBtn) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('open');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Construct mailto link
            // Note: Replace 'contact@example.com' with the actual destination email
            const destinationEmail = 'contact@example.com';
            const mailtoLink = `mailto:${destinationEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;

            window.location.href = mailtoLink;

            // Close modal after initiating email client
            setTimeout(() => {
                modal.classList.remove('open');
                document.body.style.overflow = '';
                contactForm.reset();
            }, 500);
        });
    }

});
