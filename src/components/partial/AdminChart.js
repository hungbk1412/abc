import React, { Component } from 'react';
import BarChart from './BarChart';
import PieChart from './PieChart';
import LineChart from './LineChart';

export class AdminChart extends Component {
  render() {
    return (
      <div>
        <BarChart></BarChart>
        <hr />
        <PieChart></PieChart>
        <hr />
        <LineChart></LineChart>
      </div>
    )
  }
}

export default AdminChart
