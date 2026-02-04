// --- 1. Mobile Menu Toggle ---
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const icon = document.querySelector('.mobile-menu-btn i');
    
    navLinks.classList.toggle('active');
    
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.getElementById('navLinks');
        const icon = document.querySelector('.mobile-menu-btn i');
        navLinks.classList.remove('active');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// --- 2. Scroll Animation (Intersection Observer) ---
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    root: null,
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => revealObserver.observe(el));

// --- 3. ScrollSpy (Active Navigation Highlight) ---
const sections = document.querySelectorAll('section, div.slider-section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('href').includes(current)) {
            li.classList.add('active');
        }
    });
});

// --- 4. Service Detail View Logic ---
function openServiceDetail(serviceId) {
    // Hide Grid and Header
    document.getElementById('services-grid-container').style.display = 'none';
    document.getElementById('services-header-text').style.display = 'none';
    
    // Hide all detail views first
    const details = document.querySelectorAll('.service-detail-container');
    details.forEach(el => el.classList.remove('active'));

    // Show specific detail view
    const selectedDetail = document.getElementById('detail-' + serviceId);
    if(selectedDetail) {
        selectedDetail.classList.add('active');
        
        // Scroll to top of services section for better UX
        const servicesSection = document.getElementById('services');
        const headerOffset = 100;
        const elementPosition = servicesSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
}

function closeServiceDetail() {
    // Hide all detail views
    const details = document.querySelectorAll('.service-detail-container');
    details.forEach(el => el.classList.remove('active'));

    // Show Grid and Header
    document.getElementById('services-grid-container').style.display = 'grid';
    document.getElementById('services-header-text').style.display = 'block';
}

// --- 5. Image Slider Logic ---
const track = document.getElementById('sliderTrack');
const slides = Array.from(track.children);
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const dotsContainer = document.getElementById('sliderDots');

let currentIndex = 0;
let slideInterval;

// Create Dots
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = Array.from(dotsContainer.children);

function updateSlidePosition() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    slides.forEach((slide, index) => {
        if (index === currentIndex) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function goToSlide(index) {
    currentIndex = index;
    if (currentIndex < 0) currentIndex = slides.length - 1;
    if (currentIndex >= slides.length) currentIndex = 0;
    updateSlidePosition();
    resetTimer();
}

function nextSlide() {
    goToSlide(currentIndex + 1);
}

function prevSlide() {
    goToSlide(currentIndex - 1);
}

// Auto Play
function startTimer() {
    slideInterval = setInterval(nextSlide, 5000);
}

function resetTimer() {
    clearInterval(slideInterval);
    startTimer();
}

// Event Listeners
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Pause on Hover
const sliderContainer = document.getElementById('imageSlider');
sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
sliderContainer.addEventListener('mouseleave', startTimer);

// Start
startTimer();
