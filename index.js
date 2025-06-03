let contrastToggle = false;
let games;

function openMenu() {
    document.body.classList += " menu--open"
}

function closeMenu() {
    document.body.classList.remove('menu--open')
}

function toggleContrast() {
    contrastToggle = !contrastToggle;
    if (contrastToggle) {
        document.body.classList += " dark-theme"
    }
    else {
        document.body.classList.remove("dark-theme");
    }
}

const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '0a43c950bdmsh126f1842ed54776p1fc0bcjsnefc1964260ce',
		'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

// try {
    async function getGames() {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
    }
// } catch (error) {
// 	console.error(error);
// }

getGames();

