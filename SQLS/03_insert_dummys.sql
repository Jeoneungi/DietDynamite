-- [[ INDEX ]]
-- 1. TYPE


     
-- 2. ESSEENTIAL
-- 2-1 TYPE 번호 
INSERT INTO "REPLY_TYPE" VALUES(1,'일반 게시글');
INSERT INTO "REPLY_TYPE" VALUES(2,'다이어트 레시피');
INSERT INTO "REPLY_TYPE" VALUES(3,'지도 상세');
INSERT INTO "REPLY_TYPE" VALUES(4,'음식 정보');

COMMIT;

-- 2-2. 게시판타입
INSERT INTO "BOARD_TYPE" ("TYPE_NO", "TYPE_NAME") VALUES (1, '일기');
INSERT INTO "BOARD_TYPE" ("TYPE_NO", "TYPE_NAME") VALUES (2, '챌린지');

COMMIT;

-- 2-3 좋아요 타입 
INSERT INTO LIKE_TYPE (LIKE_TYPE_NO, LIKE_TYPE) VALUES (1, '게시글');
INSERT INTO LIKE_TYPE (LIKE_TYPE_NO, LIKE_TYPE) VALUES (2, '댓글');
INSERT INTO LIKE_TYPE (LIKE_TYPE_NO, LIKE_TYPE) VALUES (3, '다이어트레시피');

COMMIT;

-- 2-4 운동통계타입
INSERT INTO WORKOUT_AN_TYPE VALUES (1, '땅에서 거리 운동');
INSERT INTO WORKOUT_AN_TYPE VALUES (2, '물에서 거리 운동');
INSERT INTO WORKOUT_AN_TYPE VALUES (3, '가슴운동');
INSERT INTO WORKOUT_AN_TYPE VALUES (4, '등운동');
INSERT INTO WORKOUT_AN_TYPE VALUES (5, '배운동');
INSERT INTO WORKOUT_AN_TYPE VALUES (6, '다리운동');
INSERT INTO WORKOUT_AN_TYPE VALUES (7, '기타');
INSERT INTO WORKOUT_AN_TYPE VALUES (8, '팔운동');

COMMIT;


    
-- ========================================================================================================

-- 2-1. 로그인 유저 임시 (현재 암호화 미적용상태)
                                                       -- a
INSERT INTO USER_INFO VALUES (SEQ_USER_NO.NEXTVAL, 'a','$2a$10$TitYxIQ8xBOuzRZ66qFJ2.KL5Ogup4FfYQmLQsJrhdAy3V4.XQa7a','test@test.com','불타는김밥','19900101','M',
                            '/resources/images/profile/user_img1.jpg','A', DEFAULT,NULL, 180,70);

                                                       -- b
INSERT INTO USER_INFO VALUES (SEQ_USER_NO.NEXTVAL, 'b','$2a$10$SWcZb6kgoAb3IGTDwgbWY.hZpaiLtQghcod85EwL66mwJlND3pJPe','test@test.com','불타는유저','19900101','M',
                            '/resources/images/profile/user_img1.jpg','U', DEFAULT,NULL, 180,70);

                                                       -- c
INSERT INTO USER_INFO VALUES (SEQ_USER_NO.NEXTVAL, 'c','$2a$10$KtM4eqNjJ0M8vYVvJ6g/duCcHUZwE20uQqMG/bP2GrvOZD0LJizIy','test@test.com','불타는감자','19900101','M',
                            '/resources/images/profile/user_img1.jpg','A', DEFAULT,NULL, 180,70);

                                                       -- d
INSERT INTO USER_INFO VALUES (SEQ_USER_NO.NEXTVAL, 'd','$2a$10$cIUV1bsJ6px76w56Xr2U0eHwlNoYU.d7PwjopwxEmZU9T9gZpzF.W','test@test.com','불타는주먹','19900101','M',
                            '/resources/images/profile/user_img1.jpg','A', DEFAULT,NULL, 180,70);

                                                       -- e
INSERT INTO USER_INFO VALUES (SEQ_USER_NO.NEXTVAL, 'e','$2a$10$BRAk2FIgUTQhA4gTU.WFJ.6PutM3OCiBmplgX/sw90hFT9xy161QC','test@test.com','불타는옥수수','19900101','M',
                            '/resources/images/profile/user_img1.jpg','A', DEFAULT,NULL, 180,70);

INSERT INTO USER_INFO VALUES (SEQ_USER_NO.NEXTVAL, 'f','$2a$10$BRAk2FIgUTQhA4gTU.WFJ.6PutM3OCiBmplgX/sw90hFT9xy161QC','test@test.com','불타는옥수수assda','19900101','M',
                            '/resources/images/profile/user_img1.jpg','A', DEFAULT,NULL, 180,70);

INSERT INTO USER_INFO VALUES (SEQ_USER_NO.NEXTVAL, 'f','$2a$10$BRAk2FIgUTQhA4gTU.WFJ.6PutM3OCiBmplgX/sw90hFT9xy161QC','test@test.com','불타는옥수수assda','19900101','M',
                            '/resources/images/profile/user_img1.jpg','A', DEFAULT,NULL, 180,70);

COMMIT;

INSERT INTO USER_HISTORY VALUES(SEQ_HISTORY_NO.NEXTVAL, 1, DEFAULT, DEFAULT, '13.123.15.23');
INSERT INTO USER_HISTORY VALUES(SEQ_HISTORY_NO.NEXTVAL, 1, DEFAULT, 'Y', '13.123.15.23');
INSERT INTO USER_HISTORY VALUES(SEQ_HISTORY_NO.NEXTVAL, 1, DEFAULT, 'Y', '13.123.15.23');
INSERT INTO USER_HISTORY VALUES(SEQ_HISTORY_NO.NEXTVAL, 1, DEFAULT, 'Y', '13.123.15.23');
INSERT INTO USER_HISTORY VALUES(SEQ_HISTORY_NO.NEXTVAL, 1, DEFAULT, DEFAULT, '13.123.15.23');
INSERT INTO USER_HISTORY VALUES(SEQ_HISTORY_NO.NEXTVAL, 1, DEFAULT, DEFAULT, '13.123.15.23');
COMMIT;



-- 2-2 지도 이미지 추가
INSERT INTO "PLACE_IMG" VALUES(26307587 , '라그릴리아 SPC스퀘어점',
't1.kakaocdn.net/thumb/T800x0.q50/?fname=http://t1.daumcdn.net/place/0DE3B91211874EEBA2B19D0E7967606A');

INSERT INTO "PLACE_IMG" VALUES(7983060 , '신동궁감자탕 역삼직영점',
't1.kakaocdn.net/thumb/T800x0.q50/?fname=http://t1.daumcdn.net/place/8F3B594E174D44AB9C4558D42A432488');

INSERT INTO "PLACE_IMG" VALUES(1684702238 , '크리스피프레시 선릉점',
't1.kakaocdn.net/thumb/T800x0.q50/?fname=http://t1.daumcdn.net/place/C3C1E1B9396F44CA8A2CACF481FBD490');

