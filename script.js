// API http://www.omdbapi.com/?i=tt3896198&apikey=7baafd5b&s

const searchForm = document.querySelector('#searchForm')
const searchInput = document.querySelector('#searchInput')
const movieLi = document.querySelector('.movies-grid')
const showingName = document.querySelector('.resultsInfo')
let movieData
let searchValue = ""
searchForm.addEventListener('submit', (search) => {
    search.preventDefault()
    searchValue = searchInput.value 
    main()
})



async function main() {
    movieLi.innerHTML =  Array(10).fill().map(() => skeletonHTML()).join('')
    const movies = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=7baafd5b&s=${searchValue}`)
    const movie = await movies.json()
    movieData = movie
    movieLi.innerHTML = movie.Search.map(result => movieHTML(result)).join('')

    showingName.innerHTML = `<span>Showing: </span>` + searchValue
    brokenPosters()
    console.log(movieData)
}

function brokenPosters() {
    document.querySelectorAll('.movie-card__img').forEach(img => {
    img.addEventListener('error', () => {
        img.outerHTML = `
            <div class="movie-card__poster-placeholder">
                Movie Poster<br />Not Available
            </div>
        `
    })
 })
}

function MovieSort(event) {
    console.log('Sort function called')
    if(event.target.value === 'a-z') {
    movieData.Search.sort((a, b) => a.Title.localeCompare(b.Title))
   }
   else if(event.target.value === 'z-a') {
    movieData.Search.sort((a, b) => b.Title.localeCompare(a.Title))
   }
   else if(event.target.value === 'newest') {
     movieData.Search.sort((a, b) => Number(b.Year) - Number(a.Year))
   }
    else if(event.target.value === 'oldest') {
    movieData.Search.sort((a, b) => Number(a.Year) - Number(b.Year))
   }
   movieLi.innerHTML = movieData.Search.map(result => movieHTML(result)).join('')
   brokenPosters()
   console.log(event.target.value)
}

function movieHTML(result) {
    let poster = ''
    
    if(result.Poster === "N/A") {
        poster = `
      <div class="movie-card__poster-placeholder">
                Movie Poster<br />Not Available
            </div>
        `
    }
    else {
        poster = `
        <img
        class="movie-card__img"
        src=${result.Poster}
        alt=""
        />
        `
    }

    return ` 
  <div class="movie-card">
        <img
        class="movie-card__img"
        src=${result.Poster}
        alt=""
        />
        <h2 class="movie-card__title">${result.Title}</h2>
        <p class="movie-card__year">${result.Year}</p>
    </div>
    `

}

function skeletonHTML() {
    return `
    <div class="movie-card movie-card--skeleton">
            <div class="movie-card__img--skeleton"></div>
            <div class="movie-card__title--skeleton"></div>
            <div class="movie-card__year--skeleton"></div>
        </div>
    `
}
