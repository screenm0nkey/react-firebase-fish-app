import { Router, Route, History } from 'react-router';

import React from 'react';
import h from '../helpers';
import OrderItem from './OrderItem';


let Order = React.createClass({

  logout :function (evt) {
    evt.preventDefault();
    window.location.href='/';
  },

  render : function() {
    let {order, fishes, removeFromOrder} = this.props;
    let orderIds = Object.keys(order);
    let btnStyle = {backgroundColor : 'red', marginBottom : '10px'}

    let total = orderIds.reduce((prevTotal, key)=> {
      let fish = fishes[key];
      let count = order[key];
      let isAvailable = fish && fish.status === 'available';

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
        <button onClick={this.logout} style={btnStyle}>Logout</button>
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

export default Order;