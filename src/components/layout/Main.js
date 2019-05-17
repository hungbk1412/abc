import React, { Component } from 'react';
import '../../stylesheet/layout/Main.css';
import Header from './Header';
import Content from './Content';

export class Main extends Component {
  render() {
    return (
      <div className='main'>
        <Header></Header>
        <Content></Content>
      </div>
    )
  }
}

export default Main
