
( function($) {
$(document).ready(function() {

   var list= document.getElementsByClassName("dt");
    console.log("news wrking");
    $.get('/scrape', function (data, status) {
        var j =0;

        for(var i=0; i<data.news.length;i++){
            if(j<6) {
                console.log(data.news.length);

                if (data.news[i] == null) {

                }
                else {

                    if(i==3){
                        document.getElementById("feed1").innerHTML = data.news[i].feed;
                        document.getElementById("dt1").innerHTML = data.news[i].src;
                        console.log(data.news[i].link +"link this link");

                       $("#l1").html('<a href ='+data.news[i].link +'>' +data.news[i].link+"</a>");

                    }
                    if(i==4){

                        document.getElementById("feed2").innerHTML = data.news[i].feed;
                        document.getElementById("dt2").innerHTML = data.news[i].src;

                        $("#l2").html('<a href ='+data.news[i].link +'>' +data.news[i].link+"</a>");

                    }
                    if(i==5){
                        document.getElementById("feed3").innerHTML = data.news[i].feed;
                        document.getElementById("dt3").innerHTML = data.news[i].src;

                        $("#l3").html('<a href ='+data.news[i].link +'>' +data.news[i].link+"</a>");
                    }
                    if(i==6){
                        document.getElementById("feed4").innerHTML = data.news[i].feed;
                        document.getElementById("dt4").innerHTML = data.news[i].src;

                        $("#l4").html('<a href ='+data.news[i].link +'>' +data.news[i].link+"</a>");
                    }
                    if(i==7){
                        document.getElementById("feed5").innerHTML = data.news[i].feed;
                        document.getElementById("dt5").innerHTML = data.news[i].src;

                        $("#l5").html('<a href ='+data.news[i].link +'>'+ data.news[i].link+'</a>');
                    }
                    if(i==8){
                        document.getElementById("feed6").innerHTML = data.news[i].feed;
                        document.getElementById("dt6").innerHTML = data.news[i].src;

                        $("#l6").html('<a href ='+data.news[i].link +'>' +data.news[i].link+"</a>");
                    }


                }
            }
                 else break;
        }


    })
})
} ) ( jQuery );


re = function(){
    document.con.reset();
}
var large;
csend = function(){
    console.log("csend working");
    name = $("#cname").val();
    email =$("#cemail").val();
    sub =$("#csub").val();
    msg =$("#cmsg").val();
    $.get('/info' , function(data,status){
        large = parseInt(data[data.length-1].id)+1;
        console.log("info" +data);
        $.post('/conta',{
                id:large,
                cname :name ,
                cemail:email,
                csub:sub,
                cmsg:msg
            }, function(data,status){
                console.log("contct post");
            }
        )
    })

}
