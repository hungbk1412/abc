import React, { Component } from 'react';
import Chart from 'react-google-charts';

export class PieChart extends Component {
  render() {
    return (
      <>
        <Chart
          width={'800px'}
          height={'800px'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={[
            ['Task', 'Hours per Day'],
            ['Work', 11],
            ['Eat', 2],
            ['Commute', 2],
            ['Watch TV', 2],
            ['Sleep', 7],
          ]}
          options={{
            title: 'My Daily Activities',
          }}
        />
      </>
    )
  }
}

export default PieChart
