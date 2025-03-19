import React from 'react'
import Chart from 'react-apexcharts'
export default function DonutChart({darkMode}) {
  const options = {
    series: [44, 55, 41],
    options: {
      chart: {
        type: "donut",
        height: 350,
        fontFamily:'danalight'
      },
      labels: ["کامپیوتر", "تبلت", "موبایل"],
      colors: darkMode ? ['#0f172a', '#1e293b', '#334155'] : ['#475569', '#64748b', '#94a3b8'],
      legend: {
        position: "bottom",
        labels: {
          colors: darkMode ? "#eeeeee" : "#000000",
        },
      },
      dataLabels: {
        style: {
          colors: ["#dddddd"],
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };
  
  return (
    <div className='py-6 bg-white rounded-lg p-5 flex dark:bg-gray-600 items-center justify-center '>
      <Chart  options={options.options} height={250}  series={options.series} type='donut'/>
    </div>
  )
}
