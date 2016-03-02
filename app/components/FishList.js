import React from 'react';
import Fish from './Fish';

var FishList = React.createClass({
  render : function () {
    let {fishes} = this.props;
    let rows = Object.keys(fishes).map((key)=>
      <Fish key={key} index={key} details={fishes[key]} addToOrder={this.props.addToOrder}/>
    );
    return (<ul className="list-of-fishes">{rows}</ul>)
  }
});

export default FishList;