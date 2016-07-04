import React, {Component, PropTypes} from 'react';
import { fieldName } from '../../constants/rows';
import { pie, arc, width, height, radius, keyFn, massageData } from './constants';
import d3 from 'd3';

export default class PieChart extends Component {
  static propTypes = {
  	field: PropTypes.string.isRequired,
  	color: PropTypes.string,
  	data: PropTypes.object.isRequired,
  };

  static defaultProps = {
  	color: '#9999dd',
  };

  componentDidMount() {
  	//attach the chart to the page

  	this.svg = d3.select(this.element)
		.append("g");

	this.svg.append("g")
		.attr("class", "slices");
	this.svg.append("g")
		.attr("class", "labels");
	this.svg.append("g")
		.attr("class", "lines");

	this.svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	this.update(this.props.data);
  }

  componentDidUpdate() {
  	this.update(this.props.data);
  	//update the chart
  }

  componentWillUnmount() {
  	//todo - cleanup
  }

  update(data) {
  	const slice = this.svg.select(".slices").selectAll("path.slice")
		.data(pie(massageData(data)), keyFn);

	slice.enter()
		.insert("path")
		.style("fill", d => this.props.color)
		.attr("class", "slice");

	slice		
		.transition().duration(1000)
		.attrTween("d", (d) => {
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return (t) => arc(interpolate(t));
		});

	slice.exit()
		.remove();
  }

  render() {

    return (
        <svg className="PieChart" 
        	 ref={(el) => { if (el) { this.element = el; }}}>
        </svg>
    );
  }
};
