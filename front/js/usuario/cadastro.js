// async function cadastrar(event) {
//     event.preventDefault()

//     const nome = document.getElementById('nome').value;
//     const email = document.getElementById('email').value;
//     const idade = document.getElementById('idade').value;
//     const cpf = document.getElementById('cpf').value;
//     const senha = document.getElementById('senha').value;


//     const data = {
//         nome,
//         email,
//         idade,
//         cpf,
//         senha
//     }


//     try {
//         const response = await fetch('http://localhost:3002/usuarias', {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(data)
//         })


//         const results = await response.json();


//         if (results.success) {
//             console.log(results)
//             alert(results.message)
//             window.location.assign('principal.html')
//         } else {
//             alert(results.message)
//         }
//     }
//     catch (error) {
//         console.log(error);
//     }
// };

// deletar usuario 



// logout 

async function cadastrar(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const idade = document.getElementById('idade').value;
    const cpf = document.getElementById('cpf').value;
    const senha = document.getElementById('senha').value;

    const data = { nome, email, idade, cpf, senha };

    try {
        const response = await fetch('http://localhost:3002/usuarias', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const results = await response.json();

        if (results.success) {
            localStorage.setItem("usuarioId", results.data.id);
            localStorage.setItem("informacoes", JSON.stringify(results.data));

            alert(results.message);
            window.location.assign('principal.html');
        } else {
            alert(results.message);
        }
    }
    catch (error) {
        console.log(error);
        alert("Erro ao se conectar ao servidor.");
    }
};

function sairdaconta(event) {
    console.log(informacoes)
    localStorage.removeItem('');
    window.location.href = "index.html";
};