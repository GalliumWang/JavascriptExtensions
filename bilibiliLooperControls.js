

loopBar=document.getElementById('v_desc');
loopBar.innerHTML='<label for="stime">Start time:</label><br><input type="text" id="stime" name="fname" value="0"><input onclick="setStartTime()" type="submit" value="Set start time"><br><label for="etime">End time:</label><br><input type="text" id="etime" name="lname" value="0"><input onclick="setEndTime()" type="submit" value="Set end time"><br> <input onclick="loopControl()" type="submit" value="Start loop" id="loopbutton">';
stime=0;
etime=0;
looping=false;
stInput=document.getElementById('stime');
etInput=document.getElementById('etime');
loopButton=document.getElementById('loopbutton');
videos=document.getElementsByTagName("video");
videoPlaying=videos[0];

function setStartTime(){
    stime=videoPlaying.currentTime;
    stInput.value=parseFloat(stime);
}

function setEndTime(){
    etime=videoPlaying.currentTime;
    etInput.value=parseFloat(etime);
}

function loopControl(){
    if(loopButton.value=="Start loop"){
        loopButton.value="End loop";
        looping=true;
    }
    else{
        loopButton.value="Start loop";
        looping=false;
    }
}

(function loop() {
    if(looping==true){
        if(videoPlaying.currentTime>etime){
            videoPlaying.currentTime=stime;
        }
    }

    setTimeout(loop, 100);
})();