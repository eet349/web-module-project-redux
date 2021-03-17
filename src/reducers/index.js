import { ADD_FEATURE, REMOVE_FEATURE } from '../actions';

const initialState = {
	additionalPrice: 0,
	car: {
		price: 26395,
		name: '2019 Ford Mustang',
		image:
			'https://cdn.motor1.com/images/mgl/0AN2V/s1/2019-ford-mustang-bullitt.jpg',
		features: [],
	},
	additionalFeatures: [
		{ id: 1, name: 'V-6 engine', price: 1500 },
		{ id: 2, name: 'Racing detail package', price: 1500 },
		{ id: 3, name: 'Premium sound system', price: 500 },
		{ id: 4, name: 'Rear spoiler', price: 250 },
	],
};

const removeItemFromArrayByID = (id, array) => {
	return array.filter((item) => item.id !== id);
};

const getFeatureByID = (id, array) => {
	return array.find((feature) => feature.id === id);
};

const getIndex = (id, array) => {
	let higherIndex = 0;
	console.log('array: ', array);
	if (!array[0]) return higherIndex;
	for (let i = 0; i < array.length; i++) {
		if (array[i].id > id) {
			return i;
		} else if (array[i].id < id) {
		}
	}
	return array.length;
};
const newOrderedArray = (objToAdd, array) => {
	let newArray = [...array];
	addObjectInOrder(objToAdd, array, newArray);
	return newArray;
};
const addObjectInOrder = (objToAdd, array, newArray) => {
	const index = getIndex(objToAdd.id, array);
	newArray.splice(index, 0, objToAdd);
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_FEATURE:
			const newAdditionalFeatures = removeItemFromArrayByID(
				action.payload,
				state.additionalFeatures
			);
			const newFeature = getFeatureByID(
				action.payload,
				state.additionalFeatures
			);

			return {
				...state,
				car: {
					...state.car,
					features: [newFeature, ...state.car.features],
				},
				additionalFeatures: newAdditionalFeatures,
				additionalPrice: state.additionalPrice + newFeature.price,
			};
		case REMOVE_FEATURE:
			const newFeaturesArray = removeItemFromArrayByID(
				action.payload,
				state.car.features
			);
			const removedFeature = getFeatureByID(action.payload, state.car.features);
			const newAdditionalFeaturesArray = newOrderedArray(
				removedFeature,
				state.additionalFeatures
			);

			return {
				...state,
				car: {
					...state.car,
					features: newFeaturesArray,
				},
				additionalFeatures: newAdditionalFeaturesArray,
				additionalPrice: state.additionalPrice - removedFeature.price,
			};
		default:
			return state;
	}
};

export default reducer;
