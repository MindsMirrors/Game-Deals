const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '0a43c950bdmsh126f1842ed54776p1fc0bcjsnefc1964260ce',
		'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
	}
};
const urlAll = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
const urlPlatform = 'https://free-to-play-games-database.p.rapidapi.com/api/games?platform=';     //pc, browser or all
const urlRelease = 'https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=release-date';
const urlCatagory = 'https://free-to-play-games-database.p.rapidapi.com/api/games?category='; 
//mmorpg, shooter, strategy, moba, racing, sports, social, sandbox, open-world, survival, pvp, pve, pixel, 
// voxel, zombie, turn-based, first-person, third-Person, top-down, tank, space, sailing, side-scroller, 
// superhero, permadeath, card, battle-royale, mmo, mmofps, mmotps, 3d, 2d, anime, fantasy, sci-fi, fighting, 
// action-rpg, action, military, martial-arts, flight, low-spec, tower-defense, horror, mmorts
let games;
let gamesLoadLimit = 6;
let currentFilter;
let currentCatagory = "";

async function renderGames(currentFilter) {
    const gamesWrapper = document.querySelector('.games');
    let sortBy = urlAll;

    currentCatagory = filterGamesCatagory();

    gamesWrapper.classList += ' games__loading';

    if (currentFilter === "browser") {
        sortBy = urlPlatform + "browser" + currentCatagory;
        console.log(sortBy);
    }
    else if (currentFilter === "pc") {
        sortBy = urlPlatform + "pc" + currentCatagory;
        console.log(sortBy);
    }
    else if (currentFilter === "recent") {
        sortBy = urlRelease;
    }
    else {
        sortBy = urlAll;
    }

    games = await getGames(sortBy);

    gamesWrapper.classList.remove('games__loading');

    const GamesHTML = games.slice(0, gamesLoadLimit).map(game => {
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
                ${game.release_date} -
                ${game.publisher}
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
        return '<i class="fa-brands fa-windows"></i><span> </span><i class="fa-solid fa-window-maximize"></i>'
    }
}

function filterGames(event) {
    gamesLoadLimit = 6;
    currentFilter = event.target.value;
    renderGames(currentFilter);
}

function filterGamesCatagory() {
    let text1 = document.getElementById('input__area').value;
    if (text1) {
        return '&catagory='+text1+'&sort-by=release-date';
    } else {
        return "";
    }
}

function loadMoreGames() {
    console.log("load more pushed")
    gamesLoadLimit += 6;
    renderGames(currentFilter);
}

async function getGames(sortType) {
    const response = await fetch(sortType, options);
    const result = await response.json();
    console.log(result);
    return result;
}

setTimeout(() => {
  renderGames();
});
