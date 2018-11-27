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
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => { console.log('clicked'); this.props.clickedKitten(); }}>
        <View style={styles.container}>
          <Image style={styles.image} borderRadius={20} source={{uri: this.props.url}}/>
          <Text style={styles.name}>Some name</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
KittenComponent.propTypes = {
  url: PropTypes.string.isRequired
};
const mapStateToProps = state => ({
  kitten: state.kitten
});
export default connect(mapStateToProps, {clickedKitten})(KittenComponent);
