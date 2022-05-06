let pokemonList = 
[
    { name : 'Ivysaur' , height : 1 ,types : ['Monster, Grass']}, 
    { name : 'Blastoise' , height : 1.6 , types : ['Monster, Water 1']},
    { name : 'Sandslash' , height : 1 , types : ['Field']}
];

for ( let i=0; i< pokemonList.length; i++ )
{
    document.write("<br>");
    if( pokemonList[i].height > 1.5)
    {
        document.write(`Name is "${pokemonList[i].name}" , its height is ${pokemonList[i].height} . Wow its s big Pokemon !! and types are "${pokemonList[i].types}"`);
    }
    else{
        document.write(`Name is "${pokemonList[i].name}" , its height is ${pokemonList[i].height} . And types are "${pokemonList[i].types}"`);
    }
}

