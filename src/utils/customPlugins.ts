import { ContextType } from '@/types';

export const canvasBackgroundColor = {
	id: 'canvasBackgroundColor',
	beforeDraw(chart: ContextType) {
		const { ctx } = chart;

		//white
		ctx.save();
		ctx.fillStyle = '#F2F2F4';
		ctx.beginPath();
		ctx.moveTo(308, 35);
		ctx.lineTo(545, 445);
		ctx.lineTo(70, 445);
		ctx.closePath();
		ctx.fill();

		//gray
		ctx.save();
		ctx.fillStyle = '#E9E8E8';
		ctx.beginPath();
		ctx.moveTo(308, 90);
		ctx.lineTo(498, 419);
		ctx.lineTo(118, 419);
		ctx.closePath();
		ctx.fill();

		//light brown
		ctx.save();
		ctx.fillStyle = '#E9DDD7';
		ctx.beginPath();
		ctx.moveTo(308, 145);
		ctx.lineTo(450, 390);
		ctx.lineTo(166, 390);
		ctx.closePath();
		ctx.fill();

		//dark brown
		ctx.save();
		ctx.fillStyle = '#E0CEC8';
		ctx.beginPath();
		ctx.moveTo(308, 200);
		ctx.lineTo(403, 363);
		ctx.lineTo(213, 363);
		ctx.closePath();
		ctx.fill();
	},
};

export const customShadow = {
	id: 'customShadow',
	beforeDatasetsDraw: function (chart: ContextType) {
		const { ctx } = chart;
		ctx.save();
		ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
		ctx.shadowBlur = 40;
	},
	afterDatasetsDraw: function (chart: ContextType) {
		const { ctx } = chart;
		ctx.save();
		ctx.shadowColor = 'rgba(0, 0, 0, 0)';
		ctx.shadowBlur = 40;
	},
};
