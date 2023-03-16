import React,{ createContext, useContext, useReducer } from 'react';
import { faker } from '@faker-js/faker';
import { cartReducer } from './Reducers';
import {productReducer} from './Reducers'

const Cart = createContext();
faker.seed(120);


const Context = ({ children }) => {
	const products = [...Array(20)].map(() => ({
		id: faker.datatype.uuid(),
		name: faker.commerce.product(),
		price: faker.commerce.price(),
		image: faker.helpers.arrayElement([
			faker.image.nature(),
			faker.image.city(),
			faker.image.food(),
		]),
		inStock: faker.helpers.arrayElement([0, 3, 5, 6, 7]),
		fastDelivery: faker.datatype.boolean(),
		ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
		detail:faker.lorem.paragraph(3),
	}));

	const [state, dispatch] = useReducer(cartReducer, {
		products: products,
		cart: [],
	});

	const [productState,productDispatch]=useReducer(productReducer,{
		byStock:false,
		byFastDelivery:false,
		byRating:0,
		searchQuery:"",
	})

	// console.log(products);

	return (
		<Cart.Provider value={{ state, dispatch,productState,productDispatch }}>{children}</Cart.Provider>
	);
};

export const CartState = () => {
	return useContext(Cart);
};

export default Context;
