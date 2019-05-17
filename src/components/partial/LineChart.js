import React, { Component } from 'react';
import Chart from 'react-google-charts';

export class LineChart extends Component {
  render() {
    return (
      <>
        <Chart
          width={'1000px'}
          height={'400px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={[
            ['Hour', 'Prize'],
            [0, 17000],
            [1, 22450],
            [2, 9000],
            [3, 11430],
            [4, 17032],
            [5, 21098],
            [6, 19987],
            [7, 14092],
            [8, 20242],
            [9, 18203],
            [10, 19440],
            [11, 25094],
            [12, 19990],
          ]}
          options={{
            hAxis: {
              title: 'Time',
            },
            vAxis: {
              title: 'Prize',
            },
          }}
          rootProps={{ 'data-testid': '1' }}
        />
      </>
    )
  }
}

export default LineChart
