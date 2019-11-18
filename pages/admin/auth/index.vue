<template>
  <div class="admin-auth-page">
    <div class="auth-container">
      <form @submit.prevent="onSubmit">
        <AppControlInput type="email" v-model="email" autocomplete="username">E-Mail Address</AppControlInput>
        <AppControlInput type="password" v-model="password">Password</AppControlInput>
        <AppButton type="submit">{{ isLogin ? 'Login' : 'Sign Up' }}</AppButton>
        <AppButton
          type="button"
          btn-style="inverted"
          style="margin-left: 10px"
          @click="isLogin = !isLogin">Switch to {{ isLogin ? 'Signup' : 'Login' }}</AppButton>
      </form>
    </div>
  </div>
</template>

<script>
// import AppControlInput from '@/components/UI/AppControlInput'
// import AppButton from '@/components/UI/AppButton'

export default {
  name: 'AdminAuthPage',
  layout: 'admin',
//   components: {
//     AppControlInput,
//     AppButton
//   },
	data() {
		return {
			isLogin: true,
			email: '',
			password: ''
		}
	},

  methods: {
		onSubmit() {
			// let authUrl = 

			//? 1 nacin, duzi, ali se radi ponavljanje koda, u sustini je samo url razlicit
			// if (!this.isLogin) { // dakle ako nismo u login delu vec signup
			// 	this.$axios.$post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbAPIkey}`, {
			// 		email: this.email,
			// 		password: this.password,
			// 		returnSecureToken: true
			// 	}).then(result => {
			// 		console.log(result)
			// 	}).catch(e => console.log(e))
			// } else {
			// 	this.$axios.$post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbAPIkey}`, {
			// 		email: this.email,
			// 		password: this.password,
			// 		returnSecureToken: true
			// 	}).then(result => {
			// 		console.log(result)
			// 	}).catch(e => console.log(e))
			// }

			//? 2. nacin, ali premestamo u store
			// let authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbAPIkey}` // url za logovanje

			// if (!this.isLogin) {
			// 	authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbAPIkey}` // url za signup
			// }

			// this.$axios.$post(authUrl, {
			// 		email: this.email,
			// 		password: this.password,
			// 		returnSecureToken: true
			// 	}).then(result => {
			// 		console.log(result)
			// 	}).catch(e => console.log(e))

			this.$store.dispatch('auth/AUTHENTICATE_USER', {
				isLogin: this.isLogin,
				email: this.email,
				password: this.password
			})
			.then(() => {
				this.$router.push('/admin')
			})
		}
  },
}
</script>

<style scoped>
.admin-auth-page {
  padding: 20px;
}

.auth-container {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 2px #ccc;
  width: 300px;
  margin: auto;
  padding: 10px;
  box-sizing: border-box;
}
</style>