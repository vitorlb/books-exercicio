let loadBooks = (arr) => {
    loaderInit()
    document.getElementById("table").innerHTML = ""
    arrayLivros = []
    arrayPaginas = []


    for (j = 0; j < arr.length; j += 5) {
        arrayLivros.push(arr.slice(j, j + 5))
    }

    arrayLivros.forEach(elem => {
        let pagina = document.createElement("ul")

        pagina.setAttribute("class", "pagina")

        elem.forEach(elemDentro => {
            let livro = document.createElement("li");
            let titulo = document.createElement("h1");
            let autor = document.createElement("h2");
            let publisher = document.createElement("p");
            let icon = document.createElement("h1");
            livro.setAttribute("class", "livro")
            titulo.innerHTML = elemDentro.title;
            autor.innerHTML = elemDentro.author;
            publisher.innerHTML = elemDentro.publisher;
            icon.innerHTML = "🕮";
            livro.appendChild(icon);
            livro.appendChild(titulo);
            livro.appendChild(autor);
            livro.appendChild(publisher);
            pagina.appendChild(livro);
        })

        arrayPaginas.push(pagina);
        document.getElementById('table').appendChild(arrayPaginas[0])
        loadIndice()



    })
    loadCapitulo()
  
    
};


let loadIndice = () => {
    document.getElementById("indicePaginas").innerHTML = ""
    let indiceInicial = 1;
    arrayLivros.forEach(pag => {

        let indicePagina = document.createElement('li');
        indicePagina.setAttribute("class", "capitulo")
        indicePagina.innerHTML = indiceInicial;
        document.getElementById("indicePaginas").appendChild(indicePagina);
        indiceInicial++;
    })
    
}

let loadCapitulo = () => {
    let capitulo = Array.from(document.getElementsByClassName("capitulo"));
    capitulo.forEach(
        elem => {
            elem.addEventListener("click", () => {
                document.getElementById("table").innerHTML = "";
                let k = elem.innerHTML - 1;
                document.getElementById('table').appendChild(arrayPaginas[k]);
                elem.style.fontWeight = "bold";
                for (j = 0; j <= capitulo.length; j++){
                    if(j != elem.innerHTML - 1){
                        capitulo[j].style.fontWeight = "normal";
                    }
                };
            });
        }
    )
    
}


function callServer(url) {

    fetch(url)
        .then(function (response) {
            return response.json();

        })
        .then(function (arr) {
            arrayLivros = arr
            loadBooks(arr)

        });
}

function loaderInit() {
    setTimeout(function () {
        document.getElementById("loaderContainer").style.display = "none";
        document.getElementById("content").style.display = "block";
    }, 2500);
}

function loaderSearch() {
    document.getElementById("content").style.display = "none";
    document.getElementById("loaderContainer").style.display = "block";

    setTimeout(function () {
        document.getElementById("loader").style.display = "none";
        document.getElementById("loaderContainer").style.display = "block";
    }, 2500);
}



document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("go").addEventListener("click", () => {
        let url = "./api?"
        let author = document.getElementById("author").value
        let title = document.getElementById("title").value
        let pub = document.getElementById("pub").value
        if (author) {
            url += "author=" + author + "&"
        }
        if (title) {
            url += "title=" + title + "&"
        }
        if (pub) {
            url += "publisher=" + pub + "&"
        }

        callServer(url)
        loaderSearch()
        

    }, false)

    callServer("/api");
    
   
});




