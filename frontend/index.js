

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
    console.log(pokemon);
    return pokemon;
}

function addPokeToCollection(pokemon) {
    for (let i = 0; i <= pokemon.length; i++) {
        createPokeCard(pokemon[i]);
    }
}

function createPokeCard(pokemon) {
    let li = document.createElement('li');
    li.classList.add('collection-item');
    li.classList.add('avatar');
    li.dataset.id = pokemon.id;

    let name = document.createElement('span');
    name.classList.add('title');
    name.textContent = pokemon.name;
    li.appendChild(name);

    let type = document.createElement('p');
    type.textContent = pokemon.type;
    li.appendChild(type);

    let price = document.createElement('p');
    type.textContent = `$${(pokemon.price/100).toFixed(2)}`;
    li.appendChild(price);

    let button = document.createElement('button');
    button.textContent = 'Remove';
    button.classList.add('btn-flat');
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