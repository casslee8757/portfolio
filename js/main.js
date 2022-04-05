
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

// click logic function 
const scrollIntoView = (selector) => {
    const scrollToContact = document.querySelector(selector)
    scrollToContact.scrollIntoView({ behavior: 'smooth' })

}