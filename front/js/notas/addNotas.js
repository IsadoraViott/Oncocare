async function adicionarNota() {
    const titulo = document.getElementById('titulo').value;
    const usuario_id = localStorage.getItem('usuarioId');  

    if (!usuario_id) {
        alert("Usuário não está logado.");
        return;
    }

    const data = { titulo };

    try {
        const response = await fetch(`http://localhost:3002/adicionarNota/${usuario_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const results = await response.json();

        if (results.success) {
            alert(results.message);
            window.location.assign('blocoDeNotas.html');
        } else {
            alert(results.message);
        }
    } catch (error) {
        console.log(error);
        alert("Erro ao adicionar nota.");
    }
}



