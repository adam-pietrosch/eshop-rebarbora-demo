var socket = io();
document.addEventListener('DOMContentLoaded', function () {
    

    // Materialize Dropdowns
    var dropElements = document.querySelectorAll('.dropdown-trigger');
    var dropdowns = M.Dropdown.init(dropElements, {
        hover: true,
        coverTrigger: false,
        constrainWidth: false
    })

    // Show toast on flash succes message
    if (successMsg) M.toast({ html: successMsg + ' <i class="material-icons white-text">done</i>' })

    // Menage active links in main menu
    const links = document.querySelectorAll('.main-link, .main-link-icons > a')
    Array.prototype.forEach.call(links, (link) => {
        const linkHref = link.href.substr(21, link.href.length)
        console.log(linkHref)
        if (linkHref === url) {
            link.classList.add('active-main')
        }
    })
})
