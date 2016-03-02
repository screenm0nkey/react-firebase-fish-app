require('../css/style.styl');
import  h from './helpers';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, History, Link } from 'react-router'
var createBrowserHistory = require('history/lib/createBrowserHistory');
// Firebase
import Rebase from're-base';
var base = Rebase.createClass('https://nick-of-the-day.firebaseio.com/');
import Catalyst from 'react-catalyst';


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
      fishes : require('./sample-fishes')
    });
  },
  render : function() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <FishList fishes={this.state.fishes} addToOrder={this.addToOrder}></FishList>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}/>
        <Inventory
          removeFish={this.removeFish}
          linkState={this.linkState}
          fishes={this.state.fishes}
          addFish={this.addFish}
          loadSamples={this.loadSamples}/>
      </div>
    )
  }
});


var FishList = React.createClass({
  renderFish : function(key){
    let {fishes} = this.props;
    return <Fish key={key} index={key} details={fishes[key]} addToOrder={this.props.addToOrder}/>
  },
  render : function () {
    let {fishes} = this.props;
    return (
      <ul className="list-of-fishes">
        {Object.keys(fishes).map(this.renderFish)}
      </ul>
    )
  }
});

/*
 Fish
 <Fish />
 */
var Fish = React.createClass({
  onButtonClick : function() {
    console.log("Going to add the fish: ", this.props);
    let {index} = this.props;
    this.props.addToOrder(index);
  },
  render : function() {
    let {details}= this.props;
    var isAvailable = (details.status === 'available' ? true : false);
    var buttonText = (isAvailable ? 'Add To Order' : 'Sold Out!');

    return (
      <li className="menu-fish">
        <img src={details.image} alt={details.name} />
        <h3 className="fish-name">
          {details.name}
          <span className="price">{h.formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button disabled={!isAvailable} onClick={this.onButtonClick}>{buttonText}</button>
      </li>
    )
  }
});


/*
 Add Fish Form
 <AddFishForm />
 */

var AddFishForm = React.createClass({
  createFish : function(event) {
    // 1. Stop the form from submitting
    event.preventDefault();
    // 2. Take the data from the form and create an object
    var fish = {
      name : this.refs.name.value,
      price : this.refs.price.value,
      status : this.refs.status.value,
      desc : this.refs.desc.value,
      image : this.refs.image.value || "http://i.istockimg.com/file_thumbview_approve/36248396/5/stock-photo-36248396-blackened-cajun-sea-bass.jpg"
    };

    // 3. Add the fish to the App State
    this.props.addFish(fish);
    this.refs.fishForm.reset();
  },
  render : function() {
    return (
      <form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
        <input type="text" ref="name" placeholder="Fish Name"/>
        <input type="text" ref="price" placeholder="Fish Price" />
        <select ref="status">
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" ref="desc" placeholder="Desc"></textarea>
        <img src=""/>
        <input type="text" ref="image" placeholder="URL to Image" />
        <button type="submit">+ Add Item </button>
      </form>
    )
  }
});

/*
 Header
 <Header/>
 */
var Header = React.createClass({
  render : function() {
    return (
      <header className="top">
        <h1>Catch
          <span className="ofThe">
            <span className="of">of</span>
            <span className="the">the</span>
          </span>
          Day</h1>
        <h3 className="tagline"><span>{this.props.tagline}</span></h3>
      </header>
    )
  }
});


var OrderItem = React.createClass({
  render: function () {
    let {fish, count, removeFromOrder, id:key} = this.props;
    let removeButton = <button onClick={removeFromOrder.bind(null,key)}>&times;</button>;

    if (!fish) {
      return <li>Sorry, fish no longer available! {removeButton}</li>
    }

    return (
      <li>
        {count}lbs
        {fish.name} {removeButton}
        <span className="price">{h.formatPrice(count * fish.price)}</span>
      </li>)
  }
})

/*
 <Order/>
 */
var Order = React.createClass({
  render : function() {
    let {order, fishes, removeFromOrder} = this.props;
    var orderIds = Object.keys(order);

    var total = orderIds.reduce((prevTotal, key)=> {
      var fish = fishes[key];
      var count = order[key];
      var isAvailable = fish && fish.status === 'available';

      if(fish && isAvailable) {
        return prevTotal + (count * parseInt(fish.price) || 0);
      }
      return prevTotal;
    }, 0);

    let rows = orderIds.map((key)=> {
      return (
        <OrderItem
          key={key}
          id={key}
          removeFromOrder={removeFromOrder}
          count={this.props.order[key]}
          fish={this.props.fishes[key]}>
        </OrderItem>);
    });


    return (
      <div className="order-wrap">
        <h2 className="order-title">Your Order</h2>
        <ul className="order">
          {rows}
          <li className="total">
            <strong>Total:</strong>
            {h.formatPrice(total)}
          </li>
        </ul>
      </div>
    )
  },
  propTypes : {
    fishes : React.PropTypes.object.isRequired,
    order : React.PropTypes.object.isRequired,
    removeFromOrder : React.PropTypes.func.isRequired
  }
});


/*
  <InventoryItem>
 */
var InventoryItem = React.createClass({
  render : function() {
    let {linkState, fish, removeFish, id:key} = this.props;
    return (
      <div className="fish-edit" key={key}>
        <input type="text" valueLink={linkState('fishes.'+ key +'.name')}/>
        <input type="text" valueLink={linkState('fishes.'+ key +'.price')}/>
        <select valueLink={linkState('fishes.' + key + '.status')}>
          <option value="unavailable">Sold Out!</option>
          <option value="available">Fresh!</option>
        </select>

        <textarea valueLink={linkState('fishes.' + key + '.desc')}></textarea>
        <input type="text" valueLink={linkState('fishes.'+ key +'.image')}/>
        <button onClick={removeFish.bind(null, key)}>Remove Fish</button>
      </div>
    )
  }
});


/*
 <InventoryItem fish={fishes[key]} linkState={linkState}></InventoryItem>
 */
var Inventory = React.createClass({
  render : function() {
    let {linkState, fishes, removeFish} = this.props;
    let inventoryItemRows = Object.keys(fishes).map((key)=> {
      return (<InventoryItem
        key={key} id={key}
        fish={fishes[key]}
        linkState={linkState}
        removeFish={removeFish}>
      </InventoryItem>);
    });
    return (
      <div>
        <h2>Inventory</h2>
        {inventoryItemRows}
        <AddFishForm {...this.props} />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  },
  propTypes : {
    addFish : React.PropTypes.func.isRequired,
    loadSamples : React.PropTypes.func.isRequired,
    fishes : React.PropTypes.object.isRequired,
    linkState : React.PropTypes.func.isRequired,
    removeFish : React.PropTypes.func.isRequired
  }
});


/*
 <StorePicker/>
 */

var StorePicker = React.createClass({
  mixins : [History],
  goToStore : function(event) {
    event.preventDefault();
    // get the data from the input
    var storeId = this.refs.storeId.value;
    this.history.pushState(null, '/store/' + storeId);
  },
  render : function() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input type="text" ref="storeId" defaultValue={h.getFunName()} required />
        <input type="Submit" />
      </form>
    )
  }

});

/*
 Not Found
 */

var NotFound = React.createClass({
  render : function() {
    return <h1>Not Found!</h1>
  }
});


/*
 Routes
 */

var routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={StorePicker}/>
    <Route path="/store/:storeId" component={App}/>
    <Route path="*" component={NotFound}/>
  </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));
