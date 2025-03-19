import React from 'react';
import Chart from 'react-apexcharts';

export default function Bar({ darkMode }) {
  const chartConfig = {
    series: [
      {
        name: 'فروش',
        data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 240,
        toolbar: {
          show: false,
        },
        fontFamily: 'danalight',
      },
      title: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#020617'],
      plotOptions: {
        bar: {
          columnWidth: '40%',
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: darkMode ? '#dddddd' : '#616161',
            fontSize: '12px',
            fontFamily: 'inherit',
            fontWeight: 400,
          },
        },
        categories: [
          'فروردین',
          'اردیبهشت',
          'خرداد',
          'تیر',
          'مرداد',
          'شهریور',
          'مهر',
          'آبان',
          'آذر',
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: darkMode ? '#dddddd' : '#616161',
            fontSize: '12px',
            fontFamily: 'inherit',
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: '#a0a0a0',
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: 'dark',
      },
    },
  };

  return (
    <div className='font-danabold px-2 pb-0'>
      <Chart options={chartConfig.options} series={chartConfig.series} type='bar' height={240} />
    </div>
  );
}