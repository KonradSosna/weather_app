import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import WeatherApp from './components/WheatherApp';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<WeatherApp />
		</QueryClientProvider>
	);
}

export default App;
