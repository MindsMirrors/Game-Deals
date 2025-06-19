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

    gamesWrapper.classList += ' games__loading';

    if (currentFilter === "ALL") {
        sortBy = urlAll;
    }
    else if (currentFilter === "BROWSER") {
        sortBy = urlPlatform + "browser";
    }
    else if (currentFilter === "PC") {
        sortBy = urlPlatform + "pc";
    }
    else if (currentFilter === "RECENT") {
        sortBy = urlRelease;
    }
    else {
        sortBy = urlAll;
    }
    
    games = await getGames(sortBy);

    games = filterCatagory();

    loadButton();

    gamesWrapper.classList.remove('games__loading');

    if (games.length > 0) {
        const GamesHTML = games.slice(0, gamesLoadLimit).map(game => {
            return `<div class="game game__click">
                        <a href="${game.game_url}" target="_blank" class="">
                            <figure class="game__img--wrapper">
                                <img class="game__img" src="${game.thumbnail}" alt="">
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
                        </a>
                    </div>`;
        })
        .join("");
        gamesWrapper.innerHTML = GamesHTML;
    } 
    else {
        gamesWrapper.innerHTML = `<h3 class="no-game"> No Games Found </h3>`;
    }    
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

function filterCatagory() {
    let text1 = capitalizeFirstLetter(document.getElementById('input__area').value);
    let gamesByCatagory = [];
    if (text1) {
        gamesByCatagory = games.filter((element) => {
            if (element.title === text1) {
                return true
            }
        });
        return gamesByCatagory;
    }
    else {
        return games;
    }
}

function filterGamesCatagory() {
    gamesLoadLimit = 6;
    renderGames(currentFilter);
}

function loadMoreGames() {
    gamesLoadLimit += 6;
    renderGames(currentFilter);
}

function loadButton() {
    if (games.length < gamesLoadLimit || games.length < 1) {
        document.getElementById('load__btn').setAttribute('disabled', "");
    }
    else {
        if (document.getElementById('load__btn').hasAttribute('disabled')) {
            document.getElementById('load__btn').removeAttribute('disabled');
        }
    }
}

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

async function getGames(sortType) {
    const response = await fetch(sortType, options);
    const result = await response.json();
    return result;
}

setTimeout(() => {
  renderGames();
});
