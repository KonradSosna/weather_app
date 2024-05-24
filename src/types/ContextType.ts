import { ChartArea } from 'chart.js';

export type ContextType = {
	chart: { chartArea: ChartArea; ctx: CanvasRenderingContext2D };
};
