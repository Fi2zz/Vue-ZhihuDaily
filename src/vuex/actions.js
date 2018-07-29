import {get} from './request'
import types  from './types'
export default {
    loading: ({commit, dispatch}, loading) => commit(types.LOADING, loading),
    async getStory({commit, dispatch}, {id}){
        let data = await  get("story", id)
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
        dispatch("getStoryInfo", {id});
        commit(types.UPDATE_STORY, {
            content: contentList.join(""),
            id: id,
        });

    },

    async  getStoryInfo({commit}, {id}){
        let data = await get("storyInfo", id)
        commit(types.UPDATE_STORY_INFO, {
            like: data.popularity,
            comments: {
                total: data.comments,
                long: {
                    size: data.long_comments
                },
                short: {size: data.short_comments}
            }
        })
    },
    async getStoryComments({commit,}, {id}){
        let long = await get("comments", `?id=${id}&type=long`);
        let short = await get("comments", `?id=${id}&type=long`);
        commit(types.UPDATE_STORY_COMMENT, {
            long,
            short
        });


    },
    async getStories({commit, dispatch}){
        await  dispatch("loading", true)
        let result = await get("list");
        commit(types.UPDATE_LIST, {
            currentDate: result.date,
            stories: {
                date: result.date,
                list: result.stories
            },
            loading: false
        });
        commit(types.UPDATE_TOPS, result.top_stories);
        dispatch("getLastDateStories", result.date);
    },
    async  getLastDateStories({commit}, date){
        let data = await  get("before", parseInt(date))
        let result = {
            stories: {
                date: data.date,
                list: data.stories
            },
            loading: false,
            currentDate: data.date
        };
        commit(types.UPDATE_LIST, result)
    }
}