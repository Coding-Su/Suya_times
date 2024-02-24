const API_KEY = `c375da4c79ce4d048504e2b8163088ef`
const url1 = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
const url2 = `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`;
const url3 = `https://suya-times.netlify.app/top-headlines`;
let newsList = [];
const menus = document.querySelectorAll(".menu button");

let url = new URL(url3);

let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const getNews = async () => {
  try {
    url.searchParams.set("page",page);  // => &page = page
    url.searchParams.set("pageSize", pageSize);

    const response = await fetch(url);   

    const data = await response.json();
    if(response.status === 200) {
      if(data.articles.length === 0) {
        throw new Error("No matches for your search");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
    
      render();
      paginationRender();
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
  
  const keyword = event.target.previousElementSibling.value;
  url = new URL(
    `https://suya-times.netlify.app/top-headlines?q=${keyword}`
  );
  getNews();
}


// const validateImageUrl = (imageUrl) => {
    
//     const image = new Image();
    
//     image.src = imageUrl;
    
//     return image.complete || (image.width + image.height) > 0;
//   }; 

const render = () => {

  const newsHTML = newsList.map(
    (news) => {
        
      // let imageUrl = 
            
      // const image = new Image();
      
      // image.src = imageUrl;
     
      // if (!(image.complete || (image.width + image.height) > 0)) {        
      // } else {
      //   // imageUrl = '/images/noImg.jpg';
      // }

      return`<div class="row news">
    <div class="col-lg-4">
      <img class="news-img-size" src= ${news.urlToImage} onerror="this.src='images/noImg.jpg';"/>
    </div>    
    <div class="col-lg-8">
      <h2>${news.title}</h2>
      <p>
        ${
          news.description == null || news.description == ""
          ? "(내용없음)"
          : news.description.length > 200
          ? news.description.substring(0, 200) + "..."
          : news.description
        }
      </p>
           
      <div>        
        ${
          news.source.name == null || news.source.name == ""
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

// 페이지네이션
const paginationRender = () => {
  let paginationHTML = ``;
  // total Result,
  // page
  // pageSize
  // groupSize
  // totalPages
  let totalPages = Math.ceil(totalResults / pageSize);
  // pageGroup
  let pageGroup = Math.ceil(page / groupSize);
  // lastPage
  let lastPage = pageGroup * groupSize;
  // 마지막 페이지 그룹이 그룹사이즈 보다 작을 경우 lastPage = totalPages
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }

  // firstPage
  const firstPage = lastPage - (groupSize - 1) <= 0? 1: lastPage - (groupSize - 1);
  // first~last
  
  if(firstPage >= 6) {
    paginationHTML = `
      <li class="page-item" onclick="moveToPage(1)">
        <a class="page-link" href="#">
          <i class="fa-solid fa-angles-left"></i>
        </a>
      </li>
      <li class="page-item" onclick="moveToPage(${page-1})">
        <a class="page-link" href="#">
          <i class="fa-solid fa-chevron-left"></i>
        </a>
      </li>`;
    }    
  
  for(let i = firstPage; i<=lastPage; i++) {
    paginationHTML += `<li class="page-item ${
      i === page ? "active" : ""
    }" onclick="moveToPage(${i})"><a class="page-link" href="#">${i}</a></li>`
  }

  if (lastPage < totalPages) {
    paginationHTML += `
      <li class="page-item" onclick="moveToPage(${page+1})">
        <a class="page-link" href="#">
          <i class="fa-solid fa-chevron-right"></i>
        </a>
      </li>
      <li class="page-item" onclick="moveToPage(${totalPages})">
        <a class="page-link" href="#">
          <i class="fa-solid fa-angles-right"></i>
        </a>
      </li>
    `;
  }
  

  document.querySelector(".pagination").innerHTML = paginationHTML

};

const moveToPage = (pageNum) => {
  // console.log("moveToPage", pageNum);
  page = pageNum;
  getNews();
};

getLatestNews();

// 1. 버튼에 클릭 이벤트 주기
// 2. 카테고리별 뉴스 가져오기
// 3. 관련 뉴스 보여주기 (render)


// 1. 검색어를 받아온다.
// 2. API호출한다.
// 3. 응답이 돌아온다. 호출하는곳에 출력