let pokemonRepository = (() => {
  let pokemonList = [];

  const getAll = () => {
    return pokemonList;
  }

  const add = (newPokemon) => {
    return pokemonList.push(newPokemon);
  }



  const addListItem = (pokemon) => {
    let pokemonList = document.querySelector('.pokemon_list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-name');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);

    button.addEventListener('click', () => {
      showDetails(pokemon);
    })
  }

  const loadList = () => {
    return fetch('https://pokeapi.co/api/v2/pokemon/?limit=150',
      {
        method: 'GET'
      })
      .then((response) => {
        return response.json();
      })
      .then((pokemonDetails) => {
        pokemonDetails.results.forEach((pokemonItem) => {
          let newPokemon = {
            name: pokemonItem.name,
            detailsUrl: pokemonItem.url
          };

          add(newPokemon);
        })
      })
      .catch((error) => {
        document.write('This Pokemon doesn\'t exists. The error is :', error);
      });
  }

  const loadDetails = (item) => {
    let url = item.detailsUrl;
    return fetch(url, {
      method: 'GET'
    })
      .then((response) => {
        return response.json();
      })
      .then((details) => {
        item.image = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;

      })
      .catch((rejected) => {
        document.write('The requested Pokemon doesn\'t exists. The error is :', rejected);
      })
  }
  const showDetails = (pokemon) => {
    loadDetails(pokemon).then(() => {
      console.log(pokemon);
    });
  }



  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };

})();

pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});




