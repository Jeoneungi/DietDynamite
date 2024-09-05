-- [[ INDEX ]]
-- 1. TYPE


     
-- 2. ESSEENTIAL

    
-- ========================================================================================================


-- 2. ESSEENTIAL =========================================================
-- 2-1. 지도 즐겨찾기
INSERT INTO "FAVORITE_PLACES" VALUES(
693704766,SEQ_USER_NO.NEXTVAL,'바이젝월드피트니스', 37.00000 , 127.00000, '서울 강남구 역삼동',
'02-3333-3333','피트니스센터','헬스장');
COMMIT;


-- 2-2. 로그인 유저 임시 (현재 암호화 미적용상태)
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

-- 2-3. 채팅방 데이터
INSERT INTO CHAT_ROOM VALUES(SEQ_CHAT_ROOM_NO.nextval, '채팅방1', DEFAULT, 1);
INSERT INTO CHAT_ROOM VALUES(SEQ_CHAT_ROOM_NO.nextval, '그룹채팅방1', DEFAULT, 1);
INSERT INTO CHAT_ROOM VALUES(SEQ_CHAT_ROOM_NO.nextval, '그룹채팅방2', DEFAULT, 1); -- 개설자 1번

COMMIT;

-- 2-4. 채팅방 참가자 데이터 (3번째 파라미터 -> 현재 시간까지는 읽음)
INSERT INTO CHAT_ROOM_MEMBER VALUES(1,1, DEFAULT);  -- 채팅방 1번, 유저 1 추가 (생성자 본인도 참가자에 추가)
INSERT INTO CHAT_ROOM_MEMBER VALUES(1,2, DEFAULT);  -- 채팅방 1번, 유저 2 추가 
INSERT INTO CHAT_ROOM_MEMBER VALUES(2,1, DEFAULT);  -- 채팅방 2번, 유저 1 추가 (생성자 본인도 참가자에 추가)
INSERT INTO CHAT_ROOM_MEMBER VALUES(2,2, DEFAULT);  -- 채팅방 2번, 유저 2 추가 
INSERT INTO CHAT_ROOM_MEMBER VALUES(2,3, DEFAULT);  -- 채팅방 2번, 유저 3 추가 
INSERT INTO CHAT_ROOM_MEMBER VALUES(3,1, DEFAULT);  -- 채팅방 3번, 유저 1 추가 (생성자 본인도 참가자에 추가)
INSERT INTO CHAT_ROOM_MEMBER VALUES(3,2, DEFAULT);  -- 채팅방 3번, 유저 2 추가 
INSERT INTO CHAT_ROOM_MEMBER VALUES(3,3, DEFAULT);  -- 채팅방 3번, 유저 3 추가 
INSERT INTO CHAT_ROOM_MEMBER VALUES(3,4, DEFAULT);  -- 채팅방 3번, 유저 4 추가 
INSERT INTO CHAT_ROOM_MEMBER VALUES(3,5, DEFAULT);  -- 채팅방 3번, 유저 5 추가 

COMMIT;

-- 2-5. 메시지 생성
INSERT INTO "MESSAGE" VALUES(SEQ_MESSAGE_NO.nextval, 'ㅋㅌㅊㅋㅌㅊ', 1, 1, DEFAULT);            -- 1번 유저가, 1번방에서 메시지씀
INSERT INTO "MESSAGE" VALUES(SEQ_MESSAGE_NO.nextval, 'ㅋㅌㄷㄳㅍㅊ', 2, 1, DEFAULT);            -- 2번 유저가, 1번방에서 메시지씀
INSERT INTO "MESSAGE" VALUES(SEQ_MESSAGE_NO.nextval, 'ㅋㅡㅠㅜㅌㅊ', 1, 1, DEFAULT);            -- 1번 유저가, 1번방에서 메시지씀
INSERT INTO "MESSAGE" VALUES(SEQ_MESSAGE_NO.nextval, 'ㅋㅌㄷㄳㄷㄱㅌㅊ', 1, 1, DEFAULT);        -- 1번 유저가, 1번방에서 메시지씀
INSERT INTO "MESSAGE" VALUES(SEQ_MESSAGE_NO.nextval, 'ㅋㅌㅊㅋㅌㅊ퓿퓨ㅊ', 1, 2, DEFAULT);      -- 1번 유저가, 2번방에서 메시지씀
INSERT INTO "MESSAGE" VALUES(SEQ_MESSAGE_NO.nextval, 'ㅊ퓿퓿퓨', 1, 2, DEFAULT);               -- 1번 유저가, 2번방에서 메시지씀
INSERT INTO "MESSAGE" VALUES(SEQ_MESSAGE_NO.nextval, 'ㅋㅌㅊㅋㅊ퓿퓨ㅌㅊ', 2, 2, DEFAULT);      -- 2번 유저가, 2번방에서 메시지씀
INSERT INTO "MESSAGE" VALUES(SEQ_MESSAGE_NO.nextval, 'ㅊ퓿퓨', 3, 2, DEFAULT);                 -- 3번 유저가, 2번방에서 메시지씀
INSERT INTO "MESSAGE" VALUES(SEQ_MESSAGE_NO.nextval, 'ㅊㅍ푸', 3, 2, DEFAULT);                 -- 3번 유저가, 2번방에서 메시지씀
INSERT INTO "MESSAGE" VALUES(SEQ_MESSAGE_NO.nextval, '메시지썻다', 2, 1, DEFAULT);                -- 2번 유저가, 1번방에서 메시지씀
INSERT INTO "MESSAGE" VALUES(SEQ_MESSAGE_NO.nextval, '퓨ㅜ퓨ㅜ', 2, 1, DEFAULT);                -- 2번 유저가, 1번방에서 메시지씀
INSERT INTO "MESSAGE" VALUES(SEQ_MESSAGE_NO.nextval, '퓨ㅜ퓨ㅜ', 2, 1, DEFAULT);                -- 2번 유저가, 1번방에서 메시지씀
INSERT INTO "MESSAGE" VALUES(SEQ_MESSAGE_NO.nextval, '퓨ㅜ퓨ㅜ', 2, 1, DEFAULT);                -- 2번 유저가, 1번방에서 메시지씀

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

SELECT * FROM USER_SEQUENCES WHERE SEQUENCE_NAME = 'SEQ_USER_NO';
-- USER 테이블에서 존재하는 USER_NO 값을 확인합니다.
SELECT USER_NO FROM "USER_INFO";

COMMIT;