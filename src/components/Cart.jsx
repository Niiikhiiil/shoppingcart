import React, { useEffect, useState } from 'react';
import { CartState } from '../context/Context';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import Rating from './Rating';
import { AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
	const {
		state: { cart },
		dispatch,
	} = CartState();
	const [total, setTotal] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		setTotal(
			cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0),
		);
	}, [total, cart]);

	return (
		<div className="home">
			<div className="productContainer">
				<ListGroup>
					<Button
						style={{
							width: '80px',
							height: '50px',
							marginBottom: '20px',
						}}
						onClick={() => {
							return navigate('/');
						}}
					>
						Back
					</Button>
					{cart.map((prod) => (
						<ListGroup.Item key={prod.id}>
							<Row>
								<Col>
									<Image
										src={prod.image}
										alt={prod.name}
										fluid
										rounded
									/>
								</Col>
								<Col md={2}>
									<span>{prod.name}</span>
								</Col>
								<Col md={2}>{prod.price}</Col>
								<Col md={2}>
									<Rating rating={prod.ratings} />
								</Col>
								<Col>
									<Form.Control
										as="select"
										value={prod.qty}
										onChange={(e) => {
											dispatch({
												type: 'CHANGE_PROD_QTY',
												payload: {
													id: prod.id,
													qty: e.target.value,
												},
											});
										}}
									>
										{[...Array(prod.inStock).keys()].map(
											(q) => (
												<option key={q + 1}>
													{q + 1}
												</option>
											),
										)}
									</Form.Control>
								</Col>
								<Col>
									<AiFillDelete
										fontSize="20px"
										style={{ cursor: 'pointer' }}
										onClick={() => {
											return dispatch({
												type: 'REMOVE_FROM_CART',
												payload: prod,
											});
										}}
									/>
								</Col>
							</Row>
						</ListGroup.Item>
					))}
				</ListGroup>
			</div>
			<div className="filters summary">
				<span className="title">Subtotal({cart.length})</span>
				<span style={{ fontWeight: 700, fontsize: 20 }}>
					Total: {total}
				</span>
				{cart.length > 0 ? (
					<Button
						onClick={() => {
							if (cart.length > 0) {
								dispatch({
									type: 'TOTAL_AMOUNT',
									payload: total,
								});
								navigate('/checkout');
							}
						}}
					>
						Proceed To Checkout
					</Button>
				) : null}
			</div>
		</div>
	);
};
export default Cart;
