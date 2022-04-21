const express = require('express');
const app = express(); // express  소환한다.
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true})) 
app.set('view engine', 'ejs'); //리스트 라이브러리

//데이터 입력시 필요함
const MongoClient = require('mongodb').MongoClient;

var db; 
MongoClient.connect('mongodb+srv://saeunwoo:dmsdndmsdn12@cluster0.lwa80.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function(에러, client){
    if(에러) return console.log(에러);

    db = client.db('todoapp');

        //데이터는 object로 저장한다.

    app.listen(8080, function(){
      
        console.log('listening on 8080');
    
    });
    })




app.get('/pet',function(요청,응답){

    응답.send('펫용품 쇼핑 사이트 입니다.')

});

app.get('/beauty',function(요청,응답){

    응답.send('뷰티 쇼핑몰 입니다.')

});
app.get('/',function(요청,응답){

    응답.sendfile(__dirname +'/index.html')

});
app.get('/write',function(요청,응답){

    응답.sendfile(__dirname +'/write.html')

});

app.post('/add',function(요청,응답){
    응답.send('전송완료')
    console.log(요청.body.date);
    console.log(요청.body.title);

    db.collection('counter').findOne({name :"게시물갯수"}, function(에러,결과){
        let 총게시물갯수 = 결과.totalPost;

        db.collection('post').insertOne({_id : 총게시물갯수 + 1,날짜:요청.body.date,제목:요청.body.title},function(에러,결과){
            console.log('저장완료');
            db.collection('counter').updateOne({name:'게시물갯수'},{$inc :{totalPost:1}},function(에러,결과){
                if(에러){return console.log(에러);}
            }) //operator $set 변경, inc 증가, min 기존값보다 적을 때만 변경, rename key값 이름변경
            // inc 1을 증가 시켜주세요.
        
    });

    
    }); 



});


app.get('/list',function(요청,응답){
    
    db.collection('post').find().toArray(function(에러,결과){
        console.log(결과);
        응답.render('list.ejs',{posts :결과}); //posts에 결과값을  넣을거다.
    }); //어디 디비를 사용할것이다.
    
    //ejs파일은 항상 views에 넣어둔다.

})