import {getDate,padding} from  './utils'
export default {
  data(){
    return{
      state: this.$store.state,
    }
  },
  methods: {
    commit(cmd, value){
      let temp = {
        vm: this
      };
      for (let key in value) {
        temp[key] = value[key];
      }
      this.$store.commit(cmd, temp)
    },
    routing(path, option){


      let params = {},
        query = {}
      for (let key in option) {

        if (key === 'params') {
          for (let param in option[key]) {
            params[param] = option[key][param]
          }
        }
        else if (key === 'query') {

          for (let q in option[key]) {

            query[q] = option[key][q]

          }

        }
      }
      this.$router.push({path: path, params: params, query: query})
    },
    getDate: getDate,
    padding:padding
  }
}
