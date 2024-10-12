var todosPaises = []
var todosPaisesDiv = document.querySelector(".todosPaises")
var qtPaises = document.querySelector("#QuantidadePaises")

async function consultarPaises(url){
    var resposta = await fetch("https://restcountries.com/v3.1/" + url)
    var dados = await resposta.json()

    todosPaises = dados
    qtPaises.innerHTML = todosPaises.length
    mostrarPaises(todosPaises)
}

function mostrarPaises(paises){
    todosPaisesDiv.innerHTML = ""
    for(pais of paises){
        console.log(pais.name.common)

        var paisDiv = document.createElement("div")
        paisDiv.classList.add("pais")

        paisDiv.innerHTML = `
        <img width="200" src="${pais.flags.png}" alt="${pais.flag.alt}"/>
        <p>${pais.name.common}</p>`

        paisDiv.id = pais.cca2;

        paisDiv.addEventListener("click", abrirPaginaDetalhes);

        todosPaisesDiv.appendChild(paisDiv);

    }
}

function buscarPaises(value){
    var paisesBuscados = []
    for(pais of todosPaises){
        var nome = pais.name.common.toLowerCase()
        if(nome.startsWith(value.toLowerCase())){
            paisesBuscados.push(pais)
        }
    
    }
    todosPaisesDiv.innerHTML = ""
    qtPaises.innerHTML = paisesBuscados.length
    mostrarPaises(paisesBuscados)

}

function pesquisarPaisPorFiltro(value){
    var url = ""
    if(value != "all"){
        url = "region/" + value
    }else{
        url = "all"
    }
    consultarPaises(url)
}

consultarPaises("all")

function abrirPaginaDetalhes(event){
    var paisId;
  
    if (event.target.className != "pais") {
      paisId = event.target.parentElement.id;
    } else {
      paisId = event.target.id;
    }
  
    window.location.href = `../html/detalhes.html?id=${paisId}`;
  }