import React, {Component} from 'react';
import './App.css';
import UserList from './layouts/main'

class App extends Component{
  render() {
    return (
      <div className="testApp">
        <UserList/>
      </div>
  );
  }
}

export default App;
