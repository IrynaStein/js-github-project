// document.addEventListener("DOMContentLoaded")

let user = {}
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
        .then(data => renderUserInfo(objFunction(data)))
}

const userList = document.querySelector('#user-list')
const reposList = document.querySelector('#repos-list')

function renderUserInfo(anydata){
    userList.innerHTML = ""
    reposList.innerHTML = ""
const userLi = document.createElement('li')
userLi.innerHTML = `${search.value}`
userList.appendChild(userLi)
const avatarImg = document.createElement('img')
avatarImg.src = user.avatar
avatarImg.setAttribute('width', "20%")
userList.appendChild(avatarImg)
const repos = document.createElement('h4')
repos.id = "repos"
repos.innerText = `View ${search.value}'s repos`
userList.appendChild(repos)
repos.addEventListener('click', fetchRepos)
}

function objFunction(anydata){
    const {avatar_url, repos_url, url} = anydata.items[0]
    user.avatar = avatar_url
    user.repos = repos_url
    user.url = url
}

function fetchRepos(){
    fetch (user.repos)
    .then (resp => resp.json())
    .then (data2 => renderFetchedRepos(data2))//array of objects
}

function renderFetchedRepos(data2){
data2.map(function(repoObject){
const a = document.createElement('a')
a.innerText = repoObject.name.toUpperCase()
a.href = repoObject.html_url
reposList.appendChild(a)
const linebreak = document.createElement('br')
reposList.appendChild(linebreak)
})
}