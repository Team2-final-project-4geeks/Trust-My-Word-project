const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			product: {
				id: "",
				title: "",
				price: "",
				description: "",
				image: "",		
			},
			favourite: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			addFavourite: (fav) => {
				const store = getStore();
		
				store.favourite.includes(fav) ? alert("Favourite already exists!!") : (
					setStore({favourite: [...store.favourite, fav]})
				)
				
			},
			deleteFavorite: (favToDelete) => {
				const store = getStore();
				setStore({favourite: store.favourite.filter((fav) => fav !== favToDelete)})
			}
		}
	};
};

export default getState;
