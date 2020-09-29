window.alert = function () { }
function clll() {
    var lbs = document.getElementsByClassName("neutral unselected");
    var temp = lbs.length
    if (temp > 0) {
        while (lbs.length > 0) {
            lbs[0].setAttribute("class", "neutral");
        }
        //for(var i=0;i<temp;i++)
        //{
        //    lbs[i].setAttribute("class","neutral");
        //}
        var btn = document.getElementsByTagName("button")[1];
        btn.click();
    }
    else {
        var btn = document.getElementsByTagName("button")[0].click();
    }
    setTimeout(clll, 300);
}

clll();



