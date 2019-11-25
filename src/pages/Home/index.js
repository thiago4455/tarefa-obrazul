import React,{Component} from 'react';
import './Home.css';

import SearchBar from '../../components/SearchBar'

class Home extends Component{
  state = {
    products: [],
    response: [],
    valuesSelected: [],
    loading: true,
    error: false
  }

  componentDidMount(){
    this.search('');

    //Variavel com os options do select, para evitar inserção manual
    let options = [];
    for (let i = 1; i <= 100; i++) {
      options.push(<option value={i} key={i}>{i}</option>);
    }
    this.options = options;
  }

  //Armazenar valores da quantidade de cada produto
  selectValue(e,i){
    let values = this.state.valuesSelected;
    values[i] = parseInt(e.target.value);
    this.setState({valuesSelected:values})
  }

  onClick(i,ean){
    // Adicionar a quantidade de items selecionada, e armazenar pelo EAN no LocalStorage
    let item = JSON.parse(localStorage.getItem(ean)) || this.state.response.products[i];
    item.amount += this.state.valuesSelected[i];
    localStorage.setItem(ean, JSON.stringify(item));
    this.props.history.push('/cart');
  }

  search = (searchString) => {    
    this.setState({loading:true});           // Uso do toUpperCase no request, pois a API não é case sensitive.
    fetch('https://www.obrazul.com.br/api/recruitment/products/'+searchString.toUpperCase()).then(r => r.json())  
    .then(res => {      
      this.setState({response: res, valuesSelected: new Array(res.products.length).fill(1), error:false,
        loading: false, products: res.products.map((product,i) => {

        //Remoção de resultados duplos, para evitar conflitos entre ean. (Preferência para a entrada com menor preço)
        for (let j = 0; j < res.products.length; j++) {
          if(res.products[j].ean === product.ean && parseFloat(res.products[j].price) < parseFloat(product.price)){
            console.log("DUPLICADO: "+product.name);
            return(null);
          }
        }

        return(
        <div key={product.ean} className="product" >
          <div className="image" style={{backgroundImage: `url(${product.picture})`}}/>
          <h2 className="title">{product.name}</h2>
          <div className="price">
            R$ {product.price}
            <div className="addItem">
              <select onChange={(e) => {this.selectValue(e,i)}}>
                {this.options}
              </select>
              <button onClick={() => {this.onClick(i,product.ean)}}>
                <svg color="#fff" height="20px" viewBox="0 -31 512.00026 512" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="m164.960938 300.003906h.023437c.019531 0 .039063-.003906.058594-.003906h271.957031c6.695312 0 12.582031-4.441406 14.421875-10.878906l60-210c1.292969-4.527344.386719-9.394532-2.445313-13.152344-2.835937-3.757812-7.269531-5.96875-11.976562-5.96875h-366.632812l-10.722657-48.253906c-1.527343-6.863282-7.613281-11.746094-14.644531-11.746094h-90c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15h77.96875c1.898438 8.550781 51.3125 230.917969 54.15625 243.710938-15.941406 6.929687-27.125 22.824218-27.125 41.289062 0 24.8125 20.1875 45 45 45h272c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15h-272c-8.269531 0-15-6.730469-15-15 0-8.257812 6.707031-14.976562 14.960938-14.996094zm312.152343-210.003906-51.429687 180h-248.652344l-40-180zm0 0"/><path d="m150 405c0 24.8125 20.1875 45 45 45s45-20.1875 45-45-20.1875-45-45-45-45 20.1875-45 45zm45-15c8.269531 0 15 6.730469 15 15s-6.730469 15-15 15-15-6.730469-15-15 6.730469-15 15-15zm0 0"/><path d="m362 405c0 24.8125 20.1875 45 45 45s45-20.1875 45-45-20.1875-45-45-45-45 20.1875-45 45zm45-15c8.269531 0 15 6.730469 15 15s-6.730469 15-15 15-15-6.730469-15-15 6.730469-15 15-15zm0 0"/></svg> +
              </button>
            </div>
          </div>
        </div>
        )
      })});
    }).catch(e => {
      //API não realiza busca com espaços, e retorna 404
      console.log(e);
      this.setState({response: [], valuesSelected: [], loading:false, products: [], error:true})
    })
  }

  render(){
    return (
      <div className="Home">
        <SearchBar search={this.search} onChange={() => this.setState({loading:true})}/>
        {this.state.loading?
        <div className="lds-ellipsis"><div/><div/><div/><div/></div>:
        <div className="products">
          {this.state.products.length>0?
            this.state.products:
            <h4 className="notFoud">{this.state.error?<div>Ocorreu um erro ao realizar a busca.<br/>Tente novamente, sem o uso de espaços.</div>:"Nenhum produto encontrado."}</h4>}
        </div>}
      </div>
    );
  }
}

export default Home;
