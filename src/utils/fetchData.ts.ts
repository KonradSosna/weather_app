import { QueryKey } from '@tanstack/react-query';

export const fetchData = async ({ queryKey }: { queryKey: QueryKey }) => {
	const [, search] = queryKey;
	const result = await fetch(
		`http://api.weatherapi.com/v1/current.json?key=${
			import.meta.env.VITE_API_KEY
		}&q=${search}`
	)
		.then((res) => res.json())
		.catch(() => {
			return null;
		});

	return result;
};
