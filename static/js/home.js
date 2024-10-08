document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll('.argument_element');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Stop observing once the animation is triggered
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    elements.forEach(element => {
        observer.observe(element);
    });
    const logos = document.querySelectorAll('.logo_image');

    const observerB = new IntersectionObserver((entries, observerB) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observerB.unobserve(entry.target); // Stop observing once animation is triggered
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    logos.forEach(logo => {
        observerB.observe(logo);
    });
});
