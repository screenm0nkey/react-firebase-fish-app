import React from 'react';

// Catalyst.LinkedStateMixin offers two-way binding for forms
// and adds the linkState() method to the component
var InventoryItem = React.createClass({
  render : function() {
    let {linkState, removeFish, id:key} = this.props;
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
