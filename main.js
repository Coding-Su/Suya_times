const API_KEY = `c375da4c79ce4d048504e2b8163088ef`
let newsList = [];
const getLatestNews = async () => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );

  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles
  render();
  console.log("dddd", newsList);
};

const render = () => {
  const newsHTML = newsList.map(
    (news)=>`<div class="row news">
    <div class="col-lg-4">
      <img class="news-img-size" src=${urlToImage}/>
    </div>
    <div class="col-lg-8">
      <h2>${news.title}</h2>
      <p>
        ${news.description}
      </p>
      <div>
        ${news.source.name} * ${news.publishedAt}
      </div>
    </div>
  </div>`
  ).join('');
  
  console.log("html", newsHTML); 

  document.getElementById("news-board").innerHTML = newsHTML
}

getLatestNews();
