import * as React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Video statistics',
    },
  },
  redraw: true,
  maintainAspectRatio: false,
};

type ChartProps = {
  isVisible: boolean;
  views: number;
  likes: number;
  favorites: number;
  comments: number;
};

export default function Chart(props: ChartProps) {
  const { isVisible, views, likes, comments, favorites } = props;
  const statistics = [views, likes, comments, favorites];

  const data = {
    labels: ['views, M', 'likes, 10K', 'comments, 1K', 'favorites, 1K'],
    datasets: [
      {
        data: statistics.map((el) => {
          if (statistics.indexOf(el) === 0) {
            return (el / 1000000).toFixed(1);
          }
          if (statistics.indexOf(el) === 1) {
            return (el / 10000).toFixed(1);
          } 
          return (el / 1000).toFixed(1);
        }),

        backgroundColor: [
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      {isVisible ? (
        <Pie
          options={options}
          data={data}
          height={'100%'}
          width={'100%'}
          className="chart"
        />
      ) : null}
    </>
  );
}
