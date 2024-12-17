// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    /* Smooth Scroll for Anchor Links */
    const smoothScrollLinks = document.querySelectorAll('a.scrolly');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* Fade-in Effect on Scroll */
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("appear");
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    /* Responsive Navigation Toggle */
    const navToggle = document.createElement('div');
    navToggle.id = "nav-toggle";
    navToggle.innerHTML = "<span></span><span></span><span></span>";
    document.querySelector('#nav').appendChild(navToggle);

    const nav = document.querySelector('#nav ul.links');
    navToggle.addEventListener('click', function () {
        nav.classList.toggle('active');
        navToggle.classList.toggle('open');
    });

    /* Highlight Active Navigation Link */
    const navLinks = document.querySelectorAll("#nav .links a");
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", function () {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    /* Contact Form Placeholder Animation (Optional) */
    const formFields = document.querySelectorAll("input, textarea");
    formFields.forEach(field => {
        field.addEventListener("focus", () => field.classList.add("focused"));
        field.addEventListener("blur", () => {
            if (!field.value) field.classList.remove("focused");
        });
    });
});
