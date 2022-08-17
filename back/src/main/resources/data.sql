insert into sido values ('0', '서울특별시'),
('0', '부산광역시'),
('0', '대구광역시'),
('0', '인천광역시'),
('0', '광주광역시'),
('0', '대전광역시'),
('0', '울산광역시'),
('0', '세종특별자치시'),
('0', '경기도'),
('0', '강원도'),
('0', '충청도'),
('0', '전라도'),
('0', '경상도'),
('0', '제주도');
insert into age values ('0', '20대'),
('0', '30대'),
('0', '40대'),
('0', '50대 이상');

insert into waiting_room values ('0', '1', now(), '6', '파이썬 초보만', '1', '1');

insert into avatar (image_path, name) values ("액션가면.jpg", "액션가면"),
("헐크.jpg", "헐크"),
("조커.jpg", "조커"),
("지니.jpg", "지니"),
("아기조커.jpg", "아기조커"),
("햄찌우먼.png", "햄찌우먼"),
("수박맨.png", "수박맨"),
("파인잼민.png", "파인잼민"),
("뚱이.png", "뚱이"),
("알린.png", "알린"),
("보노보노.png", "보노보노"),
("고구마.png", "고구마"),
("갈매기곰.png", "갈매기곰"),
("건전지.png", "건전지"),
("기영이.png", "기영이"),
("꼬마돌.png", "꼬마돌"),
("부리부리.png", "부리부리"),
("위장크림.png", "위장크림"),
("토시오.png", "토시오"),
("펩시맨.png", "펩시맨");

insert into user (description, gender, name, profile_image_path, social_id, social_type) values
("testing3", "F", "채윤선", "https://avatimebucket2022.s3.ap-northeast-2.amazonaws.com/%ED%94%84%EB%A1%9C%ED%95%84/profile01.png", "5524137@naver.com", 1),
("testing", "M", "정건우", "https://avatimebucket2022.s3.ap-northeast-2.amazonaws.com/%ED%94%84%EB%A1%9C%ED%95%84/profile01.png", "abcxj123@naver.com", 1),
("testing2", "M", "이주영", "ss.png", "ssafy2@naver.com", 1),
("testing3", "F", "이지나", "ts.png", "ssafy3@naver.com", 1),
("testing", "M", "김찬영", "sf.png", "ssafy@naver.com", 1),
("testing2", "F", "민경욱", "ss.png", "ssafy2@naver.com", 1);

insert into waiting_room_user_relation(type, waiting_room_id, user_id) values
(0, 1, 1),
(1, 1, 2),
(1, 1, 3),
(1, 1, 4),
(1, 1, 5),
(1, 1, 6);

insert into chatting_room (room_id, type) values (1, 2);

insert into profile(image_path, name) values
("https://avatimebucket2022.s3.ap-northeast-2.amazonaws.com/%ED%94%84%EB%A1%9C%ED%95%84/profile01.png", "프로필 1"),
("https://avatimebucket2022.s3.ap-northeast-2.amazonaws.com/%ED%94%84%EB%A1%9C%ED%95%84/profile02.png", "프로필 2"),
("https://avatimebucket2022.s3.ap-northeast-2.amazonaws.com/%ED%94%84%EB%A1%9C%ED%95%84/profile03.png", "프로필 3"),
("https://avatimebucket2022.s3.ap-northeast-2.amazonaws.com/%ED%94%84%EB%A1%9C%ED%95%84/profile04.png", "프로필 4"),
("https://avatimebucket2022.s3.ap-northeast-2.amazonaws.com/%ED%94%84%EB%A1%9C%ED%95%84/profile05.png", "프로필 5"),
("https://avatimebucket2022.s3.ap-northeast-2.amazonaws.com/%ED%94%84%EB%A1%9C%ED%95%84/profile06.png", "프로필 6"),
("https://avatimebucket2022.s3.ap-northeast-2.amazonaws.com/%ED%94%84%EB%A1%9C%ED%95%84/profile07.png", "프로필 7"),
("https://avatimebucket2022.s3.ap-northeast-2.amazonaws.com/%ED%94%84%EB%A1%9C%ED%95%84/profile08.png", "프로필 8"),
("https://avatimebucket2022.s3.ap-northeast-2.amazonaws.com/%ED%94%84%EB%A1%9C%ED%95%84/profile09.png", "프로필 9"),
("https://avatimebucket2022.s3.ap-northeast-2.amazonaws.com/%ED%94%84%EB%A1%9C%ED%95%84/profile10.png", "프로필 10");

insert into balance (a, b) values 
 ('오이케이크 먹기', '김치케이크 먹기'),
 ('모르는 사람 집에 애인속옷', '애인집에 모르는 사람 속옷'),
 ('평생 떡볶이만 먹기', '평생 떡볶이 안 먹기'),
 ('웃고 싶을 때 못 웃음', '울고 싶을 때 못 울음'),
 ('매일 고구마 먹기', '매일 감자 먹기'),
 ('배터리 10%, 인터넷 가능', '배터리 100%, 인터넷 불가'),
 ('일주일 머리 감기 X', '일주일 양치질 X'),
 ('1년 간 핸드폰 안 하고 1억', '그냥 돈 안받고 핸드폰 사용'),
 ('팔만대장경 읽기', '대장 내시경 8만번 하기'),
 ('자도자도 피곤', '먹어도 먹어도 배고픔'),
 ('미래로 가기', '과거로 가기'),
 ('배고픔 참기', '맛있는 것 먹다가 혀 씹기'),
 ('탄산 없는 탄산음료', '녹아서 액체가 된 아이스크림'),
 ('친구의 애인과 바람', '애인의 친구오 바람'),
 ('똥 안 먹었는데 똥 먹었다고 소문나기', '진짜 똥 먹었는데 아무도 모르기'),
 ('스윙칩만 8달 동안 먹기', '스읭스한테 800만원 주기'),
 ('언제 죽을지 알기', '어떻게 죽을지 알기'),
 ('요플레 뚜껑 그냥 버리기', '쭈쭈바 꼬다리 그냥 버리기'),
 ('만원 버스로 30분 출퇴근 (무조건 서서감)', '텅 빈 버스로 90분 출퇴근'),
 ('이사하는 날 짜장면', '비오는 날 파전'),
 ('너무 잘하는 애인', '너무 긴장한 애인'),
 ('남녀 사이 친구 가능', '절대 불가능'),
 ('닭이 먼저!', '계란이 먼저!');

insert into stuff(image_path, name) values
("https://avatimebucket2022.s3.ap-northeast-2.amazonaws.com/stuff/cookie.png", "쿠키"),
("https://avatimebucket2022.s3.ap-northeast-2.amazonaws.com/stuff/hamburger.png", "햄버거"),
("https://avatimebucket2022.s3.ap-northeast-2.amazonaws.com/stuff/donut.png", "도넛"),
("https://avatimebucket2022.s3.ap-northeast-2.amazonaws.com/stuff/pizza.png", "피자");
