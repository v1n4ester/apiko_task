export const updateObjectInArray = (items, itemId, objPropName, newObjProps)=>{
    return items.map(u => {
    if (u[objPropName] === itemId) {
        return { ...u, ...newObjProps}
    }
    return u;
})
}

export const updateChoosedItemsArray=(arr, action, count)=>{
    const products = arr;
    if(products){
        const res = products.some(i=>i.id === action.id);
    if(res === true){
        products.map(el=>{
            if(el.id === action.id){
                el.productCount += count
            }
        });
    }else{
        action.productCount = count
        products.push(action)
    }
    return products
    }else{
        const result = action
        result.productCount = count
        return [result]
    }
    
}

export const updateCountItemsArray=(arr, product, type)=>{
    const data = arr
    if(type === "plus"){
        data.map(el=>{
            if(el.id === product.id){
                el.productCount += 1
            }
        });
    }else{
        data.map(el=>{
        if(el.id === product.id){
            el.productCount -= 1
        }
    });
    }
    return data
}