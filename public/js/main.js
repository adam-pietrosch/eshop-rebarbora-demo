document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {
        hover: true, // Activate on hover
        coverTrigger: false,
        constrainWidth: false
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // ADDED PRODUCT
    var span = document.getElementById('added-product-span')
    if (span) M.toast({ html: span.innerHTML + ' <i class="material-icons white-text">done</i>'})
});