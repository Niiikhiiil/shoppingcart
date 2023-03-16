import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { CartState } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import Figure from 'react-bootstrap/Figure';
import Rating from './Rating';
// import Slider from 'react-slick';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import './styles.css';

const ViewProduct = ({ id, show, setShow }) => {
	const [pid, setPid] = useState(null);
	const {
		state: { products, cart },
		dispatch,
	} = CartState();
	let p = [];
	if (pid === null) {
		//viewed product
		p = products.filter((prod) => prod.id === id);
	} else if (pid !== null) {
		//from carousel
		p = products.filter((prod) => prod.id === pid);
	}

	//carousel products
	const c_array = products.filter((prod) => prod.id !== p[0].id);
	const [currentIndex, setCurrentIndex] = useState();
	const navigate = useNavigate();

	function handleChange(index) {
		setCurrentIndex(index);
	}

	return (
		<div className="productContainer viewProducth">
			<div
				style={{
					width: '100%',
					marginLeft: '50px',
					marginRight: 'auto',
				}}
			>
				<Card
					bg="Light"
					key="Light"
					text="dark"
					className="mb-2"
				>
					
					<Card.Header>
						<span
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}
						>
							<strong style={{ fontSize: '20px' }}>
								{p[0].name}
							</strong>
							<Button
								align="end"
								onClick={() => {
									setShow(!show);
									return navigate('/');
								}}
							>
								Back
							</Button>
						</span>
					</Card.Header>
					
					<span
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							marginTop: '10px',
						}}
					>
						<Figure>
							<Figure.Image
								width={720}
								height={1080}
								alt={p[0].name}
								src={p[0].image}
								style={{
									paddingLeft: '10px',
									paddingRight: '10px',
								}}
							/>
						</Figure>
						<Card.Body
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-around',
								flexDirection: 'column',
							}}
						>
							<Card.Title
								style={{
									fontWeight: '700',
									marginBottom: '20px',
								}}
							>
								{p[0].name}{' '}
							</Card.Title>

							<Card.Text
								style={{
									width: '400px',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flexDirection: 'column',
								}}
							>
								<span style={{ marginBottom: '30px' }}>
									{p[0].detail}
								</span>
								<span
									style={{
										fontWeight: '700',
										textAlign: 'center',
									}}
								>
									₹{parseInt(p[0].price.split('.'))}
								</span>
								{p[0].fastDelivery ? (
									<div>fast delivery</div>
								) : (
									<div>5 day delivery</div>
								)}
								<span style={{ flexDirection: 'row' }}>
									<Rating rating={p[0].ratings} />
								</span>
							</Card.Text>
							{cart.some((c) => c.id === p[0].id) ? (
								<Button
									variant="danger"
									style={{ width: '100px' }}
									onClick={() =>
										dispatch({
											type: 'REMOVE_FROM_CART',
											payload: p[0],
										})
									}
								>
									Remove
								</Button>
							) : (
								<Button
									style={{ width: '100px' }}
									variant="primary"
									disabled={!p[0].inStock}
									onClick={() =>
										dispatch({
											type: 'ADD_TO_CART',
											payload: p[0],
										})
									}
								>
									{!p[0].inStock ? 'Out of Stock' : 'Add'}
								</Button>
							)}
						</Card.Body>
					</span>
				</Card>

				<Carousel
					showArrows={true}
					autoPlay={true}
					interval={2000}
					infiniteLoop={true}
					selectedItem={c_array[currentIndex]}
					onChange={handleChange}
					className="carousel-container"
					showThumbs={false}
					style={{ cursor: 'pointer' }}
				>
					{c_array.map((cprod) => (
						<div key={cprod.id * 2}>
							<img
								width="250"
								height="200"
								src={cprod.image}
								alt={cprod.name}
								style={{ cursor: 'pointer' }}
							/>
							<div
								className="legend"
								variant="primary"
								style={{ cursor: 'pointer' }}
								onClick={() => {
									setPid(cprod.id);
								}}
							>
								<span
									style={{
										marginRight: '10px',
										fontWeight: '700',
										fontSize: '0.9rem',
									}}
								>
									<Button
										variant="success"
										style={{
											marginRight: '15px',
										}}
									>
										View
									</Button>
									{cprod.name} : ₹{cprod.price}{' '}
								</span>
								{cart.some((c) => c.id === cprod.id) ? (
									<Button
										variant="danger"
										style={{ width: '100px' }}
										onClick={() =>
											dispatch({
												type: 'REMOVE_FROM_CART',
												payload: cprod,
											})
										}
									>
										Remove
									</Button>
								) : (
									<Button
										style={{ width: '100px' }}
										variant="primary"
										disabled={!cprod.inStock}
										onClick={() =>
											dispatch({
												type: 'ADD_TO_CART',
												payload: cprod,
											})
										}
									>
										{!cprod.inStock
											? 'Out of Stock'
											: 'Add'}
									</Button>
								)}
							</div>
						</div>
					))}
				</Carousel>
			</div>
		</div>
	);
};

export default ViewProduct;
