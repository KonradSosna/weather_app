import { ContextType } from '@/types';

const cache = new Map();
let width: number | null = null;
let height: number | null = null;

export function createRadialGradient(context: ContextType) {
	const chartArea = context.chart.chartArea;
	if (!chartArea) {
		// This case happens on initial chart load
		return;
	}

	const colors = ['#CFC5C2', '#E9E8E8', 'white'];

	const chartWidth = chartArea.right - chartArea.left;
	const chartHeight = chartArea.bottom - chartArea.top;

	if (width !== chartWidth || height !== chartHeight) {
		cache.clear();
	}
	let gradient = cache.get(colors[0] + colors[1] + colors[2]);
	if (!gradient) {
		// Create the gradient because this is either the first render
		// or the size of the chart has changed
		width = chartWidth;
		height = chartHeight;
		const centerX = (chartArea.left + chartArea.right) / 2;
		const centerY = (chartArea.top + chartArea.bottom) / 2;
		const r = Math.min(
			(chartArea.right - chartArea.left) / 2,
			(chartArea.bottom - chartArea.top) / 2
		);
		const ctx = context.chart.ctx;
		gradient = ctx.createRadialGradient(
			centerX,
			centerY,
			0,
			centerX,
			centerY,
			r
		);
		gradient.addColorStop(0, colors[0]);
		gradient.addColorStop(0.5, colors[1]);
		gradient.addColorStop(1, colors[2]);
		cache.set(colors[0] + colors[1] + colors[2], gradient);
	}

	return gradient;
}
