import Vuex from 'vuex'

//! ovo nece raditi, classic store ne radi, samo module sa namespace!!! Classic mode for store/ is deprecated and will be removed in Nuxt 3.

const createStore = () => { // a zasto pravimo f-ju createStore umesto samo objekat koji predstavlja store? jer treba da bude callable by nuxt koji ce da execute na serveru da setuje store.
//! vracamo new Vuex.Store(), kad bismo vracali objekat umesto f-je onda bi svi korisnici nase app dobili ISTU instancu jer na serveru u node.js ako imamo plain object stored onda dobijamo uvek taj objeakt za svakog konektovanog korisnika, a ako imamo f-ju koja vraca novi store, kao sto ova createStore f-ja radi, onda svaki novi korisnik prima svoj store

	return new Vuex.Store({
		state: {
			loadedPosts: []
		},

		getters: {
			loadedPosts(state) {
				return state.loadedPosts
			}
		},

		mutations: {
			setPosts(state, posts) {
				state.loadedPosts = posts
			}
		},

		actions: {
			nuxtServerInit(vuexContext, context) {
				// inicijalizovanje stora, da ne moramo na svakoj stranici da pozivamo metod vec samo ovde i jednom nuxtServerInit
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						vuexContext.commit('setPosts', [
							{
								id: "1",
								title: "First Post",
								previewText: "This is our first post!",
								thumbnail:
									"https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
							},
							{
								id: "2",
								title: "Second Post",
								previewText: "This is our second post!",
								thumbnail:
									"https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
							}
						])
						resolve()
					}, 1000)
						// reject(new Error()) // ako dodje do errora prikaze se ona error.vue page zbog ovog dole catch-a context.error(e)
				})
				.then(data => {
					// return data 
					// context.store.commit('setPosts', data.loadedPosts) // dohvata prekonfigurisan store nasoj stranici kada je ucitavamo prvi x ili .... npm mrzi me
				})
				.catch(e => {
					context.error(e);
				})
			},

			setPosts(vuexContext, posts) { // moze i context al kao da ne bude zbunjujuce moze i vuexContext
				vuexContext.commit('setPosts', posts)
			}
		}
	})
}


export default createStore