import React, { Component } from 'react';
import Chart from 'react-google-charts';

export class BarChart extends Component {
  render() {
    return (
      <>
        <Chart
          width={'1000px'}
          height={'500px'}
          chartType="Bar"
          loader={<div>Loading Chart</div>}
          // data will be parsed via prop
          data={[
            ['Month', 'Sales', 'Expenses', 'Profit'],
            ['February', 1000, 400, 200],
            ['March', 1170, 460, 250],
            ['April', 660, 1120, 300],
            ['May', 1030, 540, 350],
          ]}
          options={{
            chart: {
              title: '2019',
              subtitle: 'Sales, Expenses, and Profit',
            },
          }}
        />
      </>
    )
  }
}

export default BarChart
