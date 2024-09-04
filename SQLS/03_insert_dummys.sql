-- [[ INDEX ]]
-- 1. TYPE
    -- 1) COMM_TYPE
    -- 2) LIKE_TYPE
    -- 3) PLAYER POSITION
    -- 4) REPLY_TYPE
    -- 5) REPORT_TYPE
    -- 6) REPORT_VIOLATION_TYPE
     
-- 2. ESSEENTIAL

    
-- ========================================================================================================
-- 1. TYPE =========================================================





-- 2. ESSEENTIAL =========================================================
-- 2-1. 지도 즐겨찾기
INSERT INTO places
VALUES (SEQ_PLACES_NO.NEXTVAL, '스윗 포테이토', 37.0000000, 
            125.0000000, '서울시' , '02-123-1234');
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

-- 2-3. 채팅방 데이터 임시
INSERT INTO CHAT_ROOM VALUES(SEQ_CHAT_ROOM_NO.nextval, '채팅방1', DEFAULT, 1);
INSERT INTO CHAT_ROOM VALUES(SEQ_CHAT_ROOM_NO.nextval, '그룹채팅방1', DEFAULT, 1);
INSERT INTO CHAT_ROOM VALUES(SEQ_CHAT_ROOM_NO.nextval, '그룹채팅방2', DEFAULT, 1); -- 개설자 1번

COMMIT;

-- 2-4. 채팅방 참가자 데이터 임시
INSERT INTO CHAT_ROOM_MEMBER VALUES(1,1, DEFAULT);  -- 채팅방 1번, 유저 1 추가 (생성자 본인도 참가자에 추가)
INSERT INTO CHAT_ROOM_MEMBER VALUES(1,2, DEFAULT);  -- 채팅방 1번, 유저 2 추가 (현재 시간까지는 읽음)
INSERT INTO CHAT_ROOM_MEMBER VALUES(2,1, DEFAULT);  -- 채팅방 2번, 유저 1 추가 (생성자 본인도 참가자에 추가)
INSERT INTO CHAT_ROOM_MEMBER VALUES(2,2, DEFAULT);  -- 채팅방 2번, 유저 2 추가 (현재 시간까지는 읽음)
INSERT INTO CHAT_ROOM_MEMBER VALUES(2,3, DEFAULT);  -- 채팅방 2번, 유저 3 추가 (현재 시간까지는 읽음)
INSERT INTO CHAT_ROOM_MEMBER VALUES(3,1, DEFAULT);  -- 채팅방 3번, 유저 1 추가 (생성자 본인도 참가자에 추가)
INSERT INTO CHAT_ROOM_MEMBER VALUES(3,2, DEFAULT);  -- 채팅방 3번, 유저 2 추가 (현재 시간까지는 읽음)
INSERT INTO CHAT_ROOM_MEMBER VALUES(3,3, DEFAULT);  -- 채팅방 3번, 유저 3 추가 (현재 시간까지는 읽음)
INSERT INTO CHAT_ROOM_MEMBER VALUES(3,4, DEFAULT);  -- 채팅방 3번, 유저 4 추가 (현재 시간까지는 읽음)
INSERT INTO CHAT_ROOM_MEMBER VALUES(3,5, DEFAULT);  -- 채팅방 3번, 유저 5 추가 (현재 시간까지는 읽음)

COMMIT;

-- 2-5. 메시지 생성 임시
INSERT INTO "MESSAGE" VALUES(SEQ_MESSAGE_NO.nextval, 'ㅋㅌㅊㅋㅌㅊ', 1, 1, DEFAULT);            -- 1번 유저가, 1번방에서 메시지씀
INSERT INTO "MESSAGE" VALUES(SEQ_MESSAGE_NO.nextval, 'ㅋㅌㄷㄳㅍㅊ', 2, 1, DEFAULT);            -- 2번 유저가, 1번방에서 메시지씀
INSERT INTO "MESSAGE" VALUES(SEQ_MESSAGE_NO.nextval, 'ㅋㅡㅠㅜㅌㅊ', 1, 1, DEFAULT);            -- 1번 유저가, 1번방에서 메시지씀
INSERT INTO "MESSAGE" VALUES(SEQ_MESSAGE_NO.nextval, 'ㅋㅌㄷㄳㄷㄱㅌㅊ', 1, 1, DEFAULT);        -- 1번 유저가, 1번방에서 메시지씀
INSERT INTO "MESSAGE" VALUES(SEQ_MESSAGE_NO.nextval, 'ㅋㅌㅊㅋㅌㅊ퓿퓨ㅊ', 1, 2, DEFAULT);      -- 1번 유저가, 2번방에서 메시지씀
INSERT INTO "MESSAGE" VALUES(SEQ_MESSAGE_NO.nextval, 'ㅊ퓿퓿퓨', 1, 2, DEFAULT);               -- 1번 유저가, 2번방에서 메시지씀
INSERT INTO "MESSAGE" VALUES(SEQ_MESSAGE_NO.nextval, 'ㅋㅌㅊㅋㅊ퓿퓨ㅌㅊ', 2, 2, DEFAULT);      -- 2번 유저가, 2번방에서 메시지씀
INSERT INTO "MESSAGE" VALUES(SEQ_MESSAGE_NO.nextval, 'ㅊ퓿퓨', 3, 2, DEFAULT);                 -- 3번 유저가, 2번방에서 메시지씀
INSERT INTO "MESSAGE" VALUES(SEQ_MESSAGE_NO.nextval, 'ㅊㅍ푸', 3, 2, DEFAULT);                 -- 3번 유저가, 2번방에서 메시지씀
INSERT INTO "MESSAGE" VALUES(SEQ_MESSAGE_NO.nextval, '퓨ㅜ퓨ㅜ', 3, 2, DEFAULT);                -- 3번 유저가, 2번방에서 메시지씀

COMMIT;