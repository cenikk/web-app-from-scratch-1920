const baseURL = 'https://api.themoviedb.org/3/', // Main URL to get data from
data = null,
language = 'nl-NL',
region = 'nl', // Region I'm currently in to get movie data from
apiKey = '9265939849a41a0bd3384b73b7d1c9e8';

let searchField = document.querySelector('#movieSearch');
let movieImg = document.querySelector('#movieImg');

let movieList = document.querySelector('.movie-list');
let inTheater = movieList.querySelectorAll('div');

document.addEventListener('DOMContentLoaded', function(){
  let nowPlayingURL = "".concat(baseURL, 'movie/now_playing?api_key=', apiKey)
  let main = document.querySelector('main');
  
    
  fetch(nowPlayingURL)
  .then(result=>result.json())
  .then((data)=>{
    console.log(data.results);
    for (let i = 0; i < data.results.length; i++) {

      let div = document.createElement('div');
      let h2 = document.createElement('h2');
      let img = document.createElement('img');
      let ribbon = document.createElement('span');

      movieList.appendChild(div);
      div.appendChild(h2);
      div.appendChild(img);
      div.appendChild(ribbon);

      h2.innerHTML = data.results[i].title;
      img.src = 'https://image.tmdb.org/t/p/w185/' + data.results[i].poster_path;
      img.alt = data.results[i].title;
    }
    // main.style.backgroundImage = "url('https://image.tmdb.org/t/p/w185/" + data.results[0].poster_path + "')";
  })
})

function getData() {

  let url = ''.concat(baseURL, 'configuration?api_key=', apiKey); 
  console.log(this.value)
  if (this.value.length < 3) {
    return;
  } else {
    fetch(url)
    .then((result)=>{
      return result.json();
    })

    .then((data)=>{
      runSearch(searchField.value);
    })
  
    .catch(function(error){
      console.log(error);
    });
  }


}

function runSearch(keyword) {

  let url = ''.concat(baseURL, 'search/movie?api_key=', apiKey, '&query=', keyword);
  
  fetch(url)
  .then(result=>result.json())
  .then((data)=>{
      document.querySelector('#output').innerHTML = JSON.stringify(data, null, 4);
      movieImg.src = 'https://image.tmdb.org/t/p/w185/' + data.results[0].poster_path
  })

}


searchField.addEventListener('keyup', getData);
