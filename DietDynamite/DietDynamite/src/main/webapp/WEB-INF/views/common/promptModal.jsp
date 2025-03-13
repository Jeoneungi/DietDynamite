<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<div class="modal" id="promptModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
    <input type="hidden" name="modalType" value=""/>
  	<div class="modal-dialog">
	    <div class="modal-content">
            <div class="modal-header base__lorange">
	            <h1 class="modal-title" id="commonModalLabel"></h1>
	        </div>
      		<div class="modal-body"></div>
            <div class="modal-btns">
                <button id="acceptBtn" class="btn-medium__lorange" data-bs-dismiss="modal" aria-label="Close"> 확인 </button>
            </div>
	    </div>
  	</div>
</div>