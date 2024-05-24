import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Input } from '@/components/Input';

describe('Render input', () => {
	const props = {
		city: 'ddd',
		searchHistory: ['paris', 'london'],
		setCity: () => {},
	};

	it('correctly', () => {
		const { getByTestId, unmount } = render(<Input {...props} />);
		expect(getByTestId('input')).toBeInTheDocument();

		unmount();
	});

	it('with history data', () => {
		const newProps = { ...props, searchHistory: ['paris', 'london'] };

		const { getAllByTestId, unmount } = render(<Input {...newProps} />);

		const items = getAllByTestId('history-data-item');

		expect(items.length).toBe(props.searchHistory.length);
		expect(items[0].innerHTML).toBe(props.searchHistory[0]);
		expect(items[1].innerHTML).toBe(props.searchHistory[1]);

		unmount();
	});
});
