function addToCart(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response)
            const res = JSON.parse(this.response)
            M.toast({ html: res.productTitle + ' - přidáno do košíku <i class="material-icons green-text">done</i>' })
            document.getElementById('cart-qty').innerHTML = res.cartQty
        }
    };
    xhttp.open("GET", `/obchod/pridat-do-kosiku/${id}`, true);
    xhttp.send();
}

