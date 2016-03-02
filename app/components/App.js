require('../../css/style.styl');

import React from 'react';
import Catalyst from 'react-catalyst';
import Rebase from're-base'; // Firebase
import FishList from './FishList';
import AddFishForm from './FishForm';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
var base = Rebase.createClass('https://nick-of-the-day.firebaseio.com/');


var App = React.createClass({
  mixins : [Catalyst.LinkedStateMixin],
  getInitialState : function() {
    console.log('getInitialState', this.state);
    return {
      fishes : {},
      order : {}
    }
  },
  componentDidMount : function() {
    console.log('componentDidMount', this.state);
    base.syncState(this.props.params.storeId + '/fishes', {
      context : this,
      state : 'fishes'
    });

    let localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
    if (localStorageRef) {
      let obj = JSON.parse(localStorageRef);
      this.setState({ order : obj });
    }
  },
  componentWillUpdate : function(nextProps, nextState){
    console.log('componentWillUpdate', nextState)
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
  },
  addToOrder : function(key) {
    this.state.order[key] = this.state.order[key] + 1 || 1;
    this.setState({ order : this.state.order });
    console.log(this.state.order)
  },
  removeFromOrder : function(key){
    delete this.state.order[key];
    this.setState({
      order : this.state.order
    });
  },
  addFish : function(fish) {
    var timestamp = (new Date()).getTime();
    // update the state object
    this.state.fishes['fish-' + timestamp] = fish;
    // set the state
    this.setState({ fishes : this.state.fishes });
  },
  removeFish : function(key ) {
    if (confirm('You sure')) {
      this.state.fishes[key] = null;
      this.setState({ fishes : this.state.fishes });
    }
  },
  loadSamples : function() {
    this.setState({
      fishes : require('../sample-fishes')
    });
  },
  render : function() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <FishList
            fishes={this.state.fishes}
            addToOrder={this.addToOrder}
          />
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          removeFish={this.removeFish}
          linkState={this.linkState}
          fishes={this.state.fishes}
          addFish={this.addFish}
          loadSamples={this.loadSamples}
        />
      </div>
    )
  }
});

export default App;

