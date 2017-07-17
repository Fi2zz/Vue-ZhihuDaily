export default {
  hot: [],
  stories: [],
  tops: [],
  currentIndex: 0,
  story: {
    id: '',
    content: '',
    info: {
      likes: 0,
      popularity: 0,
      comments: 0,
      long: 0,
      short: 0
    },
    likes: 0,
    popularity: 0,
    total: 0,
    long: 0,
    short: 0,
    cover: '',
    comments: {
      long: {list:[],size:0},
      short:{list:[],size:0},
      total: 0
    }
  },
  loading: false
}
