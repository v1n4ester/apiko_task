export const modalHelper=(func, place)=>{
    document.addEventListener("mousedown", (e) => {
    if (!place.contains(e.target)) {
    func()
    } 
});
}
