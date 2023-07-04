import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

function SuperAdminCard() {

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  useEffect(() => {
    const lineChartOptions = {
      series: [
        {
          name: "Branch A",
          data: [28, 29, 33, 36, 32, 32, 33, 35, 29, 28, 34, 35]
        },
        {
          name: "Branch B",
          data: [28, 39, 34, 20, 31, 23, 37, 25, 30, 36, 22, 38]
        },
        {
          name: "Branch C",
          data: [28, 32, 37, 21, 30, 22, 35, 26, 23, 33, 39, 24]
        },
        {
          name: "Branch D",
          data: [28, 22, 33, 37, 35, 26, 20, 38, 21, 23, 39, 30]
        }
      ],
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#77B6EA', '#545454', '#FF0000', '#00FF00', '#FFA500', '#800080', '#FFFF00', '#008080', '#800000', '#008000',
      '#FFC0CB', '#000080', '#FFD700', '#FF6347', '#00FFFF', '#8A2BE2', '#FF00FF', '#4B0082', '#808000', '#FF4500',
      '#00CED1', '#9932CC', '#0000FF', '#8B0000', '#FFFFE0', '#BDB76B', '#20B2AA', '#FF7F50', '#000000', '#FF69B4',
      '#008B8B', '#ADFF2F', '#7B68EE', '#DC143C', '#00BFFF', '#FA8072', '#66CDAA', '#BA55D3', '#F08080', '#6B8E23',
      '#4682B4', '#DAA520', '#AFEEEE', '#6A5ACD', '#FF8C00', '#2E8B57', '#F4A460', '#ADD8E6', '#9370DB', '#F5DEB3'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Total Product sold by Branch',
        align: 'left'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        title: {
          text: `${currentYear}`,
        }
      },
      yaxis: {
        title: {
          text: 'Total Products'
        },
        min: 5,
        max: 40
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };

    const lineChart = new ApexCharts(document.querySelector("#lineChart"), lineChartOptions);
    lineChart.render();

    // Cleanup chart on component unmount
    return () => {
      lineChart.destroy();
    };
  }, []); // Empty dependency array to ensure useEffect runs only once

  return (
    <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '8px' }} className='p-6 mx-4 bg-white border-2 rounded-lg shadow-md
    ' id="lineChart" />
  );
}

export default SuperAdminCard;
