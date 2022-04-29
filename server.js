const express = require('express');
const app = express(); // express  소환한다.
const bodyParser= require('body-parser') // form 데이터 서버로 쉽게 전송해 주는 라이브러리
app.use(bodyParser.urlencoded({extended: true})) //form 데이터 서버로 쉽게 전송해 주는 라이브러리
app.set('view engine', 'ejs'); //리스트 라이브러리

app.use('/public', express.static('public'));// static을 사용하기위해서 /public 폴더에 넣는다.

const methodOverride = require('method-override') //  method-override 라이브러리 method에 put delete 를 사용할수 있다.
app.use(methodOverride('_method')) // method-override 라이브러리 method에 put delete 를 사용할수 있다.



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
    
    db.collection('post').find().toArray(function(에러,결과){ //toArray 모든 배열을 반환한다.
        console.log(결과);
        응답.render('list.ejs',{posts :결과}); //posts에 결과값을  넣을거다.
    }); //어디 디비를 사용할것이다.
    
    //ejs파일은 항상 views에 넣어둔다.

})

app.get('/detail/:id',function(요청,응답){ // :를 붙이면 사용자가 /뒤에 ??붙으면 실행한다. parameter.
    
     db.collection('post').findOne({_id : parseInt(요청.params.id)},function(에러,결과){ //디비에서 id값 게시물을 찾는다.
        응답.render('detail.ejs',{data :결과});  //찾은 결과를 ejs에 데이터값을 넣는다.
        console.log(결과);
        
        if(에러) return 응답.render('index.ejs');
        
    })});

app.get('/edit/:id',function(요청,응답){
        db.collection('post').findOne({_id : parseInt(요청.params.id)},function(에러,결과){ //toArray 모든 배열을 반환한다.
        
        응답.render('edit.ejs',{posts :결과}); //posts에 결과값을  넣을거다.
        console.log(결과);
        })}); //어디 디비를 사용할것이다.
    
    //ejs파일은 항상 views에 넣어둔다.



    /* 0428 수정중 */
app.put('/edit',function(요청,응답){
   db.collection('post').updateOne({_id: parseInt(요청.body.id)},{$set : {제목 : 요청.body.title, 날짜 : 요청.body.date}}, function(에러,결과){ 
    //name으로 받은 데이터를 body로 받아온다.
    console.log('수정완료');
    응답.redirect('/list')

   })});


const passport = require('passport'); //라이브러리
const LocalStrategy = require('passport-local').Strategy; //라이브러리
const session = require('express-session');// 라이브러리


app.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());  //미들웨어 요청과 응답 사이에 뭔가 실행시키는 코드, '비밀코드'에는 아무거나 적어주면된다.



app.get('/login', function(요청,응답){
    응답.render('login.ejs');
})

app.post('/login', passport.authenticate('local',{failureRedirect : '/fail'}), function(요청,응답){
    응답.redirect('/');
})

app.get('/mypage', 로그인했니, function(요청,응답){ //'로그인했니' 미들웨어 사용
    요청.user //deserializeUser 정보가 여기 다 담겨저 있음.
    응답.render('mypage.ejs')
  })

function 로그인했니(요청, 응답, next){ //미들웨어 요청.user를 검사한다.
    if(요청.user){ //로그인했으면 요청.user가 항상 있음.
        next()
    }else{
        응답.send('로그인 안하셨는데요?')
    }
}



passport.use(new LocalStrategy({
    usernameField: 'id', //id 정의
    passwordField: 'pw', //pw 정의
    session: true, //세션정보를 저장할것인지 체크
    passReqToCallback: false, // 추가 검증할때 콜백함수에 넣을수 있다.
  }, function (입력한아이디, 입력한비번, done) {
    //console.log(입력한아이디, 입력한비번);
    db.collection('login').findOne({ id: 입력한아이디 }, function (에러, 결과) {
      if (에러) return done(에러)
  
      if (!결과) return done(null, false, { message: '존재하지않는 아이디요' })
      if (입력한비번 == 결과.pw) {
        return done(null, 결과)// 첫번째 파라미터 서버에러, 두번째 파라미터일치할때 데이터를 보낸다 세번째파라미터 에러매세지 넣는것
      } else {
        return done(null, false, { message: '비번틀렸어요' })
      }
    })
  }));

  //세션 만들기

  passport.serializeUser(function (user, done) { //아이디 비번 검증 성공시 user로 보냄
    done(null, user.id/* 1 */)//세션 데이터를 만들고 세션의 id정보를 쿠키로 보냄
  });
  
  passport.deserializeUser(function (아이디/* 1과 동일하다. */, done) {
    db.collection('login').findOne({id : 아이디}, function(에러,결과){
        done(null, 결과)  //로그인한 유저의 세션아이디를 바탕으로 개인정보를 db에서 찾는 역할,유저 이름 같은것을 마이페이지에 출력이 가능하다.

    })
    
  }); 


