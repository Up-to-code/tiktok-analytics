'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const EngagementChart = ({ data }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h3 className="text-lg font-semibold mb-4">Engagement Trends</h3>
    <Line
      data={data}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      }}
    />
  </div>
); 