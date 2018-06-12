

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

const pokemonList = document.querySelector('.collection')

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

    pokemonList.appendChild(li);
}