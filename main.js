let page = 1

async function getFilms(page) {
    const urltop = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?page=${page}`
    const responsetop = await fetch(urltop, {  
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'c6c6f647-2fb4-4f99-9540-e4a017063359'
        },
    })
    // const urlfilms = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/{id}   '
    const films = await responsetop.json()
    
    showfilms(films)
}


function showfilms(films){
    const filmsdiv = document.querySelector('.films')
    for (const film of films.films) {
        filmsdiv.innerHTML += `
        <a class="film" href="film.html?id=${film.filmId}">
            <img class="filmimg filmchild" src="${film.posterUrlPreview}">
            <div class="title filmchild">${film.nameRu}</div>
            <div class="title">Рейтинг: ${film.rating}/10</div>
        </a>
        ` 
    }
    page += 1
}
getFilms(page)

async function filmbyName(filmname) {
    const urlname = `https://kinopoiskapiunofficial.tech/api/v2.2/films?keyword=${filmname}`

    const responsename = await fetch(urlname, {  
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'c6c6f647-2fb4-4f99-9540-e4a017063359'
        },
    })
    const films = await responsename.json()
    console.log(films)
    const findlist = document.querySelector('.findlist')
    let a = 0
    for (const film of films.items) {
        if (a < 10) {
            findlist.innerHTML += `
            <a class="findedfilm" href="film.html?id=${film.kinopoiskId}">
                <img class="filmimg filmchild" src="${film.posterUrlPreview}">
                <div class="title2 filmchild">${film.nameRu}</div>
                <div class="title2">Рейтинг: ${film.ratingKinopoisk}</div>
            </a>
            `
            a += 1
        } else {
            break
        }

    }
}

function findplease() {
    const findname = document.querySelector('.find').value
    // Добавить условие к поиску, чтобы они не наслаивались и удалялись
    if (findname === '') {
        document.querySelector('#finder').innerHTML = ''
    } else {
        document.querySelector('#finder').innerHTML = ''
        document.querySelector('#finder').innerHTML += `
        <div class="findedfilms">
            <div style="font-style: italic; color: grey; margin: 5px 30px; ">Фильмы по запросу: "${findname}"</div>
            <div class="findlist"></div>
        </div>
        `
        filmbyName(findname)
    }

}

