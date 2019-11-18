import Cookie from 'js-cookie' //! elem, posto ne mozemo da resimo ovvo sa tokenom na obe i server i client side sa ls-om jer ls je na klijentu, potrebni su nam kukiji jer se oni salju http rikvestom i tu cemo da setujemo tj skladistimo token da bismo mogli i da reloadujemo i po admin sekciji ulogovani

const state = () => ({
	token: null
})

const getters = {
	IS_AUTHENTICATED(state) {
		return state.token != null
	}
}

const mutations = {
	SET_TOKEN(state, token) {
		state.token = token
	},

	CLEAR_TOKEN(state) { // ovo treba da se okine nakon expired perioda, dakle setujemo token opet u null, i onda opet korisnik postaje NEautorizovan i ne moze da pristupi odredjenim rutama
		state.token = null
	},

}

const actions = {
	AUTHENTICATE_USER(vuexContext, authData) {
		let authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbAPIkey}` // url za logovanje

			if (!authData.isLogin) {
				authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbAPIkey}` // url za signup
			}

			return this.$axios
				.$post(authUrl, { // stavljamo ovde return da bismo u auth.vue mogli da cejnujemo then() blok u kom cemo pushovati na odjeredjenu rutu
					email: authData.email,
					password: authData.password,
					returnSecureToken: true
				}).then(result => {
					console.log(result)
					vuexContext.commit('SET_TOKEN', result.idToken) // setujemo token za vuex storage

					//? cuvanje tokena na klajent sajd tj u LS-u
					localStorage.setItem('token', result.idToken) // da sacuvamo token u LS
					localStorage.setItem('token_expiration', new Date().getTime() + result.expiresIn * 1000) // expiresIn je jedinica u sekundama, al ovde nam to ne znaci nista, ovde nam treba timestamp. zato dodajemo new Date().getTime() koji prikazuje trenutno vreme u milisekundama, zato mnozimo result.expiresIn sa 1000 da dobijemo takodje milisekunda, i onda sabiremo ovde dve vrednosti i dobijamo vrednost tj vreme kada ce ovaj token isteci

					//? cuvanje tokena na server sajd tj u Cookie (npm install --save js-cookie). i ideja je da zgrabio token tj usera iz kukija, umesto iz LS-a, ukoliko je kod pokrenut na serveru, zato nam za INIT_AUTH za drugi argument treba isServer i ako je tamo isServer true, tj stavicemo req jer samo ako je req okinut zelim da se onaj kod if(req) okine
					Cookie.set('jwt', result.idToken)
					Cookie.set('expiration_date', new Date().getTime() + result.expiresIn * 1000)

					vuexContext.dispatch('SET_LOGOUT_TIMER', result.expiresIn * 1000) // ovo expiresIn je sastavni deo fb-a, vreme isteka tokena u sekundama, a p	osto tajmer zahteva u milisekundama, pomnozicemo sa 1000
				}).catch(e => console.log(e))
	},

	SET_LOGOUT_TIMER(vuexContext, duration) { // ocekujem da prihvatim duration tj trajanje kada token istice
		setTimeout(() => { // ovde okidam neki kod NAKON duration
			vuexContext.commit('CLEAR_TOKEN') // dakle cistim token NAKON duration
		}, duration);

	},

	INIT_AUTH(vuexContext, req) {
		let token
		let expiration_date

		if (req) { //? COOKIE
			if (!req.headers.cookie) { // ako u headeru koji smo dohvatili rikvestom nema kukija vrati i ne vrsi dalje kod
				return
			}

			const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt=')) //* ako ima cookie u headeru onda splitujemo sadrzaj po ; i dobijamo niz, onda zelimo da svaki key (c) tog niza trimujemo ako recimo postoji extra space i svaki taj c koji pocienje sa jwt= (jwt jer smo mi setovali gore za token u kukiju da bude jwt sa Cookie.set('jwt', result.idToken) ) stavljamo da bude jwtCookie

			// ako fejlujemo 
			if (!jwtCookie) {
				return
			}

			// u suprotnom imam token:
			token = jwtCookie.split('=')[1] // ako imamo jwtCookie onda ga splitujemo po znaku =, tako se formira niz, a sa [1] grabimo drugog clana niza tj ono sto ide posle = (dakle bilo bi jwt=eyJhbGciOiJSUzI1NiIsImtpZCI6IjhhMzY5M2YxMzczZjgwYTI1M2NmYmUyMTVkMDJlZTMwNjhmZWJjMzYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbnV4dC1tYXgtYmxvZ3Bvc3QiLCJhdWQiOiJudXh0LW1heC1ibG9ncG9zdCIsImF1dGhfdGltZSI6MTU3NDEwMTA5MiwidXNlcl9pZCI6IjNxcUNrbzN3eWFQWVJWRWhHNVpTaThDZGlXQTMiLCJzdWIiOiIzcXFDa28zd3lhUFlSVkVoRzVaU2k4Q2RpV0EzIiwiaWF0IjoxNTc0MTAxMDkyLCJleHAiOjE1NzQxMDQ2OTIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0QHRlc3QuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.f5QoO8m77kRCVnhbV2y5sms7QFrvAd-v3-jJNo8llhg1ye83scuW4PAhZOr66JkabzkM4Eiigj4M4YGjPCDXMDPqG_wpzrZNFnbvB5b3A1HZZ-bWRSGQ8en_4jVcz3L6nxohStI3Szus4DKXQfPxm8buN4NHWIYr-tSfVgIqrE46WaPSiPYHtU4f8_QZ0Mqdj2aiAncCY3E1Z0GM_RXqbny3cok2joMc1OtdVSPmR99EhuX0PN_CONcG1jSv2ve13VluQusKkLTypceo4jFjDyK2dzsXTmstlhJj9tXkrqYXBf8ABDwMNiwYplE4wryicuUVpE8DQfQ8eYmIQoQv_g, a to posle = je token logicno)

			// sada mi treba i expiration_date a njega dohvatam na isti nacin kao i ovaj gore token:
				expiration_date = req.headers.cookie
					.split(';')
					.find(c => c.trim().startsWith('expiration_date='))
					.split('=')[1] // isto je to sto smo mi setovali za Cookie expiration_date, mogli smo i expirationDate i expDate, kako god, al kako smo setovali, tako i ovde pozivam
		} else { //? LS 
			// u init auth cekiramo nas ls, proveravamo da l ima u njemu sacuvan token, ako ima cuvamo ga u promenljivoj token, ako ne onda je undefined
			token = localStorage.getItem('token') // ovo ce biti undefined ako nema tokena ili ce biti token koji smo sacuvali posl x
			expiration_date =  localStorage.getItem('token_expiration')

			// i sa ove dve vrednosti mogu da cekiram da li trenutno vreme vece od tog vremena, ako jeste onda je token istekao
			if (new Date().getTime() > +expiration_date || !token) { // ako je nesto drugo slucaj tipa da nema tokena (!token) zelim da vratim da nemamo token. sa + ispred expiration_date konvertujem ovaj String u Number
				return // ako je token istekao onda vrati i nista vise/dalje ne radi
			}
		}

		// u suprotonom, ako ima tokena:
		vuexContext.dispatch('SET_LOGOUT_TIMER', +expiration_date - new Date().getTime()) //? vreme kad istice token (dakle ono iz buducnosti) oduzmemo sadasnje vreme, ovo je u milisekundama. stavljam + ispred expiration_date da bi ga konvertovali u Number!!!
		vuexContext.commit('SET_TOKEN', token)
		
	} //? i nas cilj je da executujemo INIT_AUTH da fetchuje token iz LS-a kad god dispatchujemo ovaj action, i za to zelimo da koristimo middleware u check-auth.js
}

const authModule = {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
export default authModule