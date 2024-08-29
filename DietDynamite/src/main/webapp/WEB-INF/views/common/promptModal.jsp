<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<div class="modal" id="promptModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
    <input type="hidden" name="modalType" value=""/>
  	<div class="modal-dialog">
	    <div class="modal-content">
	      	<div class="modal-header base__blue">
		        <h1 class="modal-title"></h1>
      		</div>
      		<div class="modal-body">
      			<!-- <div class="modal-row">정말 삭제하시겠습니까?</div>  -->
				
				<div class="modal-btns">
					<button id="acceptBtn" class="btn-medium__blue"> 확인 </button>
					<button id="cancelBtn" class="btn-medium__gray" data-bs-dismiss="modal"> 취소 </button>
				</div>
      		</div>
	    </div>
  	</div>
</div>