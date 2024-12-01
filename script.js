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


// Toggle the visibility of the clicked image
function toggleHiddenImages(e) {
    // Get the image related to the clicked element
    const _image = e.target.parentElement.nextElementSibling;

    // If there's an active 'show-image', hide it
    const activeImage = document.querySelector('.show-image');
    if (activeImage && activeImage !== _image) {
        activeImage.classList.remove('show-image');
    }

    // Check if the click target is not an image or if the target is the image to toggle
    if (e.target.tagName !== 'IMG') {
        console.log('Clicked outside the image');
        return;
    }

    // Toggle the visibility of the clicked image
    if (_image) {
        _image.classList.toggle('show-image');
        console.log(`Image toggled: ${_image.classList}`);
    }
}


window.addEventListener('click', toggleHiddenImages);