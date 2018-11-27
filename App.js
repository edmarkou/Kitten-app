import React from 'react';
import {Provider} from 'react-redux';
import MainPage from "./src/MainPage";
import store from './src/store';
import {Text} from "react-native";
import KittenInfo from "./src/KittenInfo";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      page: 'main page'
    }
  }

  changePage = (page) => {
    this.setState({page});
  };

  returnPage = () => {
    if (this.state.page === 'main page') return <MainPage changePage={this.changePage}/>;
    else if (this.state.page === 'kitten page') return <KittenInfo changePage={this.changePage}/>;
  };

  render() {
    return (
      <Provider store={store}>
        {this.returnPage()}
      </Provider>
    );
  }
}

export default App;

// set REACT_NATIVE_PACKAGER_HOSTNAME=192.168.0.102