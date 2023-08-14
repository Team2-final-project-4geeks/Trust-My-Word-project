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
				const actions = getActions()
                if (!store.favourite.includes(fav)) {
                    setStore({ favourite: [...store.favourite, fav] });
                    actions.addUserFavourites(store.userId);
                } else {
                    alert("Favourite already exists!!");
                }
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
			addUserFavourites: (id) => {

				const store = getStore()

				fetch(process.env.BACKEND_URL + 'api/user/' + id ,{
					method: 'PUT',
					headers: {
						"Content-Type": "application/json"
					},
					body : JSON.stringify({ favourites: store.favourite })
				})
				.then(resp => {								
					return resp.json();
				})
				.then(data => {            
					console.log(data);
					actions.getUser(id);
				})
				.catch(error => {			
					console.log('Oops something went wrong'+ error);
				})
			},
			getUser: (id) => {
				const token = localStorage.getItem('jwt-token');
				if(token) {
				fetch(process.env.BACKEND_URL + 'api/user/' + id ,{
					method: 'GET',
					  headers: {
						"Content-Type": "application/json",
						"Authorization" : "Bearer " + token
					},
				})
				 .then(resp => {								
					return resp.json();
				})
				.then(data=> {	
					const store = getStore();		
					setStore({ ...store, favourite: data.favourites });
				})
				.catch(error => {			
					console.log('Oops something went wrong'+ error);
				})
			}else{
				alert("error")
			}
			},
			addId: (id) =>{
				const store = getStore();
				setStore({...store,userId:id})
			},
			addUsername: (username) =>{
				const store = getStore();
				setStore({...store,userName:username})
			},
			clearUser: () => {
                const store = getStore();
                setStore({
                    ...store,
                    userId: null,
                    userName: "",
                    email: "",
                    favourite: [] 
                });
			}
		},
		
	};
};

export default getState;
