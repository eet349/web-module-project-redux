export const ADD_FEATURE = 'ADD_FEATURE';
export const REMOVE_FEATURE = 'REMOVE_FEATURE';

export const addFeature = (featureID) => {
	return {
		type: ADD_FEATURE,
		payload: featureID,
	};
};

export const removeFeature = (featureID) => {
	return {
		type: REMOVE_FEATURE,
		payload: featureID,
	};
};
