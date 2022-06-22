/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

function configs(labels, datasets) {
  const colorforlabels = "white";
  return {
    data: {
      labels,
      datasets: [...datasets],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      // animation: {
      //   duration: 8000,
      // },
      plugins: {
        legend: {
          display: true,
          labels: {
            color: "rgb(255, 255, 255)",
            font: {
              size: 10,
            },
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      scales: {
        y: {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
            color: colorforlabels,
          },
          ticks: {
            display: true,
            padding: 10,
            color: colorforlabels,
            font: {
              size: 10,
              weight: 300,
              family: "Roboto",
              style: "normal",
              lineHeight: 1,
            },
          },
        },
        x: {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: true,
            borderDash: [5, 5],
            color: colorforlabels,
          },
          ticks: {
            display: true,
            color: colorforlabels,
            padding: 10,
            font: {
              size: 10,
              weight: 300,
              family: "Roboto",
              style: "normal",
              lineHeight: 1,
            },
          },
        },
      },
    },
  };
}

export default configs;
