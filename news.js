const API_KEY = '95167c5b1ea345f0b2e54f75064f9e18';
async function loadNews(category = 'general') {
  const url = `https://newsapi.org/v2/everything?q=${category}&sortBy=publishedAt&language=en&apiKey=${API_KEY}`;
  fetchAndDisplayNews(url);
}
async function searchNews(query) {
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&pageSize=12&sortBy=publishedAt&language=en&apiKey=${API_KEY}`;
  fetchAndDisplayNews(url);
}
async function fetchAndDisplayNews(url) {
try {
   const response = await fetch(url);
   const data = await response.json();
   const container = document.getElementById('news-container');
   container.innerHTML = '';
if (!data.articles || data.articles.length === 0) {
container.innerHTML = '<p>No news found.</p>';
return;
}
data.articles.forEach(article => {
      const { title, description, url, urlToImage, source, publishedAt } = article;
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        ${urlToImage ? `<img src="${urlToImage}" alt="News image">` : ''}
        <h2>${title}</h2>
        <p class="meta"><strong>${source.name}</strong> • ${new Date(publishedAt).toLocaleString()}</p>
        <p>${description || 'No description available.'}</p>
        <a href="${url}" target="_blank">Read full story</a>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    document.getElementById('news-container').innerHTML = '<p>Failed to load news.</p>';
  }
}
document.getElementById('search-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const query = document.getElementById('search-input').value.trim();
  if (query) {
    searchNews(query);
  }
});
loadNews();         
