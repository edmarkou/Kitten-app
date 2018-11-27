import React from 'react';
import { connect } from 'react-redux';
import {StyleSheet, Text, View, FlatList, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {clickedKitten} from "./actions/actions";
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { key } from './secret';
import KittenComponent from "./KittenComponent";

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
    backgroundColor: '#C18274',
    margin: 10
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff'
  }
});

class StartPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      images: [],
      loading: false
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
            data.push(item);
          });
          if(num === 0) this.setState({images: data, loading: false});
        });
      } else if (num !== 0) {
        axios.get(`https://api.thecatapi.com/v1/images/search?size=small&mime_types=jpg,png&limit=${num}`, {
          headers: {
            "x-api-key": key
          }
        }).then(response => {
          response.data.forEach(item => {
            data.push(item);
          });
          this.setState({images: data, loading: false});
        });
        num = 0;
      }
    }
  };

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
        <Spinner visible={this.state.loading}/>
        {this.state.images.length !== 0 ?
          <FlatList
            style={styles.flatList}
            data={this.state.images}
            keyExtractor={(image, index) => image.id + index}
            renderItem={ ({item}) => {
              return (
                  <KittenComponent key={item.id} url={item.url}/>
              )
            }}
          />
          : null}
      </View>
    );
  }
}
const mapStateToProps = state => ({
  kitten: state.kitten
});

export default connect(mapStateToProps, {clickedKitten})(StartPage);