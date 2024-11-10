import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function EventChart ({ eventData }) {

    const getMonthlyEventData = (events) => {
        const months = Array(12).fill(0);
        events.forEach((event) => {
            const month = new Date(event.eventDate).getMonth();
            months[month]++;
        });
        return months;
    };
    const monthlyData = getMonthlyEventData(eventData);

    const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Events',
        data: monthlyData,
        fill: false,
        borderColor: '#36A2EB',
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Monthly Organized Events',
        font: {
          size: 18,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default EventChart;
