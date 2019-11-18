export default function (context) {
	console.log('[Middleware] CHECK-AUTH');

	// if (process.client) { // pre ovoga se javljao error: localStorage is not defined jer se kod executovao na serveru tj serverskom okruzenju. a mi zelimo da se ovo okine ako je environment client tj process.client
		context.store.dispatch('auth/INIT_AUTH', context.req) // dakle zelimda dispatchujem INIT_AUTH kad god je ovaj middleware pokrenut da proveri da li je nas token validan ako imamo token. ovde za payload u INIT_AUTH ne prosledjujemo context.req jer se ovo okida klijent strani (process.client), zato za payload stavljamo null. ono sto mozemo sada je da uklonimo if (process.client), i uvek za payload stavimo context.req sto bi za client side svakako trebalo biti null
	// }

	//! medjutim ovim ifom nismo resili problem sa tokenom prilikom rifresovanja, ovim smo samo resili da ako se ulogujem, i odem na neku ne admin stranicu (tipa / ili about i onda ponovo odem na admin sekciju, i dalje radi jer cuvanje tokena na LS radi i ako rifresujem/reload na ne admin ruti, otisli smo od problema okidanja middleware na serveru i onda klikcuci na admin mi executujemo na klajentu i onda moze uspesno da dispatcuje INIT_AUTH, dakle ovo sad radi, ali nije bas najbolje resenje, dakle zelimo da sacuvamo token tj da se opali ovaj middleware check-auth i kad rifresujemo stranicu i na admin sekciji, AKO SAM DOBRO SKONTALA)

	

	// ovaj middleware sada attachujemo svakom fajlu gde nam je potreban token, dakle svim fajlovima gde smo vec dodali 'auth' middleware (/admin, /admin/new-post, admin/_postId), i bitan je redoslede middleware kad je niz u pitanju, prvo check-auth pa auth
}