import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { CartState } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import Figure from 'react-bootstrap/Figure';
import Rating from './Rating';

const ViewProduct = ({ id, show, setShow }) => {
	const {
		state: { products, cart },
		dispatch,
	} = CartState();
	const p = products.filter((prod) => prod.id === id);
	const navigate = useNavigate();
	console.log(p);
	return (
		<div className="productContainer">
			<div 	style={{ width:"100%",marginLeft:"50px",marginRight:"auto" }}>
				<Card
					bg="Light"
					key="Light"
					text="dark"
				
					className="mb-2 "
				>
					<Card.Header >
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
					<div style={{display:'flex',alignItems:"center",justifyContent:"space-between",marginTop:"10px"}}>
						
						<Figure>
							<Figure.Image
								width={720}
								height={1080}
								alt={p[0].name}
								src={p[0].image}
                                style={{paddingLeft:"10px",paddingRight:"10px"}}
							/>
						</Figure>
						<Card.Body style={{display:"flex" ,alignItems:"center",justifyContent:"space-around",flexDirection:"column"}}>
							<Card.Title style={{fontWeight:"700",marginBottom:"20px"}}>{p[0].name} </Card.Title>

							<Card.Text style={{width:"400px",display:'flex',alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                                <p style={{marginBottom:"30px"}}>{p[0].detail}</p>
								<span style={{textAlign:"center"}} >
									Rs.{parseInt(p[0].price.split('.'))}
								</span>
								{p[0].fastDelivery ? (
									<div>fast delivery</div>
								) : (
									<div>5 day delivery</div>
								)}
								<span style={{flexDirection:"row"}}><Rating rating={p[0].ratings} /></span>
        
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
					</div>
				</Card>
			</div>
		</div>
	);
};

export default ViewProduct;
