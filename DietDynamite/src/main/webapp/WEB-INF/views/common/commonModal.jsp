<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!-- Modal -->
<div class="modal" id="commonModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="commonModalLabel"></h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      </div>
      <div class="modal-footer">
      	<input type="hidden" name="modalType" value=""/>
        <button id="confirmBtn" type="button" class="btn btn-medium__blue" data-bs-dismiss="modal" onclick="modalConfirm()"> 확인 </button>
     	  <button id="cancelBtn" type="button" class="btn btn-medium__red" data-bs-dismiss="modal" onclick="modalCancel()"> 취소 </button>
      </div>
    </div>
  </div>
</div>