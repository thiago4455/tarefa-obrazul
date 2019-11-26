import React,{Component} from 'react';
import './Cart.css';

import CartItem from '../../components/CartItem';

class Cart extends Component{
  state = {
    items: [],
    total: 0
  }

  componentDidMount(){
    this.updateCart();
  }

  //Remove o item diretamente do localStorage, e recarrega as informações
  removeItem = (ean) => {
    localStorage.removeItem(ean);
    this.updateCart();
  }

  updateCart = () => {
    let total = 0; //Busca das chaves do localStorage, e mapeamento das informações para o componente CartItem
    let keys = Object.keys(localStorage);
    this.setState({items: 
      keys.map(k => {
        let product = JSON.parse(localStorage.getItem(k));
        total += parseFloat(product.price) * product.amount;
        return(
          <CartItem removeItem={() => this.removeItem(product.ean)} updateCart={this.updateCart} key={product.ean} product={product}/>
        );
      }),total: total
    })
  }

  render(){
    return (
      this.state.items.length>0?
      <div className="Cart">
        <div className="cartGrid">
          {this.state.items}
        </div>
          <div className="cartFooter">
            <button onClick={() => this.props.history.push('/')} className="back">{"<"} Continuar comprando</button>
            <div className="total">
              <h5>Total:</h5>
              <h2>R$ {this.state.total}</h2>
            </div>
            <button onClick={() => this.props.history.push('/finish')} className="finish">Concluir pedido {">"}</button>
          </div>
      </div>:
      <h4 className="notFoud">Carrinho vazio</h4>
    );
  }
}

export default Cart;
