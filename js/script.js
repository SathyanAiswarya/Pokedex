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
    let pokemonList = document.querySelector('.pokemon_list');
    let listItem = document.createElement('li');
    listItem.classList.add('pokemon_list_items')
    let button = document.createElement('button');
    let pokemonName = pokemon.name.toUpperCase();
    button.innerText = pokemonName;
    button.classList.add('pokemon-name');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);

  //   button.addEventListener('click', () => {
  //     showDetails(pokemon).then((itemDetails) => {
  //       console.log(itemDetails.types);
  //       const typeNames = itemDetails.types.map((type) => {
  //         return type.type.name;
  //       })
  //       console.log(typeNames);
  //       showModal(pokemon.name, itemDetails.image, typeNames );
  //   })
  //   })
  // } for printing with types 

  button.addEventListener('click', () => {
        showDetails(pokemon).then((itemDetails) => {
          showModal(pokemonName, itemDetails.image, itemDetails.height );
      })
      })
    } 

  const showModal = (title,url,text) => {
    
    let alreadyOpenedModals = document.getElementsByClassName('modal-container');
    console.log(alreadyOpenedModals);
    if(alreadyOpenedModals && alreadyOpenedModals.length>0){
      alreadyOpenedModals[0].parentElement.removeChild(alreadyOpenedModals[0]);
      
    }
    let body = document.querySelector ('body');
    let modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container')
    body.appendChild(modalContainer);

    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
     modal.classList.add('modal');

      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal); // for close button

      let titleElement = document.createElement('h1');
      titleElement.innerText = title;

      let imageElement = document.createElement('img');
      imageElement.src = url;

      let contentElement = document.createElement('p');
      contentElement.innerText = text;

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modal.appendChild(imageElement);
      modalContainer.appendChild(modal);
      

    
}

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
     if ( modalContainer && !modalContainer.contains(e.target) && (e.tagert!== modalContainer )) {
  hideModal();  

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
        const itemDetails={
            image : details.sprites.front_default,
            height :details.height,
            types : details.types
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




