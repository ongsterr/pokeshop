

// Create pokemon item/card
/* Structure of card
<li class="collection-item avatar">
    <img src="images/yuna.jpg" alt="" class="circle">
    <span class="title">Title</span>
    <p>First Line <br>
        Second Line
    </p>
    <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
</li>
*/

const pokeCollection = document.querySelector('.collection');
const uri = 'http://localhost:3000'

pokeCollection.addEventListener('click', deletePokemon);

fetchPokemon()
    .then(addPokeToCollection)
    .catch( err => console.log(err))

async function fetchPokemon() {
    let response = await fetch(uri + '/pokemon');
    let pokemon = response.json();
    return pokemon;
}

function addPokeToCollection(pokemon) {
    for (let i = 0; i < pokemon.length; i++) {
        createPokeCard(pokemon[i]);
    }
}

function createPokeCard(pokemon) {
    let li = document.createElement('li');
    li.classList.add('collection-item');
    li.classList.add('avatar');
    li.dataset.id = pokemon._id;

    let thumb = document.createElement('IMG');
    thumb.classList.add('circle');
    thumb.src = pokemon.sprite;
    li.appendChild(thumb);

    let name = document.createElement('span');
    name.classList.add('title');
    name.textContent = pokemon.name;
    name.style = 'font-weight: 600';
    li.appendChild(name);

    let species = document.createElement('p');
    species.textContent = `Species: ${pokemon.species}`;
    species.style = 'text-indent: 10px';
    li.appendChild(species);

    let price = document.createElement('p');
    price.textContent = `Price: $${(pokemon.price/100).toFixed(2)}`;
    price.style = 'text-indent: 10px; padding-bottom: 10px;';
    li.appendChild(price);

    let button = document.createElement('button');
    button.textContent = 'Sell';
    button.classList.add('btn-small');
    button.style = 'margin-left: 10px; padding: 0 40px;';
    li.appendChild(button);

    pokeCollection.appendChild(li);
}

function deletePokemon(e) {
    if (e.target.tagName === 'BUTTON') {
        let li = e.target.parentNode;
        let {id} = li.dataset;

        deleteRecord(id)
            .then(pokemon => {
                pokeCollection.removeChild(li)
            })
            .catch(err => console.log(err));
    }
}

async function deleteRecord(pokemonID) {
    let url = uri + '/pokemon/' + pokemonID;
    let options = {
        method: 'delete'
    };
    await fetch(url, options);
    return pokemonID;
}

// Form to add pokemon

// Initialize dropdown function
const selection = document.querySelector('select');

document.addEventListener('DOMContentLoaded', function () {
    const instances = M.FormSelect.init(selection, {});
});

const form = document.querySelector('form');
form.addEventListener('submit', submitPokemon)

function submitPokemon(e) {

    e.preventDefault()
    selection.classList.add('selected');
    const form = e.target.elements
    const name = form.name.value
    console.log(form);
    const species = document.querySelector('.selected').innerText;

    const CP = form.CP.value
    const price = form.price.value*100

    const pokemon = {
        name,
        species,
        CP,
        price
    }

    // post book
    postPokemon(pokemon)
        .then(pokemon => {
            e.target.reset()
            createPokeCard(pokemon)
        })
        .catch(err => console.error(err))

}

async function postPokemon(pokemon) {
    const url = uri + '/pokemon'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pokemon)
    }
    const response = await fetch(url, options)
    const newPokemon = await response.json()
    return newPokemon
}

function createDropdownList(array) {
    for (let h = 0; h < array.length; h++) {
        let option = document.createElement('option');
        option.textContent = array[h];
        option.setAttribute("value", h+1);
        selection.appendChild(option);
    };
};

const pokeTypes = [
    "Bulbasaur",
    "Ivysaur",
    "Venusaur",
    "Charmander",
    "Charmeleon",
    "Charizard",
    "Squirtle",
    "Wartortle",
    "Blastoise",
    "Caterpie",
    "Metapod",
    "Butterfree",
    "Weedle",
    "Kakuna",
    "Beedrill",
    "Pidgey",
    "Pidgeotto",
    "Pidgeot",
    "Rattata",
    "Raticate",
    "Spearow",
    "Fearow",
    "Ekans",
    "Arbok",
    "Pikachu",
    "Raichu",
    "Sandshrew",
    "Sandslash",
    "Nidoran♀",
    "Nidorina",
    "Nidoqueen",
    "Nidoran♂",
    "Nidorino",
    "Nidoking",
    "Clefairy",
    "Clefable",
    "Vulpix",
    "Ninetales",
    "Jigglypuff",
    "Wigglytuff",
    "Zubat",
    "Golbat",
    "Oddish",
    "Gloom",
    "Vileplume",
    "Paras",
    "Parasect",
    "Venonat",
    "Venomoth",
    "Diglett",
    "Dugtrio",
    "Meowth",
    "Persian",
    "Psyduck",
    "Golduck",
    "Mankey",
    "Primeape",
    "Growlithe",
    "Arcanine",
    "Poliwag",
    "Poliwhirl",
    "Poliwrath",
    "Abra",
    "Kadabra",
    "Alakazam",
    "Machop",
    "Machoke",
    "Machamp",
    "Bellsprout",
    "Weepinbell",
    "Victreebel",
    "Tentacool",
    "Tentacruel",
    "Geodude",
    "Graveler",
    "Golem",
    "Ponyta",
    "Rapidash",
    "Slowpoke",
    "Slowbro",
    "Magnemite",
    "Magneton",
    "Farfetch’d",
    "Doduo",
    "Dodrio",
    "Seel",
    "Dewgong",
    "Grimer",
    "Muk",
    "Shellder",
    "Cloyster",
    "Gastly",
    "Haunter",
    "Gengar",
    "Onix",
    "Drowzee",
    "Hypno",
    "Krabby",
    "Kingler",
    "Voltorb",
    "Electrode",
    "Exeggcute",
    "Exeggutor",
    "Cubone",
    "Marowak",
    "Hitmonlee",
    "Hitmonchan",
    "Lickitung",
    "Koffing",
    "Weezing",
    "Rhyhorn",
    "Rhydon",
    "Chansey",
    "Tangela",
    "Kangaskhan",
    "Horsea",
    "Seadra",
    "Goldeen",
    "Seaking",
    "Staryu",
    "Starmie",
    "Mr. Mime",
    "Scyther",
    "Jynx",
    "Electabuzz",
    "Magmar",
    "Pinsir",
    "Tauros",
    "Magikarp",
    "Gyarados",
    "Lapras",
    "Ditto",
    "Eevee",
    "Vaporeon",
    "Jolteon",
    "Flareon",
    "Porygon",
    "Omanyte",
    "Omastar",
    "Kabuto",
    "Kabutops",
    "Aerodactyl",
    "Snorlax",
    "Articuno",
    "Zapdos",
    "Moltres",
    "Dratini",
    "Dragonair",
    "Dragonite",
    "Mewtwo",
    "Mew",
].sort();
createDropdownList(pokeTypes);