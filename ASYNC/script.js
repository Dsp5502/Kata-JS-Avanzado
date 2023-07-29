const pokemonTypes = document.getElementById('pokemonTypes');
const authorsOfBook = document.getElementById('authorsOfBook');
const booksByAuthor = document.getElementById('booksByAuthor');
const bandGenre = document.getElementById('bandGenre');
const starWarsCharacterAndMovies = document.getElementById(
  'starWarsCharacterAndMovies'
);
const pokemon151 = document.getElementById('pokemon151');
const asteroids = document.getElementById('asteroids');
const contPre = document.getElementsByClassName('contResponse');

//* Task 1

pokemonTypes.addEventListener('click', async () => {
  try {
    blockButtons(true);

    contPre[0].innerText = 'Loading...';

    const random = Math.floor(Math.random() * 100) + 1;

    const data = await getPokemonTypes(random);
    console.log('Task 1:', data);
    alertToast('Pokemons', 'top', 'right');

    contPre[0].innerText = JSON.stringify(data, null, 2);
  } catch (error) {
    console.log(error);
    alertToast('Error: ' + error, 'top', 'right', true);
  } finally {
    blockButtons(false);
  }
});

const getPokemonTypes = async (pokemonName) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon data');
  }

  const { types, name } = await response.json();
  return {
    name,
    types: types.map((type) => type.type.name),
  };
};

//* Task 2

