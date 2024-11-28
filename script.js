// Select all navigation links
const navLinks = document.getElementsByClassName('nav-link');

// Function to update the active link based on scroll position
function updateActiveLink() {
    const headerHeight = 85;
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
/*
// Handle form submission
const supabaseUrl = 'https://lgktlstnfwmpeiyqfjyh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxna3Rsc3RuZndtcGVpeXFmanloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzNTE2MDAsImV4cCI6MjA0NzkyNzYwMH0.TV9xPa2uRwLm7G-xTPjrxdaDd7EV44BIIJQ6kUOhDbg';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);
console.log('supabase client created');
console.log(supabase);

document.getElementsByClassName('form-fields')[0].addEventListener('submit', async function(e) {
    console.log('submitting form');
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const location = document.getElementById('location').value;
    const message = document.getElementById('message').value;

    const {data, error} = await supabase
        .from('messages')
        .insert([{name, email, location, message}]);

    if (error) {
        alert('Error submitting message: ' + error.message);
    } else {
        alert('Message submitted successfully!');
        this.reset();
    }

});


/*
function clearForm(e) {
    e.preventDefault();
    document.getElementsByClassName('form-fields')[0].reset();
    alert("Your Message has been sent")
}

window.addEventListener('submit', clearForm);
*/
