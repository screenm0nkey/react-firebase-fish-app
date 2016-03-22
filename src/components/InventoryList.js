import React from 'react';
import InventoryItem from './InventoryItem';
import AddFishForm from './InventoryForm';
import autobind from 'autobind-decorator';

@autobind
class Inventory extends React.Component {
  render () {
    let {linkState, fishes, removeFish} = this.props;
    let inventoryItemRows = Object.keys(fishes).map((key)=> {
      return (<InventoryItem
        key={key}
        id={key}
        fish={fishes[key]}
        linkState={linkState}
        removeFish={removeFish}>
      </InventoryItem>);
    });
    let samplesButton;
    if (!inventoryItemRows.length) {
      samplesButton = <button onClick={this.props.loadSamples}>Load Sample Fishes</button>;
    }
    return (
      <div>
        <h2>Inventory</h2>
        <AddFishForm {...this.props} />
        {inventoryItemRows}
        {samplesButton}
      </div>
    )
  }
}
Inventory.propTypes = {
  addFish : React.PropTypes.func.isRequired,
  loadSamples : React.PropTypes.func.isRequired,
  fishes : React.PropTypes.object.isRequired,
  linkState : React.PropTypes.func.isRequired,
  removeFish : React.PropTypes.func.isRequired
};

export default Inventory;
