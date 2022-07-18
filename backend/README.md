# 웹 기술 Backend

<!-- 필수 항목 -->

## 소개

웹 기술 프로젝트의 Backend 스켈레톤 코드

<!-- 필수 항목 -->

## 기술스택 및 라이브러리

| Project | Version | Description |
| ------- | ------- | ----------- |
| Java    | 1.8     |             |
| Gradle  | 6.7+    | Build Tool  |
| MySQL   |         |             |
|         |         |             |

<!-- 필수 항목 -->

## 개발 환경 구성

Windows 기준 개발 환경 구성 설명

1. OpenJDK 설치
   1. JDK 다운로드 사이트에서 1.8.x 설치 파일 다운로드 및 실행
      - Zulu OpenJDK: https://www.azul.com/downloads/?version=java-8-lts&package=jdk
      - OJDK Build: https://github.com/ojdkbuild/ojdkbuild
   2. 설치 후 명령 프롬프트(cmd) 확인
      ```
      > java -version
      ```
      출력 예)
      ```
      openjdk version "1.8.0_192"
      OpenJDK Runtime Environment (Zulu 8.33.0.1-win64) (build 1.8.0_192-b01)
      OpenJDK 64-Bit Server VM (Zulu 8.33.0.1-win64) (build 25.192-b01, mixed mode)
      ```

2. 데이터베이스 구성 *(이미 설치되어 있거나 원격 DB를 사용하는 경우 설치 부분 생략)*
   1. MySQL 다운로드 사이트에서 Community 설치 파일 다운로드 및 실행
      
      - https://dev.mysql.com/downloads/installer/
   2. MySQL Server, MySQL Shell을 포함하여 설치
   3. DB 및 계정 생성
      - MySQL Shell 실행
         ```
         MySQL  JS > \connect root@localhost
         MySQL  localhost:3306  JS > \sql
         ```
      - DB 생성
         ```sql
         create database IF NOT EXISTS `ssafy_web_db` collate utf8mb4_general_ci;
         ```
      - User 생성
         ```sql
         create user '사용자계정'@'localhost' identified by '비밀번호';
         grant all privileges on ssafy_web_db.* to 'ssafy'@'localhost';
         flush privileges;
         ```
      ```
      
      ```
   
3. IDE 설치 *(이미 설치되어 있거나 IntelliJ 등 다른 편집기를 사용할 경우 생략)*
   1. Eclipse 다운로드 사이트에서 Eclipse IDE 설치 파일 다운로드 및 실행
      - https://www.eclipse.org/downloads/
   2. Eclipse IDE for Enterprise Java and Web Developer 선택하여 설치
   3. Eclipse 실행 후 Encoding 변경
      - [Window] - [Preferences] - [General] - [Content Types] - [Text] - Default Encoding: UTF-8
      - [Window] - [Preferences] - [General] - [Workspace] - Text file encoding: UTF-8
   4. Spring Tools 3 설치
      - [Help] - [Eclipse Marketplace] - sts 검색 후 Spring Tools 3 설치
   5. Lombok 설치
      - [Help] - [Install New Software] - Work with: https://projectlombok.org/p2 입력 후 Lombok 설치 진행
   6. Eclipse 재시작   

4. 스켈레톤 다운로드 및 실행

   1. 프로젝트 다운로드
      ```
      git clone <repo URL>
      ```

   2. Eclipse의 [File] - [Import] - [Grade] - [Existing Gradle Project]에서 backend-java 폴더 선택 후 [Finish]
   
   3. Project Explorer에서 프로젝트 우클릭 후 [Spring] - [Add Spring Nature] 선택
      
   4. src/main/resources/application.properties 수정
   
      ```
   spring.datasource.hikari.username=<사용자 계정>
      spring.datasource.hikari.password=<비밀번호>
      ```
   
   5. [Gradle Tasks] 탭의 [Rub Gradle Tasks] 선택하여 실행




## 디렉토리 구조

```
.
└── main
    ├── generated
    ├── java
    │   └── com
    │       └── ssafy
    │           ├── GroupCallApplication.java
    │           ├── api  /* REST API 요청관련 컨트롤러, 서비스, 요청/응답 모델 정의*/
    │           │   ├── controller
    │           │   │   ├── AuthController.java
    │           │   │   └── UserController.java
    │           │   ├── request
    │           │   │   ├── UserLoginPostReq.java
    │           │   │   └── UserRegisterPostReq.java
    │           │   ├── response
    │           │   │   ├── UserLoginPostRes.java
    │           │   │   └── UserRes.java
    │           │   └── service
    │           │       ├── UserService.java
    │           │       └── UserServiceImpl.java
    │           ├── common /* 공용 유틸, 응답 모델, 인증, 예외처리 관련 정의*/
    │           │   ├── auth
    │           │   │   ├── JwtAuthenticationFilter.java
    │           │   │   ├── SsafyUserDetailService.java
    │           │   │   └── SsafyUserDetails.java
    │           │   ├── exception
    │           │   │   └── handler
    │           │   │       └── NotFoundHandler.java
    │           │   ├── model
    │           │   │   └── response
    │           │   │       └── BaseResponseBody.java
    │           │   └── util
    │           │       ├── JwtTokenUtil.java
    │           │       └── ResponseBodyWriteUtil.java
    │           ├── config /* WebMvc 및 JPA, Security, Swagger 등의 추가 플러그인 설정 정의*/
    │           │   ├── JpaConfig.java
    │           │   ├── SecurityConfig.java
    │           │   ├── SwaggerConfig.java
    │           │   └── WebMvcConfig.java
    │           └── db /* 디비에 저장될 모델 정의 및 쿼리 구현 */
    │               ├── entity
    │               │   ├── BaseEntity.java
    │               │   └── User.java
    │               └── repository
    │                   ├── UserRepository.java
    │                   └── UserRepositorySupport.java
    └── resources
        ├── README.md
        ├── application.properties /* 웹 리소스(서버 host/port, 디비 host/port/계정/패스워드) 관련 설정 정의 */
        ├── babel.config.js
        ├── dist
        ├── package-lock.json
        ├── package.json
        ├── public
```

