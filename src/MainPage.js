import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  NetInfo,
  Alert,
  AsyncStorage,
  TextInput
} from 'react-native';
import {addKittenImages} from "./actions/actions";
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { key } from './secret';
import KittenComponent from "./KittenComponent";
import PropTypes from "prop-types";

const catNames = require('cat-names');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  header: {
    alignItems: 'center',
    textAlign: 'center',
    marginTop: '10%',
    fontSize: 30,
    fontWeight: "bold"
  },
  flatList: {
    marginTop: 5
  },
  button: {
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    width: 75,
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: '#C28274',
    margin: 10
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff'
  },
  textInput: {
    height: 40,
    width: 100,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    textAlign: 'center'
  }
});

class MainPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loading: false,
      text: ''
    }
  }

  handleLoading = number => {
    let num = number;
    let data = [];
    this.setState({loading: true});
    while(num !== 0) {
      if(num - 25 >= 0) {
        num -= 25;
        axios.get(`https://api.thecatapi.com/v1/images/search?size=small&mime_types=jpg,png&limit=25`, {
          headers: {
            "x-api-key": key
          }
        }).then(response => {
          response.data.forEach(item => {
            data.push({url: item.url, name: catNames.random()});
          });
          if(num === 0) {
            this.props.addKittenImages(data);
            this.setState({loading: false});
          }
        });
      } else if (num !== 0) {
        axios.get(`https://api.thecatapi.com/v1/images/search?size=small&mime_types=jpg,png&limit=${num}`, {
          headers: {
            "x-api-key": key
          }
        }).then(response => {
          response.data.forEach(item => {
            data.push({url: item.url, name: catNames.random()});
          });
          this.props.addKittenImages(data);
          this.setState({loading: false});
        });
        num = 0;
      }
    }
  };

  getImages = async () => {
    let images = [];
    try {
      images = await AsyncStorage.getItem('images') || [];
    } catch (error) {
      console.log(error.message);
    }
    return images;
  };

  /*componentDidMount() {
    this.props.addKittenImages(this.getImages());
  }*/

  componentWillMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (!isConnected) {
        Alert.alert(
          'No internet',
          'Please connect to internet to use the app',
          [
            {text: 'OK'},
          ],
          { cancelable: false });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Press a button to load kittens!</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => this.handleLoading(30)}>
            <Text style={styles.buttonText}>30</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.handleLoading(50)}>
            <Text style={styles.buttonText}>50</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.handleLoading(100)}>
            <Text style={styles.buttonText}>100</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
          <TouchableOpacity style={{...styles.button, width: 100}} onPress={() => this.handleLoading(parseInt(this.state.text))}>
            <Text style={styles.buttonText}>Load</Text>
          </TouchableOpacity>
        </View>
        <Spinner visible={this.state.loading}/>
        {this.props.kittenImages.length !== 0 ?
          <FlatList
            style={styles.flatList}
            data={this.props.kittenImages}
            keyExtractor={(image, index) => image.url + image.name + index }
            renderItem={ ({item}) => {
              return <KittenComponent changePage={this.props.changePage} url={item.url} name={item.name}/>
            }}
          />
          : null}
      </View>
    );
  }
}

MainPage.propTypes = {
  changePage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  kittenImages: state.kittenImages
});

export default connect(mapStateToProps, {addKittenImages})(MainPage);