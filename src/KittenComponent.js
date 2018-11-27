import React from 'react';
import {Image, Text, TouchableWithoutFeedback, View} from "react-native";
import PropTypes from 'prop-types';
import {clickedKitten} from "./actions/actions";
import {connect} from "react-redux";

const styles = {
  container: {
    alignItems: 'center',
    width: 320,
    height: 320,
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
    fontSize: 20,
    fontWeight: '400',
    color: '#fff'
  }
};

class KittenComponent extends React.Component {

  handleClick = () => {
    let data = { url: this.props.url, name: this.props.name };
    this.props.clickedKitten(data);
    this.props.changePage('kitten page');
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.handleClick}>
        <View style={styles.container}>
          <Image style={styles.image} borderRadius={20} source={{uri: this.props.url}}/>
          <Text style={styles.name}>{this.props.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
KittenComponent.propTypes = {
  url: PropTypes.string.isRequired,
  changePage: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};
const mapStateToProps = state => ({
  kittenImages: state.kittenImages,
  kitten: state.kitten
});
export default connect(mapStateToProps, {clickedKitten})(KittenComponent);