<template>
	<form @submit.prevent="onSave">
		<AppControlInput v-model="editedPost.author" placeholder="Enter your name...">Author Name</AppControlInput><!-- ovo Author Name ide u label gde je <slot/> -->
		<AppControlInput v-model="editedPost.title" placeholder="Enter the title...">Title</AppControlInput>
		<AppControlInput v-model="editedPost.thumbnail" placeholder="Enter the thumbnail link...">Thumbnail Link</AppControlInput>
		<AppControlInput v-model="editedPost.content" control-type="textarea" placeholder="Enter the content...">Content</AppControlInput>
		<AppControlInput v-model="editedPost.previewText" control-type="textarea" placeholder="Enter some preview text...">Preview Text</AppControlInput>

		<AppButton type="submit">Save</AppButton>
		<AppButton
			type="button"
			style="margin-left: 10px"
			btn-style="cancel"
			@click="onCancel"
		>Cancel</AppButton>
	</form>
</template>

<script>
// import AppControlInput from '@/components/UI/AppControlInput'
// import AppButton from '@/components/UI/AppButton'

export default {
	// components: { AppControlInput, AppButton },

	props: {
		post: {
			type: Object,
			required: false
		}
	},

	data() {
		return {
			editedPost: this.post
				? { ...this.post }
				: {
					author: '',
					title: '',
					thumbnail: '',
					content: '',
					previewText: ''
				}
		}
	},
	methods: {
		onSave() {
			// Save the post
			console.log(this.editedPost)
			this.$emit('submit', this.editedPost)
		},
		onCancel() {
			// Navigate back
			this.$router.push('/admin')
		},
	},
}
</script>