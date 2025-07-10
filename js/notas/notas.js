// Carregar e exibir notas


async function adicionar() {
    let div = document.getElementById("form_notas");

    div.style.visibility = "visible"
}

async function fecharNota() {
    let div = document.getElementById("form_notas");

    div.style.visibility = "hidden"
}

async function loadNotas() {
    try {
        const response = await fetch("http://localhost:3002/notas");  // Pega todas as notas
        const data = await response.json();
        let tbody = document.getElementById("notas");
        tbody.innerHTML = '';

        if (data.success && data.data) {
            data.data.forEach(nota => {
                console.log(nota)
                const linha = document.createElement('div');
                linha.classList.add("fundo-notas")
                linha.innerHTML = `
                <a href="nota.html?id=${nota.id}"><h3 class="titulo-das-notas">${nota.titulo}</h3></a>`;
                tbody.appendChild(linha);
            });
        }
    } catch (error) {
        console.error("Erro ao carregar notas", error);
    }
}



loadNotas();



