import { useState, useEffect } from 'react';
import { useDebouncedValue } from '@hooks';
import { DataSchema } from '@types';
import { fetchData } from '@utils';
import { useMutation } from '@tanstack/react-query';
import { Chart } from './Chart';
import { Input } from './Input';

function WeatherApp() {
	const [city, setCity] = useState('');
	const debouncedSearchTerm = useDebouncedValue(city);

	const { mutate, error, data, isPending } = useMutation<DataSchema>({
		mutationFn: () => fetchData(debouncedSearchTerm),
	});

	useEffect(() => {
		if (debouncedSearchTerm) {
			mutate();
		}
	}, [debouncedSearchTerm, mutate]);

	const saved = localStorage.getItem('searchHistroy');
	const searchHistory: Array<string> = JSON.parse(saved || '[]');

	return (
		<main className="flex flex-col gap-y-5">
			<h1>Weather App</h1>
			<section className="flex flex-col items-center">
				<Input city={city} searchHistory={searchHistory} setCity={setCity} />
			</section>

			<section className="min-h-110 mt-5">
				{error && <p>{error.message}</p>}
				{isPending && <div>Loading ...</div>}
				{data?.current && (
					<div>
						<h3>
							Weather in <span className="capitalize">{searchHistory[0]}</span>
						</h3>
						<ul>
							<li key={data.location.name}>
								<p>Temp: {data.current.temp_c} °C</p>
								<p>Humidity: {data.current.humidity} %</p>
								<p>Wind: {data.current.wind_kph} km/h</p>
							</li>
						</ul>
					</div>
				)}
			</section>
			<div className="size-600 flex items-center justify-center">
				<Chart data={data} loading={isPending} />
			</div>
		</main>
	);
}

export default WeatherApp;
