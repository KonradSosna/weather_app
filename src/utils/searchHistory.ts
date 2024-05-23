export const saveSearchHistory = (city: string) => {
	let initialValue = [];

	if (localStorage.getItem('searchHistroy') != null) {
		initialValue = JSON.parse(localStorage.getItem('searchHistroy')!);
	}

	let updatedValue = initialValue;

	updatedValue.unshift(city);
	updatedValue = [...new Set(updatedValue)];
	updatedValue.length > 4 && updatedValue.pop();

	localStorage.setItem('searchHistroy', JSON.stringify([...updatedValue]));
};
