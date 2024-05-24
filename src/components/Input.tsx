import { InputProps } from '@types';
import { memo } from 'react';

export const Input = memo((props: InputProps) => {
	const { city, setCity, searchHistory } = props;
	return (
		<>
			<div className="relative w-270">
				<input
					data-testid="input"
					className="h-50 p-2 w-full max-w-270 mx-2 my-1"
					type="text"
					placeholder="Choose city"
					value={city}
					onChange={(event) => setCity(event.target.value)}
				/>
				<button
					className="absolute top-1.5 bg-transparent hover:text-gray-500 right-0 border-none focus:outline-none"
					onClick={() => setCity('')}
				>
					x
				</button>
			</div>

			{searchHistory.length > 0 && (
				<div className="flex gap-x-2 items-center">
					Last search:
					{searchHistory.map((item) => (
						<button
							data-testid="history-data-item"
							className="py-1 px-3"
							onClick={() => setCity(item)}
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
