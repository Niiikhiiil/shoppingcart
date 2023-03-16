import React, { useState } from 'react';
import { CartState } from '../context/Context';
import Filters from './Filters';
import SingleProduct from './SingleProduct';
import ViewProduct from './ViewProduct';

const Home = () => {
	const [show, setShow] = useState(false);
	const [id, setId] = useState(null);

	const {
		state: { products },
		productState: { byStock, byFastDelivery, byRating, searchQuery, sort },
	} = CartState();

	const transformProduct = () => {
		let sortProducts = products;
		if (sort) {
			sortProducts.sort((a, b) =>
				sort === 'lowToHigh' ? a.price - b.price : b.price - a.price,
			);
		}
		if (!byStock) {
			sortProducts = sortProducts.filter((prod) => prod.inStock);
		}
		if (byFastDelivery) {
			sortProducts = sortProducts.filter((prod) => prod.fastDelivery);
		}
		if (byRating) {
			sortProducts = sortProducts.filter(
				(prod) => prod.ratings >= byRating,
			);
		}
		if (searchQuery) {
			sortProducts = sortProducts.filter((prod) =>
				prod.name.toLowerCase().includes(searchQuery),
			);
		}
		return sortProducts;
	};

	// console.log(transformProduct());

	return (
		<div className="home">
			{!show ? (
				<>
					<Filters />
					<div className="productContainer">
						{transformProduct().map((prod, i) => {
							return (
								<SingleProduct
									prod={prod}
									key={prod.id}
									show={show}
									setShow={setShow}
									setId={setId}
								/>
							);
						})}
					</div>
				</>
			) : (
				<ViewProduct
					id={id}
					show={show}
					setShow={setShow}
				/>
			)}
		</div>
	);
};

export default Home;
