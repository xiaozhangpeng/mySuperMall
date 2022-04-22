import  {regHomeMultidata} from "@/network/home"

const state={
    homemultidata:[]
}
const mutations={
    GETHOMEMULTIDATA(state,homemultidata)
    {
        state.homemultidata=homemultidata
    }
}
const actions={
  async getHomeMultidata(){
       let result=await reqHomeMultidata();
       if(result.code==200)
       {
           commit('GETHOMEMULTIDATA',result.data)
       }

   }

}
const getters={}

export default {
    state,
    mutations,
    actions,
    getters
}
