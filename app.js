window.onload = function() {
    carregarImagens();
    window.addEventListener('scroll', function() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            carregarImagens();
        }
    });
}

let indexInicial = 0;
const imagensPorVez = 2; //número de imagens carregadas por vez

function carregarImagens() {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', 'imagens.json', true);
    xmlHttp.onload = function() {
        if (this.status === 200) {
            const data = JSON.parse(this.responseText);
            const imagensContainer = document.getElementById('imagens');
            const indexFinal = indexInicial + imagensPorVez;

            for (let i = indexInicial; i < indexFinal && i < data.gatos.length; i++) {
                const imagemDiv = document.createElement('div');
                imagemDiv.classList.add('imagem-container');

                const img = document.createElement('img');
                img.src = data.gatos[i].imagemUrl;
                img.alt = data.gatos[i].descricao;

                const p = document.createElement('p');
                p.textContent = data.gatos[i].descricao;

                imagemDiv.appendChild(img);
                imagemDiv.appendChild(p);
                imagensContainer.appendChild(imagemDiv);
            }

            indexInicial += imagensPorVez;
        }
    }
    xmlHttp.send();
}
