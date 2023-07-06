// import React from "react";
// import Chart from "react-apexcharts";


// function SuperAdminCard() {
//   const options = {
//     chart: {
//       id: "basic-bar"
//     },
//     xaxis: {
//       categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
//     }
//   };

//   const series = [
//     {
//       name: "series-1",
//       data: [30, 40, 45, 50, 49, 60, 70, 91]
//     }
//   ];

//   return (
//     <div className="app">
//       <div className="row">
//         <div className="mixed-chart">
//           <Chart
//             options={options}
//             series={series}
//             type="bar"
//             width="500"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };


// export default SuperAdminCard;


// import React, { useEffect, useRef } from 'react';
// import ApexCharts from 'react-apexcharts';
// import 'apexcharts/dist/apexcharts.css';



// function SuperAdminCard() {
//     const [chartOptions, setChartOptions] = React.useState({});
//     const chartRef = useRef(null);
    
//     // Your getMainChartOptions function goes here...
//     const getMainChartOptions = () => {
//         let mainChartColors = {}
    
//             mainChartColors = {
//             borderColor: '#F3F4F6',
//             labelColor: '#6B7280',
//             opacityFrom: 0.45,
//             opacityTo: 0,
//         }
        
//         return {
//             chart: {
//                 height: 420,
//                 type: 'area',
//                 fontFamily: 'Inter, sans-serif',
//                 foreColor: mainChartColors.labelColor,
//                 toolbar: {
//                     show: false
//                 }
//             },
//             fill: {
//                 type: 'gradient',
//                 gradient: {
//                     enabled: true,
//                     opacityFrom: mainChartColors.opacityFrom,
//                     opacityTo: mainChartColors.opacityTo
//                 }
//             },
//             dataLabels: {
//                 enabled: false
//             },
//             tooltip: {
//                 style: {
//                     fontSize: '14px',
//                     fontFamily: 'Inter, sans-serif',
//                 },
//             },
//             grid: {
//                 show: true,
//                 borderColor: mainChartColors.borderColor,
//                 strokeDashArray: 1,
//                 padding: {
//                     left: 35,
//                     bottom: 15
//                 }
//             },
//             series: [
//                 {
//                     name: 'Revenue',
//                     data: [6356, 6218, 6156, 6526, 6356, 6256, 6056],
//                     color: '#1A56DB'
//                 },
//                 {
//                     name: 'Revenue (previous period)',
//                     data: [6556, 6725, 6424, 6356, 6586, 6756, 6616],
//                     color: '#FDBA8C'
//                 }
//             ],
//             markers: {
//                 size: 5,
//                 strokeColors: '#ffffff',
//                 hover: {
//                     size: undefined,
//                     sizeOffset: 3
//                 }
//             },
//             xaxis: {
//                 categories: ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb', '07 Feb'],
//                 labels: {
//                     style: {
//                         colors: [mainChartColors.labelColor],
//                         fontSize: '14px',
//                         fontWeight: 500,
//                     },
//                 },
//                 axisBorder: {
//                     color: mainChartColors.borderColor,
//                 },
//                 axisTicks: {
//                     color: mainChartColors.borderColor,
//                 },
//                 crosshairs: {
//                     show: true,
//                     position: 'back',
//                     stroke: {
//                         color: mainChartColors.borderColor,
//                         width: 1,
//                         dashArray: 10,
//                     },
//                 },
//             },
//             yaxis: {
//                 labels: {
//                     style: {
//                         colors: [mainChartColors.labelColor],
//                         fontSize: '14px',
//                         fontWeight: 500,
//                     },
//                     formatter: function (value) {
//                         return '$' + value;
//                     }
//                 },
//             },
//             legend: {
//                 fontSize: '14px',
//                 fontWeight: 500,
//                 fontFamily: 'Inter, sans-serif',
//                 labels: {
//                     colors: [mainChartColors.labelColor]
//                 },
//                 itemMargin: {
//                     horizontal: 10
//                 }
//             },
//             responsive: [
//                 {
//                     breakpoint: 1024,
//                     options: {
//                         xaxis: {
//                             labels: {
//                                 show: false
//                             }
//                         }
//                     }
//                 }
//             ]
//         };
//     }
//     // useEffect to initialize the chart on component mount
//     useEffect(() => {
//       setChartOptions(getMainChartOptions());
//     }, []);
    
