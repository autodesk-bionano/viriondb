import React, { Component, PropTypes } from 'react';
import { capitalize } from 'lodash';
import instanceMap from '../../data/keyedData.js';
import { rows, rowNames } from '../constants/rows';

import '../styles/ComparisonRow.css';

export default class ComparisonRow extends Component {
  static propTypes = {
    row: PropTypes.string.isRequired,
    instances: PropTypes.array.isRequired,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    isActive: false,
    onClick: () => {},
  };

  state = {
    activeRow: null,
  };

  render() {
    const { row, instances, isActive, onClick } = this.props;
    return (
      <div className={'ComparisonRow' + (isActive ? ' active' : '')}
           onClick={() => onClick(row)}>
        <div className="ComparisonRow-key">
          {rowNames[row] || capitalize(row)}
        </div>

        {instances.map(instance => {
          return (
            <div key={instance.id}
                 className="ComparisonRow-value">
              {instance[row]}
            </div>
          )
        })}
      </div>
    );
  }
}
