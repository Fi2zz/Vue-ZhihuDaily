const apiFatory = (name, query) => {
  let url = `${window.location.protocol}//${window.location.host}`;
  let apiURLPrefix = "/api/4/";
  const map = {
    list: apiURLPrefix + "news/latest",
    before: dateInString => apiURLPrefix + "news/before/" + dateInString,
    story: id => apiURLPrefix + "news/" + id,
    storyInfo: id => apiURLPrefix + "story-extra/" + id,
    longComment: id => apiURLPrefix + "story/" + id + "/long-comments",
    shortComment: id => apiURLPrefix + "story/" + id + "/short-comments"
  };
  if (query) {
    return `${url}${map[name](query)}`;
  }
  return `${url}${map[name]}`;
};

export function get(api, query) {
  let fetched = fetch(apiFatory(api, query), {
    method: "GET"
  });
  return fetched.then(res => {
    if (res.status >= 200 && res.status < 300) {
      return res.json();
    }
    return Promise.reject({ code: res.status, reason: res.json() });
  });
}
