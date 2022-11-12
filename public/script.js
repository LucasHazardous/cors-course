const btnSingle = document.getElementById("btnSingle")
const btnCrossNoCors = document.getElementById("btnCrossNoCors")
const btnOnlyExample = document.getElementById("btnOnlyExample")

const text = document.getElementById("text")

btnSingle.addEventListener("click", () => {
    fetch("/single").then(res => res.text()).then(res => text.innerText = res);
})

btnCrossNoCors.addEventListener("click", () => {
    fetch("https://apple.com").then(text.innerText = "Check Console");
})

btnOnlyExample.addEventListener("click", () => {
    fetch("/example").then(res => res.text()).then(res => text.innerText = res);
})