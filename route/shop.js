const router = require('express').Router(); // express router()기능을 사용 선언, 




router.get('/shirts', function(요청, 응답){ //라우터 사용
    응답.send('셔츠 파는 페이지입니다.');
 });
 
router.get('/pants', function(요청, 응답){ //shop을 제거해서 사용할수 있다.
응답.send('바지 파는 페이지입니다.');
}); 

module.exports = router; //자바스크립트 파일을 다른 파일에서 출력하겠다.