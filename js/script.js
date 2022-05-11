let pokemonRepository =  (function (){
    let pokemonList = 
    [
        { name : 'Ivysaur' , height : 1 ,types : ['Monster  , Grass']}, 
        { name : 'Blastoise' , height : 1.6 , types : ['Monster, Water 1']},
        { name : 'Sandslash' , height : 1 , types : ['Field']}
    ];

    function getAll (){
        return pokemonList;
    }

    function add(newPokemon){
        return pokemonList.push(newPokemon);
    }
    return{
    getAll:  getAll,
    add: add
    };

})();

pokemonRepository.getAll().forEach((pokemonItems ) => (document.write (`<p> Name is "${pokemonItems.name}" , its height is ${pokemonItems.height} . And types are "${pokemonItems.types}"</p>`)));





