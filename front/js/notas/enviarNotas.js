document.getElementById("addNota").addEventListener('submit', async (e) => {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const data = {
        titulo
    }
    await fetch('http://localhost:3002/adicionarNota', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({data})
    });

    document.getElementById('addNota').reset(); 
});