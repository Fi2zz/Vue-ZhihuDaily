import { get } from "./request";
import types from "./types";

function padding(number) {
  return parseInt(number) > 9 ? `${number}` : `0${number}`;
}
function imageStyle(image) {
  return {
    background: `url(${image})`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  };
}

function displayDate(string) {
  let currDate = new Date();
  let year, month, date;
  if (!string) {
    year = currDate.getFullYear();
    month = currDate.getMonth();
    date = currDate.getDate();
  } else {
    year = parseInt(string.substring(0, 4));
    month = parseInt(string.substring(4, 6));
    date = parseInt(string.substring(6, 8));
  }
  let appDate = new Date(year, month - 1, date);
  let week = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  ];
  return `${appDate.getFullYear()}年${padding(
    appDate.getMonth() + 1
  )}月${padding(appDate.getDate())}日 ${week[appDate.getDay()]}`;
}

export default {
  loading: ({ commit, dispatch }, loading) => commit(types.LOADING, loading),
  async getStory({ commit, dispatch }, { id }) {
    let data = await get("story", id);
    let content = data.body;
    let contentList = content
      .split("\n")
      .filter(item => !!item)
      .map(line => {
        line = line.trim();
        if (/<div class="img-place-holder"><\/div>/.test(line)) {
          line = `<div class="img-place-holder"
                                         style="background-image: url(${
                                           data.image
                                         });
                                         background-size: cover">
                                            <small>图片来源:${
                                              data.image_source
                                            }</small>         
                                    </div>`;
        }
        if (/<h2 class="question-title"><\/h2>/.test(line)) {
          line = `<h2 class="question-title">${data.title}</h2>`;
        }
        return line;
      });
    dispatch("getStoryInfo", { id });
    commit(types.UPDATE_STORY, {
      content: contentList.join(""),
      id: id
    });
  },

  async getStoryInfo({ commit }, { id }) {
    let data = await get("storyInfo", id);
    commit(types.UPDATE_STORY_INFO, {
      like: data.popularity,
      comments: {
        total: data.comments,
        long: {
          size: data.long_comments
        },
        short: { size: data.short_comments }
      }
    });
  },
  async getStoryComments({ commit }, { id }) {
    let long = await get("longComment", id);
    let short = await get("shortComment", id);
    commit(types.UPDATE_STORY_COMMENT, {
      long,
      short
    });
  },
  async getStories({ commit, state, dispatch }) {
    await dispatch("loading", true);
    let result = await get("list");
    dispatch("getLastDateStories");
    let stories = state.stories;

    let newStories = result.stories.map(item => {
      return {
        ...item,
        style: imageStyle(item.images[0])
      };
    });

    stories.push({
      date: result.date,
      list: newStories,
      displayDate: displayDate(result.date)
    });
    let tops = result.top_stories.map(item => {
      return {
        ...item,
        style: imageStyle(item.image)
      };
    });
    commit(types.UPDATE_LIST, stories);
    commit(types.UPDATE_TOPS, tops);
  },
  async getLastDateStories({ commit, state }) {
    commit(types.LOADING, true);
    let stories = state.stories;
    let latest = stories[stories.length - 1];
    let before = state.currentDate;
    if (latest) {
      before = parseInt(latest.date);
      before -= 1;
    }
    let data = await get("before", before);
    commit(types.LOADING, false);
    let newStories = data.stories.map(item => {
      return {
        ...item,
        style: imageStyle(item.images[0])
      };
    });
    stories.push({
      date: data.date,
      list: newStories,
      displayDate: displayDate(data.date)
    });
    commit(types.UPDATE_LIST, stories);
  }
};
