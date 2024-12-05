// Select all navigation links
const navLinks = document.getElementsByClassName('nav-link');

// Update the active link based on scroll position
function updateActiveLink() {
    const headerHeight = 125;
    let currentSection = '';
    document.querySelectorAll('.section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - headerHeight) {
            currentSection = section.getAttribute('id');
        }
    });    

    // Remove 'active' class from all links and add to the current one
    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove('active');
        if (navLinks[i].getAttribute('href').substring(1) === currentSection) {
            navLinks[i].classList.add('active');
        }
    };
}

// Listen for scroll events to update active link
window.addEventListener('scroll', updateActiveLink);

// Redirect
function redirect(e) {
    if (e.target.classList.contains('redirect')) {
        window.location.href = `http://127.0.0.1:5500/show-image.html?imageUrl=${e.target.classList[0]}&pages=${e.target.classList[1]}`;
        console.log('redirect')
    }
}


window.addEventListener('click', redirect);