const lerURL = window.location.search
const URL = new URLSearchParams(lerURL)
const paisId = URL.get('id')


async function consultarPaises(){
    var resposta = await fetch("https://restcountries.com/v3.1/alpha/" + paisId)
    var dados = await resposta.json()
    var subDados = dados[0]


    console.log(subDados)


    document.getElementById('id_BandeiraImagem').src = subDados.flags.svg;
    document.getElementById('id_Capital').textContent = subDados.capital
    
    document.getElementById('id_Idioma').textContent = Object.values(subDados.languages).join(', ')

    document.getElementById('id_Moeda').textContent = Object.values(subDados.currencies)[0].name

    document.getElementById('id_Continente').textContent = subDados.subregion
    document.getElementById('id_Populacao').textContent = subDados.population
    document.getElementById('id_Area').textContent = subDados.area

    const latitude = subDados.latlng[0]
    const longitude = subDados.latlng[1]

    var mapa = L.map('id_Maps').setView([latitude, longitude], 6)
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{}).addTo(mapa)

    L.marker([latitude, longitude]).addTo(mapa)
    .bindPopup(`${subDados.translations.por.common}`)
    .openPopup()

}

consultarPaises();

