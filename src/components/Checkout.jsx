import React from 'react';
import { Card, Alert, Table, Button } from 'react-bootstrap';
import { CartState } from '../context/Context';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
	let navigate = useNavigate();
	const {
		state: { cart, total },
		dispatch,
	} = CartState();

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<Button
				style={{
					marginTop: '10px',
					display: 'flex',
					alignContent: 'flex-end',
					justifyContent: 'center',
					width: '160px',
					marginLeft: 'auto',
				}}
				onClick={() => {
					return navigate('/cart');
				}}
			>
				Back To Cart
			</Button>
			<Alert
				key="dark"
				variant="dark"
				style={{ marginTop: '10px' }}
			>
				Thank You for Shopping{' '}
			</Alert>

			<Card>
				<Card.Header>
					<h2>Invoice</h2>
				</Card.Header>
				<Card.Body>
					<Table
						striped
						bordered
						hover
					>
						<thead>
							<tr>
								<th>#</th>
								<th>Product Name</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>Total</th>
							</tr>
						</thead>

						<tbody>
							{cart.map((prod, i) => {
								return (
									<tr key={prod.key*2.5}>
										<td>{i + 1}</td>
										<td>{prod.name}</td>
										<td>{prod.price}</td>
										<td>{prod.qty}</td>
										<td>{prod.price * prod.qty}</td>
									</tr>
								);
							})}
							<tr>
								<td
									colSpan="4"
									align="center"
									style={{ fontWeight: 'bolder' }}
								>
									Total
								</td>
								<td style={{ fontWeight: 'bolder' }}>
									{total}
								</td>
							</tr>
						</tbody>
					</Table>
				</Card.Body>
			</Card>
			<Button
				style={{
					marginTop: '10px',
					display: 'flex',
					alignContent: 'flex-start',
					justifyContent: 'center',
					width: '160px',
					marginRight: 'auto',
				}}
				onClick={() => {
					dispatch({ type: 'RETURN_FOR_SHOP' });
					return navigate('/');
				}}
				variant="outline-success"
			>
				Return for Shopping
			</Button>
		</div>
	);
};

export default Checkout;
