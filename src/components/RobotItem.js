import React, { Component } from 'react';
import {
  Text,
  Image,
  StyleSheet
} from 'react-native';

import {
  Card,
  CardItem,
  Button
} from 'native-base';

export default class RobotItem extends Component {
  constructor(props) {
    super(props);

    this.recordContent = this.props.record.content;
  }

  render() {
    return (
      <Card style={[styles.cardContainer, this.props.style]}>
        <CardItem>
          <Text>{this.recordContent.title}</Text>
        </CardItem>
        <CardItem>
          <Image style={{resizeMode: 'cover', width:200, height:200}} source={{uri: this.recordContent.image}} />
        </CardItem>
        <CardItem>
        <Button info><Text> read more... </Text></Button>
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10
  }
});