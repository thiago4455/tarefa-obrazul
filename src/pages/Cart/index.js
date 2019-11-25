import React,{Component} from 'react';
import './Cart.css';


class Cart extends Component{
  state = {
    items: []
  }

  componentDidMount(){
    let keys = Object.keys(localStorage);
    this.setState({items: 
      keys.map(k => {
        let product = JSON.parse(localStorage.getItem(k));
        return(
          <div key={product.ean} className="cartItem">
            <h2 className="itemName">{product.name}</h2>
          </div>
        );
      })
    })
    
  }

  render(){
    return (
      <div className="Cart">
        {this.state.items}
      </div>
    );
  }
}

export default Cart;
