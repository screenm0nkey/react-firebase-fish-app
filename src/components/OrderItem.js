import React from 'react';
import h from '../helpers';

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
});

export default OrderItem;