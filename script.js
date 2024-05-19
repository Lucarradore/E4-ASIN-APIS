const searchBtn = document.getElementById('search-btn');
const pokemonNumber = document.getElementById('pokemon-number');
const pokemonCard = document.getElementById('pokemon-card');

searchBtn.addEventListener('click', () => {
  const number = pokemonNumber.value;
  if (!number) {
    pokemonCard.innerHTML = '<p>Debe ingresar un número</p>';
    return;
  }

  fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
    .then(response => response.json())
    .then(data => {
      if (!data.name) {
        pokemonCard.innerHTML = '<p>No se encontró ningún pokemon</p>';
        return;
      }

      const pokemon = {
        name: data.name,
        type: data.types[0].type.name,
        height: data.height / 10,
        weight: data.weight / 10,
        image: data.sprites.front_default,
      };

      pokemonCard.innerHTML = `
        <h2>${pokemon.name}</h2>
        <p>Tipo: ${pokemon.type}</p>
        <p>Altura: ${pokemon.height} m</p>
        <p>Peso: ${pokemon.weight} kg</p>
        <img src="${pokemon.image}" alt="${pokemon.name}">
      `;
    })
    .catch(error => {
      pokemonCard.innerHTML = '<p>Error: algo salió mal</p>';
    });
});