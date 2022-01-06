import axios from 'axios'
export default{    
    namespaced:true,   
    state:()=>({
        movies:[],
        message:'',
        loading:false
    }),
    getters:{},
    mutations:{ 
        updateState(state,payload){
            Object.keys(payload).forEach(key=>{
                state[key]=payload[key]
            })
        },
        resetMovie(state){
            state.movies=[]
        }
    },
    actions:{
        async searchMovies(context,payload){
            const OMDB_API_KEY='7035c60c';
            const { title, type, number, year }=payload
            const res=await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`);
            const { Search, totalResults }=res.data;
            context.commit('updateState',{
                movies:Search,
                message:'Hello World',
                loading:true
            })
            const total=parseInt(totalResults)
            const pageLength=Math.ceil(total/10)
            if(pageLength>1){
                for(let page=2; page<=pageLength; page++){
                    if(page>number/10) break
                    const res=await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)
                    context.commit('updateState',{
                        movies:[...context.state.movies, ...res.data.Search]              
                    })
                }
            }

        }
    }
}