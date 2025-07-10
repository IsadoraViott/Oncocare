function getNotaIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    const nota_id = params.get("id");
    console.log("ID extraído da URL:", nota_id);
    return nota_id;
}

async function loadNotaEspecifica() {
    const id = getNotaIdFromURL();
    if (!id) return;
    

    try {
        const response = await fetch(`http://localhost:3002/notas/${id}`);
        const result = await response.json();
        let container = document.getElementById("notas_especificas");
        container.innerHTML = '';

        if (result.success && result.data) {
            const nota = result.data;
            const divNota = document.createElement('div');
            divNota.classList.add('class');
            divNota.innerHTML = `
                <div id="icones">
                    <div id="icones-seta">
                        <a href="./blocoDeNotas.html"><img src="./assents/seta.png" alt="" class="img-icones-seta"></a>
                    </div>
                    <h2 class="titulo-das-notas">${nota.titulo}</h2>
                    <div id="icones_funcoes">
                        <button id="button_notas"><img src="./assents/imagem.png" alt="" class="img-icones-img"></button>
                        <button id="button_notas" onclick="adicionarconteudo()"><img src="./assents/salvar.png" alt="" class="img-icones-img"></button>
                        <button id="button_notas" onclick="deletarNota(${nota.id}, this.closest('.class'))"><img src="./assents/lixo.png" alt="" class="img-icones-img"></button>
                    </div>
                </div>
                <div id="conteudos">
                    <div id="conteudo-notas">
                        <h3 class="titulo-das-notas">
                            <textarea class="nota" name="conteudo" id="conteudo" maxlength="460">${nota.conteudo ?? ""}</textarea>
                        </h3>
                    </div>
                </div>
            `;
            

            container.appendChild(divNota);
        }
    } catch (error) {
        console.error("Erro ao carregar nota específica", error);
    }
}

async function adicionarconteudo() {
    const conteudo = document.getElementById('conteudo').value;
    const id = getNotaIdFromURL();

    const data = { conteudo };

    try {
        const response = await fetch(`http://localhost:3002/notas/${id}/conteudo`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const results = await response.json();

        if (results.success) {
            alert('Conteúdo atualizado com sucesso');
            window.location.reload();
        } else {
            alert(results.message);
        }
    } catch (error) {
        console.log("Erro ao atualizar conteúdo", error);
    }
}

async function deletarNota(id, linha) {
    const confirmar = window.confirm("Você tem certeza que deseja deletar esta nota?");
    if (!confirmar) return;

    try {
        const response = await fetch(`http://localhost:3002/notas/${id}`, {
            method: 'DELETE',
        });
        const result = await response.json();

        if (result.success) {
            linha.remove();
            alert(result.message);
            setTimeout(() => {
                window.location.assign("blocoDeNotas.html");
            }, 500);
        } else {
            alert("Erro ao deletar nota.");
        }
    } catch (error) {
        console.error("Erro ao excluir a nota:", error);
        alert("Erro ao excluir a nota.");
    }
}

loadNotaEspecifica();