//     // Return the JSX with the chart component
//     return (
//       <div>
//         <ApexCharts
//           ref={chartRef}
//           options={chartOptions}
//           series={chartOptions?.series}
//           type="area"
//           height={420}
//           />
    
//       </div>
//     );
//   }
  
//   export default SuperAdminCard;
  

// import React, { useEffect } from 'react';
// import ApexCharts from 'apexcharts';

// function SuperAdminCard() {
// const MainChart = () => {
//   useEffect(() => {
//     const getMainChartOptions = () => {
//       let mainChartColors = {};

//       if (document.documentElement.classList.contains('dark')) {
//         mainChartColors = {
//           borderColor: '#374151',
//           labelColor: '#9CA3AF',
//           opacityFrom: 0,
//           opacityTo: 0.15,
//         };
//       } else {
//         mainChartColors = {
//           borderColor: '#F3F4F6',
//           labelColor: '#6B7280',
//           opacityFrom: 0.45,
//           opacityTo: 0,
//         };
//       }

//       return {
//         chart: {
//           height: 420,
//           type: 'area',
//           fontFamily: 'Inter, sans-serif',
//           foreColor: mainChartColors.labelColor,
//           toolbar: {
//             show: false,
//           },
//         },
//         fill: {
//           type: 'gradient',
//           gradient: {
//             enabled: true,
//             opacityFrom: mainChartColors.opacityFrom,
//             opacityTo: mainChartColors.opacityTo,
//           },
//         },
//         dataLabels: {
//           enabled: false,
//         },
//         tooltip: {
//           style: {
//             fontSize: '14px',
//             fontFamily: 'Inter, sans-serif',
//           },
//         },
//         grid: {
//           show: true,
//           borderColor: mainChartColors.borderColor,
//           strokeDashArray: 1,
//           padding: {
//             left: 35,
//             bottom: 15,
//           },
//         },
//         series: [
//           {
//             name: 'Revenue',
//             data: [6356, 6218, 6156, 6526, 6356, 6256, 6056],
//             color: '#1A56DB',
//           },
//           {
//             name: 'Revenue (previous period)',
//             data: [6556, 6725, 6424, 6356, 6586, 6756, 6616],
//             color: '#FDBA8C',
//           },
//         ],
//         markers: {
//           size: 5,
//           strokeColors: '#ffffff',
//           hover: {
//             size: undefined,
//             sizeOffset: 3,
//           },
//         },
//         xaxis: {
//           categories: ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb', '07 Feb'],
//           labels: {
//             style: {
//               colors: [mainChartColors.labelColor],
//               fontSize: '14px',
//               fontWeight: 500,
//             },
//           },
//           axisBorder: {
//             color: mainChartColors.borderColor,
//           },
//           axisTicks: {
//             color: mainChartColors.borderColor,
//           },
//           crosshairs: {
//             show: true,
//             position: 'back',
//             stroke: {
//               color: mainChartColors.borderColor,
//               width: 1,
//               dashArray: 10,
//             },
//           },
//         },
//         yaxis: {
//           labels: {
//             style: {
//               colors: [mainChartColors.labelColor],
//               fontSize: '14px',
//               fontWeight: 500,
//             },
//             formatter: function (value) {
//               return '$' + value;
//             },
//           },
//         },
//         legend: {
//           fontSize: '14px',
//           fontWeight: 500,
//           fontFamily: 'Inter, sans-serif',
//           labels: {
//             colors: [mainChartColors.labelColor],
//           },
//           itemMargin: {
//             horizontal: 10,
//           },
//         },
//         responsive: [
//           {
//             breakpoint: 600,
//             options: {
//               chart: {
//                 height: 320,
//               },
//               yaxis: {
//                 labels: {
//                   style: {
//                     fontSize: '12px',
//                   },
//                 },
//               },
//             },
//           },
//         ],
//       };
//     };

//     const renderMainChart = () => {
//       const mainChartOptions = getMainChartOptions();
//       const mainChartElement = document.getElementById('main-chart');

//       if (mainChartElement) {
//         new ApexCharts(mainChartElement, mainChartOptions).render();
//       }
//     };

