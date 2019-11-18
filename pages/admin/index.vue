<template>
	<div class="admin-page">
		<section class="new-post">
			<AppButton @click="$router.push('/admin/new-post')">Create Post</AppButton>
			<AppButton @click="onLogout" style="margin-left: 10px">Logout</AppButton>
		</section>

		<section class="existing-posts">
			<h1>Existing Posts</h1>
			<PostList isAdmin :posts="loadedPosts" /><!-- setovace isAdmin u true, wtf -->
		</section>
	</div>
</template>

<script>
// import PostList from '@/components/Posts/PostList'
// import AppButton from '@/components/UI/AppButton'

export default {
	layout: 'admin',
	middleware: ['check-auth', 'auth'], //! bitan je redosled
	// components: { PostList, AppButton },

	computed: {
		loadedPosts() {
			return this.$store.getters.LOADED_POSTS
			// return this.$store.getters['post/LOADED_POSTS']
		}
	},

	methods: {
		onLogout() {
			this.$store.dispatch('auth/LOGOUT')
			this.$router.push('/admin/auth')
		}
	},
}
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>