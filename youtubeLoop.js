starttime=30;
endtime=40;

(function test() {
    var slidebar=document.getElementsByClassName('ytp-progress-bar ')[0];
    var stringtime=slidebar.getAttribute("aria-valuenow");
    var currenttime=player_reference.getCurrentTime();
    var settingbutton=document.getElementsByClassName("ytp-settings-button")[0]
    settingbutton.click();settingbutton.click();
    if(currenttime>=endtime)
    {
    if(window.location.href.indexOf('&')==-1)
    {
        window.location.href=window.location.href.replace('https://www.youtube.com/watch?v=','https://youtu.be/')+"?t=3"+starttime;
    }
    else{
        window.location.href=window.location.href.split("&")[0].replace('https://www.youtube.com/watch?v=','https://youtu.be/')+"?t=30";
    }

    setTimeout(test, 10000);
    return;
    }
    setTimeout(test, 1000);
})();




