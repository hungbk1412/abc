import React, { Component } from 'react';
import '../../stylesheet/layout/Header.css';

export class Header extends Component {
  render() {
    return (
      <div style={{'padding': '10px'}} className='main-header'>
        <div style={{'textAlign': 'center', 'fontSize': '30px'}}>A Product by Nguyen Tien Hung</div>
      </div>
    )
  }
}

export default Header
