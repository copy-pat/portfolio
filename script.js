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


function showImage(e) {
    const activeImage = document.querySelector('.show-image');
    const sections = document.getElementsByTagName('SECTION');

    // Helper function to toggle blur on sections
    const toggleBlur = (add) => {
        for (const section of sections) {
            if (add) {
                section.classList.add('blur');
            } else {
                section.classList.remove('blur');
            }
        }
    };

    // If there's already an active image, do nothing
    if (activeImage) {
        return;
    }

    // Check if the clicked element should toggle the image
    if (e.target.classList.contains('toggle-image')) {
        const imgSrc = `./assets/${e.target.classList[0]}.jpg`;

        // Create the overlay image
        const img = document.createElement('img');
        img.src = imgSrc;
        img.classList.add('show-image');

        // Append the image to the body
        document.body.appendChild(img);

        // Blur the sections
        toggleBlur(true);

        // Add event listener to remove the image and unblur sections when clicking outside
        const removeImage = (e) => {
            if (!img.contains(e.target)) {
                img.remove(); // Remove the overlaid image
                toggleBlur(false); // Unblur sections
                document.body.removeEventListener('click', removeImage); // Clean up event listener
                console.log('Overlay image removed.');
            }
        };

        document.body.addEventListener('click', removeImage);
    }
}



window.addEventListener('click', showImage);