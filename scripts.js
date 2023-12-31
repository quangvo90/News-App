const apiKey = process.env.NEWS_API_KEY;
//const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
let currentPage = 1;
const pageSize = 6;

const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const categorySelect = document.querySelector('#category-select');

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value;
    const selectedCategory = categorySelect.value;
    
    let params = `page=${currentPage}&pageSize=${pageSize}`;
    
    if (searchTerm) {
      params += `&q=${searchTerm}`;
    }
    
    if (selectedCategory) {
      params += `&category=${selectedCategory}`;
    }
    
    fetchNewsWithParams(params);
});

async function fetchNews(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      displayNews(data.articles);
    } catch (error) {
      console.error('There was an error!', error);
    }
  }

async function fetchNewsWithParams(params) {
    const paramsUrl = `https://newsapi.org/v2/top-headlines?country=us&${params}&apiKey=${apiKey}`;
    await fetchNews(paramsUrl);
}

function displayNews(articles) {
    const newsDiv = document.querySelector('#news');
    newsDiv.innerHTML = '';
  
    for (const article of articles) {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('col-md-6', 'mb-4');
        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.classList.add('card-img-top');
        img.src = article.urlToImage;
        
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        
        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = article.title;

        const description = document.createElement('p');
        description.classList.add('card-text');
        description.textContent = article.description;

        const link = document.createElement('a');
        link.href = article.url;
        link.textContent = 'Read more';
        link.classList.add('btn', 'btn-primary');

        cardBody.appendChild(title);
        cardBody.appendChild(description);
        cardBody.appendChild(link);

        card.appendChild(img);
        card.appendChild(cardBody);

        articleDiv.appendChild(card);
        
        newsDiv.appendChild(articleDiv);
    }
}

const prevButton = document.querySelector('#prev-button');
const nextButton = document.querySelector('#next-button');

prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchNewsWithParams(`page=${currentPage}&pageSize=${pageSize}`);
    }
});

nextButton.addEventListener('click', () => {
    currentPage++;
    fetchNewsWithParams(`page=${currentPage}&pageSize=${pageSize}`);
});
 
//fetchNews();
fetchNewsWithParams(`page=${currentPage}&pageSize=${pageSize}`);