const elHeaderlogo = document.querySelector(".header__logo");
const elHeaderList = document.querySelector(".header__list");
const elForm = document.querySelector("#form");
const elFormInput = elForm.querySelector("#form__input");
const elFormBtn = elForm.querySelector("#form__btn");
const elSearchResult = document.querySelector(".search__result-box");
const elList = document.querySelector(".news__list");
const elCarouselList = document.querySelector(".carousel__list");
const elLastNews = document.querySelector(".last__list");
const elLastTitle = document.querySelector(".last__title");
let carouselImage = document.getElementsByClassName("carousel__news-img")
let carouselTitle = document.getElementsByClassName("carousel__news-title");
let carouselTime = document.getElementsByClassName("carousel__news-time");
const elTopArticles = document.querySelector(".top__articles");
const elTemplate = document.querySelector("#template").content;
const elCarouselTemplate = document.querySelector("#carousel__template").content;
const fragment = document.createDocumentFragment()

let apikey = 'f5bc10107739b9a4d2a1377fa0b98107';
let apikey2 = "dd8f05964ceadeecdfcaa5db64b2ee75"
let apikey3 = "4dc6edcc2ee205636458d42198f38e5d"
let apikey4 = "090b779363cb6b9ca2169d844db65f5b"
let apikey5 = "804f268e33da129a273a677ba5129452"
let apikey6 = "756b007bfc24b5ae40293869465c8a5c"


// THE OTHER DAY NEWS

let date = new Date();
let result = `${date.toDateString().slice(4, date.length)} ${date.toLocaleTimeString().slice(0, 4)}`
let findedd =  result.slice(4, 6)
let changedd = (result.replace(findedd, parseInt(findedd)-2))
let finall = new Date(changedd).toISOString()
let finalyy = finall.slice(0, 19) + "Z";




// PREVIOUS NEWS UPDATE

let datee = new Date();
// Thu Nov 03 2022 09:21:39 GMT+0500 (Uzbekistan Standard Time) 1-step

// datee => toDateString() Thu Nov 03 2022 2-step

//datee => toLocaleString() 11/3/2022, 9:22:41 AM 3-step
let resullt = `${datee.toDateString().slice(4, datee.length)} ${datee.toLocaleTimeString().slice(0, 4)}`
// Nov 03 2022 9:22 4-step
let finded =  resullt.slice(4, 6)
let changed = (resullt.replace(finded, parseInt(finded)-1))
// Nov 2 2022 9:23 5-step

let final = new Date(changed).toISOString()
// 2022-11-02T04:23:00.000Z result

let finaly = final.slice(0, 19) + "Z"
// 2022-11-02T04:23:00Z



// NEWS URLS

let heroSidebarNews = `https://gnews.io/api/v4/top-headlines?&token=${apikey}&to=${finaly}&lang=en&max=5`;

let lastNews = `https://gnews.io/api/v4/top-headlines?&token=${apikey}&topic=breaking-news&lang=en`;

let lastPrevNews = `https://gnews.io/api/v4/top-headlines?&token=${apikey}&to=${finalyy}&lang=en&max=5`;




// Intelligibility DateTime

function newsDate(param) {
    
    return `${param.toDateString().slice(4, param.length)} ${param.toLocaleTimeString()}`;
}


// Debounce function
// function debounce(callback, delay) {
//     let timer;
//     return (param) => {
//         clearTimeout(timer);
//         timer = setTimeout(callback, delay);
//     }

// }




// Render function

async function renderNews(url, arr) {
    try {
        const response = await fetch(url)
        if (response.status >= 200 && response.status <300 && navigator.onLine) {
            const data = await response.json()
            let articles = data.articles;
            articles.forEach(news => {
                let cloned = elTemplate.cloneNode(true);
                cloned.querySelector(".news__item");
                cloned.querySelector(".news__link").href = news.url;
                cloned.querySelector(".news__link").setAttribute("target", "_blank");
                cloned.querySelector(".news__title").textContent = news.title;
                cloned.querySelector(".news__img").src = news.image;
                let date = new Date(news.publishedAt).toDateString().slice(4, 15);
                let dateTime = news.publishedAt.slice(11, 16);
                cloned.querySelector(".news__date").textContent = `${date} ${dateTime}`
                fragment.appendChild(cloned)
                
            });
            
            arr.appendChild(fragment)
        }
        
        else if (response.status === 403) {
            document.body.innerHTML = ""
            let txt = "Too many requests"
            document.write(`<h2 id='bad' style="text-align:center"> ${txt}</h2>`)
            
        }
        else if (response.status === 429) {
            document.body.innerHTML = ""
            let txt = "Failed to load. Please try again"
            document.write(`<h2 id='bad' style="text-align:center"> ${txt}</h2>`)
        }
    } catch (error) {
        document.body.innerHTML = ""
        let txt = "The network connection has been lost."
        document.write(`<h2 id='bad' style="text-align:center"> ${txt}</h2>`)
        
    }
}


// Carousel Component

async function showCarousel(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        let articles = data.articles;
        for (let i = 0; i < articles.length; i++) {
            carouselImage[i].src = articles[i].image;
            carouselTitle[i].textContent = articles[i].title
            carouselTime[i].textContent = new Date(articles[i].publishedAt).toLocaleString().slice(10, 15);    
            
            
        }
    } catch (error) {
        console.log(error)
    }
    
}


//Navigation list search function 


// Navigation list search

setTimeout(() => {
    
    elHeaderList.addEventListener("click", (evt) =>{
        evt.preventDefault();
        elLastNews.innerHTML = "";
        elList.classList.add("d-none");
        elCarouselList.classList.add("d-none");
        elSearchResult.classList.add("d-none");
        elLastTitle.innerHTML = evt.target.innerHTML;
        let searchNews = `https://gnews.io/api/v4/search?q=${evt.target.innerHTML}&token=${apikey}&to=${finaly}&lang=en`;
        
        renderNews(searchNews, elLastNews)
    })
    
}, 300);



// Search by input

setTimeout(() => {
    
    elForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        elLastNews.innerHTML = "";
        elList.innerHTML = "";
        elCarouselList.classList.toggle("d-none");
        elSearchResult.classList.toggle("d-none");
        const value = elFormInput.value.trim();
        elLastTitle.innerHTML = "Results";
        elSearchResult.children[1].innerHTML = value
        
        console.log(evt.value)
        let searchNews = `https://gnews.io/api/v4/search?q=${value}&token=${apikey}&to=${finaly}&lang=en`;
        
        renderNews(searchNews, elLastNews)
    });
    
}, 350);

setTimeout(() => {
    
    showCarousel(lastNews)
    renderNews(lastNews, elLastNews)
    renderNews(lastPrevNews, elList, newsDate)
    renderNews(heroSidebarNews, elTopArticles)
    
}, 280);




// console.log(new Date(changed));

// let datee = new Date();

// let resullt = `${datee.toDateString().slice(4, datee.length)} ${datee.toLocaleTimeString().slice(0, 4)}`

// console.log(resullt)
//  let get =  resullt.slice(4, 6)
// let fina = (resullt.replace(get, "0"+parseInt(get)-1))

// console.log(new Date(fina).toISOString())


