import React from 'react';
import Header from './components/Header';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

const App = () => {
	return (
			
		<BrowserRouter>
			<Header />
				<Routes>
					<Route
						exact
						path="/"
						element={<Home />}
					/>
					<Route
						path="/cart"
						element={<Cart />}
					/>
					<Route
						path="/checkout"
						element={<Checkout />}
					/>
				</Routes>
		</BrowserRouter>
	);
};

export default App;
