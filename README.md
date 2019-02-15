# fintech


### 환경설정
아래와 같이 API 키 설정이 되어있습니다.
시스템 환경변수에 아래 두 변수를 설정합니다.
(본인걸 넣으면 되겠네요.. 필요하면 한사람 정해서 공유하면 좋을 거 같구요)

```
KISA_CLIENT_ID 
KISA_CLIENT_SECRET
```

환경변수 설정방법은 여기를 참고하세요

https://kamang-it.tistory.com/entry/%ED%99%98%EA%B2%BD%EB%B3%80%EC%88%98-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0

```
// app/common/config.js
const config = {
  serverUrl: 'https://testapi.open-platform.or.kr',
  clientId : process.env.KISA_CLIENT_ID,
  clientSecret: process.env.KISA_CLIENT_SECRET,
};
```

Database는 Google Cloud에 만들었어요

DB 접속정보는 다음과 같습니다 소스에 셋팅이 되어있으니
별도로 할 필요는 없고, 별도 DB 툴로 접근시 아래 접속 정보 참고해주세요
(방화벽 설정이 되어있는데..kisa ip는 등록했고 외부에서는 안되니 따로 알려주세요. 아니면 아래 DB접속정보를 로컬로 바꿔보면 됩니다.)


```
//app/common/connection.js
const pool = mysql.createPool({
    connectionLimit : 10,
    host     : '34.85.6.250',
    user     : 'fintech',
    password : 'fintech',
    database : 'fintechdb'
  });
```


### Package 구조
```
app
 L common       //설정이나 공통으로 사용되는 유틸저장
 L controller   //  특정 Request를 처리할 Controller
 L route        // 요청을 controller로 연결하는 라우팅 정보
 L service      // 비지니스로직 처리
   L api        //금융 API Ajax 요청 처리 서비스
public          // static file( css, js...)
views           // 화면 템플릿
```

### 사용 라이브러리
axios : http 요청처리

passport: 인증처리 (id/pw 인증만 설정 )

promise-mysql : 기본 mysql 은 callback 위주라 소스가 복잡해져서서 promise로 wrapping한 라이브러리로 변경

