<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<div id="recipeInsertModal" class="modal recipeInsertModal">
    <form action="/recipe/insert" method="POST" onsubmit="recipeInsert(event)" enctype="multipart/form-data">
    <div class="modal-content">

        <span class="close-btn fs-16">&times;</span>

        <div class="modal-header">
            <textarea name="recipeTitle" id="recipeTitle">제목 입력</textarea>
        </div>
        <div class="modal-body">


            <div class="sied-box">썸네일 정보</div>
            <div class="nutrition-box">
                비용<input name="recipePrice" placeholder="원 (숫자 만)">
                레시피 설명<input name="recipeContent" placeholder="레시피 설명">
                조리시간<input name="recipeCookTime" placeholder="조리시간">
            </div>


            
            <div class="sied-box">썸네일 사진</div>

        <div class="img-box">
                <div class="boardImg diaryImg">
                    <label for="img0">
                        <img class="preview" src="">
                    </label>
                    <input type="file" name="images" class="inputImage" id="img0" accept="image/*">
                    <span class="delete-image">&times;</span>
                </div>
            </div>

            <div class="sied-box">조리영상</div>

            <div class="url-area">
            URL : <textarea name="recipeUrl"></textarea>
            </div>  

            <div class="sied-box">재료</div>

            <div class="recipeIngredient-area">
                <textarea name="recipeIngredient" id="ingerdient"></textarea>
            </div>


            <div class="sied-box">영양 정보</div>
            <div class="nutrition-box">
                칼로리<input name="recipeCal" class="nutrition" placeholder="칼로리(숫자 만)">
                탄수화물<input name="recipeHydro" class="nutrition" placeholder="탄수화물(숫자 만)">
                단백질<input name="recipeProtein" class="nutrition" placeholder="단백질(숫자 만)">
                지방<input name="recipeFat" class="nutrition" placeholder="지방(숫자 만)">
                나트륨<input name="recipeSod" class="nutrition" placeholder="나트륨(숫자 만)">
                식이섬유<input name="recipeFiber" class="nutrition" placeholder="식이섬유(숫자 만)">
            </div>

        </div>
        <button>등록</button>

    </div>

    </form>
</div>

