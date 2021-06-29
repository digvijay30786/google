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