import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import FormViewer from './components/FormViewer/FormViewer';
import { BrowserRouter } from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			<Sidebar></Sidebar>
			<FormViewer></FormViewer>
		</BrowserRouter>
	);
}

export default App;
