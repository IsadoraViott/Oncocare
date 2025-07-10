const apiKey = '596c6294794541a1bb21ac37eb899f40'; 

const url = `https://newsapi.org/v2/everything?q=câncer%20de%20mama&language=pt&sortBy=publishedAt&pageSize=6&apiKey=${apiKey}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('noticias');
    container.innerHTML = '';

    if (data.articles && data.articles.length > 0) {
      data.articles.forEach(article => {
        const div = document.createElement('div');
        div.classList.add('noticia');
        div.innerHTML = `
                <h3 id="titulo_noticia"><a href="${article.url}" target="_blank">${article.title}</a></h3>
                <h4>${article.description || ''}</h4>
                <h4>Publicado em: ${new Date(article.publishedAt).toLocaleString()}</h4>
        `;
        container.appendChild(div);
      });
    } else {
      container.innerText = 'Nenhuma notícia encontrada.';
    }
  })
  .catch(err => {
    console.error('Erro ao buscar notícias:', err);
    document.getElementById('noticias').innerText = 'Erro ao carregar notícias.';
  });
