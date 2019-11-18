export default function (context) {
	// ovde hocemo da cekiramo da li je user authentificovan, ako nije zelim da ga redirektujem
	console.log('[Middleware] AUTH');

	// console.log(context.store.getters['auth/IS_AUTHENTICATED'])
	if (!context.store.getters['auth/IS_AUTHENTICATED']) {
		context.redirect('/admin/auth')
	}
}

// zelim sada ovaj middleware da manualno dodam na svaku admin page, idem prvo u pages/admin/index.vue, zaetim u new-post/index.vue, ne zelim da dodam u login/signup tj pages/admin/auth/index.vue, ali zelim za pages/admin/_postId/index.vue 