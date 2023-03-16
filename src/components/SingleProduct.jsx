import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { CartState } from '../context/Context';
import Rating from './Rating';

const SingleProduct = ({ prod,show,setShow,id,setId }) => {
	const {
		state: { cart },
		dispatch,
	} = CartState();

	return (
		<>
			<div className="products">
				<Card
					
					style={{ cursor: 'pointer' }}
				>
					<Card.Img
						variant="top"
						src={prod.image}
						alt={prod.name}
					/>
					<Card.Body>
						<Card.Title>{prod.name}</Card.Title>
						<Card.Subtitle style={{ paddingBottom: 10 }}>
							<span>Rs.{parseInt(prod.price.split('.'))}</span>
							{prod.fastDelivery ? (
								<div>fast delivery</div>
							) : (
								<div>5 day delivery</div>
							)}
							<Rating rating={prod.ratings} />
						</Card.Subtitle>
                        <ButtonGroup>
						{cart.some((p) => p.id === prod.id) ? (
							<Button
								variant="danger"
                                style={{minWidth:"80px"}}
								onClick={() =>
									dispatch({
										type: 'REMOVE_FROM_CART',
										payload: prod,
									})
								}
							>
								Remove 
							</Button>
						) : (
							<Button
                            style={{width:"100px"}}
								variant="primary"
								disabled={!prod.inStock}
								onClick={() =>
									dispatch({
										type: 'ADD_TO_CART',
										payload: prod,
									})
								}
							>
								{!prod.inStock ? 'Out of Stock' : 'Add'}
							</Button>
						)}

						<Button
							variant="success"
							style={{marginLeft:"20px",width:"100px"}}
                            onClick={()=>{setShow(!show)
                            setId(prod.id)}}
						>
							View
						</Button>
                        </ButtonGroup>
					</Card.Body>
				</Card>
			</div>
		</>
	);
};

export default SingleProduct;
