import { saveSearchHistory } from './searchHistory';

export const fetchData = async (search: string) => {
	const result = await fetch(
		`http://api.weatherapi.com/v1/current.json?key=${
			import.meta.env.VITE_API_KEY
		}&q=${search}`
	).then((res) => res.json());

	if (result.current) {
		saveSearchHistory(search);
		return result;
	} else
		throw new Error(
			result.error.code === 1003
				? 'Provide correct city name'
				: result.error.message
		);
};
