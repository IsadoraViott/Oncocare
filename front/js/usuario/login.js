const form = document.getElementById('login');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const senha = document.getElementById('senha').value;
    const email = document.getElementById('email').value;

    const data = { nome, email, senha };
    console.log(data);

    try {
        const response = await fetch('http://localhost:3002/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        let results = await response.json();

        if (results.success) {
        alert('Login bem-sucedido');
        localStorage.setItem('usuarioId', results.data.id);
        window.location.assign('perfil.html'); 
        localStorage.setItem('informacoes', JSON.stringify(results.data)); 
        window.location.assign('principal.html');  
        } else {
            alert(results.message);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao se conectar ao servidor.");
    }
   
});


// função de logout 

function sairdaconta(event) {
    console.log(informacoes)
    localStorage.removeItem('informacoes');
    window.location.href = "index.html";
};

function redirecionar() {
    window.location.href = "./cadastro.html"
}

