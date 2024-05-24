import { useState, useEffect } from 'react';
import { useDebouncedValue } from '@hooks';
import { DataSchema } from '@types';
import { fetchData } from '@utils';
import { useMutation } from '@tanstack/react-query';
import { Chart } from './Chart';

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
			<section>
				<label>
					Choose city:
					<input
						className="h-[50px] p-2 w-full max-w-[270px] mx-2 my-1"
						type="text"
						placeholder="Choose city"
						value={city}
						onChange={(event) => setCity(event.target.value)}
					/>
				</label>
				{searchHistory.length > 0 && (
					<div className="flex gap-x-2 items-center justify-center">
						Last search:
						{searchHistory.map((item) => (
							<button
								className="py-1 px-3"
								onClick={() => setCity(item)}
								key={item}
							>
								{item}
							</button>
						))}
					</div>
				)}
			</section>

			<section className="min-h-[110px] mt-5">
				{error && <p>{error.message}</p>}

				{isPending && <div>Loading ...</div>}
				{data?.current && !error && (
					<div>
						<h3>
							Weather in <span className="capitalize">{searchHistory[0]}</span>
						</h3>
						<ul>
							<li key={data.location.name}>
								<p>Temp: {data.current.temp_c}</p>
								<p>Humidity: {data.current.humidity}</p>
								<p>Wind: {data.current.wind_kph}</p>
							</li>
						</ul>
					</div>
				)}
			</section>
			<div className="size-[600px] flex items-center justify-center">
				<Chart data={data} loading={isPending} />
			</div>
		</main>
	);
}

export default WeatherApp;
