import github from './github-api/api.js';




const container = document.querySelector(".container")

let resultContainerTemplate = (data) => {
    let template = `
    <div class="result-content">
        <div class="profile">
            <img src=${data.profileIMG} class="profile-img" alt="">
        </div>
        <div class="profile-details column-flex">
            <div class="top-details flex-row">
                <a href="#" class="text-secondary username">${data.username}</a>
                <div class="date">
                    <p>${data.date}</p>
                </div>
            </div>
            <div class="bottom-details column-flex">
                <p class="bio text-accent">${data.bio}</p>
                <div class="stats bg-dark">
                    <div class="stats-items">
                        <div class="repos align-column">
                            <p>Repos</p>
                            <div class="bold">${data.repos}</div>
                        </div>
                        <div class="folllowers align-column">
                            <p>Followers</p>
                            <div class="bold">${data.followers}</div>
                        </div>
                        <div class="following align-column">
                            <p>Following</p>
                            <div class="bold">${data.following}</div>
                        </div>
                    </div>
                </div>
                <div class="misc-details column-flex">
                    <div class="row flex-row">
                        <div class="location">
                            <div class="location-icon flex-row gap-1">
                                <img src=${data.locationIcon} alt="">
                                <div class="h4 text-accent">${data.location}</div>
                            </div>
                        </div>
                        <div class="twitter">
                            <div class="twitter-icon flex-row gap-1">
                                <img src=${data.twitterIcon} alt="">
                                <div class="h4 text-accent">${data.twitter}</div>
                            </div>
                        </div>
                    </div>
                    <div class="row flex-row">
                        <div class="website ">
                            <div class="website-icon flex-row gap-1">
                                <img src=${data.websiteIcon} alt="">
                                <div class="h4 text-accent">${data.website}</div>
                            </div>
                        </div>
                        <div class="company">
                            <div class="company-icon flex-row gap-1">
                                <img src=${data.companyIcon} alt="">
                                <div class="h4 text-accent">${data.company}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`

    return template
}

const sampleData = {
    username: "MADITIS",
    profileIMG: "./images/image-user-placeholder.png",
    date: "Joined 04 Sep 2018",
    bio: "This profile has no bio",
    repos: 10,
    followers: 10,
    following: 10,
    websiteIcon: "./images/icon-website.svg",
    website: "Not Available",
    twitterIcon: "./images/icon-twitter.svg",
    twitter: "Not Available",
    locationIcon: "./images/icon-location.svg",
    location: "Not Available",
    companyIcon: "./images/icon-company.svg",
    company: "Not Available",

}
form.addEventListener("submit", (e)=> e.preventDefault() )

function addData(data) {
    let div = document.createElement("div")
    div.classList.add("result-container", "bg-primary")
    let temp = resultContainerTemplate(data)
    // container.innerHTML += resultContainerTemplate(sampleData)
    div.innerHTML = temp
    container.append(div)
}

addData(sampleData)
const input = document.querySelector("input#search")
let btn = document.querySelector("button.search-btn")
const label = document.querySelector("label")

// console.log(btn)

btn.addEventListener("click", handleSearch)
function handleSearch(event) {
    console.log("searching")
    let target = event.target
    if (target.closest(".search-btn")) {
        if (input.value != "" ) {
            let name = input.value
            setUpdata(name)
        }
    }
}

let timeOutID = null 

input.addEventListener("input", (event)=>{
    
    const name = event.target.value
    if (name != "") {
        label.classList.add("move")
        label.innerHTML = "Searching.."
    } else {
        label.classList.remove("move")
        label.innerHTML = "Search"
    }
    if (timeOutID) {
        clearTimeout(timeOutID)
    }

    timeOutID = setTimeout(() => {
        setUpdata(name)
    }, 500);
})

async function setUpdata(name) {
    let result = await github.getUserInfo(name)
            if (result != false) {
                const data = {
                    username: result.login,
                    profileIMG: result.avatar_url,
                    date: result.created_at,
                    bio: result.bio,
                    repos: result.public_repos,
                    followers: result.followers,
                    following: result.following,
                    websiteIcon: "./images/icon-website.svg",
                    website: "Not Available",
                    twitterIcon: "./images/icon-twitter.svg",
                    twitter: "Not Available",
                    locationIcon: "./images/icon-location.svg",
                    location: "Not Available",
                    companyIcon: "./images/icon-company.svg",
                    company: "Not Available",
                
                }
                let removeThis = container.querySelector(".result-container")
                removeThis.remove()
                addData(data)

            }
}