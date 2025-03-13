<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!-- Img Change Modal -->
<div class="modal" id="changeImgModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
    <form class="modal-dialog" action="/mypage/changeUserProfileImg" method="post" name="changeImgForm" enctype="multipart/form-data"  onsubmit="return changeImgFn()">  <!-- enctype 중요-->
        <div class="modal-content">
        <div class="modal-header base base__lorange">
            <h1 class="modal-title fs-5" id="commonModalLabel"> 이미지 변경 </h1>
        </div>
        <div class="modal-body">
            <div class="changeImg-section d-flex">
                <div class="changeImg-thumbnail">
                    <p> 이미지 미리보기 </p>
                    <img class="profileThumbnail" src="${loginUser.getUserImage()}" />
                </div>
                <div class="changeImg-input">
                    <div>
                        <p class="fs-14"> 프로필 사진 선택</p>
                        <input type="file" name="inputProfieImg" id="inputProfieImg" accept="image/*">
                    </div>
                    <div>
                        <p class="fs-14"> 기본 이미지로 변경</p>
                        <input type="button" class="btn-small__gray" value="기본 이미지로 변경" onclick="changeImgDefault()">
                    </div>
                </div>
            </div>
        
        </div>
        <div class="modal-footer">
            <button id="cancelBtn" type="button" class=" btn-medium__gray" data-bs-dismiss="modal"> 변경 취소 </button>
            <button id="confirmBtn" type="submit" class=" btn-medium__lorange"> 이미지 변경 </button>
        </div>
        </div>
    </form>
</div>