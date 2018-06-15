import axios from 'axios';

const initialState = {
    items: []
}

const GET_CART = 'GET_CART'

export function getCart(){
    let cartItems = axios.get('/api/cart').then( res => {
        return res.data;
    })
    return {
        type:GET_CART,
        payload: cartItems
    }
}


export default function reducer(state=initialState, action){
    switch(action.type){
        case GET_CART + '_FULFILLED':
        return Object.assign({}, state, {items: action.payload})
        default: 
        return state;
    }
}