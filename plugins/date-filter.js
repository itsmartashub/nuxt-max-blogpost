import Vue from 'vue'

const months = [
	"Januar",
	"Februar",
	"Mart",
	"April",
	"Maj",
	"Jun",
	"Jul",
	"Avgust",
	"Septembar",
	"Oktobar",
	"Novembar",
	"Decembar"
]

const dateFilter = value => {
	return formatDate(value)
}

function formatDate(inputDate) {
	const date = new Date(inputDate)
	const year = date.getFullYear()
	const month = date.getMonth()
	const day = date.getDate()

	const formattedDate = `${day}. ${months[month]} ${year}`

	return formattedDate
}

Vue.filter('date', dateFilter) // date je ovde ime filtera, a drugim aregumentom ukazujemo na koju f-ju se odnosi, koja f-ja ce se izvrsiti