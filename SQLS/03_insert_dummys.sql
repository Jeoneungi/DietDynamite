-- [[ INDEX ]]
-- 1. TYPE
    -- 1) BOARD_TYPE

     
-- 2. ESSEENTIAL

    
-- ========================================================================================================
-- 1. TYPE =========================================================

-- 1-1. 게시판타입
INSERT INTO "BOARD_TYPE" ("TYPE_NO", "TYPE_NAME") VALUES (1, '일기');
INSERT INTO "BOARD_TYPE" ("TYPE_NO", "TYPE_NAME") VALUES (2, '챌린지');

-- 1-2. 일기 더미데이터 100개.
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
              0, 'N', SYSDATE, SYSDATE, NULL
      );
   END LOOP;
END;

COMMIT;

-- 2. ESSEENTIAL =========================================================
-- 2-1. 지도 즐겨찾기
INSERT INTO "FAVORITE_PLACES" VALUES(
693704766,SEQ_USER_NO.NEXTVAL,'바이젝월드피트니스', 37.00000 , 127.00000, '서울 강남구 역삼동',
'02-3333-3333','피트니스센터','헬스장');
COMMIT;


-- 2-2. 로그인 유저 임시 (현재 암호화 미적용상태)

INSERT INTO USER_INFO VALUES (SEQ_USER_NO.NEXTVAL, 'a','a','test@test.com','불타는김밥','19900101','M',
                            '/resources/images/profile/user_img1.jpg','A', DEFAULT,NULL, 180,70);
INSERT INTO USER_INFO VALUES (SEQ_USER_NO.NEXTVAL, 'b','b','test@test.com','불타는유저','19900101','M',
                            '/resources/images/profile/user_img1.jpg','U', DEFAULT,NULL, 180,70);
INSERT INTO USER_INFO VALUES (SEQ_USER_NO.NEXTVAL, 'c','c','test@test.com','불타는감자','19900101','M',
                            '/resources/images/profile/user_img1.jpg','A', DEFAULT,NULL, 180,70);
INSERT INTO USER_INFO VALUES (SEQ_USER_NO.NEXTVAL, 'd','d','test@test.com','불타는주먹','19900101','M',
                            '/resources/images/profile/user_img1.jpg','A', DEFAULT,NULL, 180,70);
INSERT INTO USER_INFO VALUES (SEQ_USER_NO.NEXTVAL, 'e','e','test@test.com','불타는옥수수','19900101','M',
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

-- 2-6. 메시지 읽음 시간 업데이트 (유저 1번이 방 1번 읽음)
UPDATE CHAT_ROOM_MEMBER SET LAST_READ_TIME = DEFAULT
WHERE ROOM_NO = 1
AND USER_NO = 1;

COMMIT;
 