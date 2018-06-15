import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import './Home.css';

export default class Home extends Component {
    componentDidMount(){
        this.getProducts()
    }
  constructor() {
    super();
    this.state = {
        products:[],
        quantity: ''
    };
    this.getProducts = this.getProducts.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  getProducts() {
    axios.get("/api/products/").then((req, res) => {
      console.log(req.data[0], "I am the axios call");
      this.setState({ products: req.data });

    });
  }
//   addToCart(e){
//       console.log(e.target.value)
//     //   console.log(this.state.products[i])
//     axios.post('/api/cart/', {
//         productid:e.target.value,
//         productname: 'try me',
//         quantity: axios.get('/api/cart/quantity/' + e.target.value).then((req, res)=> {
//             return req.data.id++
//         })
//     }).then(()=> {
//         alert('product added to cart')
//     })
//   }

  addToCart(e){
    console.log(e.target.value)
  axios.post('/api/cart/', {
      productid:e.target.value,
      quantity: 1
  }).then(()=> {
      alert('product added to cart')
  })
    

}


  render() {
    const mappedProducts = this.state.products.map((element, i)=> {
        return (
            <div className="item" key={element + i}>
            <h2>{element.productname}</h2>
            <p>{element.description}</p>
            <img src={element.photo} alt="productimage" height='150px' width='200px'/>
            <p>{element.price}</p> <button className="button" type="button" onClick={this.addToCart} value={element.id}>Add to cart</button>
            </div>
        )
    })
    return (
      <div>
        <h1> Camping Store </h1> 
        <Link to ='/cart'><button className = "cartButton">Cart</button> </Link>
        {mappedProducts}
        
      </div>
    );
  }
}
