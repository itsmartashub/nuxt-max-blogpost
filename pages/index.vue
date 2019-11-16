<template>
	<div class="home-page">
		<section class="intro">
			<h1>Get the latest tech news!</h1>
		</section>

		<PostList :posts="loadedPosts" />
	</div>
</template>

<script>
import PostList from '@/components/Posts/PostList'
import { resolve, reject } from 'q';

export default {
	components: { PostList },

	// data() {
	// 	return {
	// 		loadedPosts: []
	// 	}
	// },

	computed: {
		loadedPosts() {
			// return this.$store.getters.loadedPosts
		}
	},

	asyncData(context, callback) {
		// return new Promise((resolve, reject) => {
		// 	// setTimeout().....
		// })
		console.log('asyncData() is executed');
		// console.log(context); // ovde imamo env (da vidimo u kom smo okruzenju process.client ili process.server), recimo params, mozemo da pristupimo bilo kojim params jer ako zelimo da pristupimo nekim params rute ne mozemo sa this.$route.params jer ono, nemamo pristup this-u, ovde to dobijamo preko nuxt-a koji moze da parsira url, isto tako i za query, redirect, route, app information itd itd
		setTimeout(() => { // posts se loaduju na klajentu, zato je ostatak app ucitano, ali ovaj posts nije, sto je za app kao ok sa user strane jer mozemo da ubacimo kao loading animaciju, ali za SEO tj crawler nije dobro, jer crawler ide kroz inicijativno first loaded page, cim se stranica ucita, ne ceka tih 1500ms pa onda, ofc. zato mi hocemo da renderujemo sve na serveru, i onda samo ovde sve fetchujemo, server side rendering.
			//! za to postoji specijalan metod koji mozemo koristiti u PAGE COMPONENTS, dakle samo za komponente u PAGES folderu koje ce nutxt da executuje na serveru: asyncData(). slican je kao data() s tim sto on mora da vrati objekat u kom ce biti podaci o toj komponenti u kojima se poziva, i to su podaci koje mozemo da koristimo u templejtu. ALI ono sto je BITNO, asyncData() se executuje NA SERVERU, i ako executujemo async zadatke tamo recimo cekanje tajmera ili ono realisticnije, ricing bekenda na serveru, onda ce cekati da se zavrsi ova radnja pre nego sto je vrati stanici na klajent sajdu. i ne bi kao trebalo da koristimo i asyncData() i data() jer je data() na klajentu i ono ce overvritovati ono sto je u asyncData()
			//* naravno this keywoard za asyncData() nece f-ti kao inace jer se asyncData() runs pre nego sto se ova komponenta kreira, tj pre nego sto se ono na sta se this odnosi kreira, dakle ne mozemo ni pristupiti metodama recimo nekim u ovoj komponenti u asyncData()
			//? i opa, naravno, sada imamo razne error (Property or method "loadedPosts" is not defined on the instance but referenced during render ili  Invalid prop: type check failed for prop "posts". Expected Array, got Undefined) i oni su zbog toga jer asyncData() nema ideju kad je gotov, a da bismo dali neku ideju asyncData() kada smo gotovi za serverside rendering mozemo da return new Promise tj resolve ili reject. a ako za http rikvestove koristimo axios recimo, on ce automatski da nam vrati Promise, ne moramo mi. i tako ce asyncData() da osluskuje tu Promise i da zna na osnovu tiga sta je vratila (resolve ili reject), znacemo kad je gotovo i sta treba da se fetchuje
			//? alternativa je da koristimo callback. Inace asyncData() ima argumente, tipa prvi je context, drugi je callback metod koji mozemo da executujemo: asyncDaya(context, callback). callback se executuje kad smo gotovi, i onda asyncData zna kad smo gotovi. i sada u setTimeout umesto ovog return stavljamo/executujemo callback() metod u kom prosledjujemo ili error ako zelimo da hendlujemo ukoliko dodje do errora prilikom http rikvesta, ili ako nema errora prosledjujemo null, a za drugi argument callback() stavljamo te podatke koje zelimo da se renderuju kao objekat: 
			// return {
				callback(null, {
					loadedPosts: [
						{id: '1', title: 'First Post', previewText: 'This is our first post', thumbnail: 'https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg' },
						{id: '2', title: 'sECOND Post', previewText: 'This is our SECOND post', thumbnail: 'https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg' }
					]
				}) //* medjutim kaze mi sada upozorenje u konzoli da je callback u asyncData deprecated, i fetch or middleware calls su deprecated. I kaze da bolje koristimo Promises ili async await syntax
			// }
		}, 1500);

		//! i dakle, kada prvi put fetchujemo app, ona vrsi server side rendering, sve posle je na klijentu jer je app fetchovana. Kao dokaz, stavicemo ispod asyncData() consol.log('asyncData() is executed'), i kada prvi x fetchujemo app (kliknemo na rifresh) u konzoli na klajentu ne pise nista, ali ovde u terminalu pise asyncData() is executed sto znaci da se na 'server side' executovao, posle, kada uradimo bilo sta na app, tipa odemo na drugu stranicu (nuxt-link, nuxt-router bla bla), izadje u browseru u konzoli 'asyncData() is executed', ali ovde ne vise, dakle samo kad se prvi x fetchuje app. dakle, asyncData() je nesto sto uvek moramo da sacekamo, ali se ne fetchuje/renderuje svaki x sa servera, vec samo kad ucitavamo stranicu PRVI X (ili rifresujemo ili menjamo url direktno)
	}
}
</script>

<style scoped>
.intro {
  height: 300px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-image: url('~assets/images/main-page-background.jpg'); /* tilda je root folder. ne ide slash / posle tilde ~. ovaj path tj ovu putanju ce da detektuje webpack koji radi u pozadini, on ce naci sliku, optimizovati itd */
  background-position: center;
  background-size: cover;
}

.intro h1 {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
  background-color: rgb(211, 211, 211);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  box-sizing: border-box;
  border: 1px solid black;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}


</style>