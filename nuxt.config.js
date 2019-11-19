const bodyParser = require('body-parser')

export default {
  mode: 'universal', //* ako zelimo prerender capabilities onda stavljamo 'universal', ako ne, onda 'SPA'
//   mode: 'spa',
  /*
  ** Headers of the page
  */
  head: { //* ovo je <head></head> za SVAKU page
    title: process.env.npm_package_name || '', //* mozemo mi staviti sta god
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' } //* mozemo staviti sta god 
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans&display=swap' }
    ]
  }, //* ako zelimo da overvritujemo <head> podatke za neku page, ili da dodamo jos koje, jedn idemo u bilo koju pages/ stranicu i dodamo head property
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fa923f', height: '4px', duration: 5000 }, //* onaj gore progress bar dok se ucitava neka stranica. a ako ovo ne zelimo uopste samo satvimo da je false - loading: false, a takodje pored color mozemo doddati height, failedColor, duration. sto se tice duration,bolje je staviti i veci broj, tj vise ms nego sto zapravo treba stranici da se ucita, jer kad stavimo manji, progress bar kao zavrsi, korisnik misli ucitala se stranica, jos malo pa sam tu, kad djavola, ona se zapravo i dalje ucitava
  loadingIndicator: { //* ovo je za SPA app, to je onaj indicator ucitavanja stranice
	  name: 'circle',
	  color: '#fa923f'
  },
  /*
  ** Global CSS
  */
  css: [
	  '~assets/styles/main.css' //* moze ovo za global css, a mozemo u layout/ za svaki fajl tamo, to mu isto dodje global
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [ //? za ucitavanje nekih f-sti i za executovanje odredjenog koda pre nego sto je kod full renderend i mounted i to je izuzetno bitno s obzirom da nemamo pristup main.js fajlu tj glavnom js fajlu kao inace u normalnoj vue app.
	//! recimo za one AppButton.vue i AppControlInput.vue componente, zar ne bi bilo bolje da imamo jedno centralno mesto sa kog ce se povlaciti, da budu globalne komponente, a ne da importujemo valjda svugde? ako sam dobro razumela. u normalnoj vue app to bi uradili u main.js fajlu gde mountujemo vue root instancu, ovde je ako problem sto nemamo taj fajl, ali zato imamo plugins! On plug inuje neku f-nosti bas neposredno pre nego sto se komponenta tj app kreira
	//? recimo idemo u plugins fajl da kreiramo js fajl tipa core-component.js (ime je na nama, kako god)
	'~plugins/core-components.js',
	'~plugins/date-filter.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [ //! https://github.com/nuxt-community/awesome-nuxt#modules. recimo da instaliramo axios modules npm install --save @nuxtjs/axios a ne ono to smo instalirali pa importovali npm install --save axios
		'@nuxtjs/axios', //! i sada mozemo da konfgurisemo axios ovde dole ispod sa property axios
  ],
  axios: {
	  baseURL: process.env.BASE_URL || 'https://nuxt-max-blogpost.firebaseio.com', //! recimo da ovo smo vec uradili dole sa env, ali sada mozemo i ovako, dakle imamo dva nacina. sada mozemo da koristimo axios bilo gde bez importa sa this.$axios, osim u nuxtServerInit() i u asyncData() gde jos nije app registrovana, gde nemam f-ju this-a i to, i ne mozemo samo sa this.$axios vec context.app.$axios
	  credentials: false // ovim necemo slati nikakve kukijeve i sl bekendu
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },

	env: { //* da mi stavimo okruzenje u kom smo
		baseUrl: process.env.BASE_URL || 'https://nuxt-max-blogpost.firebaseio.com', // ovo je adresa iz post.js iz nuxtServerInit, i tamo sada samo satavimo process.env.baseUrl, ali valjda mozemo i svugde gde je ta adresa, recimo pages/posts/_id/index.vue, i u pages/admin/_postId/index.vue
		fbAPIkey: 'AIzaSyB5ikwuk-7PmRSVoL-dxu8Oy5wZeCzeRTw'
	},

	// rootDir: '/'
	// router: {
	// 	// base: '',
	// 	// extendRoutes(routes, resolve) { //*programmaticly add ur own routes. extendRoutes() prihvata argumente, prvi je routes tj rute koje je nuxt generisao za nas baziranog na pages folder, drugi je resolve arg tj f-ja koja nam dozvoljava da pronadjemo nase komponent fajlove. ovo kao nije lose, ali je najbolje koristiti lepo kao i do sad pages/pa fajlovi/folderi za rute
	// 	// 	routes.push({
	// 	// 		path: '*',
	// 	// 		component: resolve(__dirname, 'pages/index.vue') //* __dirname sadrzi varijablu o tome u kom smo trenutno direktorijumu
	// 	// 	})
	// 	// }
	// 	linkActiveClass: 'active' // recimo
	// } //https://nuxtjs.org/api/configuration-router 

	// srcDir: 'client-app/' //* recimo ako ovas jas scr folder tj sve sto je u njemu strpamo u mozda neki subfolder tipa client-app, onda ovde to definisemo

	// transition: 'page' //? ovo moze biti string gde prosledjujemo ime klase koja ce se pripojiti kao transition ili js objekat koji ima name property, i mode (out-in recimo itd)
		pageTransition: {
			name: 'fade',
			mode: 'out-in'
		},

		// router: { // ako hocemo da dodamo middle ware za svaku rutu
		// 	middleware: 'log'
		// },

		serverMiddleware: [ // ovo ne trba da se mesa sa onim nasim middleware. serverMiddleware je kolekcija node i express kompatibilne middleware koje ce biti executovane prajer (WTF) to the nuxt rendering process. dakle ovde mozemo da pokrenemo bilo koji express middleware koji zelimo da se pokrene PRVI ukljucujuci nas licni. pa hajmo da kreiramo novi folder, recimo api, i njemu index.js u kom cemo napisati nas licni express kod, a pre toga hajde prvo d ainstaliramo Express npm install --save express
			bodyParser.json(),
			'~/api' // a index.js ne treba jer automatski tarzi index.js
		]
}
