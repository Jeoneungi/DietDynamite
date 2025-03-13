const bestUser = document.getElementById("bestUserList");

fetch("/challenge/bestUser") 
.then(resp => resp.json()) // 응답객체
.then(bestUserList => {
    console.log(bestUserList);
    
    let bestUserHTML = '';
    bestUserList.forEach((user) => {
        bestUserHTML += `<tr>
                          <td class="fc__orange fs-14">${user.rank}</td>
                          <td><img src="${user.userImg}" alt="User Image"></td>
                          <td>${user.userNickname}</td>
                          </tr>`;
    });

    bestUser.innerHTML = bestUserHTML;
})
.catch(err => {
    console.log(err);
});