import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { DataSchema } from '@/types';
import axios from 'axios';
import { useState } from 'react';

export const useFetchData = async (city: string) => {
	const [data, setData] = useState<DataSchema | undefined>();
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const debouncedSearchTerm = useDebouncedValue(city, 500);

	const fetchData = async () => {
		setIsError(false);
		setIsLoading(true);

		try {
			const result = await axios(
				`http://api.weatherapi.com/v1/current.json?key=${
					import.meta.env.VITE_API_KEY
				}&q=${debouncedSearchTerm}`
			);

			setData(result.data.current);
		} catch (error) {
			setIsError(true);
			setData(undefined);
		}

		setIsLoading(false);
	};

	return { fetchData, data, isLoading, isError };
};
