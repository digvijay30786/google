async function starWars()
{
    var query = document.getElementById('input').value;
    let movie = await fetch(`https://swapi.dev/api/people/?search=${query}`);
    let final = await movie.json();
    return final;
}

var m="";
function appendMovie(movie)
{
    m.innerHTML = null;
    movie.forEach(function({name}) {

        var p = document.createElement('p');
        p.innerHTML = name;
        m.append(p);
    });
   
}

async function main()
{
    let { results } = await starWars();
    console.log(m);
    if (results.length > 0 && m == "") {
       
        m = document.createElement('div');
        m.setAttribute('id', 'search');
        document.body.append(m)
    }
    else if (results.length == 0)
    {
        
        document.getElementById('search').remove();
        m = "";
    }

    appendMovie(results);

}

var timer_id;

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

