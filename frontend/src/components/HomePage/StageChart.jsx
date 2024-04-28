import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

function StageChart({ projects }) {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const leadPercent = Math.round(projects.filter(project => project.stage === 'Lead').length / projects.length * 100);
  const prospectPercent = Math.round(projects.filter(project => project.stage === 'Prospect').length / projects.length * 100);
  const approvedPercent = Math.round(projects.filter(project => project.stage === 'Approved').length / projects.length * 100);
  const completedPercent = Math.round(projects.filter(project => project.stage === 'Completed').length / projects.length * 100);
  const invoicedPercent = Math.round(projects.filter(project => project.stage === 'Invoiced').length / projects.length * 100);

  const data = {
    labels: ['Lead', 'Prospect', 'Approved', 'Completed', 'Invoiced'],
    datasets: [
      {
        label: '% of Projects at this stage',
        data: [leadPercent, prospectPercent, approvedPercent, completedPercent, invoicedPercent],
        backgroundColor: [
          '#6ce5e8',
          '#41b8d5',
          '#2d8bba',
          '#2f5f98',
          '#31356e'
        ]
      }
    ]
  };

  return (
    <Doughnut data={data} />
  )
}

export default StageChart;
