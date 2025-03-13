document.addEventListener("DOMContentLoaded", function() {
    showContent('diary', document.querySelector('#main-menu a[href="#"][onclick*="diary"]'));
});

function showContent(contentId, element) {
    
    // 모든 탭 내용 숨기기
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.style.display = 'none';
    });
    
    // 선택한 탭 내용 표시하기
    document.getElementById(contentId).style.display = 'block';

    // 모든 제목의 active 클래스 제거
    const links = document.querySelectorAll('#main-menu a');
    links.forEach(link => {
        link.classList.remove('active');
    });

    // 클릭된 제목에 active 클래스 추가
    element.classList.add('active');
}