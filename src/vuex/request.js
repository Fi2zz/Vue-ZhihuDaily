const port = 8000;
const apiFatory = (name, query) => {
    let url = `${window.location.protocol}//${window.location.hostname}:${port}`;
    const map = {
        list: "/",
        before: "/before/",
        story: "/story/",
        storyInfo: "/story-extra/",
        comments: "/comment"
    };
    if (query) {
        return `${url}${map[name]}${query}`
    }
    return `${url}${map[name]}`

};


export function get(api, query) {
    let fetched = fetch(apiFatory(api, query), {
            method: "GET",
        }
    );
    return fetched.then(res => {
        if (res.status !== 200 && res.status !== 201) {
            return Promise.reject({code: res.status, reason: res.json()})
        }
        else {
            return res.json()
        }
    })

}