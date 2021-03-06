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
import { withRouter } from 'react-router';
import registry, { loadInstance, onRegister } from '../data/register';
import { rows } from '../constants/rows';
import { star } from '../data/favorites';

import ComparisonRow from './ComparisonRow';
import ComparisonActions from './ComparisonActions';
import Spinner from './Spinner';

import '../styles/ComparePage.css';

export class ComparePage extends Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
    params: PropTypes.shape({
      instances: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    activeRow: null,
  };

  componentDidMount() {
    this.listener = onRegister((registry, length) => {
      if (length > 0) {
        this.forceUpdate();
      }
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  onClickRow = (row) => {
    this.setState({ activeRow: row });
  };

  onStar = (id) => {
    star(id);
    this.forceUpdate();
  };

  onRemove = (id) => {
    const ids = this.props.params.instances.split(',');
    const index = ids.indexOf(id);
    if (index >= 0) {
      ids.splice(index, 1);
    }
    this.props.router.replace(`/${ids.join(',')}`);
  };

  render() {
    const instanceIds = this.props.params.instances.split(',');

    const instances = instanceIds
      .map(instanceId => registry[instanceId])
      .filter(instance => !!instance);

    if (instances.length !== instanceIds.length) {
      const toFetch = instanceIds.filter(instanceId => !registry[instanceId]);

      //put in request to load these instances. component already registered to update when register is updated
      loadInstance(...toFetch);

      return <Spinner />;
    }

    return (
      <div className="ComparePage">
        <div className="ComparePage-table">
          <ComparisonActions instances={instances}
                             onStar={this.onStar}
                             onRemove={(id) => this.onRemove(id)}/>
          {rows.map(row => (
            <ComparisonRow key={row}
                           row={row}
                           onClick={() => this.onClickRow(row)}
                           isActive={this.state.activeRow === row}
                           instances={instances}/>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(ComparePage);

