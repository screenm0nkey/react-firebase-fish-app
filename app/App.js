var React = require('react');
var ReactDOM = require('react-dom');
require('../css/style.styl');

/*
 Header
 <Header/>
 */
var Header = React.createClass({
  render : function() {
    let {nick} = this.props;
    return (
      <p>{nick}</p>
    )
  }
});

/*
 Order
 <Order/>
 */
var Order = React.createClass({
  render : function() {
    return (
      <p>Order</p>
    )
  }
});

/*
 Inventory
 <Inventory/>
 */
var Inventory = React.createClass({
  render : function() {
    return (
      <p>Inventory</p>
    )
  }
});


/*
 StorePicker
 This will let us make <StorePicker/>
 */

var StorePicker = React.createClass({
  render : function() {
    return (
      <form className="store-selector">
        <h2>Please Enter A Store</h2>
        <input type="text" ref="storeId" required />
        <input type="Submit" />
      </form>
    )
  }
});


var App = React.createClass({
  render : function() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header nick="1000"/>
        </div>
        <Order/>
        <Inventory/>
      </div>
    )
  }
});

ReactDOM.render(<App/>, document.querySelector('#main'));