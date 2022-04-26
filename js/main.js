
// Make navbar transparent when it is on the top 
const navbar = document.querySelector('#navbar')
const navbarHeight = navbar.getBoundingClientRect().height;

ScrollOut({
    onShown: function(el) {
        // use the web animation API
        el.animate([{ opacity: 0 }, { opacity: 1 }], 1000);
      },
});

document.addEventListener('DOMContentLoaded', () => {
    new TypeIt('.home_title')
        .pause(1000) 
        .go()
})

document.addEventListener('scroll', () => {
   
    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar--dark')
    }else {
        navbar.classList.remove('navbar--dark')

    }
})

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar_menu');
navbarMenu.addEventListener('click', (e) => {
    const target = e.target;
    const link = target.dataset.link;
    if(link == null){
        return;
    }
   
    navbarMenu.classList.remove('open')
    scrollIntoView(link);
})

//Navbar toggle button for responsive page
const navbarToggleBtn = document.querySelector('.navbar_toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
})

// "contact me" handle click button 
const homeLogo = document.querySelector('.logo');
homeLogo.addEventListener('click', (e) => {
    scrollIntoView('#home')
})

// make home fades slowly as the window scrolls down 
const home = document.querySelector('.home_container')
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    home.style.opacity = 1 - window.scrollY / homeHeight
})

// show 'arrow up' button when scrolling down
const arrowUp = document.querySelector('.arrow_up')
document.addEventListener('scroll', () => {
    if(window.scrollY > homeHeight /2){
        arrowUp.classList.add('visible');
    }else {
        arrowUp.classList.remove('visible');
    }
})

// 'arrow up' button handle click 
arrowUp.addEventListener('click', () => {
    scrollIntoView('#home')
})

//Projects
const projectBtnContainer = document.querySelector('.project_categories');
const projectContainer = document.querySelector('.work_projects');
const projects = document.querySelectorAll('.project');

projectBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter === null){
        return;
    }

    //remove selection from the previous item and select the new one
    const active = document.querySelector('.category_btn.selected')
    active.classList.remove('selected');
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('selected')

    projectContainer.classList.add('anim_out');
    
    setTimeout(() => {
        projects.forEach((project) => {
            if(filter === '*' || filter === project.dataset.type){
                project.classList.remove('invisible');
            }else{
                project.classList.add('invisible')
            }
        })
        projectContainer.classList.remove('anim_out');
        
    }, 300);
})


const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#projects',
    '#contact',
];

const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`))

let selectedNavItems = navItems[0]

let selectedNavIndex = 0;
const selectNavItem = selected => {
    selectedNavItems.classList.remove('active');
    selectedNavItems = navItems[selectedNavIndex]
    selectedNavItems.classList.add('active')
}


// click logic function 
const scrollIntoView = (selector) => {
    const scrollToContact = document.querySelector(selector)
    scrollToContact.scrollIntoView({ behavior: 'smooth' });
    // selectNavItem(navItems[sectionIds.indexOf(selector)])

}

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
}

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if(!entry.isIntersecting && entry.intersectionRatio > 0){
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            if(entry.boundingClientRect.y < 0){
                selectedNavIndex = index + 1
            }else{
                selectedNavIndex = index - 1
            }
        
        }
    })
}
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section))

window.addEventListener('wheel', () => {
    if(window.scrollY === 0){
        selectedNavIndex = 0;
    }else if(Math.round(window.scrollY + window.innerHeight)>=document.body.clientHeight) {
        selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex])
})