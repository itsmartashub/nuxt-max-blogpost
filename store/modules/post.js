import axios from 'axios'

const state = () => ({ //! kaze Nuxt da state treba da bude f-ja!!
	loadedPosts: []
})

const getters = {
	LOADED_POSTS(state) {
		return state.loadedPosts
	} 
}

const mutations = {
	SET_POSTS(state, posts) { // posts je Array
		state.loadedPosts = posts
	}
}

const actions = {
	// nuxtServerInit(vuexContext, context) { // inicijalizovanje stora, da ne moramo na svakoj stranici da pozivamo metod vec samo ovde i jednom nuxtServerInit
	// 	// if (!process.client) {
	// 	// 	console.log(context.req)
	// 	// }

	// 	return new Promise((resolve, reject) => {
	// 		setTimeout(() => {
	// 			vuexContext.commit('SET_POSTS', [
	// 				{
	// 					id: "1",
	// 					title: "First Post",
	// 					previewText: "This is our first post!",
	// 					thumbnail:
	// 						"https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
	// 				},
	// 				{
	// 					id: "2",
	// 					title: "Second Post",
	// 					previewText: "This is our second post!",
	// 					thumbnail:
	// 						"https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
	// 				}
	// 			])
	// 			resolve()
	// 		}, 1000)
	// 			// reject(new Error()) // ako dodje do errora prikaze se ona error.vue page zbog ovog dole catch-a context.error(e)
	// 	})
	// 	// .then(data => {
	// 	// 	// return data 
	// 	// 	context.store.commit('SET_POSTS', data.loadedPosts) // dohvata prekonfigurisan store nasoj stranici kada je ucitavamo prvi x ili .... npm mrzi me
	// 	// })
	// 	// .catch(e => {
	// 	// 	context.error(e);
	// 	// })
	// },

	nuxtServerInit(vuexContext, context) {
		return axios.get('https://nuxt-max-blogpost.firebaseio.com/posts.json')
			.then(res => {
				const postsArray = [] // definisemo postsArray kao niz, i onda lupujemo kroz sve keys u nasem data objektu koji se nalazi u res
				for (const key in res.data) {
					// postsArray.push(res.data[key]) // mozemo i da storujemo i id posta tako sto dodamo spread operator: postsArray.push({ ...res.data[key] })
					postsArray.push({ ...res.data[key], id: key })
				}

				vuexContext.commit('SET_POSTS', postsArray) // posto za SET_POSTS zahteva da podaci budu Array, moramo da konvertujemo data array
			})
			.catch(e => context.error(e))
	},

	SET_POSTS(vuexContext, posts) { // moze i context al kao da ne bude zbunjujuce moze i vuexContext
		vuexContext.commit('SET_POSTS', posts)
	}
}


const postModule = {
	state,
	getters,
	actions,
	mutations
}

export default postModule



//! Note: Whilst using split-file modules, you must remember that using arrow functions, 'this' is only lexically available. Lexical scoping simply means that the 'this' always references the owner of the arrow function. If the arrow function is not contained then 'this' would be undefined. The solution is to use a "normal" function which produces its own scope and thus has 'this' available.