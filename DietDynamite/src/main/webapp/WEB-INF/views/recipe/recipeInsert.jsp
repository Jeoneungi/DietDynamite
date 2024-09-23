<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<div id="recipeInsertModal" class="modal recipeInsertModal">
    <form action="/recipe/insert" method="POST">
    <div class="modal-content">

        <span class="close-btn fs-16">&times;</span>

        <div class="modal-header">
            <textarea name="recipeTitle" id="recipeTitle">제목 입력</textarea>
        </div>
        <div class="modal-body">


            <div class="sied-box">인트로 정보</div>
            <div class="nutrition-box">
                비용<input name="recipePrice" placeholder="원"></input>
                레시피 설명<input name="recipeContent" placeholder="레시피 설명"></input>
                조리시간<input name="recipeCookTime" placeholder="조리시간"></input>
            </div>


            
            <div class="sied-box">썸네일 사진</div>

            <div class="img-area">
                <img src="" alt="">
            </div>

            <div class="sied-box">조리영상</div>

            <div class="url-area">
            </div>  

            <div class="sied-box">재료</div>

            <div class="recipeIngredient-area">
                <textarea name="recipeIngredient" id="ingerdient"></textarea>
            </div>


            <div class="sied-box">영양 정보</div>
            <div class="nutrition-box">
                칼로리<input name="recipeCal" placeholder="칼로리"></input>
                탄수화물<input name="recipeHydro" placeholder="탄수화물"></input>
                단백질<input name="recipeProtein" placeholder="단백질"></input>
                지방<input name="recipeFat" placeholder="지방"></input>
                나트륨<input name="recipeSod" placeholder="나트륨"></input>
                식이섬유<input name="recipeFiber" placeholder="식이섬유"></input>
            </div>

        </div>
        <button>등록</button>

    </div>

    </form>
</div>

