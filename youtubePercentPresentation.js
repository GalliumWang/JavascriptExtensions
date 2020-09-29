player_reference=document.getElementsByTagName('video')[0];
duration=document.getElementsByClassName("ytp-progress-bar ")[0].getAttribute("aria-valuemax")
title=document.querySelector("#container > h1");
newTitle=document.createElement("h1");
title.appendChild(newTitle);

//增加css内容
newTitle.style.background="#f36356f0";
//

(function test() {
    var progress=(player_reference.getCurrentTime()/duration)*100;
    newTitle.innerText=progress.toLocaleString(undefined,{ minimumFractionDigits: 2 })+"%";
    setTimeout(test, 1000);
})();