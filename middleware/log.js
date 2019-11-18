// middleware is just a function koji prihvata context object za argument

export default function (context) {
	// i ovde mozemo da stavimo koji god kod hocemo i bice executed PRE nego sto je given page ucitana
	// ako running asinhroni kod tipa slanje http rikvesta onda moramo vratiti Promise koji ce biti wrapper tvom asinhronom kodu
	// i posto vidis da ova f-ja za argument prihvata context onda znas da se ovaj middleware vrsi i na klijentu i na serveru, u zavisnosti da li je inicijalan load u pitanju ili klikcemo na vec ucitanu apliakciju, i to je fora, middleware ovu f-ju vrsi ili prilikom prvog ucitavanja ili na klijentu, ali da se uverimo da se uopste execute moramo prilepiti nekoj stranici, recimo u pages/posts/index.vue i koristimo special key middleware
	console.log('[Middleware] The Log Middleware is running');

}