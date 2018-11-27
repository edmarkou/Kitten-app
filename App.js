import React from 'react';
import { Provider } from 'react-redux';
import MainPage from "./src/StartPage";
import store from './src/store';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainPage/>
      </Provider>
    );
  }
}
export default App;

// set REACT_NATIVE_PACKAGER_HOSTNAME=192.168.0.102
