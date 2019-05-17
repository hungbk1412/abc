import React from 'react';
import Sidebar from './components/layout/Sidebar';
import Main from './components/layout/Main';
import './App.css';
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <Sidebar/>
      <Main/> 
    </div>
  );
}

export default App;
