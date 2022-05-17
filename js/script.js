let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Ivysaur", height: 1, types: ["Monster  , Grass"] },
    { name: "Blastoise", height: 1.6, types: ["Monster, Water 1"] },
    { name: "Sandslash", height: 1, types: ["Field"] },
  ];

  function getAll() {
    return pokemonList;
  }

  function add(newPokemon) {
    return pokemonList.push(newPokemon);
  }
  return {
    getAll: getAll,
    add: add,
  };
})();

pokemonRepository.getAll()
  .forEach((pokemonItem) =>{
  if ( pokemonItem.height >1.5 ){
    document.write(
        `<p> Name is "${pokemonItem.name}" , Wow, its a big Pokemon!!,
        its height is ${pokemonItem.height} . 
        And types are "${pokemonItem.types}"</p>`);
  }
  else{
    document.write(
        `<p> Name is "${pokemonItem.name}" , 
        its height is ${pokemonItem.height} . 
        And types are "${pokemonItem.types}"</p>`); 

  }
  });
