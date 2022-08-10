insert into sido values ('0', '서울특별시');
insert into sido values ('0', '부산광역시');
insert into sido values ('0', '대구광역시');
insert into sido values ('0', '인천광역시');
insert into sido values ('0', '광주광역시');
insert into sido values ('0', '대전광역시');
insert into sido values ('0', '울산광역시');
insert into sido values ('0', '세종특별자치시');
insert into sido values ('0', '경기도');
insert into sido values ('0', '강원도');
insert into sido values ('0', '충청도');
insert into sido values ('0', '전라도');
insert into sido values ('0', '경상도');
insert into sido values ('0', '제주도');
insert into age values ('0', '20대');
insert into age values ('0', '30대');
insert into age values ('0', '40대');
insert into age values ('0', '50대 이상');
insert into waiting_room values ('0', '1', now(), '6', '파이썬 초보만', '1', '0');

insert into avatar (image_path, name) values ("액션가면.jpg", "액션가면");
insert into avatar (image_path, name) values ("헐크.jpg", "헐크");
insert into avatar (image_path, name) values ("조커.jpg", "조커");
insert into avatar (image_path, name) values ("지니.jpg", "지니");
insert into avatar (image_path, name) values ("아기조커.jpg", "아기조커");
insert into avatar (image_path, name) values ("햄찌우먼.png", "햄찌우먼");
insert into avatar (image_path, name) values ("수박맨.png", "수박맨");

insert into user (description, gender, name, profile_image_path, social_id, social_type) values ("testing3", "F", "채윤선", "https://jira.ssafy.com/secure/useravatar?avatarId=10508", "5524137@naver.com", 1);
insert into user (description, gender, name, profile_image_path, social_id, social_type) values ("testing", "M", "정건우", "https://jira.ssafy.com/secure/useravatar?avatarId=10341", "abcxj123@naver.com", 1);
insert into user (description, gender, name, profile_image_path, social_id, social_type) values ("testing2", "M", "이주영", "ss.png", "ssafy2@naver.com", 1);
insert into user (description, gender, name, profile_image_path, social_id, social_type) values ("testing3", "F", "이지나", "ts.png", "ssafy3@naver.com", 1);
insert into user (description, gender, name, profile_image_path, social_id, social_type) values ("testing", "M", "김찬영", "sf.png", "ssafy@naver.com", 1);
insert into user (description, gender, name, profile_image_path, social_id, social_type) values ("testing2", "F", "민경욱", "ss.png", "ssafy2@naver.com", 1);

insert into waiting_room_user_relation(type, waiting_room_id, user_id) values (0, 1, 1);
insert into waiting_room_user_relation(type, waiting_room_id, user_id) values (1, 1, 2);
insert into waiting_room_user_relation(type, waiting_room_id, user_id) values (1, 1, 3);
insert into waiting_room_user_relation(type, waiting_room_id, user_id) values (1, 1, 4);
insert into waiting_room_user_relation(type, waiting_room_id, user_id) values (1, 1, 5);
insert into waiting_room_user_relation(type, waiting_room_id, user_id) values (1, 1, 6);

insert into chatting_room (room_id, type) values (1, 2);

insert into profile(image_path, name) values
("https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbjG0o2%2FbtrJlz5Xgi5%2F22KkMl1kDkBWLw7lI2t5MK%2Fimg.png", "프로필 1"),
("https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FeHXZTS%2FbtrJlWtej9K%2FlLjeKoY6rh7vxgK0diJ3sk%2Fimg.png", "프로필 2"),
("https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FWgNF2%2FbtrJmrTSP1Y%2F6kQKqaIKJ9aQdaYABbRw5K%2Fimg.png", "프로필 3"),
("https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcebsTT%2FbtrJhkh02Am%2F8EnPBvOdiz708vN8V0xyG0%2Fimg.png", "프로필 4"),
("https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbaWS9w%2FbtrJnbQNBFS%2F31DkltOF58zYwbqErKGkrk%2Fimg.png", "프로필 5"),
("https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FH4MVr%2FbtrJgOiKHw7%2FoKVgzrgvD29Ry0d6ScbKSK%2Fimg.png", "프로필 6"),
("https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FNmqcf%2FbtrJhjKaV6y%2FVdYnXsk8U62veYZaDdmab0%2Fimg.png", "프로필 7"),
("https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbqXPyF%2FbtrJm8NpRnT%2FOksELKJlGWxyEtezs2KPE0%2Fimg.png", "프로필 8"),
("https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbHvdCG%2FbtrJncWsNQU%2FPNINdWNRbMdLesxSus3qS1%2Fimg.png", "프로필 9"),
("https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FTOFpg%2FbtrJn6aJ3Vi%2F5KbgcoyVhn30fIIQ24qnq0%2Fimg.png", "프로필 10");
