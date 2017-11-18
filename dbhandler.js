
const mysql=require('mysql');
let connection=null;
function  createConnection(){
    connection=mysql.createConnection({
        host     : 'localhost',
        user     : 'orauser',
        // password : 'secret',
        //table1 deleted as it is of no use tble2 to tbl4 maintained
        // tablenames are signup,contact,posts
        database : 'orators'

    });


}
function signup(val,cb){
console.log("called signup");
createConnection();
connection.connect();


       // if(result.rows==0){
            var queryString=
                'insert into signup value("' +
                val.name +'" ,'+
                '"'+val.email+'" ,'
                +'"' +val.hash +'"' +');'

            connection.query(queryString ,function(err,result){
                if(err) throw err;
                cb(result);
               connection.end();
            })






}

function login(val,cb){
    console.log("inlogin");
    createConnection();
    connection.connect();
    var checking ="select pwd from signup where email='" +val.email+"';"
    connection.query(checking ,function(err,result){
        if(err) throw err;
        if(result.length<=0){
            cb(1);
        }
      else  cb(result);
        console.log("in db result" +result);
        connection.end();
    })

}


function contactmsg(val,cb){
    createConnection();
    connection.connect();
    console.log("conMsgDb");
    var queryString ='insert into contact value("'+ val.id +'","'+val.cname+' ","'+
        val.cemail+'" , "'+ val.csub +'" , "' + val.cmsg +'" );'
    connection.query(queryString ,function(err,result){
        if(err) throw err;
       cb(result);
        connection.end();
    })

}
function getusr(val,cb) {
    createConnection();
    connection.connect();
    var que = "select name from signup where email='" + val.email + "';"
    connection.query(que, function (err,result) {
        if (err) throw err;
        cb(result);

        connection.end();
    })

}

function  enterPost(val,cb) {
    createConnection();
    connection.connect();
    console.log("dbpost");
    var postquery="insert into posts value('" + val.id +"','" +val.name +"','"+

        val.usrfeed+"','"+"0', now()"+");"
    connection.query(postquery, function (err, result) {
        if (err) throw err;
        cb(result);

        connection.end();
    })

}

function getp(cb){
    createConnection();
    connection.connect();
    let list=[];
    var qw ='select * from posts ;'
    console.log("dbfetch");
    connection.query(qw,
        function(err, rows, fields) {
        if(err) throw err;
            for(let row of rows) {
                list.push({
                    id: row.id,
                    name: row.name,
                    usrfeed:row.posts,
                    postCreated :row.postCreated,
                    likes:row.likes
                })
            }

            console.log("list" +list);
        cb(list);
            connection.end();
    })
}

function getlikes(val,cb){
    createConnection();
    connection.connect();
    console.log(val.idn +"getlike started");
    var likes ='select `likes` from posts where `id`='+val.idn +";"
    connection.query(likes,function(err,result){
        if(err) throw err;
        cb(result);
      //  console.log("getlike complete" +result);
        //connection.end();
    })
}

function coninfo(cb){
    createConnection();
    connection.connect();
    console.log("conget");
    var squery='select * from contact ;'
    connection.query(squery,function(err,rows,fields){
        if(err) throw  err;
        cb(rows);
        connection.end();
    })
}
function inclikes(val,cb) {
    createConnection();
    connection.connect();
    console.log("inclikes");
  //  var inc ='update table4 set likes =' +val.likes +'where id =' +val.id+";"
    var inc ='UPDATE posts SET `likes` = ' + val.li + ' WHERE `id` =' +val.i +";"
    connection.query(inc,function (err,result) {
        if(err) throw  err;
        console.log("inclike complete");
        cb(result);


    })
}
/*function likedone(val,cb){
    createConnection();
    connection.connect();
    console.log("likedone");
    var ld="insert into table5 values('"+val.email+"' ,'" +val.id +"'," +"1" +");"
    connection.query(ld,function(err,result){
        if(err) throw err;
        console.log("likecompleted");

    })
}
function unlike(val,cb){
    createConnection();
    connection.connect();
    console.log("unlike");
    var unl ="delete from table5 where email='" +val.email+",' AND id ='"+val.id+"';"
    connection.query(unl,function(err,result){
        if(err) throw err;
        console.log("unlike completed");
    })
    
}*/


module.exports={
    signup:signup,
    login :login,
    coninfo:coninfo,
    contactmsg:contactmsg,
    enterPost:enterPost,
    getusr:getusr,
    getp:getp,
    inclikes:inclikes,
    getlikes:getlikes,
}