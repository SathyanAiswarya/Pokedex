let pokemonRepository = (() => {
  let pokemonList = [];

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

  const add = (newPokemon) => {
    return pokemonList.push(newPokemon);
  }

  const getAll = () => {
    return pokemonList;
  }

  const addListItem = (pokemon) => {
    let pokemonList = document.querySelector('.list-group');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    let pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    button.innerText = pokemonName;
    button.classList.add('btn', 'btn-secondary', 'btn-lg', 'btn-block', 'list-group-item', 'list-group-item-action', 'list-group-item-danger');
    button.dataset.toggle = 'modal';
    button.dataset.target = '#exampleModal';
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);

    button.addEventListener('click', () => {
      showDetails(pokemon).then((itemDetails) => {
        showModal(pokemonName, itemDetails.image, itemDetails.height);
      })
    })
  }

  const showModal = (title, url, text) => {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

    let nameOfPokemon = $('<h1>' + title + '</h1>');
    let pokemonImage = $('<img class="modal-img">');
    pokemonImage.attr("src", url);
    let pokemonHeight = ('<p>' + 'Height' + ' ' + text + '</p>');




    modalTitle.append(nameOfPokemon);
    modalBody.append(pokemonImage);
    modalBody.append(pokemonHeight);



  function hideModal() {
    let modalContainer = document.querySelector('.modal-container')
    modalContainer.classList.remove("is-visible");
    modalContainer.parentElement.removeChild(modalContainer);

  }

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('.modal-container');
    if (e.key === 'Escape' && modalContainer) {
      hideModal();
    } // for escape key
  });

  window.addEventListener('click', (e) => {
    let modalContainer = document.querySelector('.modal-container');
    if (modalContainer && !modalContainer.contains(e.target) && (e.tagert !== modalContainer)) {
      hideModal();
    } // for outside click
  });

  const showDetails = (pokemon) => {
    return loadDetails(pokemon).then((item) => {
      return item;
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
        const itemDetails = {
          image: details.sprites.front_default,
          height: details.height,
          types: details.types
        }

        return itemDetails;

      })
      .catch((rejected) => {
        document.write('The requested Pokemon doesn\'t exists. The error is :', rejected);
      })
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