INSERT INTO "PLACE_IMG" VALUES(677970364 , '보울레시피 강남선릉점',
't1.kakaocdn.net/thumb/T800x0.q50/?fname=http://t1.kakaocdn.net/fiy_reboot/place/9DC984EF01DA433DBF3609735581BF10');

INSERT INTO "PLACE_IMG" VALUES(21801668 , '샐러디 선릉점',
't1.kakaocdn.net/thumb/T800x0.q50/?fname=http://t1.daumcdn.net/place/873F2429461C4FBEB19522DD1CAC3DB9');

COMMIT;

-- 2.2. 지도 즐겨찾기 추가
INSERT INTO FAVORITE_PLACES (FP_API_ID, USER_NO, FP_NAME, FP_LATITUDE, FP_LONGITUDE, FP_ADDRESS, FP_PHONE, FP_MAJOR_CATEGORY, FP_MINOR_CATEGORY)
VALUES (26307587, 1, '초록밭', 37.499582154338356, 127.05162512267073, '서울 강남구 대치동 921-2', '010-7677-9317', '음식점' , '샐러드');

COMMIT;



-- 2-3. 채팅방 데이터
INSERT INTO CHAT_ROOM VALUES(SEQ_CHAT_ROOM_NO.nextval, '채팅방1', DEFAULT, 1);

COMMIT;

-- 2-4. 채팅방 참가자 데이터 (3번째 파라미터 -> 현재 시간까지는 읽음)
INSERT INTO CHAT_ROOM_MEMBER VALUES(1,1, DEFAULT);  -- 채팅방 1번, 유저 1 추가 (생성자 본인도 참가자에 추가)
INSERT INTO CHAT_ROOM_MEMBER VALUES(1,2, DEFAULT);  -- 채팅방 1번, 유저 2 추가 

COMMIT;

-- 2-5. 메시지 생성
INSERT INTO "MESSAGE" VALUES(SEQ_MESSAGE_NO.nextval, 'ㅋㅌㅊㅋㅌㅊ', 1, 1, DEFAULT);            -- 1번 유저가, 1번방에서 메시지씀
INSERT INTO "MESSAGE" VALUES(SEQ_MESSAGE_NO.nextval, 'ㅋㅌㄷㄳㅍㅊ', 2, 1, DEFAULT);            -- 2번 유저가, 1번방에서 메시지씀
INSERT INTO "MESSAGE" VALUES(SEQ_MESSAGE_NO.nextval, 'ㅋㅡㅠㅜㅌㅊ', 1, 1, DEFAULT);            -- 1번 유저가, 1번방에서 메시지씀
INSERT INTO "MESSAGE" VALUES(SEQ_MESSAGE_NO.nextval, 'ㅋㅌㄷㄳㄷㄱㅌㅊ', 1, 1, DEFAULT);        -- 1번 유저가, 1번방에서 메시지씀

COMMIT;




-- 3-2. 일기 더미데이터 100개.

BEGIN
   FOR I IN 1..100 LOOP
      INSERT INTO BOARD(
             BOARD_NO, USER_NO, BOARD_TYPE, CHALLENGE_NO, 
          BOARD_TITLE, BOARD_CONTENT, BOARD_CNT, BOARD_ST, 
          CREATE_DT, UPDATE_DT, BOARD_IMG)
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              1, 
              1,
              NULL,
              SEQ_BOARD_NO.CURRVAL || '번째 게시글',
              SEQ_BOARD_NO.CURRVAL || '번째 게시글 내용 입니다.',
              0, 'N', SYSDATE, SYSDATE, '/resources/images/diary/diaryWork.jpg'
      );
   END LOOP;
   COMMIT;
END;
/

BEGIN
   FOR I IN 1..100 LOOP
      INSERT INTO BOARD(
             BOARD_NO, USER_NO, BOARD_TYPE, CHALLENGE_NO, 
          BOARD_TITLE, BOARD_CONTENT, BOARD_CNT, BOARD_ST, 
          CREATE_DT, UPDATE_DT, BOARD_IMG)
      VALUES( SEQ_BOARD_NO.NEXTVAL,
              2, 
              1,
              NULL,
              SEQ_BOARD_NO.CURRVAL || '번째 게시글',
              SEQ_BOARD_NO.CURRVAL || '번째 게시글 내용 입니다.',
              0, 'N', SYSDATE, SYSDATE, '/resources/images/diary/diaryWork.jpg'
      );
   END LOOP;
   COMMIT;
END;
/

-- 3-3 레시피 더미 100개 추가
BEGIN
   FOR I IN 1..100 LOOP
      INSERT INTO RECIPE(
             RECIPE_NO, USER_NO, RECIPE_TITLE, RECIPE_CONTENT, RECIPE_INGREDIENT, 
          RECIPE_PRICE, RECIPE_COOKTIME, RECIPE_CAL, RECIPE_HYDRO, 
          RECIPE_PROTEIN, RECIPE_FAT, RECIPE_SOD,RECIPE_FIBER,RECIPE_CNT,RECIPE_ST
          ,RECIPE_CREATE_DT,RECIPE_UPDATE_DT,RECIPE_IMG,RECIPE_URL)
      VALUES( SEQ_RECIPE_NO.NEXTVAL,1,
              SEQ_RECIPE_NO.CURRVAL || '번째 레시피', '레시피 설명',
              '레시피 재료',
              10000, '1시간3분', 1,1,1,1,1,1,1,DEFAULT,DEFAULT,DEFAULT ,
              NULL,NULL
      );
   END LOOP;
   COMMIT;
END;
/
-- 4. 댓글 추가



-- 4-2 좋아요

-- 5. 음식데이터 (임시)
INSERT INTO FOOD (FOOD_NO, FOOD_NAME, FOOD_TYPE, FOOD_CAL, FOOD_PROTEIN, FOOD_FAT, FOOD_HYDRO, FOOD_SUGAR, FOOD_FIBER, FOOD_SOD, FOOD_COL, FOOD_SAT_FAT, FOOD_TRANS_FAT, FOOD_WEIGHT, FOOD_MANUFACTURE, FOOD_CNT)
VALUES (SEQ_FOOD_NO.NEXTVAL, '33한체다치즈팝콘', '과자', 478, 9.34, 19.5, 66.2, 4.58, 0, 594, 11.9, 11.6, 0, 150, '대한푸드텍(주)', 0);

INSERT INTO FOOD (FOOD_NO, FOOD_NAME, FOOD_TYPE, FOOD_CAL, FOOD_PROTEIN, FOOD_FAT, FOOD_HYDRO, FOOD_SUGAR, FOOD_FIBER, FOOD_SOD, FOOD_COL, FOOD_SAT_FAT, FOOD_TRANS_FAT, FOOD_WEIGHT, FOOD_MANUFACTURE, FOOD_CNT)
VALUES (SEQ_FOOD_NO.NEXTVAL, 'CGV시그니처스위트팝콘', '과자', 529, 4.29, 28.57, 64.29, 22.86, 0, 221, 0, 7.14, 0, 70, '(주)제이앤이', 0);

