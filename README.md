# nodejs
node.js 공부
node.js 설치
1. npm init = package.json 파일 설치 명령어
2. npm install express = 서버 라이브러리
3. powershell 보완오류 처리방법
   powershell 에서 Set-ExecutionPolicy Unrestricted  입력
4. npm install -g nodemon = 서버 파일 저장시 서버 리로드 도와줌
5. npm install body-parser = form 데이터 서버로 쉽게 전송해 주는 라이브러리
6. npm install passport passport-local express-session 로그인, 세션 도와주는 라이브러리      
7. npm install method-override = method를 put delete 전송을 도와주는 라이브러리 
8. npm install multer = 업로드된 파일을 매우 쉽게 저장, 이름변경, 처리할 수 있게 도와주는 라이브러리


-에러 수정-
node:internal/modules/cjs/loader:936
  throw err;
  ^
  ->처리방법 : 터미널에서 npm lnstall 로 해결.(파일 이동이 문제가 되었다고 생각함)
