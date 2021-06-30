function register(e)
{
    e.preventDefault();
    let formData= {
        "name": document.getElementById('name').value,
        "email":  document.getElementById('email').value,
        "password":  document.getElementById('pass').value,
        "username":  document.getElementById('username').value,
        "mobile":  document.getElementById('mobile').value,
        "description":  document.getElementById('description').value 
        
    }

    formData = JSON.stringify(formData);

    fetch('https://masai-api-mocker.herokuapp.com/auth/register' , {
        
        method: 'POST',
        body: formData,
        headers:
        {
            'Content-Type': 'application/json',
        },

    }).then((response) => {
        return response.json();
    }).then((response) => {
        console.log(response);
    }).catch((err) => {
        console.log(err);
    })
}



function login(e)
{
    e.preventDefault();
    let formData= {
        "password":  document.getElementById('pass').value,
        "username":  document.getElementById('username').value
    }

    formData = JSON.stringify(formData);

    fetch('https://masai-api-mocker.herokuapp.com/auth/login' , {
        
        method: 'POST',
        body: formData,
        headers:
        {
            'Content-Type': 'application/json',
        },

    }).then((response) => {
        return response.json();
    }).then((response) => {
        console.log(response);
        fetchToken(response,JSON.parse(formData));
    }).catch((err) => {
        console.log(err);
    });
}

function fetchToken({token},{username})
{
    
    fetch(`https://masai-api-mocker.herokuapp.com/user/${username}` , {   
        headers:
        {
            'Authorization': `Bearer ${token}`,
        },

    }).then((response) => {
        return response.json();
    }).then((response) =>
    {
        let { token } = response;
        localStorage.setItem('token', JSON.stringify(token));
        console.log(response);
    }).catch((err) => {
        console.log(err);
    });
}



function myFunction()
{
    var s = JSON.parse(localStorage.getItem('token')); 
    if(s==null)
    {
        window.location.href = "google_login.html";
    } 
}




var Data;
var li;
var nameCh;
async function newsData(dat) {
    
    Data = await fetch(`http://api.mediastack.com/v1/news?access_key=f04f68d9504e7fa4fae60eae7c5cffee&countries=in&keywords=${dat}`);  
    let news = await Data.json();
    console.log(news.data);
    renderData(news.data); 
}

function renderData(find)
{
    var cont = document.getElementById('cont');

    cont.innerHTML = "";

    find.forEach(function (el) {
        
        var div = document.createElement('div');
        var div_cont = document.createElement('div');
        var h2 = document.createElement('h2');
        h2.innerHTML = `<a target=_blank href=${el.url}>${el.title}</a>`;
        var p = document.createElement('p');
        p.innerText = el.description;
        div_cont.append(h2, p);
        div.append( div_cont);
        cont.append(div);
        
    });
}


 

function mySearch()
{
    let va = document.getElementById('search').value;
    newsData(va);
}





