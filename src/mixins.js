export default {
  methods: {
    commit(cmd, value) {
      let temp = {
        vm: this
      };
      for (let key in value) {
        temp[key] = value[key];
      }
      this.$store.commit(cmd, temp);
    },
    routing(path, option) {
      let params = {},
        query = {};
      for (let key in option) {
        if (key === "params") {
          for (let param in option[key]) {
            params[param] = option[key][param];
          }
        } else if (key === "query") {
          for (let q in option[key]) {
            query[q] = option[key][q];
          }
        }
      }
      this.$router.push({ path: path, params: params, query: query });
    },
    getDate(string) {
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
      return `${appDate.getFullYear()}年${this.padding(
        appDate.getMonth() + 1
      )}月${this.padding(appDate.getDate())}日 ${week[appDate.getDay()]}`;
    },
    padding(number) {
      return parseInt(number) > 9 ? `${number}` : `0${number}`;
    }
  }
};
