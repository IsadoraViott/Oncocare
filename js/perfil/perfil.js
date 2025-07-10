async function loadInformacoes() {
    try {
        const idLogado = localStorage.getItem('usuarioId'); 
        if (!idLogado) {
            console.error("Usuário não logado.");
            return;
        }

        const response = await fetch(`http://localhost:3002/usuarios/${idLogado}`);
        const data = await response.json();

        if (data.success && data.data) {
            const usuario = data.data;

            let tbody = document.getElementById("corpo_perfil");
            tbody.innerHTML = ''; 

            const linha = document.createElement('div');
            linha.classList.add('corpo_perfil_componentes');
            linha.innerHTML = `
                <div class="mae_voltar_sair">
                    <div class="voltar_sair">
                        <a href="./principal.html"><img src="./assents/voltar_perfil.png" alt="" class="img_perfil"></a>
                        <h2 class="titulo-das-notas">Voltar</h2>
                    </div>
                    <div class="voltar_sair">
                        <h2 class="titulo-das-notas">Sair</h2>
                        <a href="./index.html"><img src="./assents/saida.png" alt="" class="img_perfil"></a>
                    </div>
                </div>

                <div class="div_foto">
                    <img src="./assents/Component 29.png" alt="" id="img_pessoa">
                </div>

                <div class="mae_componentes">
                    <div class="componentes">
                        <h3 id="nome">${usuario.nome}</h3>
                        <img src="./assents/lapis.png" alt="" onclick="editarNome(event)">
                    </div>

                    <div class="componentes">
                        <h3>${usuario.email}</h3>
                        <img src="./assents/lapis.png" alt="" onclick="editarEmail(event)">
                    </div>

                    <div class="componentes">
                        <h3>${usuario.senha}</h3>
                        <img src="./assents/lapis.png" alt="" onclick="editarSenha(event)">
                    </div>
                </div>

                <div class="mae_componentes">
                    <div class="componentes_02">
                        <h3>Localização</h3>
                        <input type="checkbox">
                    </div>
                    <div class="componentes_03" onclick="deletar(event)">
                        <h3>Excluir conta</h3>
                    </div>
                </div>
            `;
            tbody.appendChild(linha);
        } else {
            console.error("Usuário não encontrado.");
        }
    } catch (error) {
        console.error("Erro ao carregar informações:", error);
    }
}

loadInformacoes();

// editar usuarios 

async function editarNome() {
    const novoNome = prompt("Digite o novo nome:");
    const idLogado = localStorage.getItem("usuarioId");

    if (!novoNome) {
        alert("Nome não alterado.");
        return;
    }

    const data = { nome: novoNome };

    try {
        const response = await fetch(`http://localhost:3002/usuario/editar/nome/${idLogado}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const results = await response.json();

        if (results.success) {
            alert("Nome atualizado com sucesso!");

            let info = JSON.parse(localStorage.getItem("informacoes"));
            info.nome = novoNome;
            localStorage.setItem("informacoes", JSON.stringify(info));

            location.reload(); 
        } else {
            alert(results.message);
        }
    } catch (error) {
        console.error("Erro ao atualizar nome:", error);
        alert("Erro ao conectar com o servidor.");
    }
}

async function editarEmail() {
    const novoEmail = prompt("Digite o novo email:");
    const idLogado = localStorage.getItem("usuarioId");

    if (!novoEmail) {
        alert("Email não alterado.");
        return;
    }

    const data = { email: novoEmail };

    try {
        const response = await fetch(`http://localhost:3002/usuario/editar/email/${idLogado}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const results = await response.json();

        if (results.success) {
            alert("Email atualizado com sucesso!");

            let info = JSON.parse(localStorage.getItem("informacoes"));
            info.email = novoEmail;
            localStorage.setItem("informacoes", JSON.stringify(info));

            location.reload();
        } else {
            alert(results.message);
        }
    } catch (error) {
        console.error("Erro ao atualizar email:", error);
        alert("Erro ao conectar com o servidor.");
    }
}

async function editarSenha() {
    const novaSenha = prompt("Digite a nova senha:");
    const idLogado = localStorage.getItem("usuarioId");

    if (!novaSenha) {
        alert("Senha não alterado.");
        return;
    }

    const data = { senha: novaSenha };

    try {
        const response = await fetch(`http://localhost:3002/usuario/editar/senha/${idLogado}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const results = await response.json();

        if (results.success) {
            alert("Senha atualizado com sucesso!");

            let info = JSON.parse(localStorage.getItem("informacoes"));
            info.senha = novaSenha;
            localStorage.setItem("informacoes", JSON.stringify(info));

            location.reload();
        } else {
            alert(results.message);
        }
    } catch (error) {
        console.error("Erro ao atualizar senha:", error);
        alert("Erro ao conectar com o servidor.");
    }
}

// deletar usuarios

async function deletar() {
    if (!confirm("Tem certeza que deseja excluir sua conta?")) return;
    const idLogado = localStorage.getItem("usuarioId");
    try {
        const response = await fetch(`http://localhost:3002/usuarios/deletar/${idLogado}`, {
            method: "DELETE"
        });

        const result = await response.json();

        if (result.success) {
            alert("Conta excluída com sucesso");
            localStorage.removeItem("usuarioId");
            window.location.href = "./index.html";
        } else {
            alert("Erro ao excluir conta");
        }
    } catch (error) {
        console.error("Erro na requisição de exclusão:", error);
    }
}
