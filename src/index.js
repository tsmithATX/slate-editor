import React from 'react';
import ReactDOM from 'react-dom';
import SlateExperiment from './components/SlateExperiment';
import './styles.css';

function App() {
	return (
		<div className="App">
			<h1>Slate Editor Test</h1>
			<SlateExperiment />
		</div>
	);
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
