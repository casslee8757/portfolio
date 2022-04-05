
// Make navbar transparent when it is on the top 
const navbar = document.querySelector('#navbar')
const navbarHeight = navbar.getBoundingClientRect().height;

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
   
    scrollIntoView(link);
})

// "contact me" handle click button 
const contactMe = document.querySelector('.home_contact');
contactMe.addEventListener('click', (e) => {
    scrollIntoView('#contact')
})

// make home fades slowly as the window scrolls down 
const home = document.querySelector('.home_container')
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    home.style.opacity = 1 - window.scrollY / homeHeight
})


// click logic function 
const scrollIntoView = (selector) => {
    const scrollToContact = document.querySelector(selector)
    scrollToContact.scrollIntoView({ behavior: 'smooth' })

}