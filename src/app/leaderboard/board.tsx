
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
import { useEffect, useState, useLayoutEffect } from 'react';

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Warmest and Fuzziest ( Top 3 )',
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

  // TODO possibly use ISR for this leaderboard
  const Leaderboard = () => {
    const [leaders, setLeaders] = useState([]);

    // type checkbox = {id: number, label: string, color: string, checked: boolean}
    useEffect(() => {
      const getLeaders = async () => {
        const result : void | { output: any[], error: null } = await getAllMembers("warm-fuzzies");
        if (result) {
          const top_three : any = result.output.slice(0,3)
          // const names = top_three.map((elem) => { return elem.user})
          // const no_names = top_three.map((elem) => { return elem.data})
          console.log(top_three)
          setLeaders(top_three)
        }
      }

      getLeaders()
    }, [])
    // useEffect(() => {
    //   console.log(leaders)
    //   setnames(leaders.map((elem) => elem.label))
    // }, [leaders])
    
  return (
    <div>

      <Bar options={options} data={{
        labels: leaders.map((elem: any)=> elem.user_data.name),
        datasets: [
          {
            label: "# of Warm&Fuzzies completed",
            data: leaders.map((elem: any)=> elem.data.length),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      }}></Bar>
    </div>
  )
}

export default Leaderboard;