<template>
<!-- ERROR PAGE tj LAYOUT MORA IMATI IME ERROR, INACE NECE RADITI -->
  <div class="error-page">
    <h1>Oops, something went wrong!</h1>
    <p>Back to <a href="/">safety</a>!</p>
	 <!-- ovde stavljamo anchor tag sa linkom za vracanje na nasu app sa normalnim href atributom jer moguce da smo dosli do error page jer je nas js crashovao onda nuxt-link takodje ne bi radio jer je nasa js aplikacija mozda mrtva, pa da bi omogucili vracanje na nas page ipak idemo sa href jer tako reloadujemo nasu app -->
  </div>
</template>

<style scoped>
.error-page {
  text-align: center;
}

.error-page a {
  text-decoration: none;
  color: red;
}

.error-page a:hover,
.error-page a:active {
  color: salmon;
}
</style>
