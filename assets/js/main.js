// Cargar Tipos de Pokemones
function obtener_Tipos() {
    let nav_list = document.getElementById('nav-list');
    let request = fetch('https://pokeapi.co/api/v2/type/');
    request.then(response => response.json()).then(json => {
        nav_list.innerHTML += ` <li class="nav-item"><button onclick="filtrar(id)" class="btn btn-header ver-todos" id="ver-todos">VER TODOS</button></li> `
        json.results.forEach(tipo => {
            nav_list.innerHTML += ` <li class="nav-item"><button onclick="filtrar(id)" class="btn btn-header ${tipo.name}" id="${tipo.name}">${tipo.name.toUpperCase()}</button></li> `
        });
    } )
}

// Filtrar
function filtrar(id) {
    if (id == "ver-todos"){
        cargarPokemones()
    }else {
        var request = fetch('https://pokeapi.co/api/v2/type/'+ id);
        let pokemones = document.getElementById('pokemones');
        pokemones.innerHTML = ``
        request.then(response => response.json()).then(json => {
            json.pokemon.forEach(pokemon => {
                infoPokemon(pokemon.pokemon.url)
            })
        } )
    }
}

// Cargar Todos los Pokemones
function cargarPokemones() {
    let request = fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
    pokemones.innerHTML = ``
    request.then(response => response.json()).then(json => {
        json.results.forEach(pokemon => {
            infoPokemon(pokemon.url)
        });
    } )
}

// Buscar Imagen del Pokemon
function infoPokemon(url) {
    let request = fetch(url);
    request.then(response => response.json()).then(json => {
        pokemones.innerHTML += `
            <div class="pokemon">
                <div class="pokemon-imagen">
                    <img src="${json.sprites.other["official-artwork"].front_default}" alt="${json.name}" width="100px">
                </div>
                <div class="pokemon-info">
                    <button class="other">#${json.id.toString().padStart(3, "0")}</button>
                    <h2>${json.name.toUpperCase()}</h2>
                </div>
                <div class="tipo">
                    ${[...json.types.map(tipo => `<button class="tipo-pokemon ${tipo.type.name}" id="${tipo.type.name}">${tipo.type.name.toUpperCase()}</button>`)].join(' ')}
                </div>
                <div class="other">
                    <button class="altura other">${json.height/10} m</button>
                    <button class="peso other">${json.weight/10} Kg</button>
                </div>
                <a class="ver-mas" href='/tienda_pokemones/detalle.html?${json.name}'>VER MAS</a>
            </div>
            `
    } )
}

obtener_Tipos()
cargarPokemones()

