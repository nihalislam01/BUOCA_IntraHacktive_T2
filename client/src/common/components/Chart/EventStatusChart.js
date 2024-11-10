import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

function EventStatusChart ({ eventData }) {

    const getEventStatusData = (events) => {
        return events.reduce((acc, event) => {
            acc[event.status] = (acc[event.status] || 0) + 1;
            return acc;
        }, {});
    };

    const statusCounts = getEventStatusData(eventData);

    const data = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Event Status',
        font: {
          size: 18,
        },
      },
    },
  };


  return (
  <Pie data={data} options={options}/>
  );
};

export default EventStatusChart;
