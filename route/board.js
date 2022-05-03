const router = require('express').Router();

function 로그인했니(요청, 응답, next){ //미들웨어 요청.user를 검사한다.
    if(요청.user){ //로그인했으면 요청.user가 항상 있음.
        next()
    }else{
        응답.send('로그인 안하셨는데요?')
    }
}

router.use(로그인했니); //라우터에 전부 미들웨어를 적용할 수 있다.
router.use('/shirts',로그인했니); // 특정 url만 미들웨어를 적용할 수 있다.


router.get('/sports', function(요청, 응답){ //로그인한사람들만 보려면 미들웨어 사용한다.
    응답.send('스포츠 게시판');
 });
 
 router.get('/game', function(요청, 응답){
    응답.send('게임 게시판');
 }); 


 module.exports = router;



