let containerPokemon = document.querySelector(".containerPokemon");
let btnContainer = document.querySelector(".btnContainer");
let prevBtn, nextBtn;
let inicialURL = "https://pokeapi.co/api/v2/pokemon/";
let loader = document.getElementById("loader");

const peticionApi = async (url) => {
    loader.style.display = "block";
    containerPokemon.innerHTML = "";
    let response = await fetch(url);
    let data = await response.json();
    obtenerDataPokemon(data.results, data);
};

const obtenerDataPokemon = async (data, dataResponse) => {
    for (let i = 0; i < data.length; i++) {
        try {
            let response = await fetch(data[i].url);
            let datePokemon = await response.json();
            pintarPokemones(datePokemon, dataResponse);
            if (!response.ok)
                throw {
                    status: response.status,
                    statusText: response.statusText,
                };
        } catch (error) {
            console.log(error);
        }
    }
    loader.style.display = "none";
};

const pintarPokemones = (pokemon, dataResponse) => {
    let template = `
    <div class="card">
        <img src=${pokemon.sprites.other.dream_world.front_default} src=${pokemon.name}>
        <h2>${pokemon.name}</h2>
    </div>
    `;

    containerPokemon.innerHTML += template;
    prevBtn = dataResponse.previous
        ? `<button data-page=${dataResponse.previous}>⬅</button>`
        : "";
    nextBtn = dataResponse.next
        ? `<button data-page=${dataResponse.next}>➡</button>`
        : "";
    btnContainer.innerHTML = prevBtn + " " + nextBtn;
};

document.addEventListener("DOMContentLoaded", () => {
    peticionApi(inicialURL);
});

document.addEventListener("click", (e) => {
    if (e.target.matches(".btnContainer button")) {
        console.log("PORQUINO");
        console.log(e.target.dataset.page);
        peticionApi(e.target.dataset.page);
    }
});
