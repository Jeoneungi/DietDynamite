-- [[ INDEX ]]
-- 1. TYPE
    -- 1) COMM_TYPE
    -- 2) LIKE_TYPE
    -- 3) PLAYER POSITION
    -- 4) REPLY_TYPE
    -- 5) REPORT_TYPE
    -- 6) REPORT_VIOLATION_TYPE
     
-- 2. ESSEENTIAL
    -- 1) STADIUM
    -- 2) TEAMS
    -- 3) PLAYER
    -- 4) MATCH
    -- 5) USER
    -- 6) COMM
    
-- ========================================================================================================

-- 1. TYPE =========================================================
-- 1-1) COMM_TYPE ----------------------------------------
INSERT INTO places
VALUES (SEQ_PLACES_NO.NEXTVAL, '스윗 포테이토', 37.0000000, 
            125.0000000, '서울시' , '02-123-1234');
COMMIT;
