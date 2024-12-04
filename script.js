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

// Listen for click events to toggle image overlay
async function showImage(e) {
    const activeContainer = document.querySelector('.overlay-container');
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

    // If there’s already an active container, do nothing
    if (activeContainer) {
        return;
    }

    // Check if the clicked element should toggle the image
    if (e.target.classList.contains('toggle-image')) {
        const baseSrc = `./assets/${e.target.classList[0]}`;
        const imgSrc1 = `${baseSrc}-0.jpg`;
        const imgSrc2 = `${baseSrc}-1.jpg`;

        // Create the container
        const container = document.createElement('div');
        container.classList.add('overlay-container');
        console.log(container);

        // Check if images exist
        async function checkImageExists(imagePath) {
            try {
                const response = await fetch(imagePath, { method: 'HEAD' });
                return response.ok;
            } catch {
                return false;
            }
        }
        
        // Create image if it exists
        const createImage = (src) => {
            const img = document.createElement('img');
            img.src = src;
            return img;
        };

        const addImage = async (src) => {
            const exists = await checkImageExists(src);
            return exists ? createImage(src) : null;
        };

        Promise.all([addImage(imgSrc1), addImage(imgSrc2)]).then((images) => {
            const validImages = images.filter(Boolean);

            if (validImages.length === 0) {
                return; // Do nothing if no images exist
            }

            validImages.forEach((img) => container.appendChild(img));
            container.classList.add(validImages.length === 1 ? 'single' : 'multiple');
            document.body.appendChild(container);
            console.log(container)

            // Blur the sections
            toggleBlur(true);

            // Add event listener to remove the images and unblur sections
            const removeImages = (e) => {
                if (!container.contains(e.target)) {
                    container.remove(); // Remove the overlay container
                    toggleBlur(false); // Unblur sections
                    document.body.removeEventListener('click', removeImages); // Clean up event listener
                    console.log('Overlay images removed.');
                }
            };

            document.body.addEventListener('click', removeImages);
        });
    }
}



window.addEventListener('click', showImage);