/**
 * Created by Hernan Y.Ke on 2016/1/25.
 */
function search(){
    var query = document.querySelector('input[type=search]');
    if(sessionStorage.getItem(query)!=undefined&&sessionStorage.getItem(query)!=null){
        document.querySelector("#result").innerHTML=sessionStorage.getItem(query);
    }else{
        var request = new XMLHttpRequest();
        request.open("GET","./wiki.php?query="+ query);
        request.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        request.onload = function () {
            document.querySelector("#result").innerHTML=request.response;
            sessionStorage.setItem(query,request.response);
        }
        request.send();
    }
}