const getAuthorsOfBook = async (bookTitle) => {
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${bookTitle}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch book data');
    }

    const data = await response.json();

    if (data.docs.length > 0) {
      console.log(
        `Task 2: Authors of "${bookTitle}": ${data.docs[0].author_name}`
      );

      return {
        title: bookTitle,
        authors: data.docs[0].author_name,
      };
    } else {
      console.log('Book not found.');
      return 'Book not found.';
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

authorsOfBook.addEventListener('click', async () => {
  try {
    blockButtons(true);
    contPre[0].innerText = 'Loading...';
    const bookTitle = 'The Lord of the Rings';
    const data = await getAuthorsOfBook(bookTitle);
    alertToast('Authors', 'top', 'right');
    contPre[0].innerHTML = '';
    const pre = document.createElement('pre');
    pre.innerHTML = JSON.stringify(data, null, 2);
    contPre[0].appendChild(pre);
  } catch (error) {
    console.log(error);
    alertToast('Error: ' + error, 'top', 'right', true);
  } finally {
    blockButtons(false);
  }
});

//* Task 3

const getBooksByAuthor = async (authorName) => {
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?author=${authorName}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch author data');
    }

    const data = await response.json();
    const books = data.docs.slice(0, 10).map((book) => book.title);

    console.log(
      `Task 3: Books by ${authorName}: ${data.docs.map((book) => book.title)}`
    );

    return {
      msg: 'Revisar todos los libros en consola',
      authorName,
      books,
      totalBooks: data.docs.length,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

booksByAuthor.addEventListener('click', async () => {
  try {
    blockButtons(true);
    contPre[0].innerText = 'Loading...';
    const authorName = 'J. R. R. Tolkien';
    const data = await getBooksByAuthor(authorName);
    alertToast('Books', 'top', 'right');
    contPre[0].innerHTML = '';
    const pre = document.createElement('pre');
    pre.innerHTML = JSON.stringify(data, null, 2);
    contPre[0].appendChild(pre);
  } catch (error) {
    console.log(error);
    alertToast('Error: ' + error, 'top', 'right', true);
  } finally {
    blockButtons(false);
  }
});

//* Task 4

const getBandGenre = async (bandName) => {
  try {
    const response = await fetch(
      `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${bandName}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch band data');
    }

    const data = await response.json();

    if (data.artists && data.artists.length > 0) {
      console.log(`Task 4: Genre of ${bandName}: ${data.artists[0].strGenre}`);
      return {
        bandName,
        genre: data.artists[0].strGenre,
      };
    } else {
      console.log(`Band ${bandName} not found.`);
      return {
        error: true,
        message: `Band ${bandName} not found.`,
      };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

bandGenre.addEventListener('click', async () => {
  try {
    blockButtons(true);
    contPre[0].innerText = 'Loading...';
    const bandName = 'coldplay';
    const data = await getBandGenre(bandName);
    alertToast('Genre', 'top', 'right');
    contPre[0].innerHTML = '';
    const pre = document.createElement('pre');
    pre.innerHTML = JSON.stringify(data, null, 2);
    contPre[0].appendChild(pre);
  } catch (error) {
    console.log(error);
    alertToast('Error: ' + error, 'top', 'right', true);
  } finally {
    blockButtons(false);
  }
});

//* Task 5
const getStarWarsCharacterAndMovies = async (characterId) => {
  const response = await fetch(`https://swapi.dev/api/people/${characterId}/`);
  const characterData = await response.json();
  console.log(`task 5: Star Wars Character: ${characterData.name}`);
  console.log('Appears in movies:');
  const movies = [];
  for (const movieUrl of characterData.films) {
    const movieResponse = await fetch(movieUrl);
    const movieData = await movieResponse.json();
    console.log(movieData.title);
    movies.push(movieData.title);
  }
  return {
    name: characterData.name,
    movies,
  };
};

starWarsCharacterAndMovies.addEventListener('click', async () => {
  try {
    blockButtons(true);
    contPre[0].innerHTML = '';
    contPre[0].innerHTML = 'Loading...';
    const characterId = 1;
    const data = await getStarWarsCharacterAndMovies(characterId);
    alertToast('Star Wars', 'top', 'right');
    contPre[0].innerHTML = '';
    const pre = document.createElement('pre');
    pre.innerHTML = JSON.stringify(data, null, 2);
    contPre[0].appendChild(pre);
  } catch (error) {
    console.log(error);
    alertToast('Error: ' + error, 'top', 'right', true);
  } finally {
    blockButtons(false);
  }
});

// * Task 6
const getFirst151PokemonDetails = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const data = await response.json();
  const pokemonList = [];
  for (const pokemon of data.results) {
    const pokemonDataResponse = await fetch(pokemon.url);
    const pokemonData = await pokemonDataResponse.json();
    const pokemonDetails = {
      name: pokemonData.name,
      moves: pokemonData.moves.map((move) => move.move.name).slice(0, 5),
      types: pokemonData.types.map((type) => type.type.name),
      height: pokemonData.height,
      weight: pokemonData.weight,
    };
    pokemonList.push(pokemonDetails);
  }
  console.log('Task 6: ', pokemonList);

  return {
    data: 'Revisar lista completa en al console',
    pokemon: pokemonList.slice(0, 1),
  };
};

pokemon151.addEventListener('click', async () => {
  try {
    blockButtons(true);
    contPre[0].innerHTML = '';
    contPre[0].innerHTML = 'Loading...';
    const data = await getFirst151PokemonDetails();
    alertToast('Pokemon List', 'top', 'right');
    contPre[0].innerHTML = '';
    const pre = document.createElement('pre');
    pre.innerHTML = JSON.stringify(data, null, 2);
    contPre[0].appendChild(pre);
  } catch (error) {
    console.log(error);
    alertToast('Error: ' + error, 'top', 'right', true);
  } finally {
    blockButtons(false);
  }
});

// * Task 7
const getPotentiallyHazardousAsteroids = async () => {
  const apiKey = 'mQrhyde7NvbKdfyPcvzfGJBr0jlCCT840tha3gT9';
  const endDate = new Date().toISOString().split('T')[0];
  const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  const response = await fetch(
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`
  );
  const data = await response.json();

  const hazardousAsteroids = [];
  for (const date in data.near_earth_objects) {
    for (const asteroid of data.near_earth_objects[date]) {
      if (asteroid.is_potentially_hazardous_asteroid) {
        hazardousAsteroids.push(asteroid);
      }
    }
  }
  console.log('Task 7: ', hazardousAsteroids);
  return {
    data: 'Revisar lista completa en al console',
    hazardousAsteroid: {
      total: hazardousAsteroids.length,
      namesAsteroids: hazardousAsteroids.map((asteroid) => asteroid.name),
    },
  };
};

asteroids.addEventListener('click', async () => {
  try {
    blockButtons(true);
    contPre[0].innerHTML = '';
    contPre[0].innerHTML = 'Loading...';
    const data = await getPotentiallyHazardousAsteroids();
    alertToast('Asteroids', 'top', 'right');
    contPre[0].innerHTML = '';
    const pre = document.createElement('pre');
    pre.innerHTML = JSON.stringify(data, null, 2);
    contPre[0].appendChild(pre);
  } catch (error) {
    console.log(error);
    alertToast('Error: ' + error, 'top', 'right', true);
  } finally {
    blockButtons(false);
  }
});

/**
 * * Muestra un toast con un mensaje
 * @param {string} text
 * @param {string} gravity
 * @param {string} position
 * @param {boolean} error
 */
const alertToast = (
  text = '',
  gravity = 'top',
  position = 'center',
  error = false
) => {
  Toastify({
    text,
    duration: 2000,
    gravity,
    position,
    stopOnFocus: true,
    style: {
      background: error
        ? 'linear-gradient(to right, #FF0000, #FF8700)'
        : 'linear-gradient(to right, #00b09b, #96c93d)',
      padding: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '20px',
      fontSize: '1rem',
    },
  }).showToast();
};

/**
 * * Bloquea o desbloquea todos los botones de la página
 * @param {boolean} block
 */
const blockButtons = (block = false) => {
  const buttons = document.getElementsByTagName('button');
  for (const button of buttons) {
    button.disabled = block;
  }
};
