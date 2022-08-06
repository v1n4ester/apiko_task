import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,

})

export const ProductsApi={
    ShoesApi(){
        return instance.get('api/categories/1/products?limit=12');
    },
    Postfavorite(id){
        return instance.post(`api/products/${id}/favorite`);
    },
    like(itemId) {
        return axios.get(`api/products/favorites`).then(response => {
            const data = response.data;
            data.followed = true;
            axios.post(`api/products/${itemId}/favorite`, { data }, {
                withCredentials: true
            })
        });
    },
    dislike(itemId) {
        return axios.get(`api/products/favorites`).then(response => {
            const data = response.data;
            data.followed = false;
            axios.delete(`api/products/${itemId}/favorite`, {
                withCredentials: true
            })
        });
    },

}

export const SearchApi={
    searchText(text){
        return axios.get(`api/products/search?keywords=${text}&limit=12`);
    }
}

export const authApi = {
    me(){
        return instance.get(`https://api.themoviedb.org/3/movie/20712?api_key=a55864d714e04810728080950a4fd47a`, {
            wthCredentials: true,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjkzMCwiaWF0IjoxNjU5Nzc0NTkzMzM2LCJzdWIiOiJBUElfQVVUSE9SSVpBVElPTl9UT0tFTiJ9.IR785RQSDjO-Zui5d-KnOBCBmTFBxnUOi1hH2SwJfSk"
        })
    },
    login(email, password){
        console.log(email, password)
        return instance.post(`/api/auth/login`,{ email, password})
    },
    getAcc(){
        return instance.get(`/api/account`)
    }
    // logOut(){
    //     return instance.delete(`https://jsonplaceholder.typicode.com/users/11`)
    // }
} 
