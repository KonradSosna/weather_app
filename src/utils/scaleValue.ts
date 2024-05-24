export const scaleValue = (
	oldRange: number[],
	newRange: number[],
	value?: string
) => {
	const [xMin, xMax] = newRange;
	const [yMin, yMax] = oldRange;

	const percent = (Number(value) - yMin) / (yMax - yMin);
	const output = percent * (xMax - xMin) + xMin;

	return output;
};