INSERT INTO FOOD (FOOD_NO, FOOD_NAME, FOOD_TYPE, FOOD_CAL, FOOD_PROTEIN, FOOD_FAT, FOOD_HYDRO, FOOD_SUGAR, FOOD_FIBER, FOOD_SOD, FOOD_COL, FOOD_SAT_FAT, FOOD_TRANS_FAT, FOOD_WEIGHT, FOOD_MANUFACTURE, FOOD_CNT)
VALUES (SEQ_FOOD_NO.NEXTVAL, 'dardaby커널스슈퍼믹스팝콘', '과자', 473, 4, 20, 72.73, 34.55, 0, 182, 16.36, 9.09, 0, 55, '(주)제이앤이', 0);

COMMIT;
-- 6. 운동데이터
INSERT INTO WORKOUT VALUES (1, '바벨 스쿼트', 1 , '근력', 6, 6, 0 ); 
INSERT INTO WORKOUT VALUES (2, '다트', 1 , '기타', 2.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (3, '야구 캐치볼', 1 , '기타', 2.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (4, '당구', 1 , '스포츠', 2.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (5, '요가', 1 , '기타', 2.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (6, '하타 요가', 1 , '기타', 2.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (7, '파워요가', 1 , '기타', 4, 7, 0 ); 
INSERT INTO WORKOUT VALUES (8, '수리야 나마스까 요가', 1 , '기타', 3.3, 7, 0 ); 
INSERT INTO WORKOUT VALUES (9, '나디소다나 요가', 1 , '기타', 2, 7, 0 ); 
INSERT INTO WORKOUT VALUES (10, '스트레칭(가볍게)', 1 , '기타', 2.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (11, '낚시', 1 , '기타', 3, 7, 0 ); 
INSERT INTO WORKOUT VALUES (12, '대청소', 1 , '기타', 3, 7, 0 ); 
INSERT INTO WORKOUT VALUES (13, '세차', 1 , '기타', 3, 7, 0 ); 
INSERT INTO WORKOUT VALUES (14, '볼링', 1 , '스포츠', 3, 7, 0 ); 
INSERT INTO WORKOUT VALUES (15, '유연체조', 1 , '기타', 3.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (16, '타이치', 1 , '기타', 4, 7, 0 ); 
INSERT INTO WORKOUT VALUES (17, '수중 에어로빅', 1 , '스포츠', 4, 7, 0 ); 
INSERT INTO WORKOUT VALUES (18, '팔굽혀펴기(격렬하게)', 1 , '맨손체조', 8, 3, 0 ); 
INSERT INTO WORKOUT VALUES (19, '푸쉬업(가볍게)', 1 , '맨손체조', 3, 3, 0 ); 
INSERT INTO WORKOUT VALUES (20, '푸쉬업(격렬하게)', 1 , '맨손체조', 8, 3, 0 ); 
INSERT INTO WORKOUT VALUES (21, '런지(보통으로)', 1 , '맨손체조', 3.8, 6, 0 ); 
INSERT INTO WORKOUT VALUES (22, '레그 레이즈', 1 , '맨손체조', 5, 6, 0 ); 
INSERT INTO WORKOUT VALUES (23, '와일드 런지', 1 , '맨손체조', 5.5, 6, 0 ); 
INSERT INTO WORKOUT VALUES (24, '윗몸일으키기(가볍게)', 1 , '맨손체조', 2.8, 5, 0 ); 
INSERT INTO WORKOUT VALUES (25, '윗몸일으키기(격렬하게)', 1 , '맨손체조', 8, 5, 0 ); 
INSERT INTO WORKOUT VALUES (26, '크런치(가볍게)', 1 , '맨손체조', 3, 5, 0 ); 
INSERT INTO WORKOUT VALUES (27, '크런치(격렬하게)', 1 , '맨손체조', 8, 5, 0 ); 
INSERT INTO WORKOUT VALUES (28, '스쿼트', 1 , '근력', 5.5, 6, 0 ); 
INSERT INTO WORKOUT VALUES (29, '탁구랠리', 1 , '스포츠', 4, 7, 0 ); 
INSERT INTO WORKOUT VALUES (30, '태극권', 1 , '스포츠', 4, 7, 0 ); 
INSERT INTO WORKOUT VALUES (31, '아쿠아로빅', 1 , '기타', 4, 7, 0 ); 
INSERT INTO WORKOUT VALUES (32, '골프', 1 , '스포츠', 4.8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (33, '라인댄스', 1 , '스포츠', 7.8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (34, '체스트 프레스', 1 , '근력', 5, 3, 0 ); 
INSERT INTO WORKOUT VALUES (35, '제자리뛰기', 1 , '맨손체조', 5.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (36, '배드민턴 랠리', 1 , '스포츠', 4.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (37, '농구슈팅 연습', 1 , '기타', 4.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (38, '재즈댄스', 1 , '스포츠', 4.8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (39, '트위스트 댄스', 1 , '스포츠', 4.8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (40, '헬스(격렬하게)', 1 , '근력', 7.8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (41, '테니스 복식경기', 1 , '스포츠', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (42, '레프팅', 1 , '기타', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (43, '에어로빅(저강도)', 1 , '맨손체조', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (44, '에어로빅(중강도)', 1 , '맨손체조', 6.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (45, '에어로빅(고강도)', 1 , '맨손체조', 7.3, 7, 0 ); 
INSERT INTO WORKOUT VALUES (46, '댄스(가볍게)', 1 , '스포츠', 4.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (47, '살사댄스', 1 , '스포츠', 4.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (48, '플라멩고', 1 , '스포츠', 4.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (49, '포크댄스', 1 , '스포츠', 7.8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (50, '다이어트 댄스', 1 , '스포츠', 4.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (51, '볼륨댄스', 1 , '스포츠', 5.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (52, '스포츠댄스', 1 , '스포츠', 5.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (53, '댄스스포츠', 1 , '스포츠', 5.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (54, '탱고', 1 , '스포츠', 5.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (55, '테니스 단식경기', 1 , '스포츠', 7, 7, 0 ); 
INSERT INTO WORKOUT VALUES (56, '스케이팅', 1 , '스포츠', 7, 7, 0 ); 
INSERT INTO WORKOUT VALUES (57, '재즈사이즈', 1 , '기타', 6, 7, 0 ); 
INSERT INTO WORKOUT VALUES (58, '웨이트운동(보통으로) - 전신', 1 , '근력', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (59, '웨이트운동(가볍게) - 전신', 1 , '근력', 3.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (60, '저항성운동(가볍게) - 전신', 1 , '근력', 3.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (61, '보디빌딩(격렬하게)', 1 , '근력', 6, 7, 0 ); 
INSERT INTO WORKOUT VALUES (62, '보디빌딩(가볍게)', 1 , '근력', 3.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (63, '레그 프레스', 1 , '근력', 5, 6, 0 ); 
INSERT INTO WORKOUT VALUES (64, '아령들기', 1 , '근력', 5.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (65, '훌라후프', 1 , '기타', 5.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (66, '캠핑', 1 , '기타', 2.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (67, '케틀벨', 1 , '근력', 5.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (68, '스텝박스', 1 , '유산소', 5.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (69, '스크린골프', 1 , '기타', 4, 7, 0 ); 
INSERT INTO WORKOUT VALUES (70, '턱걸이(보통으로)', 1 , '근력', 5, 4, 0 ); 
INSERT INTO WORKOUT VALUES (71, '풀업(가볍게) - 상지(어깨)', 1 , '근력', 2.8, 4, 0 ); 
INSERT INTO WORKOUT VALUES (72, '풀업(보통으로) - 상지(어깨)', 1 , '근력', 3.8, 4, 0 ); 
INSERT INTO WORKOUT VALUES (73, '로프운동', 1 , '기타', 6, 7, 0 ); 
INSERT INTO WORKOUT VALUES (74, '스키', 1 , '스포츠', 6, 7, 0 ); 
INSERT INTO WORKOUT VALUES (75, '스키(가볍게)', 1 , '스포츠', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (76, '스키머신(보통으로)', 1 , '기타', 6.8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (77, '풋살', 1 , '스포츠', 8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (78, '족구', 1 , '스포츠', 5.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (79, '에어로빅', 1 , '스포츠', 6, 7, 0 ); 
INSERT INTO WORKOUT VALUES (80, '야구피칭', 1 , '스포츠', 6, 7, 0 ); 
INSERT INTO WORKOUT VALUES (81, '권투펀칭', 1 , '기타', 6, 7, 0 ); 
INSERT INTO WORKOUT VALUES (82, '댄스(고강도)', 1 , '스포츠', 7, 7, 0 ); 
INSERT INTO WORKOUT VALUES (83, '고정식자전거타기(30~50 Watts)', 1 , '유산소', 3.5, 6, 0 ); 
INSERT INTO WORKOUT VALUES (84, '고정식자전거타기(90~100 Watts)', 1 , '유산소', 6.8, 6, 0 ); 
INSERT INTO WORKOUT VALUES (85, '고정식자전거타기(161~200 Watts)', 1 , '유산소', 11, 6, 0 ); 
INSERT INTO WORKOUT VALUES (86, '고정식자전거타기(약하게)', 1 , '유산소', 5.5, 6, 0 ); 
INSERT INTO WORKOUT VALUES (87, '축구연습', 1 , '스포츠', 7, 7, 0 ); 
INSERT INTO WORKOUT VALUES (88, '스피닝', 1 , '유산소', 9, 7, 0 ); 
INSERT INTO WORKOUT VALUES (89, '서키트 트레이닝(격렬하게)', 1 , '기타', 8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (90, '배구시합', 1 , '스포츠', 8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (91, '아이스하키', 1 , '스포츠', 8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (92, '농구시합', 1 , '스포츠', 8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (93, '줄넘기(빠르게)', 1 , '유산소', 9, 7, 0 ); 
INSERT INTO WORKOUT VALUES (94, '축구시합', 1 , '스포츠', 10, 7, 0 ); 
INSERT INTO WORKOUT VALUES (95, '라켓볼 시합', 1 , '스포츠', 10, 7, 0 ); 
INSERT INTO WORKOUT VALUES (96, '킥복싱', 1 , '스포츠', 10, 7, 0 ); 
INSERT INTO WORKOUT VALUES (97, '암벽등반', 1 , '스포츠', 11, 7, 0 ); 
INSERT INTO WORKOUT VALUES (98, '캠프 단체훈련(예, 해병대 캠프 등)', 1 , '기타', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (99, '파워워킹', 1 , '유산소', 6, 7, 0 ); 
INSERT INTO WORKOUT VALUES (100, '모던댄스', 1 , '스포츠', 4.8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (101, '트래킹', 1 , '유산소', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (102, '고정식자전거타기(보통으로)', 1 , '유산소', 7, 6, 0 ); 
INSERT INTO WORKOUT VALUES (103, '고정식자전거타기(51~89 Watts)', 1 , '유산소', 4.8, 6, 0 ); 
INSERT INTO WORKOUT VALUES (104, '고정식자전거타기(101~160 Watts)', 1 , '유산소', 8.8, 6, 0 ); 
INSERT INTO WORKOUT VALUES (105, '고정식자전거타기(201~270 Watts)', 1 , '유산소', 14, 6, 0 ); 
INSERT INTO WORKOUT VALUES (106, '실내자전거타기', 1 , '유산소', 7, 6, 0 ); 
INSERT INTO WORKOUT VALUES (107, '라켓볼연습', 1 , '스포츠', 7, 7, 0 ); 
INSERT INTO WORKOUT VALUES (108, '축구 프리킥 차기', 1 , '스포츠', 7, 7, 0 ); 
INSERT INTO WORKOUT VALUES (109, '비치발리볼', 1 , '스포츠', 8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (110, '맨손 줄넘기', 1 , '유산소', 7, 7, 0 ); 
INSERT INTO WORKOUT VALUES (111, '줄넘기(천천히)', 1 , '유산소', 8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (112, '산악자전거(보통으로)', 1 , '스포츠', 8.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (113, '프리스비 얼티메이트', 1 , '근력', 8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (114, '태권도', 1 , '스포츠', 10, 7, 0 ); 
INSERT INTO WORKOUT VALUES (115, '스쿼시', 1 , '스포츠', 12, 7, 0 ); 
INSERT INTO WORKOUT VALUES (116, '건강증진 비디오 게임 격렬하게(예, 위피트 등)', 1 , '기타', 7.2, 7, 0 ); 
INSERT INTO WORKOUT VALUES (117, '커브스 30분 여성 순환운동', 1 , '기타', 3.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (118, '팔굽혀펴기(가볍게)', 1 , '맨손체조', 3, 3, 0 ); 
INSERT INTO WORKOUT VALUES (119, '팔굽혀펴기(보통으로)', 1 , '맨손체조', 5, 3, 0 ); 
INSERT INTO WORKOUT VALUES (120, '푸쉬업(보통으로)', 1 , '맨손체조', 5, 3, 0 ); 
INSERT INTO WORKOUT VALUES (121, '니킥', 1 , '기타', 5.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (122, '런지(격렬하게)', 1 , '맨손체조', 8, 6, 0 ); 
INSERT INTO WORKOUT VALUES (123, '사이드 런지', 1 , '맨손체조', 5.5, 6, 0 ); 
INSERT INTO WORKOUT VALUES (124, '윗몸일으키기(보통으로)', 1 , '맨손체조', 3.8, 5, 0 ); 
INSERT INTO WORKOUT VALUES (125, '복근운동(가볍게)', 1 , '근력', 2.8, 5, 0 ); 
INSERT INTO WORKOUT VALUES (126, '복근운동(격렬하게)', 1 , '근력', 8, 5, 0 ); 
INSERT INTO WORKOUT VALUES (127, '크런치(보통으로)', 1 , '맨손체조', 5, 6, 0 ); 
INSERT INTO WORKOUT VALUES (128, '점프 스쿼트', 1 , '맨손체조', 6, 6, 0 ); 
INSERT INTO WORKOUT VALUES (129, '코어운동', 1 , '근력', 4.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (130, '렛풀다운', 1 , '근력', 5, 4, 0 ); 
INSERT INTO WORKOUT VALUES (131, '헬스(보통으로)', 1 , '근력', 5.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (132, '근력운동(전신)', 1 , '근력', 5.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (133, '하체 근력운동', 1 , '근력', 5, 6, 0 ); 
INSERT INTO WORKOUT VALUES (134, '웨이트운동(격렬하게) - 전신', 1 , '근력', 6, 7, 0 ); 
INSERT INTO WORKOUT VALUES (135, '저항성운동(격렬하게) - 전신', 1 , '기타', 6, 7, 0 ); 
INSERT INTO WORKOUT VALUES (136, '저항성운동(보통으로) - 전신', 1 , '기타', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (137, '보디빌딩(보통으로)', 1 , '근력', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (138, '바벨 숄더프레스', 1 , '근력', 5.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (139, '브릿지', 1 , '맨손체조', 3.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (140, '리버스 컬', 1 , '근력', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (141, '턱걸이(가볍게)', 1 , '근력', 3, 7, 0 ); 
INSERT INTO WORKOUT VALUES (142, '턱걸이(격렬하게)', 1 , '근력', 8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (143, '풀업(격렬하게) - 상지(어깨)', 1 , '근력', 8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (144, '서키트 트레이닝(보통으로)', 1 , '기타', 4.3, 7, 0 ); 
INSERT INTO WORKOUT VALUES (145, '트램폴린(레크레이션적인)', 1 , '기타', 3.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (146, '트램폴린(경쟁적인)', 1 , '기타', 4.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (147, '타바타 운동', 1 , '기타', 8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (148, '발레(일반적인)', 1 , '기타', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (149, '발레(격렬하게)', 1 , '기타', 6.8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (150, '점핑운동(레크레이션적인)', 1 , '기타', 3.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (151, '점핑운동(경쟁적인)', 1 , '기타', 4.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (152, '검도', 1 , '스포츠', 6, 7, 0 ); 
INSERT INTO WORKOUT VALUES (153, '펜싱', 1 , '스포츠', 6, 7, 0 ); 
INSERT INTO WORKOUT VALUES (154, '암워킹', 1 , '기타', 6, 7, 0 ); 
INSERT INTO WORKOUT VALUES (155, '승마운동기구', 1 , '스포츠', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (156, '시티드 로우', 1 , '기타', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (157, '국선도', 1 , '기타', 4.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (158, '양팔줄당기기(야외운동기구)', 1 , '기타', 2.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (159, '근력운동', 1 , '근력', 8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (160, '원 암 덤벨로우', 1 , '근력', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (161, '필라테스(기구)', 1 , '기타', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (162, '슬로우버피(일반적인)', 1 , '기타', 5.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (163, '풀 스쿼트', 1 , '근력', 6, 7, 0 ); 
INSERT INTO WORKOUT VALUES (164, '복근운동(보통으로)', 1 , '근력', 3.8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (165, '헬스(가볍게)', 1 , '근력', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (166, '디스코 댄스', 1 , '스포츠', 7.8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (167, '줌바댄스', 1 , '스포츠', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (168, '상체 근력운동', 1 , '근력', 5.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (169, '유도', 1 , '스포츠', 10, 7, 0 ); 
INSERT INTO WORKOUT VALUES (170, '건강증진 비디오 게임 보통으로(예, 위피트 등)', 1 , '기타', 3.8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (171, '배드민턴 시합', 1 , '스포츠', 7, 7, 0 ); 
INSERT INTO WORKOUT VALUES (172, '고정식자전거(격렬하게)', 1 , '유산소', 10.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (173, '런지(가볍게)', 1 , '맨손체조', 2.8, 6, 0 ); 
INSERT INTO WORKOUT VALUES (174, '복싱', 1 , '스포츠', 7.8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (175, '트위스트 런', 1 , '기타', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (176, '워킹런지', 1 , '맨손체조', 5.5, 1, 0 ); 
INSERT INTO WORKOUT VALUES (177, '프롭테라피', 1 , '기타', 3.8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (178, '박스점프', 1 , '기타', 5.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (179, '암풀다운', 1 , '근력', 4, 7, 0 ); 
INSERT INTO WORKOUT VALUES (180, '시티드로우', 1 , '기타', 4, 7, 0 ); 
INSERT INTO WORKOUT VALUES (181, '스텝밀', 1 , '기타', 7, 7, 0 ); 
INSERT INTO WORKOUT VALUES (182, '덤벨 바디 로테이션', 1 , '근력', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (183, '트라이셉스 푸시 다운', 1 , '근력', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (184, '제자리 걷기', 1 , '유산소', 2, 6, 0 ); 
INSERT INTO WORKOUT VALUES (185, '레그 익스텐션', 1 , '근력', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (186, '이두 컬', 1 , '근력', 5, 8, 0 ); 
INSERT INTO WORKOUT VALUES (187, '해머 컬', 1 , '근력', 5, 8, 0 ); 
INSERT INTO WORKOUT VALUES (188, '덩키킥', 1 , '맨손체조', 7, 7, 0 ); 
INSERT INTO WORKOUT VALUES (189, '허리돌리기(야외운동기구)', 1 , '맨손체조', 2.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (190, '팔돌리기(야외운동기구)', 1 , '맨손체조', 2.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (191, '등허리지압기(야외운동기구)', 1 , '기타', 2.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (192, '크로스 핏', 1 , '스포츠', 8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (193, '마운팅클라이밍', 1 , '스포츠', 7, 7, 0 ); 
INSERT INTO WORKOUT VALUES (194, '음파진동기', 1 , '기타', 2.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (195, '와이드 스쿼트', 1 , '근력', 5.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (196, '배구연습(일반적인)', 1 , '스포츠', 4, 7, 0 ); 
INSERT INTO WORKOUT VALUES (197, '폼롤러', 1 , '기타', 3, 7, 0 ); 
INSERT INTO WORKOUT VALUES (198, '인클라인 벤치 프레스', 1 , '근력', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (199, '스탠딩 카프 레이즈', 1 , '근력', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (200, '백 익스텐션', 1 , '근력', 3.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (201, '버티기', 1 , '기타', 1, 7, 0 ); 
INSERT INTO WORKOUT VALUES (202, '할로우 보디홀드', 1 , '기타', 3, 7, 0 ); 
INSERT INTO WORKOUT VALUES (203, '홈트레이닝-유산소운동', 1 , '유산소', 7, 7, 0 ); 
INSERT INTO WORKOUT VALUES (204, '렛 풀 다운', 1 , '근력', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (205, '게이트볼', 1 , '스포츠', 3, 7, 0 ); 
INSERT INTO WORKOUT VALUES (206, '킥 백', 1 , '맨손체조', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (207, '사이드 밴드', 1 , '기타', 3.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (208, '사이드 크런치', 1 , '맨손체조', 4, 7, 0 ); 
INSERT INTO WORKOUT VALUES (209, '벤트 오버 레터럴 레이즈', 1 , '근력', 5.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (210, '밸리댄스', 1 , '스포츠', 4.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (211, '버피테스트', 1 , '기타', 83, 7, 0 ); 
INSERT INTO WORKOUT VALUES (212, '덤벨 프레스', 1 , '근력', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (213, '방송댄스', 1 , '기타', 7, 7, 0 ); 
INSERT INTO WORKOUT VALUES (214, '주짓수_시합, 격렬하게', 1 , '스포츠', 10.3, 7, 0 ); 
INSERT INTO WORKOUT VALUES (215, '국민체조', 1 , '맨손체조', 3.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (216, '파크골프', 1 , '기타', 4.3, 7, 0 ); 
INSERT INTO WORKOUT VALUES (217, '어시스트 풀업', 1 , '근력', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (218, '스포츠클라이밍', 1 , '기타', 7, 7, 0 ); 
INSERT INTO WORKOUT VALUES (219, '힙 어브덕션', 1 , '근력', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (220, '행잉 레그레이즈', 1 , '근력', 10, 7, 0 ); 
INSERT INTO WORKOUT VALUES (221, '세라밴드', 1 , '기타', 3.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (222, '마운틴 클라이머', 1 , '스포츠', 7, 7, 0 ); 
INSERT INTO WORKOUT VALUES (223, '슬릭부스트', 1 , '근력', 7, 7, 0 ); 
INSERT INTO WORKOUT VALUES (224, '랫플다운', 1 , '근력', 4, 7, 0 ); 
INSERT INTO WORKOUT VALUES (225, '팔굽혀매달리기', 1 , '기타', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (226, '폴댄스', 1 , '스포츠', 5.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (227, '태보', 1 , '기타', 7, 7, 0 ); 
INSERT INTO WORKOUT VALUES (228, '레그 레이즈', 1 , '근력', 3.4, 7, 0 ); 
INSERT INTO WORKOUT VALUES (229, '벤트 오버 바벨 로우', 1 , '근력', 5.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (230, '제기차기', 1 , '기타', 3, 7, 0 ); 
INSERT INTO WORKOUT VALUES (231, '플라잉 요가', 1 , '기타', 4, 7, 0 ); 
INSERT INTO WORKOUT VALUES (232, '리어델트 머신', 1 , '근력', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (233, '케이블 크로스 오버', 1 , '근력', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (234, '씨름', 1 , '스포츠', 6, 7, 0 ); 
INSERT INTO WORKOUT VALUES (235, '플랭크', 1 , '맨손체조', 3.8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (236, '레그 컬', 1 , '근력', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (237, '루마니안 데드리프트', 1 , '근력', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (238, '앉아서 다리들기', 1 , '맨손체조', 2.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (239, '레터럴 레이즈', 1 , '근력', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (240, '타바타운동', 1 , '기타', 9, 7, 0 ); 
INSERT INTO WORKOUT VALUES (241, '마이마운틴', 1 , '기타', 5.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (242, '누워서 걷기', 1 , '맨손체조', 3.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (243, '킥복싱', 1 , '스포츠', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (244, '백 스쿼트', 1 , '근력', 6, 7, 0 ); 
INSERT INTO WORKOUT VALUES (245, '15초인터벌트레이닝!', 1 , '기타', 8.8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (246, '스쿼트 덤벨 프레스', 1 , '근력', 7, 7, 0 ); 
INSERT INTO WORKOUT VALUES (247, '고전무용', 1 , '기타', 6, 7, 0 ); 
INSERT INTO WORKOUT VALUES (248, '평행봉', 1 , '기타', 5.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (249, '스티프 레그 데드리프트', 1 , '근력', 8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (250, '덤벨 숄더프레스', 1 , '근력', 5.5, 3, 0 ); 
INSERT INTO WORKOUT VALUES (251, '철봉매달리기', 1 , '기타', 3.8, 4, 0 ); 
INSERT INTO WORKOUT VALUES (252, '트라이셉스 익스텐션', 1 , '근력', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (253, '펙덱 플라이', 1 , '근력', 5.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (254, '벤치 프레스', 1 , '근력', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (255, '짐볼운동', 1 , '기타', 3.8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (256, '108배', 1 , '기타', 2, 7, 0 ); 
INSERT INTO WORKOUT VALUES (257, '덤벨 플라이', 1 , '근력', 5.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (258, '버피테스트', 1 , '기타', 7, 7, 0 ); 
INSERT INTO WORKOUT VALUES (259, '주짓수_훈련, 연습', 1 , '스포츠', 5.3, 7, 0 ); 
INSERT INTO WORKOUT VALUES (260, '국궁', 1 , '스포츠', 4.3, 7, 0 ); 
INSERT INTO WORKOUT VALUES (261, '기체조', 1 , '기타', 4.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (262, '일립티컬', 1 , '근력', 6, 7, 0 ); 
INSERT INTO WORKOUT VALUES (263, '크로스 크런치', 1 , '맨손체조', 4.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (264, '아쉬탕가 요가', 1 , '기타', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (265, '딥스', 1 , '기타', 5.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (266, '악력기 운동', 1 , '기타', 1.3, 7, 0 ); 
INSERT INTO WORKOUT VALUES (267, '버드독', 1 , '기타', 3.8, 5, 0 ); 
INSERT INTO WORKOUT VALUES (268, '컨벤셔널 데드리프트', 1 , '근력', 8, 4, 0 ); 
INSERT INTO WORKOUT VALUES (269, '탁구시합', 1 , '스포츠', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (270, 'EMS트레이닝', 1 , '기타', 7, 7, 0 ); 
INSERT INTO WORKOUT VALUES (271, '사이드 플랭크', 1 , '맨손체조', 3.8, 5, 0 ); 
INSERT INTO WORKOUT VALUES (272, '고블릿 스쿼트', 1 , '근력', 5.5, 6, 0 ); 
INSERT INTO WORKOUT VALUES (273, 'AB 롤아웃', 1 , '기타', 8, 5, 0 ); 
INSERT INTO WORKOUT VALUES (274, '로드바이크', 1 , '유산소', 8.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (275, '플로터킥', 1 , '맨손체조', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (276, '사이드 레그레이즈', 1 , '맨손체조', 4, 5, 0 ); 
INSERT INTO WORKOUT VALUES (277, '벽 스쿼트', 1 , '기타', 5, 6, 0 ); 
INSERT INTO WORKOUT VALUES (278, 'TRX 운동', 1 , '기타', 7, 7, 0 ); 
INSERT INTO WORKOUT VALUES (279, '월볼샷', 1 , '기타', 6, 5, 0 ); 
INSERT INTO WORKOUT VALUES (280, '시티드 니업', 1 , '맨손체조', 5, 5, 0 ); 
INSERT INTO WORKOUT VALUES (281, '데드 리프트', 1 , '근력', 5.5, 4, 0 ); 
INSERT INTO WORKOUT VALUES (282, '벤치딥스', 1 , '근력', 3, 3, 0 ); 
INSERT INTO WORKOUT VALUES (283, '고양이자세', 1 , '기타', 3.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (284, '프론트 풀다운', 1 , '근력', 4, 4, 0 ); 
INSERT INTO WORKOUT VALUES (285, '픽시자전거', 1 , '기타', 8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (286, '난타', 1 , '기타', 3.8, 7, 0 ); 
INSERT INTO WORKOUT VALUES (287, '프론트 레이즈', 1 , '근력', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (288, '사이드 레터럴 레이즈', 1 , '근력', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (289, '필라테스', 1 , '기타', 3, 7, 0 ); 
INSERT INTO WORKOUT VALUES (290, '양팔벌려 제자리 뛰기(PT체조)', 1 , '맨손체조', 3, 7, 0 ); 
INSERT INTO WORKOUT VALUES (291, '정구 단식경기(일반적인)', 1 , '스포츠', 7, 7, 0 ); 
INSERT INTO WORKOUT VALUES (292, '정구 복식경기', 1 , '스포츠', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (293, '딥다라인 댄스', 1 , '스포츠', 3, 7, 0 ); 
INSERT INTO WORKOUT VALUES (294, '로우', 1 , '기타', 5, 4, 0 ); 
INSERT INTO WORKOUT VALUES (295, '풀업(턱걸이)', 1 , '기타', 5, 4, 0 ); 
INSERT INTO WORKOUT VALUES (296, '레그 킥 백', 1 , '맨손체조', 5, 6, 0 ); 
INSERT INTO WORKOUT VALUES (297, '프리다이빙', 1 , '스포츠', 7, 7, 0 ); 
INSERT INTO WORKOUT VALUES (298, '힙 쓰러스트', 1 , '근력', 6, 6, 0 ); 
INSERT INTO WORKOUT VALUES (299, '스플릿 스쿼트', 1 , '근력', 5, 6, 0 ); 
INSERT INTO WORKOUT VALUES (300, '새천년체조', 1 , '맨손체조', 3.5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (301, '훌라후프', 1 , '기타', 4, 7, 0 ); 
INSERT INTO WORKOUT VALUES (302, '번지피지오', 1 , '기타', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (303, '스텝퍼', 1 , '기타', 5, 7, 0 ); 
INSERT INTO WORKOUT VALUES (304, '싸이클론', 2 , '스포츠', 7, 1, 0 ); 
INSERT INTO WORKOUT VALUES (305, '사이클론', 2 , '스포츠', 7, 1, 0 ); 
INSERT INTO WORKOUT VALUES (306, '트랙걷기', 2 , '유산소', 4.5, 1, 0 ); 
INSERT INTO WORKOUT VALUES (307, '운동장 걷기', 2 , '유산소', 4.5, 1, 0 ); 
INSERT INTO WORKOUT VALUES (308, '걷기', 2 , '유산소', 4.5, 1, 0 ); 
INSERT INTO WORKOUT VALUES (309, '달리기/걷기', 2 , '유산소', 6, 1, 0 ); 
INSERT INTO WORKOUT VALUES (310, '런닝머신(달리기)', 2 , '유산소', 9, 1, 0 ); 
INSERT INTO WORKOUT VALUES (311, '계단내려가기', 2 , '유산소', 3, 1, 0 ); 
INSERT INTO WORKOUT VALUES (312, '계단오르기', 2 , '유산소', 8, 1, 0 ); 
INSERT INTO WORKOUT VALUES (313, '하이킹', 2 , '유산소', 6, 1, 0 ); 
INSERT INTO WORKOUT VALUES (314, '산책', 2 , '유산소', 4, 1, 0 ); 
INSERT INTO WORKOUT VALUES (315, '산행', 2 , '유산소', 4, 1, 0 ); 
INSERT INTO WORKOUT VALUES (316, '수상스키', 2 , '기타', 6, 2, 0 ); 
INSERT INTO WORKOUT VALUES (317, '수영(자유영)', 2 , '유산소', 6.1, 2, 0 ); 
INSERT INTO WORKOUT VALUES (318, '자유수영', 2 , '유산소', 6, 2, 0 ); 
INSERT INTO WORKOUT VALUES (319, '빠르게 걷기', 2 , '유산소', 6, 1, 0 ); 
INSERT INTO WORKOUT VALUES (320, '모래주머니 차고 걷기', 2 , '기타', 6.8, 1, 0 ); 
INSERT INTO WORKOUT VALUES (321, '속보', 2 , '유산소', 6, 1, 0 ); 
INSERT INTO WORKOUT VALUES (322, '등산', 2 , '유산소', 7, 1, 0 ); 
INSERT INTO WORKOUT VALUES (323, '달리기', 2 , '유산소', 7, 1, 0 ); 
INSERT INTO WORKOUT VALUES (324, '자전거타기', 2 , '유산소', 7, 1, 0 ); 
INSERT INTO WORKOUT VALUES (325, '실내자전거타기(약하게)', 2 , '유산소', 5.5, 1, 0 ); 
INSERT INTO WORKOUT VALUES (326, '조깅', 2 , '유산소', 7, 2, 0 ); 
INSERT INTO WORKOUT VALUES (327, '런닝', 2 , '유산소', 7, 1, 0 ); 
INSERT INTO WORKOUT VALUES (328, '수영(배영)', 2 , '유산소', 8, 2, 0 ); 
INSERT INTO WORKOUT VALUES (329, '하프마라톤', 2 , '유산소', 9, 1, 0 ); 
INSERT INTO WORKOUT VALUES (330, '수영(접영)', 2 , '유산소', 11, 2, 0 ); 
INSERT INTO WORKOUT VALUES (331, '산악자전거(격렬하게)', 2 , '스포츠', 14, 1, 0 ); 
INSERT INTO WORKOUT VALUES (332, 'BMX 자전거타기', 2 , '스포츠', 8.5, 1, 0 ); 
INSERT INTO WORKOUT VALUES (333, '뛰기', 2 , '유산소', 7, 1, 0 ); 
INSERT INTO WORKOUT VALUES (334, '마라톤', 2 , '유산소', 9, 1, 0 ); 
INSERT INTO WORKOUT VALUES (335, '산악자전거 시합', 2 , '스포츠', 16, 1, 0 ); 
INSERT INTO WORKOUT VALUES (336, '런닝머신(걷기)', 2 , '유산소', 4.5, 1, 0 ); 
INSERT INTO WORKOUT VALUES (337, '스쿠버 다이빙', 2 , '기타', 6, 2, 0 ); 
INSERT INTO WORKOUT VALUES (338, '공중걷기', 2 , '맨손체조', 3.5, 1, 0 ); 
INSERT INTO WORKOUT VALUES (339, '뒤로 걷기', 2 , '유산소', 3, 1, 0 ); 
INSERT INTO WORKOUT VALUES (340, '수영(평영)', 2 , '유산소', 5.3, 2, 0 ); 
INSERT INTO WORKOUT VALUES (341, '산악mtB', 2 , '스포츠', 8, 1, 0 ); 
INSERT INTO WORKOUT VALUES (342, '(윈드)서핑', 2 , '스포츠', 5, 2, 0 ); 
INSERT INTO WORKOUT VALUES (343, '조정(로잉머신)', 2 , '기타', 4.8, 2, 0 ); 
INSERT INTO WORKOUT VALUES (344, '인터벌 런닝', 2 , '유산소', 8, 1, 0 ); 
INSERT INTO WORKOUT VALUES (345, '수영(IM)', 2 , '유산소', 8, 2, 0 ); 
INSERT INTO WORKOUT VALUES (346, '맨발걷기', 2 , '유산소', 4.5, 1, 0 ); 
INSERT INTO WORKOUT VALUES (347, '승마(천천히)', 2 , '스포츠', 3.8, 1, 0 ); 
INSERT INTO WORKOUT VALUES (348, '승마(빠르게)', 2 , '스포츠', 5.8, 1, 0 ); 
INSERT INTO WORKOUT VALUES (349, '로드자전거(중강도)', 2 , '유산소', 8, 1, 0 ); 
INSERT INTO WORKOUT VALUES (350, '수중 걷기', 2 , '기타', 3.5, 2, 0 ); 
INSERT INTO WORKOUT VALUES (351, '인라인스케이트', 2 , '스포츠', 5, 1, 0 ); 
INSERT INTO WORKOUT VALUES (352, '노르딕워킹', 2 , '유산소', 6, 1, 0 ); 
INSERT INTO WORKOUT VALUES (353, '(SUP)서핑', 2 , '스포츠', 6, 2, 0 ); 
INSERT INTO WORKOUT VALUES (354, '싸이클', 2 , '유산소', 7, 1, 0 ); 
INSERT INTO WORKOUT VALUES (355, '스케이팅', 2 , '스포츠', 7, 1, 0 ); 
INSERT INTO WORKOUT VALUES (356, '패들보드', 2 , '기타', 6, 2, 0 ); 
COMMIT;

-- 유저 운동일지 
-- 120 : 팔굽혀펴기 // 25 : 윗몸일으키기 // 187 : 해머컬
-- 281 : 데드리프트 // 1  : 스쿼트
-- 310 : 달리기     // 318 : 수영
INSERT INTO USER_WORKOUT VALUES(SEQ_USER_WORKOUT_NO.NEXTVAL, 2, 120, 61, 10, DEFAULT, '2024-09-9', 300);
INSERT INTO USER_WORKOUT VALUES(SEQ_USER_WORKOUT_NO.NEXTVAL, 2, 120, 61, 50, DEFAULT, '2024-09-10', 300);
INSERT INTO USER_WORKOUT VALUES(SEQ_USER_WORKOUT_NO.NEXTVAL, 2, 120, 61, 30, DEFAULT, '2024-09-11', 300);
INSERT INTO USER_WORKOUT VALUES(SEQ_USER_WORKOUT_NO.NEXTVAL, 2, 25, 62, 25, DEFAULT, '2024-09-11', 300);
INSERT INTO USER_WORKOUT VALUES(SEQ_USER_WORKOUT_NO.NEXTVAL, 2, 187, 63, 40, DEFAULT, '2024-09-12', 300);
INSERT INTO USER_WORKOUT VALUES(SEQ_USER_WORKOUT_NO.NEXTVAL, 2, 281, 62, 70, DEFAULT, '2024-09-12', 300);
INSERT INTO USER_WORKOUT VALUES(SEQ_USER_WORKOUT_NO.NEXTVAL, 2, 1, 61, 20, DEFAULT, '2024-09-12', 300);
INSERT INTO USER_WORKOUT VALUES(SEQ_USER_WORKOUT_NO.NEXTVAL, 2, 310, 60, 30, 120, '2024-09-13', 300);
INSERT INTO USER_WORKOUT VALUES(SEQ_USER_WORKOUT_NO.NEXTVAL, 2, 318, 60, 15, 30, '2024-09-13', 300);

COMMIT;

-- 7. 다이어리일기 음식 
INSERT INTO DIARY_FOOD (BOARD_NO, FOOD_NO)
VALUES (100, 1);

INSERT INTO DIARY_FOOD (BOARD_NO, FOOD_NO)
VALUES (99, 1);
COMMIT;

-- 8. 다이어리일기 운동

INSERT INTO DIARY_WORKOUT (BOARD_NO, WORKOUT_NO)
VALUES (100, 1);

INSERT INTO DIARY_WORKOUT (BOARD_NO, WORKOUT_NO)
VALUES (99, 2);

COMMIT;

-- 9.1 챌린지 리스트

INSERT INTO CHALLENGE_LIST VALUES (1, 30, '/resources/images/challenge/breakfast.png', '30일 아침식사 챌린지');
INSERT INTO CHALLENGE_LIST VALUES (2, 30, '/resources/images/challenge/cardio.png', '30일 유산소 운동 챌린지' );
INSERT INTO CHALLENGE_LIST VALUES (3, 30, '/resources/images/challenge/eyebody.png', '30일 눈바디 챌린지' );
INSERT INTO CHALLENGE_LIST VALUES (4, 30, '/resources/images/challenge/scales.png', '30일 몸무게 재기 챌린지' );
INSERT INTO CHALLENGE_LIST VALUES (5, 30, '/resources/images/challenge/stairexercise.png', '30일 계단 운동 챌린지');
INSERT INTO CHALLENGE_LIST VALUES (6, 30, '/resources/images/challenge/stretching.png', '30일 스트레칭 챌린지');

COMMIT;

-- 9.2 CHALLENGE BOARD 더미데이터(BEST-USER 확인용)
INSERT INTO BOARD VALUES(SEQ_BOARD_NO.NEXTVAL ,1,2,3,'너무 좋당','좋았다', 0 ,'N',DEFAULT, DEFAULT , NULL);
INSERT INTO BOARD VALUES(SEQ_BOARD_NO.NEXTVAL ,2,2,3,'너무 좋당','좋았다', 0 ,'N',DEFAULT, DEFAULT , NULL);
INSERT INTO BOARD VALUES(SEQ_BOARD_NO.NEXTVAL ,3,2,3,'너무 좋당','좋았다', 0 ,'N',DEFAULT, DEFAULT , NULL);
INSERT INTO BOARD VALUES(SEQ_BOARD_NO.NEXTVAL ,3,2,3,'너무 좋당','좋았다', 0 ,'N',DEFAULT, DEFAULT , NULL);
INSERT INTO BOARD VALUES(SEQ_BOARD_NO.NEXTVAL ,3,2,3,'너무 좋당','좋았다', 0 ,'N',DEFAULT, DEFAULT , NULL);
INSERT INTO BOARD VALUES(SEQ_BOARD_NO.NEXTVAL ,4,2,3,'너무 좋당','좋았다', 0 ,'N',DEFAULT, DEFAULT , NULL);
INSERT INTO BOARD VALUES(SEQ_BOARD_NO.NEXTVAL ,5,2,3,'너무 좋당','좋았다', 0 ,'N',DEFAULT, DEFAULT , NULL);
INSERT INTO BOARD VALUES(SEQ_BOARD_NO.NEXTVAL ,6,2,3,'너무 좋당','좋았다', 0 ,'N',DEFAULT, DEFAULT , NULL);
INSERT INTO BOARD VALUES(SEQ_BOARD_NO.NEXTVAL ,6,2,3,'너무 좋당','좋았다', 0 ,'N',DEFAULT, DEFAULT , NULL);
COMMIT;


-- 9.3 CHALLENGE _DAILY_RESULT

-- 1번 챌린지 더미(1일 수행)
INSERT INTO CHALLENGE VALUES (2, 1, 1, 'N', 1, DEFAULT);
COMMIT;

-- 2번 챌린지 더미(여러날 수행)



