const express = require('express');
const app = express(); // express  소환한다.
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true})) 

app.listen(8080, function(){

    console.log('listening on 8080');

});

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
    console.log(요청.body.title);
    console.log(요청.body.name);
});
