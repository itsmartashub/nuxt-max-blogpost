<template>
	<div class="admin-new-post-page">
		<section class="new-post-form">
			<AdminPostForm @submit="onSubmitted" />
			<!-- ovo je emit iz admin/AdminPostForm.vue u onSave() metodu -->
		</section>
	</div>
</template>

<script>
import axios from 'axios'
import AdminPostForm from '@/components/Admin/AdminPostForm'

export default {
	layout: 'admin',
	
	components: { AdminPostForm },

	methods: {
		onSubmitted(postData) { // primam postData iz pages/new-post/index.vue iz onSave() metoda, to mu dodje onaj drugi argument iz this.$emit tj this.editedPost
			axios.post('https://nuxt-max-blogpost.firebaseio.com/posts.json', { 
					...postData, // ovo je iz forme AdminPostForm
					updatedDate: new Date()
				}) // kopiramo adresu iz firebase iz realtime databse i dodajemo na kraju ime node-a koje zelimo, recimo posts, ali moramo i da dodamo ekstenziju .json. drugi argument su podaci koje zelimo da posaljemo ovim rikvestom na tu adresu. onda imamo then() blok jer axios vraca Promise.
				// dodajemo spread operator kod postData da bismo mogli dodati novi obj tj updatedDate: new Date()
				.then(result => {
					// console.log(result)
					this.$router.push('/admin')
				})
				.catch(e => console.log(e))
		} 
	},
}
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>