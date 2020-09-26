// SHOW AND HIDE SIDE MENU
var hideSidePanel = document.getElementById('hide-panel');
var sidePanel = document.querySelector('.side-navbar');
var mainContent = document.querySelector('.main');
var sideBarSummoner = document.querySelector('.side-bar-summoner');

hideSidePanel.addEventListener('click', () => {
    gsap.to('.side-navbar', {
        duration: 0.3,
        width: '10rem',
        opacity: 0,
        display: 'none'
    });
    mainContent.style.marginLeft = '0';
    sideBarSummoner.style.display = 'block';
});

sideBarSummoner.addEventListener('click', () => {
    console.log('clicked');
    gsap.to('.side-navbar', {
        duration: 0.3,
        width: '20rem',
        opacity: 1,
        display: 'block'
    });
    mainContent.style.marginLeft = '20rem';
    sideBarSummoner.style.display = 'none';
});