import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { useDebouncedValue } from './hooks/useDebouncedValue';
import { DataSchema } from '@types';
import { saveSearchHistory } from '@utils';

function App() {
	const [data, setData] = useState<DataSchema | undefined>();

	const [city, setCity] = useState('');
	const debouncedSearchTerm = useDebouncedValue(city, 500);

	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setIsError(false);
			setIsLoading(true);

			try {
				const result = await axios(
					`http://api.weatherapi.com/v1/current.json?key=${
						import.meta.env.VITE_API_KEY
					}&q=${debouncedSearchTerm}`
				);

				setData(result.data);
				saveSearchHistory(debouncedSearchTerm);
				setCity('');
			} catch (error) {
				setIsError(true);
				setData(undefined);
			}

			setIsLoading(false);
		};

		if (debouncedSearchTerm) fetchData();
	}, [debouncedSearchTerm]);

	const saved = localStorage.getItem('searchHistroy');
	const searchHistory: Array<string> = JSON.parse(saved || '[]');

	return (
		<main className="flex flex-col gap-y-5">
			<h1>Weather App</h1>
			<section>
				<input
					className="h-[50px] p-2 w-full mb-1"
					type="text"
					placeholder="Choose city"
					value={city}
					onChange={(event) => setCity(event.target.value)}
				/>
				{searchHistory.length > 0 && (
					<div className="flex gap-x-2 items-center">
						Last search:
						{searchHistory.map((item, index: number) => (
							<button
								className="py-1 px-3"
								onClick={() => setCity(item)}
								key={index}
							>
								{item}
							</button>
						))}
					</div>
				)}
			</section>

			<section className="min-h-[110px] mt-5">
				{isError && <div>Something went wrong ...</div>}

				{isLoading && <div>Loading ...</div>}
				{data && !isError && !isLoading && (
					<div>
						<h3>
							Weather in <span className="capitalize">{searchHistory[0]}</span>
						</h3>
						<ul>
							<li key={data?.location.name}>
								<p>Temp: {data?.current.temp_c}</p>
								<p>Humidity: {data?.current.humidity}</p>
								<p>Wind: {data?.current.wind_kph}</p>
							</li>
						</ul>
					</div>
				)}
			</section>
		</main>
	);
}

export default App;
