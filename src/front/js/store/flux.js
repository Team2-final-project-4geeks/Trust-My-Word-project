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
			favourite: [],
			storeCities: {},
			checked: false			
		},
		actions: {
			// Use getActions to call a function within a fuction
			addFavourite: (fav) => {
				const store = getStore();
		
				store.favourite.includes(fav) ? alert("Favourite already exists!!") : (
					setStore({favourite: [...store.favourite, fav]})
				)
				
			},
			deleteFavourite: (favToDelete) => {
				const store = getStore();
				setStore({favourite: store.favourite.filter((fav) => fav !== favToDelete)})
			},
			addCity: (city) => {
				const store = getStore();
				setStore({storeCities: city})			
			},
			handleChecked: (bool) => {
				const store = getStore();
				setStore({checked:bool})
			}
		}
	};
};

export default getState;
