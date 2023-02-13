class GithubApi {
    apiEndpoint = "https://api.github.com/users/"

    async getUserInfo(name) {
        let info = await fetch(this.apiEndpoint+name)
        if (info.ok) {
            try {
                const data = await info.json()
                return data
            }
            catch (err) {
                console.log("some errr")
                return false
            }
        } else {
            return false
        }
    }   
}
let github
export default github = new GithubApi() 