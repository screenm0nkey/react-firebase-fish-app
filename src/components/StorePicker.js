import React from 'react';
import { History } from 'react-router';
import h from '../helpers';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';
import Rebase from're-base'; // Firebase
var firebase = Rebase.createClass('https://nick-of-the-day.firebaseio.com/');

@autobind // stores the 'this;' context
class StorePicker extends React.Component {

  constructor(props){
    super(props);
    this.state = { storeData : []}
  }

  goToStore(event) {
    event.preventDefault();
    // get the data from the input
    var storeId = this.refs.storeId.value;
    // this will invoke the route set in main.js has <Route path="/store/:storeId" component={App}/>
    this.history.pushState(null, '/store/' + storeId);
  }

  componentWillMount() {
    firebase.fetch('/', {
      context: this,
      asArray: true,
      then(data){
        this.setState({ storeData : data });
      }
    });
  }

  render() {
    let rows = this.state.storeData.map((store) => {
      return <li key={store.key}><a href={'/store/' + store.key}>{store.key}</a></li>
    });

    let style = {margin : 'bottom:0'};

    var storeList;
    if (this.state.storeData.length) {
      storeList =  <ul>{rows}</ul>;
    } else {
      storeList = <div>Loading previous stores...</div>;
    }

    return (
        <form className="store-selector" onSubmit={this.goToStore}>
          <h2>Please Enter A Store</h2>
          <input type="text" ref="storeId" defaultValue={h.getFunName()} required />
          <input type="Submit" />

          <hr/>
          <h5 style={style}>Previous stores</h5>
          {storeList}
        </form>
    )
  }
}

reactMixin.onClass(StorePicker, History);

export default StorePicker;
