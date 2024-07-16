accesskey = "0YZAzJxbclw4psKpyJWptkmMOUMj4hdBoxxONHytsOQ"

const formEl = document.querySelector('form')
const inputEl = document.getElementById('search-input')
const searchResults = document.querySelector('.search-imgs')
const showMore = document.getElementById('show-more')

let inputdata=""
let page=1;


async function searchImg(){

    inputdata = inputEl.value;
    const url =`https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${accesskey}`

    const reasponse = await fetch(url)
    const data = await reasponse.json()
    const results = data.results

    if(page === 1)
        {
            searchResults.innerHTML=""
        }
    
    results.map((result)=>{

        const ImageWrap = document.createElement('div')
        ImageWrap.classList.add('search-img')

        const image = document.createElement('img')
        image.src = result.urls.small
        image.alt = result.alt_description

        const imagelink = document.createElement('a')
        imagelink.href = result.links.html
        imagelink.target = "_blank"
        imagelink.textContent = result.alt_description
 
        ImageWrap.appendChild(image)
        ImageWrap.appendChild(imagelink)
        searchResults.appendChild(ImageWrap)

          
    });

    page++

    if(page>1)
        {
            showMore.style.display='block'
        }
}

formEl.addEventListener("submit",(event)=>{
    event.preventDefault()
    page=1;
    searchImg()
})

showMore.addEventListener("click",()=>{
    searchImg()
})