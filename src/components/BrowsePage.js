import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import instanceMap from '../../data/keyedData';

import RefinePanel from './RefinePanel';
import BrowseTable from './BrowseTable';
import BrowseCharts from './BrowseCharts';

import '../styles/BrowsePage.css';

export default class BrowsePage extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    filters: {},
  };

  setFilter = (filter) => {
    this.setState(Object.assign({}, this.state.filters, filter));
  };

  render() {
    const instances = _.values(instanceMap);
    const filtered = instances.slice(0, 10);

    return (
      <div className="BrowsePage">
        <RefinePanel setFilter={this.setFilter}
                     filters={this.state.filters}/>

        <div className="BrowsePage-main">
          <BrowseTable instances={filtered}/>
          <BrowseCharts />
        </div>
      </div>
    );
  }
};
