let pokemonRepository = ( () =>{
  let pokemonList = [
    { name: "Ivysaur", height: 1, types: ["Monster  , Grass"] },
    { name: "Blastoise", height: 1.6, types: ["Monster, Water 1"] },
    { name: "Sandslash", height: 1, types: ["Field"] },
  ];

  const getAll = () => {
    return pokemonList;
  }

  const add = (newPokemon) => {
    return pokemonList.push(newPokemon);
  }

  const showDetails = (pokemon) => {
     console.log(pokemon);
 }

  const addListItem = (pokemon) =>{
            let pokemonList = document.querySelector('.pokemon_list');
            let listItem = document.createElement('li');
            let button = document.createElement ('button');
            button.innerText = pokemon.name ;
            button.classList.add('pokemon-name');
            listItem.appendChild(button);
            pokemonList.appendChild(listItem);

            button.addEventListener( 'click' , ()=>{
                showDetails(pokemon);
            })
  }

  

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
  };

})();

pokemonRepository.getAll().forEach((pokemon) =>{
    pokemonRepository.addListItem(pokemon);
});




    