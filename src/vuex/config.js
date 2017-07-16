let port = 8000
const routes = {
    uri: `${window.location.protocol }//${window.location.hostname}:${port}`,
    list: '/',
    before: '/before',
    story: '/story/',
    storyInfo: '/story-extra/',
    comments: '/comment'
};

export {routes}