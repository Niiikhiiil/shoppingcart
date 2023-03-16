import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { CartState } from '../context/Context';
import Rating from './Rating';

const Filters = () => {
	const [rate, setRate] = useState(2);
	const {
		productState: { byStock, byFastDelivery, sort, byRating },
		productDispatch,
	} = CartState();
	return (
		<div className="filters">
			<span className="title">Filter Products</span>
			<span>
				<Form.Check
					inline
					label="Low to High Price"
					name="group1"
					type="radio"
					id={`inline-1`}
					defaultChecked={sort === 'lowToHigh' ? true : false}
					onClick={() =>
						productDispatch({
							type: 'SORT_BY_PRICE',
							payload: 'lowToHigh',
						})
					}
				/>
			</span>
			<span>
				<Form.Check
					inline
					label="High to Low Price"
					name="group1"
					type="radio"
					id={`inline-2`}
					defaultChecked={sort === 'HighToLow' ? true : false}
					onClick={() =>
						productDispatch({
							type: 'SORT_BY_PRICE',
							payload: 'HighToLow',
						})
					}
				/>
			</span>
			<span>
				<Form.Check
					inline
					label="Include Out of Stock"
					name="group1"
					type="checkbox"
					defaultChecked={byStock}
					id={`inline-3`}
					onClick={() => productDispatch({ type: 'SORT_BY_STOCK'})}
				/>
			</span>
			<span>
				<Form.Check
					inline
					label="Fast Delivery Only"
					name="group1"
					type="checkbox"
					id={`inline-4`}
					defaultChecked={byFastDelivery}
					onClick={() => productDispatch({ type: 'FAST_DELIVERY' })}
				/>
			</span>
			<span>
				<label style={{ paddingRight: 10 }}>Rating: </label>
				<Rating
					rating={byRating}
					onClick={(i) =>
						productDispatch({
							type: 'SORT_BY_RATING',
							payload: i + 1,
						})
					}
					style={{ cursor: 'pointer' }}
				/>
			</span>
			<Button
				variant="light"
				onClick={() => productDispatch({ type: 'CLEAR_FILTERS' })}
			>
				Clear Filters
			</Button>
		</div>
	);
};

export default Filters;
