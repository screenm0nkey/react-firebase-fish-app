require('../../css/style.styl');
import React from 'react';
import Catalyst from 'react-catalyst';
import Rebase from're-base'; // Firebase
import FishList from './FishList';
import Header from './Header';
import Order from './OrderList';
import Inventory from './InventoryList';
var firebase = Rebase.createClass('https://nick-of-the-day.firebaseio.com/');


// Catalyst.LinkedStateMixin offers two-way binding for forms
// and adds the linkState() method to the component
var App = React.createClass({
  mixins : [Catalyst.LinkedStateMixin],
  // only called once when component is created
  getInitialState : function() {
    console.log('getInitialState()', this.state);
    return {
      fishes : {},
      order : {}
    }
  },
  // this.props.params is coming from the router
  // componentDidMount is called only once, so a good place for
  // adding initialisation logic
  componentDidMount : function() {
    console.log('componentDidMount()', this.state);
    // this will keep the state.fishes in sync with the firebase db at
    // https://nick-of-the-day.firebaseio.com/<storeId>/fishes
    firebase.syncState(this.props.params.storeId + '/fishes', {
      context : this,
      state : 'fishes'
    });
    this.getOrder();
  },
  // could also use componentDidUpdate()
  componentWillUpdate : function(nextProps, nextState){
    console.log('componentWillUpdate()', nextState);
    this.saveOrder(nextState.order);
  },
  getOrder () {
    let localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
    if (localStorageRef) {
      let obj = JSON.parse(localStorageRef);
      this.setState({ order : obj });
    }
  },
  saveOrder (order) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(order));
  },
  addToOrder : function(key) {
    console.log('addToOrder()', this.state.order);
    this.state.order[key] = this.state.order[key] + 1 || 1;
    this.setState({ order : this.state.order });
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
    console.log('App render()');
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Nick's Seafood Market" />
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
          linkState={this.linkState} //Catalyst.LinkedStateMixin adds this method for two-way form binding
          fishes={this.state.fishes}
          addFish={this.addFish}
          loadSamples={this.loadSamples}
        />
      </div>
    )
  }
});
export default App;

