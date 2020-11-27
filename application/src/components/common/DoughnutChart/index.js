import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Chart from 'chart.js';

const DoughnutChart = ({ id, children }) => {
  useEffect(() => {
    const ctx = document.getElementById(`doughnut-${id}`);

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: children !== undefined && children.map((key) => key.name),
        datasets: [
          {
            data: children !== undefined && children.map((key) => key.requests),
            backgroundColor: [
              '#FF6384',
              '#FF9F40',
              '#FFCD56',
              '#4BC0C0',
              '#36A2EB',
              '#9966FF',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        legend: {
          position: 'right',
          labels: {
            fontSize: 14,
            padding: 14,
            boxWidth: 14,
            usePointStyle: true,
          },
        },
        animation: {
          animateRotate: true,
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
      <canvas id={'doughnut-' + id} height="290px" />
    </div>
  );
};

DoughnutChart.propTypes = {
  id: PropTypes.string,
  children: PropTypes.any,
};

export default DoughnutChart;
