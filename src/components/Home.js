import React, { Component } from 'react';
import { ScrollView, RefreshControl } from 'react-native';


import {
  Button,
  Header,
  Container,
  Title,
  Content,
  Spinner,
} from 'native-base';

import Dataset  from 'impagination';
import RobotItem from './RobotItem';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataset: null,
      datasetState: null,
      refreshing: false,

    };
  }
  _onRefresh = () => {
    this.setState({refreshing: true});
    this.setupImpagination();
  }

  setupImpagination() {
    let _this = this;

    let dataset = new Dataset({
      pageSize: 15,
      loadHorizon: 15,

      observe(datasetState) {
        _this.setState({datasetState});
      },

      fetch(pageOffset, pageSize, stats) {
        return fetch(`https://serene-beach-38011.herokuapp.com/api/faker?page=${pageOffset + 1}&per_page=${pageSize}`)
          .then(response => response.json())
          .catch((error) => {
            console.error(error);
          });
      }
    });

    dataset.setReadOffset(0);
    this.setState({dataset});
    this.setState({refreshing: false});
  }

  componentWillMount() {
    this.setupImpagination();
  }

  renderItem() {
    return this.state.datasetState.map(record => {
      if(record.isPending && !record.isSettled) {
        return <Spinner color="#00C497" key={Math.random()}/>;
      }

      return (
        <RobotItem record={record} key={record.content.id} />
      );
    });
  }

  setCurrentReadOffset = (event) => {
    let itemHeight = 402;
    let currentOffset = Math.floor(event.nativeEvent.contentOffset.y);
    let currentItemIndex = Math.ceil(currentOffset / itemHeight);

    this.state.dataset.setReadOffset(currentItemIndex);
  }

  render() {
    return (
      <Container>
        <Header>
          <Title>Infinite List</Title>
        </Header>
        <Content scrollEventThrottle={300} onScroll={this.setCurrentReadOffset} removeClippedSubviews={true}   refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }>
          {this.renderItem()}
        </Content>
      </Container>
    );
  }
}