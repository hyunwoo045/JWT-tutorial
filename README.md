# JSON Web Token

JSON Web Token 튜토리얼 레파지토리 입니다.

예제 연습 코드와 학습 기록을 남기는데에 주 목적이 있습니다.

Velopert 님의 강의를 참고로 만듭니다.

[Express Server에서 JWT 구현하기](https://velopert.com/2448)

# 목차

- [JSON Web Token](#JSON-Web-Token)
  - [JWT 생김새](#JWT-생김새)
    - [Header](#Header)
    - [Payload](#Payload)
    - [Signature](#Signature)
- [프로젝트 생성 및 설정](#프로젝트-생성-및-설정)

<br />

---

## JSON Web Token

JSON Web Token (이하: JWT)는 웹표준으로 두 개체에서 JSON 객체를 사용하여 가볍고 자가수용적인 방식으로 정보를 안전성 있게 전달해준다.

수 많은 프로그래밍 언어에서 지원되고, 자가 수용적이며 (모든 정보를 자체적으로 지니고 있음, 토큰의 기본정보, 전달할 정보, 토큰이 검증되었음을 증명하는 signature), 쉽게 전달할 수 있다 (HTTP 헤더에 넣어 전달할수도, URL의 파라미터로 전달할 수도 있음).

회원 인증, 즉 로그인 세션 유지와 같은 상황에서 가장 흔히 사용된다.

### JWT 생김새

`aaaaaa.bbbbbb.cccccc`

`a 파트`: 헤더(header) <br/>
`b 파트`: 내용(payload) <br/>
`c 파트`: 서명(signature) <br/>

<br/>

### Header

헤더는 2가지의 정보를 지니고 있다.

- typ: 토큰의 타입을 지정한다.
- alg: 해싱 알고리즘을 지정한다. 보통 `HMAC SHA256` 혹은 `RSA`가 사용되며, 토큰을 검증할 때 사용되는 signature 부분에서 사용된다.

ex)

```json
// 알고리즘으로 `HMAC SHA256` 을 사용한 예제
{
  "typ": "JWT",
  "alg": "HS256"
}
```

<br />

### Payload

정보(payload) 부분에는 토큰에 담을 정보가 들어있다. 여기서 정보의 한 조각을 `클레임(claim)` 이라고 부르며 key/value 와 같이 `name / value` 형식의 쌍으로 이루어져 있다. 이 부분에 여러 개의 클레임들을 넣을 수 있다.

클레임은 크게 세 분류로 나눌 수 있다.

- 등록된(`registered`) 클레임 <br/>
  토큰에 대한 정보를 담기 위해 이름이 이미 정해져 있는 클레임들. 이 것들을 사용하는 것은 모두 옵션이다. 아래와 같은 클레임들이 있다.
  - `iss` : 토큰 발급자
  - `sub` : 토큰 제목
  - `aud` : 토큰 대상자
  - `exp` : 토큰 만료시간
  - `nbf` : Not Before 를 의미하며, 토큰 활성 날짜와 비슷한 개념.
  - `iat` : 토큰이 발급된 시간.
  - `jti` : JWT의 고유 식별자. 중복 처리를 방지하기 위해 사용됨.
- 공개(`public`) 클레임
  충돌이 방지된 이름을 가지고 있어야 한다. 충돌을 방지하기 위해서는 클레임 이름을 URI 형식으로 짓는다.

```json
{
  "https://velopert.com/jwt_claims/is_admin": true
}
```

- 비공개(`priavted`) 클레임
  보통 양 측 (클라이언트 <-> 서버) 협의 하에 사용되는 클레임 이름들. 공개 클레임과 달리 이름이 중복되어 충돌이 될 수 있으니 사용할 때 유의해야 함.

```json
{
  "username": "moonsdog"
}
```

<br/>

### Signature

서명(signature) 부분에는 헤더의 인코딩값과 정보의 인코딩값을 합친 후 주어진 비밀키로 해쉬를 하여 생성한다.

예를 들어 헤더를 인코딩한 값이 `aaaaaa` 이고 정보를 인코딩한 값이 `bbbbbb` 이라하면 `aaaaaa.bbbbbb`를 `secret`으로 해싱을 하고 `base64 인코딩`한 결과값이 서명 부분이다.

<br/>

## 프로젝트 생성 및 설정

express generator 를 이용하여 간단하게 express 환경을 구축.

```
$ express jwt-tutorial --view=pug
```

아래와 같은 모듈을 추가 설치한다

- jsonwebtoken : 이 프로젝트의 핵심 모듈. JWT를 손쉽게 생성하고 검증까지 해줌.
- mysql : 이 서버에서 MySQL 를 사용할 수 있게 해줌.

```
$ npm install jsonwebtoken
$ npm install mysql
```

## 라우터 설정
