<template>
	<div class="posts-page">
		<PostList :posts="loadedPosts" />
	</div>
</template>

<script>
import PostList from '@/components/Posts/PostList'

export default {
	components: { PostList },

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

	computed: {
		loadedPosts() {
			return this.$store.getters.LOADED_POSTS
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