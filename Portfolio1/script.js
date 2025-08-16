// Initialize Typed.js
const typed = new Typed('.myhobby', {
  strings: [
    'Full-Stack Developer',
    'Designer',
    'DSA Problem Solver',
    'Java Programmer',
    'Python Programmer'
  ],
  typeSpeed: 70,
  backSpeed: 70,
  backDelay: 1000,
  loop: true,
});

// Flip sound
const pageFlipSound = new Audio('page-flip.mp3');

// Page Turn Buttons
const pageTurnBtns = document.querySelectorAll('.nextprev-btn');

pageTurnBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const pageTurnId = btn.getAttribute('data-page');
    const page = document.getElementById(pageTurnId);
    const isTurned = page.classList.contains('turn');

    // Play sound
    pageFlipSound.currentTime = 0; // rewind to start
    pageFlipSound.play();

    if (isTurned) {
      page.classList.remove('turn');
      setTimeout(() => {
        page.style.zIndex = 20 - index;
      }, 600);
    } else {
      page.classList.add('turn');
      setTimeout(() => {
        page.style.zIndex = 20 + index;
      }, 600);
    }
  });
});

// Contact Me Button Flip All
const contactMeBtn = document.querySelector('.btn.contact-me');
const pages = document.querySelectorAll('.book-page.page-right');

if (contactMeBtn) {
  contactMeBtn.addEventListener('click', () => {
    pages.forEach((page, index) => {
      setTimeout(() => {
        // Play sound each turn
        pageFlipSound.currentTime = 0;
        pageFlipSound.play();

        page.classList.add('turn');
        setTimeout(() => {
          page.style.zIndex = 20 + index;
        }, 500);
      }, (index + 1) * 250);
    });
  });
}

//create reverse index function

let totalPages = pages.length;
let pageNumber = 0;

function reverseIndex(){
  pageNumber--;
  if(pageNumber < 0){
    pageNumber = totalPages - 1;
  }
}

//back profile button was click

const backProfileBtn = document.querySelector('.back-profile');

backProfileBtn.onclick = () => {
  pages.forEach((_, index) => {
  setTimeout(() => {
    reverseIndex();
    pages[pageNumber].classList.remove('turn');
    
    //play sound of each turn
    pageFlipSound.currentTime=0;
    pageFlipSound.play();

    setTimeout(() => {
      reverseIndex();
      pages[pageNumber].style.zIndex = 10 + index;
    }, 500)

  }, (index + 1) * 200 + 100)
  })
}


// // opening animation

const coverRight = document.querySelectorAll('.cover.cover-right');
const pageLeft = document.querySelectorAll('.book-page.page-left');

// Apply the 'turn' class to each element after delay
setTimeout(() => {
  coverRight.forEach(el => el.classList.add('turn'));
}, 2100)

// Set zIndex for each .cover.cover-right
setTimeout(() => {
  coverRight.forEach(el => {
    el.style.zIndex = -1;
  });
}, 2800);

//opening animation (page left or profile page animation)
setTimeout(() => {
  pageLeft.forEach(el => {
    el.style.zIndex = 20;
  });
}, 3200);


// Pages reverse animation after opening
pages.forEach((_, index) => {
  setTimeout(() => {
    reverseIndex(); // first call
    const currentPage = pages[pageNumber]; // get correct page
    currentPage.classList.remove('turn');

    setTimeout(() => {
      currentPage.style.zIndex = 10 + index;
    }, 500); // wait for flip animation
  }, (index + 1) * 200 + 2100);
});


  const form = document.querySelector(".contact-form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        alert("✅ Message sent successfully!");
        form.reset();
      } else {
        alert("❌ Something went wrong. Please try again.");
      }

    } catch (error) {
      alert("⚠️ Network error. Please check your connection.");
      console.error(error);
    }
  });
