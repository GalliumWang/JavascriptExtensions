(function skipQuestion(){
    var element = document.getElementsByClassName("j-continue")[0];
 
    if(typeof(element) != 'undefined' && element != null){
        element.click();
    }

    setTimeout(skipQuestion, 1000);
})();
