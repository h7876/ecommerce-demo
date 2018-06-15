require('dotenv').config();
const express = require('express')
, massive = require('massive')
, bodyParser = require('body-parser')

const {
    CONNECTION_STRING,
    SERVER_PORT
} = process.env

const app =express();
app.use(bodyParser.json())

massive(CONNECTION_STRING).then((db)=> {
    console.log('Database Connected!')
    app.set('db', db)
})

app.get('/api/products', (req, res) => {
    const dbInstance = req.app.get('db')
    dbInstance.getProducts()
    .then(products => {res.status(200).send(products);
        console.log(products);
   }).catch(err => {
    console.log(err);
    res.status(500).send(err)
});
})

app.get('/api/cart', (req, res) => {
    const dbInstance = req.app.get('db')
    dbInstance.getCart()
    .then(products => {res.status(200).send(products);
        console.log(products);
   }).catch(err => {
    console.log(err);
    res.status(500).send(err)
});
})

app.get('/api/cart/quantity/:id', (req, res)=> {
    const id = req.params.id
    const dbInstance = req.app.get('db')
    dbInstance.getQuantity([id])
    .then(quantity=> {res.status(200).send(quantity);
    console.log(quantity)
}).catch(err=>{
    console.log(err)
    res.status(500).send(err)
})
})

app.post('/api/cart', (req, res, next)=> {
    let{productid , quantity} = req.body;
    req.app.get('db').addToCart([productid, quantity]).then(ok=> {
        res.sendStatus(200);
    }).catch(err=> {
        console.log(err);
        res.status(500).send(err)
    })
})

app.delete('/api/cart/:productid', (req, res)=> {
    let productid = req.params.productid;
    req.app.get('db').deleteCartItem([productid]).then(ok=> {
        res.sendStatus(200)
    }).catch(err=> {
        console.log(err)
        res.status(500).send(err)
    })
})

app.put('/api/cart/:productid', (req, res)=> {
    let productid = req.params.productid;
    let {quantity} = req.body
    req.app.get('db').updateQuantity([quantity, productid]).then(ok=>{
        res.sendStatus(200)
    }).catch(err=> {
        console.log(err)
        res.status(500).send(err)
    })
})

app.listen(SERVER_PORT, ()=> {
    console.log(`Listening on port ${SERVER_PORT}`)
})