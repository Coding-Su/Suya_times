const API_KEY = `c375da4c79ce4d048504e2b8163088ef`
const url1 = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
const url2 = `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`;
let newsList = [];

const getLatestNews = async () => {
  const url = new URL(url2);
  console.log("uuu:, url")

  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  // render();
  console.log("aaa", response);
  console.log("bbb", data);  
};

// const render = () => {
//   const newsHTML = newsList.map(
//     (news)=>`<div class="row news">
//     <div class="col-lg-4">
//       <img class="news-img-size" src=${urlToImage}/>
//     </div>
//     <div class="col-lg-8">
//       <h2>${news.title}</h2>
//       <p>
//         ${news.description}
//       </p>
//       <div>
//         ${news.source.name} * ${news.publishedAt}
//       </div>
//     </div>
//   </div>`
//   ).join('');
  
//   console.log("html", newsHTML); 

//   document.getElementById("news-board").innerHTML = newsHTML
// }

getLatestNews();
