import React from 'react';
import './Success.css';


function Success(){
  return (
    <div className="Success">
      <h1>Compra realizada com sucesso.</h1>
      <h4>Você pagou R$ {localStorage.length>0?Object.keys(localStorage).map(key => {
                    let product = JSON.parse(localStorage.getItem(key));
                    return parseFloat(product.price) * product.amount;
                  }).reduce((acc,cur) => acc+cur):0} pelos seus produtos</h4>
    </div>
  );
}

export default Success;
