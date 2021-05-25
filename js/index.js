// document.addEventListener("DOMContentLoaded")


const form = document.forms[0]

form.addEventListener('submit', userSubmit)

function userSubmit(event){
    let search = event.target[0].value
    let userData = `https://api.github.com/search/users?q=${search}`
    console.log(userData)
    fetchUserData(userData)
    event.preventDefault()
}

function fetchUserData(p1) {
    const confObj = {
        method: "GET",
        headers: {
            Accept: 'application/vnd.github.v3+json'
        }
    }
    fetch(p1, confObj)
        .then(resp => resp.json())
        .then(json => console.log({ //this needs to return an object with different key:value pairs
            avatar: json.items[0].avatar_url, // pic
            repo: json.items[0].repos_url,//repos to use in a link further
            id: json.items[0].id
        }))
}

