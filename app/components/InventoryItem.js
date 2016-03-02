import React from 'react';
import h from '../helpers';

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

export default InventoryItem;
