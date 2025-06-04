const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '0a43c950bdmsh126f1842ed54776p1fc0bcjsnefc1964260ce',
		'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
	}
};
let games;

async function renderGames() {
    const gamesWrapper = document.querySelector('.games');

    gamesWrapper.classList += ' games__loading';

    if (!games) {
        games = await getGames();
    }

    gamesWrapper.classList.remove('games__loading');

    // if (filter === "BROWSER") {
    //     books.sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice));
    // }
    // else if (filter === "PC") {
    //     books.sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice));
    // }
    // else if (filter === "RECENT") {
    //     books.sort((a, b) => b.rating - a.rating);
    // }

    const GamesHTML = games.slice(0, 6).map(game => {
    return `<div class="game">
        <figure class="game__img--wrapper">
                <a href="${game.game_url}" target="_blank" class="">
                    <img class="game__img" src="${game.thumbnail}" alt="">
                </a>
        </figure>
        <div class="game__title-platform">
                <div class="game__title">
                    ${game.title}
                </div>
                <div class="game__platform">
                    ${platformsHTML(game.platform)}
                </div>
            </div>
        <div class="game__dev-release">
            <div class="game__developer">
                ${game.developer}
            </div>
            <div class="game__release-date">
                ${game.release_date}
            </div>
        </div>
    </div>`;
  })
  .join("");

  gamesWrapper.innerHTML = GamesHTML;
}

function platformsHTML(gamePlatform) {
    if (gamePlatform === 'PC (Windows)') {
        return '<i class="fa-brands fa-windows"></i>';
    } 
    else if (gamePlatform === 'Web Browser') {
        return '<i class="fa-solid fa-window-maximize"></i>';
    } else {
        return '<i class="fa-brands fa-windows"></i><i class="fa-solid fa-window-maximize"></i>'
    }
}

function filterGames(event) {
  renderGames(event.target.value);
}

async function getGames() {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
    console.log(result);
}

setTimeout(() => {
  renderGames();
});