//     renderMainChart();

//     window.addEventListener('dark-mode-toggle', renderMainChart);

//     return () => {
//       window.removeEventListener('dark-mode-toggle', renderMainChart);
//     };
//   }, []);

//   return (
//     <div id="main-chart"></div>
//   );
// };
// }

// export default SuperAdminCart;

import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

function SuperAdminCard() {
  useEffect(() => {
    const getMainChartOptions = () => {
        let mainChartColors = {};
              if (document.documentElement.classList.contains('dark')) {
                mainChartColors = {
                  borderColor: '#374151',
                  labelColor: '#9CA3AF',
                  opacityFrom: 0,
                  opacityTo: 0.15,
                };
              } else {
                mainChartColors = {
                  borderColor: '#F3F4F6',
                  labelColor: '#6B7280',
                  opacityFrom: 0.45,
                  opacityTo: 0,
                };
              }
        
              return {
                chart: {
                  height: 420,
                  type: 'area',
                  fontFamily: 'Inter, sans-serif',
                  foreColor: mainChartColors.labelColor,
                  toolbar: {
                    show: false,
                  },
                },
                fill: {
                  type: 'gradient',
                  gradient: {
                    enabled: true,
                    opacityFrom: mainChartColors.opacityFrom,
                    opacityTo: mainChartColors.opacityTo,
                  },
                },
                dataLabels: {
                  enabled: false,
                },
                tooltip: {
                  style: {
                    fontSize: '14px',
                    fontFamily: 'Inter, sans-serif',
                  },
                },
                grid: {
                  show: true,
                  borderColor: mainChartColors.borderColor,
                  strokeDashArray: 1,
                  padding: {
                    left: 35,
                    bottom: 15,
                  },
                },
                series: [
                  {
                    name: 'Revenue',
                    data: [6356, 6218, 6156, 6526, 6356, 6256, 6056],
                    color: '#1A56DB',
                  },
                  {
                    name: 'Revenue (previous period)',
                    data: [6556, 6725, 6424, 6356, 6586, 6756, 6616],
                    color: '#FDBA8C',
                  },
                ],
                markers: {
                  size: 5,
                  strokeColors: '#ffffff',
                  hover: {
                    size: undefined,
                    sizeOffset: 3,
                  },
                },
                xaxis: {
                  categories: ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb', '07 Feb'],
                  labels: {
                    style: {
                      colors: [mainChartColors.labelColor],
                      fontSize: '14px',
                      fontWeight: 500,
                    },
                  },
                  axisBorder: {
                    color: mainChartColors.borderColor,
                  },
                  axisTicks: {
                    color: mainChartColors.borderColor,
                  },
                  crosshairs: {
                    show: true,
                    position: 'back',
                    stroke: {
                      color: mainChartColors.borderColor,
                      width: 1,
                      dashArray: 10,
                    },
                  },
                },
                yaxis: {
                  labels: {
                    style: {
                      colors: [mainChartColors.labelColor],
                      fontSize: '14px',
                      fontWeight: 500,
                    },
                    formatter: function (value) {
                      return '$' + value;
                    },
                  },
                },
                legend: {
                  fontSize: '14px',
                  fontWeight: 500,
                  fontFamily: 'Inter, sans-serif',
                  labels: {
                    colors: [mainChartColors.labelColor],
                  },
                  itemMargin: {
                    horizontal: 10,
                  },
                },
                responsive: [
                  {
                    breakpoint: 600,
                    options: {
                      chart: {
                        height: 320,
                      },
                      yaxis: {
                        labels: {
                          style: {
                            fontSize: '12px',
                          },
                        },
                      },
                    },
                  },-
                ],
              };
            };

    const renderMainChart = () => {
      const mainChartOptions = getMainChartOptions();
      const mainChartElement = document.getElementById('main-chart');

      if (mainChartElement) {
        new ApexCharts(mainChartElement, mainChartOptions).render();
      }
    };

    renderMainChart();

    window.addEventListener('dark-mode-toggle', renderMainChart);

    return () => {
      window.removeEventListener('dark-mode-toggle', renderMainChart);
    };
  }, []);

  const MainChart = () => {
    return <div id="main-chart"></div>;
  };

  return <MainChart />;
}

export default SuperAdminCard;

