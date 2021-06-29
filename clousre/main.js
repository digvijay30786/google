async function getMovie()
{
    var query = document.getElementById('input').value;
    if(query.length <=2)
    {
        return false;
    }
    let movie = await fetch(`http://www.omdbapi.com/?apikey=98f40ed9&s=${query}`);
    let final = await movie.json();
    return final;
}

var m = document.getElementById('movie');

function appendMovie(movie)
{
    m.innerHTML = null;
    movie.forEach(function(el) {

        var p = document.createElement('p');
        p.innerHTML = el.Title;
        m.append(p);
    });
   
}

async function main()
{
    let { Search } = await getMovie();
    appendMovie(Search);

}

var timer_id=10;

function thep(fun,delay)
{
    if (timer_id)
    {
        return false;
    }
    setTimeout(() => {
        fun;
        timer_id = undefined;
    },delay)
}

