/**
 * Created by himani on 7/24/17.
 */
const express=require('express');
const app=express();
app.use('/',express.static('./public_html'));
 const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var fs = require('fs');
const md5=require('md5');
const db=require('./dbhandler.js');
app.use(bodyParser.json());
var request = require('request');
var cheerio = require('cheerio');

app.get('/scrape' ,function (req,res) {
    url = 'https://news.google.com/news/?ned=in&hl=en-IN';

    request(url, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var feed, postdate, content;
            var json = {feed: [], src: [], imgsrc: [], link: []};
            var output = {
                news: []
            };
            var i = 0;
            $('c-wiz>a').each(function () {
                if (i === 20) {
                    return false;
                }
                var data = $(this);
                src = data.next().children().text();
                if(src==""){

                }
                else {
                    feed = data.text();

                    link = data.attr('href');
                 //   var list = document.getElementsByClassName('.lmFAjc')[i].getAttribute("src");
                 //   var image = list;
                     var image = $('.lmFAjc').attr('src');


                    //   console.log(feed);
                    json.feed.push(feed);
                    json.src.push(src);
                    json.imgsrc.push(image);
                    json.link.push(link);
                    i++;
                }

            })

            for (var i = 3; i < 9; i++) {
                output.news[i] = {
                    feed: json.feed[i],
                    src: json.src[i],
                    img: json.imgsrc[i],
                    link: json.link[i]
                }
            }
            var scrape = JSON.stringify(output, null, 4);
        //    console.log(scrape);


            fs.writeFile('output4.json', JSON.stringify(output, null, 4), function (err) {
                //console.log(output);
               // console.log('File successfully written! - Check your project directory for the output.json file');

            })
            res.send(output);
        }

    })
})
app.get('/scrapeGrammar',function (req,res) {
    url2='https://www.englishgrammar.org/rules-review/';
    request(url2, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var para;
            var json2={para:[]};
            var output = {

            };
            $('div.entry-content>p').each(function(){
                json2.para.push($(this).text());
            })

            var scrape = JSON.stringify(json2, null, 4);

            var f =scrape.replace(":"," ").replace(/,\n/g,"<br>").replace(new RegExp('\n','g'), '<br />');
            console.log(f);
            fs.writeFile('output1.json', JSON.stringify(json2, null, 4), function (err) {
                console.log('output1 successfully written! - Check your project directory for the output1.json file');

            })
            res.send(f);

        }

    })

})

app.post("/getlikes",function(req,res){
    var getid={
        idn:parseInt(req.body.idi)
    }
    db.getlikes(getid,function(result){
        //console.log("ser "+result);
        res.send(result);
    })
})

app.post('/posts',function(req,res){
    console.log("server posts");
    var postContent={
        id:req.body.id,
        usrfeed:req.body.usrfeed,
        name:req.body.name,

    }
    db.enterPost(postContent,function(result){
        res.send(result);
        console.log(result[0]+"server res post");
    })
})

app.get("/getposts",function(req,res){
    console.log("fetch");
    db.getp(function(result){
        console.log(result +"fetchpost");
       res.send(result);
    })

})

app.post("/updatelikes",function(req,res){
    var d ={
        i:req.body.i,
        li:req.body.li,

    }
    console.log( "ser likes");
    console.log( "ser id")
    db.inclikes(d,function(result){
        res.send(result);
    })
})

app.post('/signup',function(req,res){
    console.log("post"+ req.body.name +req.body.email );
   // var phash= md5(req.body.pass);
    var entering={
        name : req.body.name,
        email: req.body.email,
        hash :md5(req.body.pass)
    };
    console.log(entering.hash);
    db.signup(entering,function(result){
        res.send(result);
        console.log(result);
    })
})

app.post('/login',function(req,res){
    console.log("login");
    var log ={
        pwd : md5(req.body.pwd),
        email: req.body.email

    };
    db.login(log,function(result){
        console.log( "result pwd"+result[0].pwd);
        if(result[0].pwd==log.pwd){
            console.log("pwd checked ri8");
            res.send("matched");

        }
        else {
            res.send("unmatched");
        }

        console.log(result);
    })
})

app.get('/info',function(req,res){
    db.coninfo(function(result){
        console.log("coninfo" +result);
        res.send(result);
    })
})

app.post('/conta',function (req,res) {
    console.log("entr contact");
    var cont = {
        id:req.body.id,
        cname : req.body.cname,
        cmsg:req.body.cmsg,
        csub :req.body.csub,
        cemail:req.body.cemail

    }
    db.contactmsg(cont, function(result){
        console.log("contactResult" +result );
        res.send(result);
    })
})
app.post('/getuser' , function(req,res){
    console.log("servergetname");
    var username={
        email:req.body.email,
    }
    db.getusr(username,function(result){
        console.log("getnameserver" +result);
        res.send(result);
    })
})

app.listen(3300,function(){
    console.log("server running on port 3300");
})
exports = module.exports=app;