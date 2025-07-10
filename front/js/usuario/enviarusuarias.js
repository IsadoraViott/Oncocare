document.getElementById("contaForm").addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const idade = document.getElementById('idade').value;
    const cpf = document.getElementById('cpf').value;
    const senha = document.getElementById('senha').value;

    await fetch('http://localhost:3002/usuarias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({nome, email, idade, cpf, senha })
    });

    document.getElementById('contaForm').reset(); 
    loadInformacoes(); 
    
});