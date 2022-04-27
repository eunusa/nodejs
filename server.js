const express = require('express');
const app = express(); // express  소환한다.
const bodyParser= require('body-parser') // form 데이터 서버로 쉽게 전송해 주는 라이브러리
app.use(bodyParser.urlencoded({extended: true})) //form 데이터 서버로 쉽게 전송해 주는 라이브러리
app.set('view engine', 'ejs'); //리스트 라이브러리

app.use('/public', express.static('public'));// static을 사용하기위해서 /public 폴더에 넣는다.



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

    응답.render('index.ejs'); //url로 html을 불러온다.

});
app.get('/write',function(요청,응답){

    응답.render('write.ejs');

});

app.post('/add',function(요청,응답){
    응답.send('전송완료')
    console.log(요청.body.date); //body-parser 라이브러리 설치해야지 데이터를 쉽게 처리 가능하다.
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

app.delete('/delete',function(요청,응답){
    요청.body._id = parseInt(요청.body._id); //parseInt로 '1' 정수로 변경해준다. 서버전송시 문자로 하면 안되고 정수로 변경해야된다.
    db.collection('post').deleteOne(요청.body, function(에러,결과){
        console.log('삭제완료');
        응답.status(200).send({message : '성공했습니다'}); // 요청성공하면 200을 출력
    })
})


app.get('/list',function(요청,응답){
    
    db.collection('post').find().toArray(function(에러,결과){
        console.log(결과);
        응답.render('list.ejs',{posts :결과}); //posts에 결과값을  넣을거다.
    }); //어디 디비를 사용할것이다.
    
    //ejs파일은 항상 views에 넣어둔다.

})

app.get('/detail/:id',function(요청,응답){ // :를 붙이면 사용자가 /뒤에 ??붙으면 실행한다. parameter.
    
     db.collection('post').findOne({_id : parseInt(요청.params.id)},function(에러,결과){ //디비에서 id값 게시물을 찾는다.
        응답.render('detail.ejs',{data :결과});  //찾은 결과를 ejs에 데이터값을 넣는다.
        console.log(결과);
              
    })});

