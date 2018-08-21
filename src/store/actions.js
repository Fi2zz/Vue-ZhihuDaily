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

function createNewStoryList(list, separator) {
  list = list.map(item => ({
    ...item,
    style: imageStyle(Array.isArray(item.images) ? item.images[0] : item.image),
    type: "item"
  }));

  if (separator) {
    list.unshift({
      type: "separator",
      content: displayDate(separator),
      date: parseInt(separator)
    });
  }
  return list;
}

const formatDateWithTime = date => {
  const prefix = [
    date.getFullYear(),
    padding(date.getMonth() + 1),
    padding(date.getDate())
  ];
  const suffix = [
    padding(date.getHours()),
    padding(date.getMinutes()),
    padding(date.getSeconds())
  ];
  return `${prefix.join("-")} ${suffix.join(":")}`;
};

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

function now() {
  let date = new Date();
  let currYear = date.getFullYear();
  let currMonth = padding(date.getMonth() + 1);
  let currDate = padding(date.getDate());
  return parseInt(`${currYear}${currMonth}${currDate}`);
}

export default {
  loading: ({ commit, dispatch }, loading) => commit(types.LOADING, loading),

  resetStoryView({ commit }) {
    commit(types.UPDATE_STORY_ID, null);
    commit(types.UPDATE_STORY_COMMENT, "");
    commit(types.UPDATE_STORY_INFO, {
      like: 0,
      long: 0,
      short: 0,
      total: 0
    });
  },

  async getStory({ commit, dispatch }, { id }) {
    let data = await get("story", id);
    let content = data.body
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
    await dispatch("getStoryInfo", { id });
    commit(types.UPDATE_STORY_ID, id);
    commit(types.UPDATE_STORY_CONTENT, content.join(""));
  },

  async getStoryInfo({ commit, state }, { id }) {
    id = id || state.story.id;
    let data = await get("storyInfo", id);
    commit(types.UPDATE_STORY_INFO, {
      like: data.popularity,
      long: data.long_comments,
      short: data.short_comments,
      total: data.comments
    });
  },
  async getStoryComments({ commit, state }, id) {
    console.log("getStoryComments", id);

    let long = await get("longComment", id);
    let short = await get("shortComment", id);
    commit(types.UPDATE_STORY_COMMENT, [
      {
        type: "heading",
        label: "共" + state.story.info.long + "条长评"
      },
      ...long.comments.map(item => ({
        ...item,
        time: formatDateWithTime(new Date(item.time * 1000)),
        type: "item",
        section: "long"
      })),
      {
        type: "heading",
        label: "共" + state.story.info.short + "条短评"
      },
      ...short.comments.map(item => ({
        ...item,
        time: formatDateWithTime(new Date(item.time * 1000)),
        type: "item",
        section: "short"
      }))
    ]);
  },
  async getStories({ commit, state, dispatch }) {
    await dispatch("loading", true);
    let result = await get("list");
    dispatch("getLastDateStories");
    commit(types.UPDATE_LIST, createNewStoryList(result.stories, result.date));
    commit(types.UPDATE_TOPS, createNewStoryList(result.top_stories));
  },
  async getLastDateStories({ commit, state }) {
    commit(types.LOADING, true);
    let latest = state.stories.filter(item => item.type === "separator").pop();
    let before = latest ? latest.date : now();
    let data = await get("before", before);
    commit(types.LOADING, false);
    commit(types.UPDATE_LIST, createNewStoryList(data.stories, data.date));
  }
};
