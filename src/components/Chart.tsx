import { ChartProps } from '@types';
import { scaleValue } from '@utils';
import {
	Chart as ChartJS,
	LineElement,
	PointElement,
	Tooltip,
	Legend,
	RadialLinearScale,
	Filler,
} from 'chart.js';
import { FC, memo } from 'react';
import { Radar } from 'react-chartjs-2';
import { MoonLoader } from 'react-spinners';

ChartJS.register(
	LineElement,
	PointElement,
	Tooltip,
	Legend,
	RadialLinearScale,
	Filler
);

export const Chart: FC<ChartProps> = memo(({ data, loading }) => {
	const chartData = {
		labels: ['Temperature', 'Humidity', 'Wind Speed'],
		datasets: [
			{
				data: [
					scaleValue([-10, 40], [0, 5], data?.current.temp_c),
					scaleValue([0, 100], [0, 5], data?.current.humidity),
					scaleValue([0, 60], [0, 5], data?.current.wind_kph),
				],
				backgroundColor: 'rgba(174,194,236, 0.6)',
				borderColor: '#AEB8EC',
				pointBackgroundColor: '#AEB8EC',
				pointBorderColor: 'lightgray',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: '#AEB8EC',
				borderWidth: 2,
			},
		],
	};

	const options = {
		responsive: true,
		scales: {
			r: {
				angleLines: {
					color: '#B0B0B1',
				},
				pointLabels: {
					color: 'white',
					font: {
						weight: 700,
					},
				},
				beginAtZero: true,
				max: 5,
				ticks: {
					display: false,
					stepSize: 1,
				},
				grid: {
					color: [
						'#94918f',
						'#A9A5A3',
						'#9D9D9C',
						'#D1D1D1',
						'#D3D3D4',
						'white',
					],
				},
				// backgroundColor: (context: ContextType) =>
				// 	createRadialGradient(context),
				backgroundColor: 'gray',
			},
		},
		plugins: {
			legend: {
				display: false,
			},
		},
	};

	if (loading) return <MoonLoader color="rgba(174,194,236, 1)" size={200} />;
	if (data) return <Radar data={chartData} options={options} />;
});
