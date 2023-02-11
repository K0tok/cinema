const filmid = window.location.href.split('=')[1]
const url = 'http://192.168.1.118:5000'

async function getFilm(filmid) {
    const urltop = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${filmid}`
    const responsetop = await fetch(urltop, {  
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'c6c6f647-2fb4-4f99-9540-e4a017063359'
        },
    })
    // const urlfilms = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/{id}   '
    const film = await responsetop.json()
    showfilm(film)
}

function showfilm(film) {
    let filmpic = document.querySelector('.filmpic')
    filmpic.innerHTML += `
    <img style="width:100%; border:1px solid white; border-radius: 5px;" src="${film.posterUrlPreview}">
    <div style="font-size:20px; color: white;"><b>Рейтинг: <span style="font-size:30px">${film.ratingKinopoisk}</span></b></div>
    `
    let information = document.querySelector('.information')
    information.innerHTML += `
    <div style="text-align: center; font-size: 45px;"><b>${film.nameRu}</b></div>
    <div style="margin: 10px auto; margin-bottom: 50px;">${film.nameOriginal} ${film.ratingAgeLimits.slice(3)}+</div>
    <div style="margin: 0px 60px; font-size: 30px;"><b>О фильме</b></div>
    <div style="margin: 0 20px;">
        <p><b>Страна:</b> ${film.countries[0].country}</p>
        <p><b>Год производства:</b> ${film.year}</p>
        <p><b>Жанр:</b> ${film.genres[0].genre}</p>
        <p><b>Слоган:</b> "${film.shortDescription}"</p>
        <p><b>Описание:</b> ${film.description}</p>
    </div>
    `
}
getFilm(filmid)



async function createUser() {
    try {
        const response = await axios.post(`${url}/user/add`, {
            fio: 'Бебров Константин',
            tableId: 5,
        })

    }
    catch(error) {
        console.error('Произошла ошибка', error)
    }
}
// createUser()


async function createComment() {
    try {
        const response = await axios.post(`${url}/comments/add`, {
            filmId: `${filmid}`,
            commentText: `${document.querySelector('.message').value}`,
            filmRating: `${document.querySelector('.ocenka').value}`,
            userId: 3,
        })

    }
    catch(error) {
        console.error('Произошла ошибка', error)
    }
    document.querySelector('.message').value = ''
    getComments()
}

const sendbtn = document.querySelector('.sendbtn');
sendbtn.addEventListener("click", createComment);

async function getComments() {
    try {
        const response = await axios.get(`${url}/comments/show/${filmid}`)
        const table = document.querySelector('#table')
        table.innerHTML = ''
        console.log(response)
        for (const comment of response.data.message) {
            // отрисовка комментов на странице innerHTML
            console.log(comment)
            table.innerHTML += `
            <tr>
                <td class="username">${comment.fio}</td>
                <td class="usercomment">${comment.commentText}</td>
                <td class="userrating">${comment.filmRating}</td>
            </tr>
            `
        }
    }
    catch(error) {
        console.error('Произошла ошибка', error)
    }
}
getComments()