
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getAllMembers } from '@/firebase/firestore/getData';

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Warmest and Fuzziest',
      },
    },
  };
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  
  const Leaderboard = () => {
    
    const labels = getAllMembers("warm-fuzzies");
    console.log(labels)
    const data = {
      labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: labels.map(() => 599),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };

  return (
    <Bar options={options} data={data}></Bar>
  )
}

export default Leaderboard;