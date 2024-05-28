import { UseMutateFunction } from '@tanstack/react-query';
import { DataSchema } from './DataSchema';

export type InputProps = {
	city: string;
	setCity: (v: string) => void;
	callData: UseMutateFunction<DataSchema, Error, void, unknown>;
};
