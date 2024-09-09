-- [[ INDEX ]]
-- 1. TYPE


     
-- 2. ESSEENTIAL

    
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

COMMIT;

-- 2.2. 지도 즐겨찾기 추가
INSERT INTO FAVORITE_PLACES (FP_API_ID, USER_NO, FP_NAME, FP_LATITUDE, FP_LONGITUDE, FP_ADDRESS, FP_PHONE, FP_MAJOR_CATEGORY, FP_MINOR_CATEGORY)
VALUES (1455993887, 1, '초록밭', 37.499582154338356, 127.05162512267073, '서울 강남구 대치동 921-2', '010-7677-9317', '음식점' , '샐러드');

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



-- 3-1. 게시판타입
INSERT INTO "BOARD_TYPE" ("TYPE_NO", "TYPE_NAME") VALUES (1, '일기');
INSERT INTO "BOARD_TYPE" ("TYPE_NO", "TYPE_NAME") VALUES (2, '챌린지');

-- 3-2. 일기 더미데이터 100개.

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
              0, 'N', SYSDATE, SYSDATE, NULL
      );
   END LOOP;
   COMMIT;
END;
/

COMMIT;

-- 4-1 좋아요 유형
INSERT INTO LIKE_TYPE (LIKE_TYPE_NO, LIKE_TYPE) VALUES (1, '게시글');
INSERT INTO LIKE_TYPE (LIKE_TYPE_NO, LIKE_TYPE) VALUES (2, '댓글');
INSERT INTO LIKE_TYPE (LIKE_TYPE_NO, LIKE_TYPE) VALUES (3, '다이어트레시피');

-- 4-2 좋아요
INSERT INTO "LIKE" (USER_NO, LIKE_TYPE_NO, LIKE_TARGET_NO)
VALUES (1, 1, 100);
INSERT INTO "LIKE" (USER_NO, LIKE_TYPE_NO, LIKE_TARGET_NO)
VALUES (1, 1, 99);
INSERT INTO "LIKE" (USER_NO, LIKE_TYPE_NO, LIKE_TARGET_NO)
VALUES (1, 1, 98);

COMMIT;