const counter = document.getElementById("counter");
const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const heart = document.getElementById("heart");
const pause = document.getElementById("pause");
const reset = document.getElementById("reset");
const comments = document.getElementById("comment-form");
const submit = document.getElementById("submit");
let countArray = [0];

//declared globally for the heart event listener
const likes = document.querySelector(".likes");
let liked = document.createElement("li");
liked.setAttribute("id", "0");

let secondsCount = 0;
let clicked = false;
let heartCount = 0;

//plus one every second
let countInterval = setInterval(()=> {
    secondsCount++;
    countArray.push(secondsCount);
    counter.innerText = secondsCount;
}, 1000);

//minus button
minus.addEventListener("click", () => {
    secondsCount--;
    counter.innerText = secondsCount;
});

//plus button
plus.addEventListener("click", () => {
    secondsCount++;
    counter.innerText = secondsCount;
});

//reset like count every second and create an li element every increment
setInterval(() => {
    heartCount = 0;
    liked = document.createElement("li");
    liked.setAttribute("id", `${secondsCount}`);
}, 1000);

//heart button
heart.addEventListener("click", () => {
    heartCount++;
    liked.textContent = `${secondsCount} has been liked ${heartCount} time(s)`;
    likes.insertAdjacentElement("afterend", liked);
});

//pause button
pause.addEventListener("click", () => {
    minus.toggleAttribute("disabled");
    plus.toggleAttribute("disabled");
    heart.toggleAttribute("disabled");
    submit.toggleAttribute("disabled");
    pause.innerText === "pause" ? pause.innerText = "resume" : pause.innerText = "pause";
    if(!clicked) {
        clearInterval(countInterval);
        clicked = true;
    } else {
        countInterval = setInterval(()=> {
            secondsCount++;
            countArray.push(secondsCount);
            counter.innerText = secondsCount;
        }, 1000);
        clicked = false;
    }
});

//add comments
comments.addEventListener("submit", (event) => {
    event.preventDefault();
    let comment = document.createElement("p");
    comment.innerText = event.target.elements[0].value;
    comment.classList.add("comment");
    document.getElementById("list").appendChild(comment);
    comments.reset();
});

//reset button
reset.addEventListener("click", () => {
    counter.innerText = 0;
    secondsCount = 0;
    heartCount = 0;
    liked.remove();
    const commentList = document.querySelectorAll(".comment");
    const likedList = document.querySelectorAll(".like");
    commentList.forEach(comment => comment.remove());
    likedList.forEach(like => like.remove());
});

