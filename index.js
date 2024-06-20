const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMore = document.getElementById("show-more");
const api_key = config.API_KEY;    // Define your own image api key in config.js file.

let keyword = "";
let page = 1;
async function seachImage(){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&per_page=12&client_id=${api_key}`;
    const response = await fetch(url);
    const data = await response.json();

    if(page===1){
        searchResult.innerHTML = "";
    }

    const results = data.results;
    results.map((results)=>{
        const image = document.createElement("img");
        image.src = results.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = results.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    })
    showMore.style.display = "block";
}

searchForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    page = 1;
    seachImage();
})
showMore.addEventListener("click",()=>{
    page++;
    seachImage();
})
