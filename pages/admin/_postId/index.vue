<template>
	<div class="admin-post-page">
		<section class="update-form">
			<AdminPostForm :post="loadedPost" @submit="onSubmitted" />
		</section>
	</div>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm'
// import axios from 'axios'

export default {
	layout: 'admin',
	
	components: { AdminPostForm },

	// data() {
	// 	return {
	// 		loadedPost: {
	// 			author: 'Marta',
	// 			title: 'Moj strava post',
	// 			content: 'Super strava, hvala za to!',
	// 			thumbnailLink: 'https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg'
	// 		}
	// 	}
	// },
 
	asyncData(context) {
		return context.app.$axios.$get(`/posts/${context.params.postId}.json`)
			.then(data => {
				return {
					loadedPost: {...data, id: context.params.postId} // i dodajemo id u nasu realtime database sa context.params.postId
				}
			})
			.catch(e => context.error(e))
	},

	methods: {
		// onSubmitted(editedPost) { // ovde sada id ne idemo preko context.params.id (kao preko SSR u asyncData) vec smo sad u normal vue worldu, dakle na client sajtu, i sada mozemo da koristim this.$route itd itd
		// 	axios.put(`https://nuxt-max-blogpost.firebaseio.com/posts/${this.$route.params.postId}.json`, {
		// 		...editedPost,
		// 		updatedDate: new Date()
		// 	}) // saljemo put rikvest a ne post jer za edit hocemo da se prethodni post koji editujemo obrise a ostane sad ovo novo editovano
		// 	.then(res => {
		// 		// console.log(res)
		// 		this.$router.push('/admin')
		// 	})
		// 	.catch(e => console.log(e))
		// }

		onSubmitted(editedPost) {
			this.$store.dispatch('EDIT_POST', editedPost)
				.then(() => {
					this.$router.push('/admin')
				})
		}
	},
}
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>