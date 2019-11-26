import React,{Component} from 'react';
import './CartItem.css';

class CartItem extends Component{
  state= {
    amount: this.props.product.amount
  }

  changeAmount = (e) =>{
    this.setState({amount: parseInt(e.target.value)})
    localStorage.setItem(this.props.product.ean, JSON.stringify({...this.props.product, amount: parseInt(e.target.value)})); // Alteração da quantidade diretamente o localStorage
    this.props.updateCart(); // Callback para atualizar as informações do carrinho, e recalcular preço total
  }

  render(){
    return (
      <div className="CartItem">
        <img alt="" className="itemImage" src={this.props.product.picture}/>

        <div className="itemDetails">
          <h2 className="itemName">{this.props.product.name}</h2>
          <div className="store">
            <h4 className="storeName">{this.props.product.store.name}</h4>
            <p className="storeLocation">
              <svg className="cartIcons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035 c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719 c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
              </svg>
              {this.props.product.store.location.address}
            </p>
            <p className="storePhone">
              <svg className="cartIcons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 348.077 348.077">
                <path d="M340.273,275.083l-53.755-53.761c-10.707-10.664-28.438-10.34-39.518,0.744l-27.082,27.076 c-1.711-0.943-3.482-1.928-5.344-2.973c-17.102-9.476-40.509-22.464-65.14-47.113c-24.704-24.701-37.704-48.144-47.209-65.257 c-1.003-1.813-1.964-3.561-2.913-5.221l18.176-18.149l8.936-8.947c11.097-11.1,11.403-28.826,0.721-39.521L73.39,8.194 C62.708-2.486,44.969-2.162,33.872,8.938l-15.15,15.237l0.414,0.411c-5.08,6.482-9.325,13.958-12.484,22.02 C3.74,54.28,1.927,61.603,1.098,68.941C-6,127.785,20.89,181.564,93.866,254.541c100.875,100.868,182.167,93.248,185.674,92.876 c7.638-0.913,14.958-2.738,22.397-5.627c7.992-3.122,15.463-7.361,21.941-12.43l0.331,0.294l15.348-15.029 C350.631,303.527,350.95,285.795,340.273,275.083z"/>
              </svg>
              {this.props.product.store.phone}
            </p>
          </div>
        </div>

        <select className="cartAmount" defaultValue={this.props.product.amount} onChange={this.changeAmount}>
            {new Array(100).fill().map((x,i) => <option value={i+1} key={i}>{i+1}</option>)}
        </select>

        <div className="ie">
          <button className="removeItem" onClick={this.props.removeItem}>x</button>
          <h2 className="itemPrice">R$ {parseFloat(this.props.product.price)*this.state.amount}</h2>
        </div>
      </div>
    )
  }
};

export default CartItem;