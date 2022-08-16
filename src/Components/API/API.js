import * as axios from 'axios';

const instance = axios.create({
    headers:{
    'accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("account"))? 
    JSON.parse(localStorage.getItem("account")).token : ''}`
    }
    
})

export const ProductsApi={
    favoritsGoods(){
       return instance.get('api/products/favorites');
    },
    setFavoritsUnauthorizedGoods(ids){
        return instance.post('api/products/favorites', {ids});
     },
    like(itemId) {
        return instance.post(`api/products/${itemId}/favorite`)
    },
    dislike(itemId) {
        return instance.delete(`api/products/${itemId}/favorite`)
    },

}

export const SearchApi={
    searchText(text, limit){
        return axios.get(`api/products/search?keywords=${text}&limit=${limit}`);
    },
    startProducts(sortedBy, limit){
        return instance.get(`api/products?limit=${limit}&sortBy=${sortedBy || "latest"}`);
    },
    getCategories(){
        return instance.get(`api/categories`);
    },
    getChoosedCategory(id, sortedBy, limit){
        return instance.get(`api/categories/${id}/products?limit=${limit}&sortBy=${sortedBy || "latest"}`);
    },
}

export const authApi = {
    changePassword(oldPassword, password){
        return instance.put('/api/account/password',{oldPassword, password})
    },
    changeUserData(fullName, email, phone, country, city, address){
        return instance.put('/api/account',{fullName, email, phone, country, city, address})
    },
    register(fullName, email, password, phone){
        return instance.post(`/api/auth/register`,{fullName, email, password, phone})
    },
    login(email, password){
        return instance.post(`/api/auth/login`,{ email, password})
    },
    getCountries(){
        return instance.get(`api/locations/countries`)
    }
} 

export const offerApi={
    postOffer(products, value){
        return instance.post(`/api/orders`,{items: products, shipment: value})
    },
    getOffers(){
        return instance.get(`api/orders?offset=0&limit=20`)
    }
}
