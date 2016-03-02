import React from 'react';
import h from '../helpers';
import OrderItem from './OrderItem';

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

export default Order;