// ketika tombol search button di click
const searchButton = document.querySelector('.button-search');
searchButton.addEventListener('click', async function(){
    try{
        const inputKyword = document.querySelector('.input-kyword');
        const updateMovie = await updateMovies(inputKyword.value);
        updateUi(updateMovie);
    }catch(error){
        const containerError = document.querySelector('.container-error');
        containerError.innerHTML = error;
    }
});

function updateDatail(kyword){
    return fetch('http://www.omdbapi.com/?apikey=5382e7de&i=' + kyword)
        .then(response => {
            if ( !response.ok ){
                throw new Error(response.statusText);
            }
            return response.json();
            // console.log(response)
        })
        .then(m => {
            const movieDetail = modalMovie(m);
            const modalBody = document.querySelector('.modal-body');
            modalBody.innerHTML = movieDetail;
        });
}


function updateMovies(movieJudul){
    return fetch('http://www.omdbapi.com/?apikey=5382e7de&s=' + movieJudul)
    .then(response => {
        if (!response.ok){
            throw new Error(response.statusText);
        }
        return response.json();
    })
    .then(response => {
        if (response.Response === 'False'){
            throw new Error(response.Error);
        }
        return response.Search;
    });
}

// ketika tombol search di click dengan kyboard enter
const inputKyword = document.querySelector('.input-kyword');
inputKyword.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        searchButton.click();
    }
});

// event binding
const modalDetailButton = document.querySelectorAll('.modal-detail-button');
document.addEventListener('click', function(e){
    if (e.target.classList.contains('modal-detail-button')){
        const dataImdb = e.target.dataset.imdbid;
        updateDatail(dataImdb);
    }
});




function updateUi(movie){
    let movies = '';
    movie.forEach(m => {
        movies += cardMovie(m);
    });
    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = movies;
}


// function erorNotification(error){
//     return `<h5 class="mt-3 text-secondary">${error.responseText}</h5>`
// };


function cardMovie(m){
    return `<div class="col-md-3 mt-5">
                <div class="card">
                <img src="${m.Poster}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                    <a href="#" class="btn btn-danger modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
                </div>
                </div>
            </div>`;
};

function modalMovie(m){
    return `<div class="container-fluid">
                <div class="row">
                <div class="col-md-4">
                    <img src="${m.Poster}" class=" img-fluid h-100" alt="">
                </div>

                <div class="col-md">
                    <ul class="list-group">
                    <li class="list-group-item"><h4>${m.Title}</h4></li>
                    <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
                    <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
                    <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
                    <li class="list-group-item"><strong>Genre : </strong>${m.Genre}</li>
                    <li class="list-group-item"><strong>Plot : </strong>${m.Plot}</li>
                    <li class="list-group-item"><strong>Runtime : </strong>${m.Runtime}</li>
                    </ul> 
                </div>
                </div>
            </div>`;
};