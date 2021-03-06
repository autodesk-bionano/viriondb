/*
 Copyright 2016 Autodesk,Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
import React, { Component, PropTypes } from 'react';
import { capitalize } from 'lodash';
import { fieldName } from '../constants/rows';

import ComparisonRowDetail from './ComparisonRowDetail';

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
          {fieldName(row)}
        </div>

        {instances.map(instance => {
          return (
            <div key={instance.id}
                 className="ComparisonRow-value">
              <div className="ComparisonRow-basic">{instance[row]}</div>
              {isActive && (<ComparisonRowDetail field={row}
                                                 instance={instance}
                                                 value={instance[row]}/>)}
            </div>
          );
        })}
      </div>
    );
  }
}
