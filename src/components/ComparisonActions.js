import React, { PropTypes, Component } from 'react';
import { favorites } from '../data/favorites';

import '../styles/ComparisonActions.css';

export default class ComparisonActions extends Component {
  static propTypes = {
    instances: PropTypes.array.isRequired,
    onStar: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
  };

  render() {
    const { instances, onStar, onRemove } = this.props;
    return (
      <div className="ComparisonActions">
        <div className="ComparisonActions-key"></div>

        {instances.map(instance => {
          const isStarred = favorites.indexOf(instance.id) >= 0;
          return (
            <div key={instance.id}
                 className="ComparisonActions-value">

              {instances.length > 1 && (<span className="ComparisonActions-remove"
                                              onClick={() => onRemove(instance.id)}>
                    Remove
                  </span>)}

                  <span className={'ComparisonActions-star' + (isStarred ? ' active' : '')}
                        onClick={() => onStar(instance.id)}>
                  </span>
            </div>
          );
        })}
      </div>
    );
  }
}
