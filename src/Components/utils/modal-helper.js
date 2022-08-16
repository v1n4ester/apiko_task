export const modalHelper=(func)=>{
    document.addEventListener("mousedown", (e) => {
    if (e.target.className === "black-cover") {
    func()
    } 
});
}