// Enhanced Mobile Navigation System (under 550px)
function initMobileNavigation() {
  if (window.innerWidth > 550) return;

  // Create mobile header
  const header = document.createElement('header');
  header.className = 'mobile-header';
  header.innerHTML = '<h1>Sahitya Ghosh</h1>';
  document.body.insertBefore(header, document.body.firstChild);

  // Create mobile navigation
  const nav = document.createElement('nav');
  nav.className = 'mobile-nav';
  
  // Navigation items
  const pages = [
    { icon: 'fa-user', title: 'Profile', target: 'profile' },
    { icon: 'fa-briefcase', title: 'Work', target: 'work' },
    { icon: 'fa-graduation-cap', title: 'Education', target: 'education' },
    { icon: 'fa-code', title: 'Skills', target: 'skills' },
    { icon: 'fa-envelope', title: 'Contact', target: 'contact' }
  ];

  // Add nav buttons
  pages.forEach((page, index) => {
    const btn = document.createElement('button');
    btn.className = `nav-btn ${index === 0 ? 'active' : ''}`;
    btn.innerHTML = `<i class="fas ${page.icon}"></i><span>${page.title}</span>`;
    btn.dataset.target = page.target;
    nav.appendChild(btn);
  });

  document.body.appendChild(nav);

  // Get all page elements
  const profilePage = document.querySelector('.profile-page').closest('.book-page');
  const workPage = document.getElementById('turn-1').querySelector('.page-front');
  const educationPage = document.getElementById('turn-1').querySelector('.page-back');
  const skillsPage = document.getElementById('turn-2').querySelector('.page-back');
  const contactPage = document.getElementById('turn-3').querySelector('.page-back');

  // Initialize all pages
  const allPages = [profilePage, workPage, educationPage, skillsPage, contactPage];
  allPages.forEach(page => {
    page.style.transform = 'translateY(-100%)';
    page.style.display = 'block';
  });

  // Show profile page by default
  profilePage.classList.add('active');
  header.querySelector('h1').textContent = 'Profile';

  // Navigation click handler
  nav.addEventListener('click', (e) => {
    const btn = e.target.closest('.nav-btn');
    if (!btn) return;

    const target = btn.dataset.target;
    const targetPage = {
      'profile': profilePage,
      'work': workPage,
      'education': educationPage,
      'skills': skillsPage,
      'contact': contactPage
    }[target];

    // Play page flip sound
    pageFlipSound.currentTime = 0;
    pageFlipSound.play();

    // Update header title
    header.querySelector('h1').textContent = btn.querySelector('span').textContent;

    // Hide current active page
    const currentPage = document.querySelector('.book-page.active');
    if (currentPage) {
      currentPage.style.animation = 'slideOutToTop 0.5s forwards';
      setTimeout(() => {
        currentPage.classList.remove('active');
        currentPage.style.animation = '';
      }, 500);
    }

    // Show target page
    setTimeout(() => {
      targetPage.style.animation = 'slideInFromTop 0.5s forwards';
      targetPage.classList.add('active');
      
      // Scroll to top of the new page
      setTimeout(() => {
        targetPage.scrollTo(0, 0);
      }, 50);
    }, 50);

    // Update active nav button
    document.querySelectorAll('.nav-btn').forEach(item => {
      item.classList.remove('active');
    });
    btn.classList.add('active');
  });

  // Touch gestures for swipe navigation
  let touchStartY = 0;
  let touchEndY = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].clientY;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 80;
    const swipeDistance = touchEndY - touchStartY;

    if (Math.abs(swipeDistance) < swipeThreshold) return;

    const navButtons = Array.from(document.querySelectorAll('.nav-btn'));
    const currentIndex = navButtons.findIndex(btn => btn.classList.contains('active'));

    if (swipeDistance > 0 && currentIndex > 0) {
      // Swipe down - go to previous page
      navButtons[currentIndex - 1].click();
    } else if (swipeDistance < 0 && currentIndex < navButtons.length - 1) {
      // Swipe up - go to next page
      navButtons[currentIndex + 1].click();
    }
  }
}

// Initialize mobile navigation when DOM loads
document.addEventListener('DOMContentLoaded', function() {
  initMobileNavigation();
  
  // Re-initialize on resize
  window.addEventListener('resize', function() {
    if (window.innerWidth <= 550) {
      initMobileNavigation();
    }
  });
});

