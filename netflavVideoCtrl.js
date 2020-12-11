window.video=document.getElementsByClassName("jw-video jw-reset")[0]


var eventBody=document.getElementsByTagName("body")[0]

eventBody.addEventListener('keydown', (event) => {
    if(event.key=="ArrowLeft"){
        window.video.currentTime=video.currentTime-10
    }

    if(event.key=="ArrowRight"){
        window.video.currentTime=video.currentTime+10
    }
    
})


//TODO fullscreen volume
//TODO get access to iframe content (may be impossible for cross site policy)
//TODO remove ad/pop-up