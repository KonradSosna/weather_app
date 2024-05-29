import { fetchLocation } from '@/utils';
import { useMutation } from '@tanstack/react-query';
import { InputProps, LocationSchema } from '@types';
import { memo, useEffect } from 'react';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

export const Input = memo((props: InputProps) => {
	const { city, setCity, callData } = props;

	const searchHistory: string[] = JSON.parse(
		localStorage.getItem('searchHistroy') || '[]'
	);

	const { mutate, data } = useMutation<LocationSchema>({
		mutationFn: () => fetchLocation(city),
	});

	const autocompleteOptions =
		data?.map((item) =>
			`${item.name}, ${item.region}, ${item.country}`.replace(/ ,/g, '')
		) || [];

	useEffect(() => {
		if (city) {
			mutate();
		}
	}, [city, mutate]);

	return (
		<>
			<div className="relative flex gap-x-2 mb-2">
				<TextInput
					trigger={''}
					options={autocompleteOptions}
					value={city}
					onChange={(v) => setCity(v as string)}
					onSelect={() => callData()}
					className="max-w-[300px] pl-1"
				/>
				<button
					className="bg-transparent border border-white hover:text-gray-500 focus:outline-none"
					onClick={() => setCity('')}
				>
					Clear
				</button>
			</div>

			{searchHistory.length > 0 && (
				<div className="flex gap-1 flex-col md:flex-row items-center">
					Last search:
					{searchHistory.map((item) => (
						<button
							data-testid="history-data-item"
							className="py-1 px-3"
							onClick={() => {
								setCity(item);
								callData();
							}}
							key={item}
						>
							{item}
						</button>
					))}
				</div>
			)}
		</>
	);
});
