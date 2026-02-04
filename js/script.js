// Toggle class active
const navbarNav = document.querySelector
('.navbar-nav');
// ketika menu-nav diklik
document.querySelector('#menu-nav').onclick = () =>{
    navbarNav.classList.toggle('active');
};

// KLIK DI LUAR SIDEBAR UNTUK MENGHILANGKAN NAVBAR
const menuNav = document.querySelector('#menu-nav');

document.addEventListener('click', function(e){
    if(!menuNav.contains(e.target) && !navbarNav.contains(e.target)){
        navbarNav.classList.remove('active');
    }
});