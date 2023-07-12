import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTotalRevenueByBranch } from '../../../../features/admins/adminSlice';

function SuperAdminCard() {

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const dispatch = useDispatch()
  const totalRevenueByBranch = useSelector((state) => state.admins.totalRevenueByBranch)
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const months = totalRevenueByBranch.reduce((months, item) => {
    const date = new Date(item.Date);
    const monthIndex = date.getMonth();
    const monthName = monthNames[monthIndex];
  
    if (!months.includes(monthName)) {
      months.push(monthName);
    }
  
    return months;
  }, []);
  
console.log(months)  
  
  
  useEffect(() => {
    dispatch(fetchTotalRevenueByBranch());
  }, [dispatch]);
  
  console.log(totalRevenueByBranch)
  
  useEffect(() => {
    const formatRevenue = (revenue) => {
      if (revenue >= 1000000) {
        return `${(revenue / 1000000).toFixed(1)}M`;
      } else if (revenue >= 1000) {
        return `${(revenue / 1000).toFixed(0)}K`;
      } else {
        return `${revenue}`;
      }
    };
    let branchData = {}
    totalRevenueByBranch.forEach(item => {
      const { Branch, Revenue } = item;
      if (!branchData[Branch]) {
        branchData[Branch] = [];
      }
      branchData[Branch].push(Number(Revenue));
    });
  
    const series = Object.entries(branchData).map(([branch, revenueData]) => ({
      name: branch,
      data: revenueData,
    }));

    const maxRevenue = Math.max(...totalRevenueByBranch.map((item) => Number(item.Revenue)));

    const lineChartOptions = {
      series: series,
      chart: {
        height: 350,
        type: 'line',
        width: "100%",
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
        formatter: (value, { seriesIndex, dataPointIndex, w }) => formatRevenue(value),
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Total Revenue by Branch',
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
        categories: months,
        title: {
          text: `${currentYear}`,
        }
      },
      yaxis: {
        title: {
          text: 'Revenue'
        },
        min: 5,
        max: maxRevenue + (10%maxRevenue),
        labels: {
          formatter: (value) => formatRevenue(value),
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };

    if (totalRevenueByBranch.length > 0) {
      const lineChart = new ApexCharts(document.querySelector("#lineChart"), lineChartOptions);
      lineChart.render();
  
      // Cleanup chart on component unmount
      return () => {
        lineChart.destroy();
      };
    }
  }, [totalRevenueByBranch, currentYear]); // Empty dependency array to ensure useEffect runs only once

  

  return (
    <div>
      <div className='p-6 mx-4 bg-white border-2 rounded-lg shadow-md
    ' id="lineChart"></div>
    </div>
  );
}

export default SuperAdminCard;
