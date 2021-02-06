document.addEventListener('DOMContentLoaded', () => {
  console.log(POKEMON)
  //YOUR CODE HERE
  fetchPokemon()
})

const url = 'http://localhost:3000/pokemon'
let PokemonArray


function fetchPokemon() {
  fetch(url)
  .then(response => response.json())
  .then(data => pokemonArray = data)
  .then(data => pokemonArray = data)
  .then(pokemonArray => loadPokemon(pokemonArray))
  // .then(pokemonArray => console.log(findPokemon(pokemonArray, 'charmander')))
}

function findPokemon(arr, name){
  return arr.find(pokemon => pokemon.name === name)
}

const pokemonContainer = document.querySelector('#pokemon-container')
function loadPokemon(pokemonArray) {
  pokemonArray.forEach(pokemon => {
    const pokemonCard = document.createElement('div')
    pokemonCard.className = 'pokemon-card'

    const pokemonFrame = document.createElement('div')
    pokemonFrame.className = 'pokemon-frame' 

    const pokemonName = document.createElement('h1')
    pokemonName.className = 'center-text'
    pokemonName.innerText = pokemon.name

    const pokemonImageDiv = document.createElement('div')
    pokemonImageDiv.className = 'pokemon-image'

    const pokemonImage = document.createElement('img')
    pokemonImage.src = pokemon.sprites.front
    pokemonImage.alt = pokemon.name

    const pokemonImageReverseDiv = document.createElement('div')
    pokemonImageReverseDiv.className = 'flip-image'
    pokemonImageReverseDiv.style.display = 'none'

    const pokemonImageReverse = document.createElement('img')
    pokemonImageReverse.src = pokemon.sprites.back
    pokemonImageReverse.alt = pokemon.name

    pokemonImageReverseDiv.append(pokemonImageReverse)
    pokemonImageDiv.append(pokemonImage)
    pokemonFrame.append(pokemonName, pokemonImageDiv, pokemonImageReverseDiv)
    pokemonCard.append(pokemonFrame)
    pokemonContainer.append(pokemonCard)
  })
}

pokemonContainer.addEventListener('click', (e) =>{
  let imageDiv = e.target.parentElement
  if (imageDiv.className == 'pokemon-image'){
    imageDiv.style.display = 'none'
    imageDiv.nextSibling.style.display = ''
  }
  else if (imageDiv.className == 'flip-image'){
    imageDiv.style.display = 'none'
    imageDiv.previousSibling.style.display = ''
  }
})

const searchForm = document.querySelector('#pokemon-search-input');

// searchForm.addEventListener('input', (e) => {
//   console.log(e.data)
//   Array.from(pokemonContainer.children).forEach(pokemon => {
//     let pokemonName = pokemon.querySelector('h1').innerText
    
//     if (!pokemonName.includes(e.data.toLowerCase()) && e.data != null){
//       pokemon.style.display = 'none'
//     }
//   })
// })

searchForm.addEventListener('input', (event) => {
  console.log(pokemonArray)
  const filteredPokes = pokemonArray.filter(pokeObj => pokeObj.name.includes(event.target.value.toLowerCase()))
  console.log('filteredPokes: ', filteredPokes);

  // const filteredPokeHTML = loadPokemon(filteredPokes)
  Array.from(pokemonContainer.children).forEach(pokemon => {
    pokemon.remove()
  })
  if (!filteredPokes?.length) {
    pokemonContainer.innerHTML = `<p><center>There are no Pokémon here</center></p>`
  } else {
    loadPokemon(filteredPokes)
  }
  console.log('filteredPokes: ', filteredPokes);
})

