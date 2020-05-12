const mongo = require('mongoose')
const Product = require('../models/product')

mongo.connect('mongodb://localhost/rebarbora', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

var products = [
    new Product({
        imgPath: '/img/product1.png',
        title: 'Product 1',
        shortDescription: 'I am a very simple card. I am good at containing small bits of information. I am convenient because.',
        longDescription: 'Etiam commodo dui eget wisi. Aliquam erat volutpat. Cras pede libero, dapibus nec, pretium sit amet, tempor quis. Sed ac dolor sit amet purus malesuada congue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer pellentesque quam vel velit. Aliquam erat volutpat. Curabitur sagittis hendrerit ante. In sem justo, commodo ut, suscipit at, pharetra vitae, orci.',
        price: 12
    }),
    new Product({
        imgPath: '/img/product2.jpg',
        title: 'Product 2',
        shortDescription: 'I am a very simple card. I am good at containing small bits of information. I am convenient because.',
        longDescription: 'Etiam commodo dui eget wisi. Aliquam erat volutpat. Cras pede libero, dapibus nec, pretium sit amet, tempor quis. Sed ac dolor sit amet purus malesuada congue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer pellentesque quam vel velit. Aliquam erat volutpat. Curabitur sagittis hendrerit ante. In sem justo, commodo ut, suscipit at, pharetra vitae, orci.',
        price: 56
    }),
    new Product({
        imgPath: '/img/product1.png',
        title: 'Product 3',
        shortDescription: 'I am a very simple card. I am good at containing small bits of information. I am convenient because.',
        longDescription: 'Etiam commodo dui eget wisi. Aliquam erat volutpat. Cras pede libero, dapibus nec, pretium sit amet, tempor quis. Sed ac dolor sit amet purus malesuada congue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer pellentesque quam vel velit. Aliquam erat volutpat. Curabitur sagittis hendrerit ante. In sem justo, commodo ut, suscipit at, pharetra vitae, orci.',
        price: 15
    }),
    new Product({
        imgPath: '/img/product2.jpg',
        title: 'Product 4',
        shortDescription: 'I am a very simple card. I am good at containing small bits of information. I am convenient because.',
        longDescription: 'Etiam commodo dui eget wisi. Aliquam erat volutpat. Cras pede libero, dapibus nec, pretium sit amet, tempor quis. Sed ac dolor sit amet purus malesuada congue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer pellentesque quam vel velit. Aliquam erat volutpat. Curabitur sagittis hendrerit ante. In sem justo, commodo ut, suscipit at, pharetra vitae, orci.',
        price: 8
    }),
    new Product({
        imgPath: '/img/product1.png',
        title: 'Product 5',
        shortDescription: 'I am a very simple card. I am good at containing small bits of information. I am convenient because.',
        longDescription: 'Etiam commodo dui eget wisi. Aliquam erat volutpat. Cras pede libero, dapibus nec, pretium sit amet, tempor quis. Sed ac dolor sit amet purus malesuada congue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer pellentesque quam vel velit. Aliquam erat volutpat. Curabitur sagittis hendrerit ante. In sem justo, commodo ut, suscipit at, pharetra vitae, orci.',
        price: 21
    }),
    new Product({
        imgPath: '/img/product2.jpg',
        title: 'Product 6',
        shortDescription: 'I am a very simple card. I am good at containing small bits of information. I am convenient because.',
        longDescription: 'Etiam commodo dui eget wisi. Aliquam erat volutpat. Cras pede libero, dapibus nec, pretium sit amet, tempor quis. Sed ac dolor sit amet purus malesuada congue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer pellentesque quam vel velit. Aliquam erat volutpat. Curabitur sagittis hendrerit ante. In sem justo, commodo ut, suscipit at, pharetra vitae, orci.',
        price: 16
    })
]

async function addProducts() {
    await Product.insertMany(products)
}

addProducts()


