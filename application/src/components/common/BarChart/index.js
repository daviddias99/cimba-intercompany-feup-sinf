import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Chart from 'chart.js';

const BarChart = ({ id, children }) => {
  useEffect(() => {
    const ctx = document.getElementById(`bar-${id}`);

    new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: children !== undefined && children.map((key) => key.name),
        datasets: [
          {
            barPercentage: 0.8,
            data: children !== undefined && children.map((key) => key.requests),
            backgroundColor: [
              '#FF6384',
              '#FF9F40',
              '#FFCD56',
              '#4BC0C0',
              '#36A2EB',
              '#9966FF',
            ],
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              display: false,
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              const dataset = data.datasets[tooltipItem.datasetIndex];
              const total = dataset.data.reduce(function (
                previousValue,
                currentValue
              ) {
                return previousValue + currentValue;
              });

              const currentValue = dataset.data[tooltipItem.index];
              const percentage = (currentValue / total) * 100;

              return (
                ' ' +
                currentValue +
                ' requests (' +
                percentage.toFixed(2) +
                '%)'
              );
            },
          },
        },
      },
    });
  });

  return (
    <div>
      <canvas id={'bar-' + id} height="290px" />
    </div>
  );
};

BarChart.propTypes = {
  id: PropTypes.string,
  children: PropTypes.any,
};

export default BarChart;
