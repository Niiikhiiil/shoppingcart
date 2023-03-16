import React from 'react';
import Header from './components/Header';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<div className="App">
	
			<Routes>
				<Route
				exact path="/"
					element={<Home />}
				/>
				<Route
					path="/cart"
					element={<Cart />}
				/>
			</Routes>
			</div>
		</BrowserRouter>
	);
};

export default App;
