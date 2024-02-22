const API_KEY = `c375da4c79ce4d048504e2b8163088ef`
const url1 = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
const url2 = `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`;
const url3 = `https://suya-times.netlify.app/top-headlines`;
let newsList = [];

const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};

const getLatestNews = async () => {
  const url = new URL(url3);
  // console.log("uuu:, url")

  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  // console.log("aaa", response);
  // console.log("bbb", data);  
  console.log("ccc", newsList);
};

const validateImageUrl = (imageUrl) => {
    // image객체 생성. 자바스크립트가 가지고 있는 인스턴스
    const image = new Image();
    // src속성 할당 (render함수에서 가져온 url)
    image.src = imageUrl;
    // 1. src속성이 할당되었기에 image.complete로 이미지 로딩되었는지 체크
    // 2. 이미지의 가로 세로폭이 0보다 큰지 체크 (크면 이미지가 로딩되었다고 판단)
    // 하나라도 만족하면 true, 둘다 만족하지못하면 false값 반환
    return image.complete || (image.width + image.height) > 0;
  }; 

const render = () => {
  const validateImageUrl = (imageUrl) => {
    // image객체 생성. 자바스크립트가 가지고 있는 인스턴스
    const image = new Image();
    // src속성 할당 (render함수에서 가져온 url)
    image.src = imageUrl;
    // 1. src속성이 할당되었기에 image.complete로 이미지 로딩되었는지 체크
    // 2. 이미지의 가로 세로폭이 0보다 큰지 체크 (크면 이미지가 로딩되었다고 판단)
    // 하나라도 만족하면 true, 둘다 만족하지못하면 false값 반환
    return image.complete || (image.width + image.height) > 0;
  }; 

  const newsHTML = newsList.map(
    (news) => {
      // null값 체크  
      const imageUrl = news.urlToImage ? news.urlToImage :
      '/images/noImg.jpg';
      // url 유효성 체크(true or false값 들어감)
      const validateImage = validateImageUrl(imageUrl);
      
      // validatedImage가 true이면 imageUrl
      // false이면 noImage
      return`<div class="row news">
    <div class="col-lg-4">
      <img class="news-img-size" src= ${news.urlToImage}
      />
    </div>    
    <div class="col-lg-8">
      <h2>${news.title}</h2>
      <p>
        ${
          news.description == null || news.description == ""
            ? "내용없음"
            : news.description.length > 200
            ? news.description.substring(0, 200) + "..."
            : news.description
        }
     </p>
           
      <div>        
        ${news.source.name == null || news.source.name == ""
          ? "no source"
          : news.source.name 
        } * ${news.publishedAt}
      </div>      
    </div>
  </div>`
    }).join('');
      
  
  console.log("html", newsHTML); 

  document.getElementById("news-board").innerHTML = newsHTML
}

getLatestNews();
