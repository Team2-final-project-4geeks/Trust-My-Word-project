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

			storeTypes: {},
			checked: false,			
			userId: null,
			userName: "",
			email:"",		
		},
		actions: {
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
			addType: (type) => {
				const store = getStore();
				setStore({storeTypes: type})			
			},
			handleChecked: (bool) => {
				const store = getStore();
				setStore({checked:bool})
			},
			addUserFavourites: (favs, id) => {
				fetch(process.env.BACKEND_URL + 'api/user/' + id ,{
					method: 'PUT',
					  headers: {
						"Content-Type": "application/json"
					},
					body : JSON.stringify({favourites: favs})
				})
				 .then(resp => {								
					return resp.json();
				})
				.then(data=> {			
					console.log(data)
				})
				.catch(error => {			
					console.log('Oops something went wrong'+ error);
				})
			},
			getUser: (id) => {
				fetch(process.env.BACKEND_URL + 'api/user/' + id ,{
					method: 'GET',
					  headers: {
						"Content-Type": "application/json"
					},
				})
				 .then(resp => {								
					return resp.json();
				})
				.then(data=> {	
					const store = getStore();		
					setStore({favourite: data.favourites})
				})
				.catch(error => {			
					console.log('Oops something went wrong'+ error);
				})
			},
			addId: (id) =>{
				const store = getStore();
				setStore({...store,userId:id})
			},
			addUsername: (username) =>{
				const store = getStore();
				setStore({...store,userName:username})
			}
		},
		
	};
};

export default getState;
