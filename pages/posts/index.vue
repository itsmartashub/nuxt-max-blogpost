<template>
	<div class="posts-page">
		<PostList :posts="loadedPosts" />
	</div>
</template>

<script>
// import PostList from '@/components/Posts/PostList'

export default {
	// components: { PostList },

	// asyncData(context) {
	// 	return new Promise((resolve, reject) => {
	// 		setTimeout(() => {
	// 			resolve({
	// 				loadedPosts: [
	// 					{
	// 						id: "1",
	// 						title: "First Post",
	// 						previewText: "This is our first post!",
	// 						thumbnail:
	// 							"https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
	// 					},
	// 					{
	// 						id: "2",
	// 						title: "Second Post",
	// 						previewText: "This is our second post!",
	// 						thumbnail:
	// 							"https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
	// 					}
	// 				]
	// 			})
	// 		}, 1000)
	// 			// reject(new Error()) // ako dodje do errora prikaze se ona error.vue page zbog ovog dole catch-a context.error(e)
	// 	})
	// 	.then(data => {
	// 		// return data 
	// 		// context.store.commit('setPosts', data.loadedPosts) // dohvata prekonfigurisan store nasoj stranici kada je ucitavamo prvi x ili .... npm mrzi me
	// 	})
	// 	.catch(e => {
	// 		context.error(e);
	// 	})
	// },

	middleware: 'log', // ovo je onaj log.js fajl u middlewareu. i kad god ucitamo ovaj /pages/posts/index.vue stranicu middleware se okine tj ta f-ja unutra. takodje mozemo dodati middleware da se okida i u layout ili ako zelimo da ga koristimo na svim rutama. hajde prvo da attachujemo na layour/default.vue. a ako zelimo za sve rute da dodamo, onda idemo u nuxt.config.js i za router property dodamo middleware: 'log'

	computed: {
		loadedPosts() {
			return this.$store.getters.LOADED_POSTS
			// return this.$store.getters['post/LOADED_POSTS']

		}
	},

	// created() {
		// this.$store.dispatch('setPosts', this.loadedPosts)
		// console.log(this.$store.getters.loadedPosts)
	// }
}
</script>

<style scoped>
.posts-page {
	display: flex;
	justify-content: center;
	align-items: center;
}


</style>