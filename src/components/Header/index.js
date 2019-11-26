import React from 'react';
import './Header.css';
import { withRouter} from 'react-router-dom';

function Header(props){
    return (
        <div className="Header">
          <img alt="Obrazul logo" onClick={() => props.history.push('/')} src="https://www.obrazul.com.br/static/img/obrazul-logo-bg.png" height="50"/>
         <div onClick={() => props.history.push('/cart')}>
         <svg className="cartIcons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <g><g><circle cx="181.333" cy="437.336" r="53.333"/></g></g><g><g><circle cx="394.667" cy="437.336" r="53.333"/></g></g><g><g> <path d="M509.397,89.005c-2.027-2.325-4.971-3.669-8.064-3.669H96.213L85.12,29.912c-1.003-4.992-5.376-8.576-10.453-8.576h-64 C4.779,21.336,0,26.114,0,32.002s4.779,10.667,10.667,10.667H65.92l51.989,259.989c6.976,34.752,37.76,60.011,73.216,60.011 h267.541c5.888,0,10.667-4.779,10.667-10.667c0-5.888-4.779-10.667-10.667-10.667H191.125c-25.344,0-47.317-18.048-52.309-42.88 l-0.192-0.981l326.4-39.573c14.357-1.749,25.792-12.949,27.84-27.243l19.029-133.141 C512.341,94.445,511.424,91.352,509.397,89.005z"/></g></g>
          </svg>
          <div>{localStorage.length>0?Object.keys(localStorage).map(key => {
                    let product = JSON.parse(localStorage.getItem(key));
                    return product.amount;
                  }).reduce((acc,cur) => acc+cur):0}</div>
          </div>
        </div>
    )
};

export default withRouter(Header);