// Toggle class active menu-nav
const navbarNav = document.querySelector
('.navbar-nav');
// ketika menu-nav diklik
document.querySelector('#menu-nav').onclick = (e) =>{
    navbarNav.classList.toggle('active');
    e.preventDefault();
};

// Toggle class active search form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');
// ketika icon search diklik
document.querySelector('#search-button').onclick = (e) =>{searchForm.classList.toggle('active');
    searchBox.focus();
    e.preventDefault();
};

//toggle class active shopping cart
const shoppingCart = document.querySelector('.shopping-cart');
// ketika icon cart diklik
document.querySelector('#shopping-button').onclick = (e) => {
    shoppingCart.classList.toggle('active');
    e.preventDefault();
};

// KLIK DI LUAR SIDEBAR UNTUK ELEMENT HILANG
const mn= document.querySelector('#menu-nav');
const sb=document.querySelector('#search-button');

document.addEventListener('click', function(e){
    if(!mn.contains(e.target) && !navbarNav.contains(e.target)){
        navbarNav.classList.remove('active');
    }

    if(!sb.contains(e.target) && !searchForm.contains(e.target)){
        searchForm.classList.remove('active');
    }
    if(!document.querySelector('#shopping-button').contains(e.target) && !shoppingCart.contains(e.target)){
        shoppingCart.classList.remove('active');
    }


});



// Modal Box
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');

itemDetailButtons.forEach((btn) => {
    btn.onclick = (e) => {
        itemDetailModal.style.display = 'flex';
        e.preventDefault();
};
})  
//klik tombol close modal
document.querySelector('.modal .close-icon').onclick = (e) => {
    itemDetailModal.style.display = 'none';
    e.preventDefault();
}

//klik di luar tombol close untuk menghilangkan modal
window.onclick = (e) => {
    if(e.target === itemDetailModal){
        itemDetailModal.style.display = 'none';
    }
};

