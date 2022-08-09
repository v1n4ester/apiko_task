import * as axios from 'axios';
// const TOKEN= localStorage.getItem("access_token");
const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjkzMiwiaWF0IjoxNjU5NzIwNTExNzU5LCJzdWIiOiJBUElfQVVUSE9SSVpBVElPTl9UT0tFTiJ9.IFE2gc9zvDaayJHP40h9gYWx9stZ3HgPSnxVBoY5Ls8"
const instance = axios.create({
    headers:{
    'accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TOKEN}`
    }
    
});

export const ProductsApi={
    favoritsGoods(){
        return instance.get('api/products/favorites');
    },
    like(itemId) {
        return instance.post(`api/products/${itemId}/favorite`)
    },
    dislike(itemId) {
        return instance.delete(`api/products/${itemId}/favorite`)
    },

}

export const SearchApi={
    searchText(text){
        return axios.get(`api/products/search?keywords=${text}&limit=12`);
    },
    startProducts(sortedBy){
        return instance.get(`api/products?limit=12&sortBy=${sortedBy || "latest"}`);
    },
    getCategories(){
        return instance.get(`api/categories`);
    },
    getChoosedCategory(id, sortedBy){
        return instance.get(`api/categories/${id}/products?sortBy=${sortedBy || "latest"}`);
    },
}

export const authApi = {
    me(){
        return instance.get(`/api/account`)
    },
    register(fullName, email, password, phone){
        return instance.post(`/api/auth/register`,{fullName, email, password, phone})
    },
    login(email, password){
        return instance.post(`/api/auth/login`,{ email, password})
    },
    logOut(){
        return instance.delete(`https://jsonplaceholder.typicode.com/users/11`)
    }
} 
