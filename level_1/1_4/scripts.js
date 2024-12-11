// const b1 = document.querySelector("#b1");
// const b2 = document.querySelector("#b2");

// function onClickAddDisplay() {
//     document.querySelector("#square").style.display = "none";
// }

// function onClickRemove() {
//     document.querySelector("#square").remove();
// }

// b1.addEventListener("click",  onClickAddDisplay);
// b2.addEventListener("click",  onClickRemove);

const b3 = document.querySelector("#b3");

function onClickChangeClass() {
    let elements = document.querySelectorAll(".square")
    for (let e of elements) {
        e.classList.toggle("hidden");
    }
}

b3.addEventListener("click", onClickChangeClass);



const input = document.querySelector("#input");

function deleteBySelector() {
    let elements = document.querySelectorAll(input.value);

    for (let e of elements)
        e.remove();
}

input.addEventListener("change", deleteBySelector);



const yellow_square = document.querySelector("#yellow-square");

function onYellowClick() {
    alert("Hello");

    yellow_square.removeEventListener("click", onYellowClick);
    yellow_square.addEventListener("click", () => {
        yellow_square.remove();
    });
}

yellow_square.addEventListener("click", onYellowClick);



const buttonForRed = document.querySelector("#for-red");

function onMouseOverButton() {
    document.querySelector("#red-square").style.display = "block";
}

function onMouseOutButton() {
    document.querySelector("#red-square").style.display = "none";
}

buttonForRed.addEventListener("mouseover", onMouseOverButton);
buttonForRed.addEventListener("mouseout", onMouseOutButton);



const inputR = document.querySelector("#for-rectangle");

function showRectangle() {
    document.querySelector("#green-rectangle").style.display = "block";
}

function hideRectangle() {
    document.querySelector("#green-rectangle").style.display = "none";
}

inputR.addEventListener("focus", showRectangle);
inputR.addEventListener("input", hideRectangle);
inputR.addEventListener("blur", hideRectangle);



const buttonForImg = document.querySelector("#add-img");

function addImages() {
    let urls = document.querySelector("#add-images").value.split("\n");
    let el = buttonForImg;

    for (let url of urls) {
        let img = document.createElement("img");
        img.src = url;
        img.style.display = "block";
        img.style.marginTop = "10px";

        el.insertAdjacentElement("afterend", img);
        el = el.nextSibling;
    }

}

buttonForImg.addEventListener("click", addImages);



window.addEventListener("DOMContentLoaded", () => {
    const div = document.querySelector("#cursorCoordinates");
    div.innerHTML = `Language: ${navigator.language}`;

    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        div.innerHTML += `<br>Latitude: ${latitude}, Longitude: ${longitude}`;
    })
})

document.addEventListener("mousemove", (event) => {
    const coordinates = document.querySelector("#cursorCoordinates");

    let text = coordinates.innerHTML.split("<br>X: ")[0];
    coordinates.innerHTML = `${text}<br>X: ${event.clientX}, Y: ${event.clientY}`;
});



const local = document.querySelector("#local");
const session = document.querySelector("#session");
const cookies = document.querySelector("#cookies");

function saveToLocalStorage() {
    localStorage.setItem("text", local.innerText);
}

function saveToSessionStorage() {
    sessionStorage.setItem("text", session.innerText);
}

function saveToCookies() {
    document.cookie = `text=${encodeURIComponent(cookies.innerText)}; path=/;`;
}

local.addEventListener("input", saveToLocalStorage);
session.addEventListener("input", saveToSessionStorage);
cookies.addEventListener("input", saveToCookies);

function loadFromLocalStorage() {
    let text = localStorage.getItem("text");

    if (text !== null) local.innerText = text;
}

function loadFromSessionStorage() {
    let text = sessionStorage.getItem("text");

    if (text !== null) session.innerText = text;
}

function loadFromCookies() {
    let [name, text] = document.cookie.split('=');

    if (name === "text") cookies.innerText = decodeURIComponent(text);
}

window.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
    loadFromSessionStorage();
    loadFromCookies();
})



const scroll = document.querySelector("#scroll");

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

scroll.addEventListener("click", scrollToTop);

function checkScrollable() {
    if (document.documentElement.scrollHeight > window.innerHeight)
        scroll.style.display = "block";
    else
        scroll.style.display = "none";
}

window.addEventListener("resize", checkScrollable);



const outer = document.querySelector("#outer");
const inner = document.querySelector("#inner");

function onOuterClick() {
    alert("Outer clicked");
}

function onInnerClick(event) {
    alert("Inner clicked");
    event.stopPropagation();
}

outer.addEventListener("click", onOuterClick);
inner.addEventListener("click", onInnerClick);



const submitGo = document.querySelector("#submitGo");

function notReloadPage(event) {
    event.preventDefault();
}

submitGo.addEventListener("submit", notReloadPage);



const overlay = document.querySelector("#overlay");
const overlayButton = document.querySelector("#showOverlay");

function blockScroll() {
    overlay.style.display = "block";
    document.body.classList.add("no-scroll");
}

function unblockScroll() {
    overlay.style.display = "none";
    document.body.classList.remove("no-scroll");
}

overlayButton.addEventListener("click", blockScroll);
overlay.addEventListener("click", unblockScroll);