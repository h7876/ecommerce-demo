import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import {connect} from 'react-redux';
import {getCart} from '../ducks/reducer';
import './Cart.css';


 class Cart extends Component {
    componentDidMount(){
        this.props.getCart()
    }
    componentDidUpdate(){
        this.props.getCart()
    }
  constructor() {
    super();
    this.state = {
        items:[],
        updatedQuantity: '',
        updateItem: '',
        show: false
    };
    this.inputFieldToggle = this.inputFieldToggle.bind(this);
    this.saveQuantityInput = this.saveQuantityInput.bind(this);
    this.editQuantity = this.editQuantity.bind(this);
  }

  deleteItem(e){
      
      console.log(e.target.value)
      axios.delete('/api/cart/'+ e.target.value).then((req, res)=> {
          alert('Item Deleted');
        
      })

  }

  inputFieldToggle(e){
      this.setState({updateItem: e.target.value})
      this.setState({show: true})
      
  }

  editQuantity(e){
    axios.put('/api/cart/'+ this.state.updateItem, {quantity: this.state.updatedQuantity}).then((req, res)=> {
        alert('Item Updated');
        this.setState({show:false})
    })
  }

  saveQuantityInput(e){
      this.setState({updatedQuantity:e.target.value})
      console.log(this.state.updatedQuantity)
  }
//   <button onClick={this.inputFieldToggle} value ={element.id}>Edit Quantity</button>

  render() {
      const mappedCart = this.props.items.map((element, i)=> {
          return(
              <div className="item" key={element + i}>
                  <h2>{element.productname}</h2>
                  <img src={element.photo} alt="productphoto" height='150px' width='200px'/>
                  <p>Price: {element.price}</p>
                  <p>Quantity: {element.quantity}</p>
                  {this.state.show ? (<div><input type="text" onChange={this.saveQuantityInput}/> <button className="button" onClick={this.editQuantity}>Save</button></div>): (<button className="button" onClick={this.inputFieldToggle} value ={element.id}>Edit Quantity</button>)}
                  <button className="deleteButton" onClick={this.deleteItem} value={element.id}>Delete Item</button>
              </div>
          )
      })
    return (
      <div>
        <h1>Cart</h1>
        <Link to="/" exact>
          <button className="productButton">Back to products</button>
        </Link>
        {mappedCart}
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      items: state.items,
      
    };
  }
  
  export default connect(
    mapStateToProps,
    { getCart }
  )(Cart);