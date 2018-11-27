import React from 'react';
import {Image, Text, View, Platform, TouchableOpacity} from "react-native";
import PropTypes from 'prop-types';
import {clickedKitten} from "./actions/actions";
import {connect} from "react-redux";

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? 24 : 0,
  },
  kittenInfoContainer: {
    alignItems: 'center',
    width: 320,
    height: 500,
    backgroundColor: '#C1C1C1',
    marginTop: 10,
    borderRadius: 20,
    textAlign: 'center'
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 20
  },
  name: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: '400',
    color: '#fff'
  },
  description: {
    margin: 10,
    marginTop: 30,
    fontSize: 14,
    color: '#fff'
  },
  button: {
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    width: 320,
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: '#C28274',
    margin: 10
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff'
  }
};

class KittenInfo extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.kittenInfoContainer}>
          <Image style={styles.image} borderRadius={20} source={{uri: this.props.kitten.url}}/>
          <Text style={styles.name}>{this.props.kitten.name}</Text>
          <Text style={styles.description}>This average-sized young cat is male.
            He has a short white coat with many brown tabby spots.
            He has a medium-length, average-width face and is a bit pudgy.
            He is especially fond of chicken, is very lazy, and is cautious around strangers.</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => this.props.changePage('main page')}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
KittenInfo.propTypes = {
  changePage: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  kitten: state.kitten
});
export default connect(mapStateToProps, {clickedKitten})(KittenInfo);