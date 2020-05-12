module.exports = class Cart {

    constructor(oldCart) {
        this.items = oldCart.items || {}
        this.totalPrice = oldCart.totalPrice || 0
        this.totalQty = oldCart.totalQty || 0
    }

    addItem(product) {
        var newItemId = product._id
        var newItem = this.items[newItemId]
        if (!newItem) newItem = { 
                product: product,
                qty: 0,
                price: 0
            }
        newItem.qty++
        newItem.price = newItem.product.price * newItem.qty      
    
        this.totalPrice += newItem.product.price
        this.totalQty++;
        this.items[newItemId] = newItem
    }

    removeItem(id) {
        if (this.items[id]) {
            this.totalPrice -= this.items[id].price
            this.totalQty -= this.items[id].qty
            delete this.items[id]
        }
    }

    increaseItemQty(id) {
        if (this.items[id]) {
            this.items[id].qty++
            this.items[id].price += this.items[id].product.price
            this.totalQty++
            this.totalPrice += this.items[id].product.price
        } 
    }

    reduceItemQty(id) {
        if (this.items[id]) {
            this.items[id].qty--
            this.items[id].price -= this.items[id].product.price
            this.totalQty--
            this.totalPrice -= this.items[id].product.price  
            if (this.items[id].qty === 0) this.removeItem(id)          
        }        
    }

    generateArray() {
        var array = []
        for (var id in this.items) {
            array.push(this.items[id])
        }
        return array
    }
}
