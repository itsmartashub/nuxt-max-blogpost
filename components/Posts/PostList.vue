<template>
	<section class="post-list">
		<PostPreview
			v-for="post in posts"
			:key="post.id"
			:id="post.id"
			:is-admin="isAdmin"
			:thumbnail="post.thumbnail"
			:title="post.title"
			:previewText="post.previewText"
		/>
	</section>
</template>

<script>
import PostPreview from '@/components/Posts/PostPreview'
	
export default {
	components: { PostPreview },

	props: {
		isAdmin: { //! zasto je v-bind propsa sa crticom? ovo je alternativna sintaksa koju nam vue daje, kad je property camelCase mozemo da ga bajndujemo sa crticom, moze valjda i bez crtice ali je ovo preporucljivo
			type: Boolean,
			default: false
		},
		posts: {
			type: Array,
			required: true
		}
	}
}

// https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg
</script>

<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>