const API_KEY = `c375da4c79ce4d048504e2b8163088ef`
const url1 = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
const url2 = `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`;
const url3 = `https://suya-times.netlify.app/top-headlines`;
let newsList = [];
const menus = document.querySelectorAll(".menu button");

let url = new URL(url3);

const getNews = async () => {
  try {
    const response = await fetch(url);    
    const data = await response.json();
    if(response.status === 200) {
      if(data.articles.length === 0) {
        throw new Error("No matches for your search");
      }
      newsList = data.articles;
      render();
    } else {
        throw new Error(data.message);
    }
    
  } catch(error) {    
    errorRender(error.message);
  }  
};

menus.forEach((menu) => 
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);

const searches = document.querySelectorAll(".search-button");

searches.forEach((search) =>
  search.addEventListener("click", (e) => getNewsByKeyword(e))
); 

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
  url = new URL(url3);  
  getNews();  
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  // console.log("category", category);
  url = new URL(
    `https://suya-times.netlify.app/top-headlines?category=${category}`
  );
  getNews();
};

const getNewsByKeyword = async (event) => {
  // const searchNews = function (el) {
  //   console.log(el.previousElementSibling);
  //   const keywordEl = el.previousElementSibling;
  //   const keyword = keywordEl;
  // };
  
  // console.log(event.target.previousElementSibling.value);
  const keyword = event.target.previousElementSibling.value;
  url = new URL(
    `https://suya-times.netlify.app/top-headlines?q=${keyword}`
  );
  getNews();
}


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
    // console.log(image.src);
    // 1. src속성이 할당되었기에 image.complete로 이미지 로딩되었는지 체크
    // 2. 이미지의 가로 세로폭이 0보다 큰지 체크 (크면 이미지가 로딩되었다고 판단)
    // 하나라도 만족하면 true, 둘다 만족하지못하면 false값 반환
    // console.log("validateImageUrl", image.complete, "/", (image.width + image.height) > 0);
    return image.complete || (image.width + image.height) > 0;
  }; 

  const newsHTML = newsList.map(
    (news) => {
      // null값 체크  
      let imageUrl = news.urlToImage ? news.urlToImage : '/images/noImg.jpg';
      // url 유효성 체크(true or false값 들어감)
      const validateImage = validateImageUrl(imageUrl);
      if (!validateImage) {
        imageUrl = '/images/noImg.jpg';
      }
      // validatedImage가 true이면 imageUrl
      // false이면 noImage
      return`<div class="row news">
    <div class="col-lg-4">
      <img class="news-img-size" src= ${imageUrl}
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
  
  // console.log("html", newsHTML); 

  document.getElementById("news-board").innerHTML = newsHTML
}

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
    ${errorMessage}</div>`

    document.getElementById("news-board").innerHTML = errorHTML;
}

getLatestNews();

// 1. 버튼에 클릭 이벤트 주기
// 2. 카테고리별 뉴스 가져오기
// 3. 관련 뉴스 보여주기 (render)


// 1. 검색어를 받아온다.
// 2. API호출한다.
// 3. 응답이 돌아온다. 호출하는곳에 출력