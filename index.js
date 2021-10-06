$('.button-search').on('click', function(){

    $.ajax({
        url : 'http://www.omdbapi.com/?apikey=5382e7de&s=' + $('.input-kyword').val(),

        success : result => {
            const movies = result.Search;
            let cards = '';
            movies.forEach(m => {
                cards += cardMovie(m);
            });
    
            $('.movie-container').html(cards);
    
            // ketika tombol detail di click
            $('.modal-detail-button').on('click', function(){
                $.ajax({
                    url : 'http://www.omdbapi.com/?apikey=5382e7de&i=' + $(this).data('imdbid'),
                    success : m => {
                        const movieDetail = modalMovie(m);
                        $('.modal-body').html(movieDetail);
                    },
                    error : e => {
                        console.log(e.responseText);
                    }
                });
            });
        },

        error : e => {
            console.log(e.responseText);
        }
    });

});


function cardMovie(m){
    return `<div class="col-md-3 mt-5">
                <div class="card">
                <img src="${m.Poster}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                    <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
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
                    </ul> 
                </div>
                </div>
            </div>`;
};