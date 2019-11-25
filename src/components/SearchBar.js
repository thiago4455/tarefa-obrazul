import React,{Component} from 'react';
import './SearchBar.css';

class SearchBar extends Component{
  state = {
    value:''
  }

  //Esperar por intervalo de 1 segundo entre teclas, para evitar sobrecarga da API
  onChange = (e) => {
    this.props.onChange();
    let val = e.target.value;
    this.setState({value: val});
    setTimeout(()=>{
      if(this.state.value === val){
        this.props.search(val);
      }
    },500)
  }

  render(){
    return (
        <div className="SearchBar">
            <input placeholder="Digite o nome do produto" type="text"
            ref={(input) => { this.iptSearch = input; }}
            onChange={this.onChange}/>
            <button onClick={()=>this.props.search(this.state.value)} className="buttonSearch">Buscar</button>
        </div>
    )
  }
};

export default SearchBar;