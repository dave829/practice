var 바디 = document.body;
var 테이블 = document.createElement('table');
var 줄들 = [];
var 칸들 = [];
var 턴 = 'X';
var 결과 = document.createElement('div');

var 비동기콜백 = function(이벤트){
    // console.log(이벤트.target);
    // console.log(이벤트.target.parentNode);
    // console.log(이벤트.target.parentNode.parentNode);
    //console.log(이벤트.target.children);
    
    var 몇줄 = 줄들.indexOf(이벤트.target.parentNode);
    // console.log('몇줄',몇줄);

    var 몇칸 = 칸들[몇줄].indexOf(이벤트.target);
    // console.log('몇칸',몇칸);

    if(칸들[몇줄][몇칸].textContent !== '' ){ // 칸이 이미 채워져있는가?
        console.log('빈칸이 아닙니다');
    }else{
        console.log('빈칸 입니다');
        칸들[몇줄][몇칸].textContent = 턴;

        
    //세칸 다 채워졌나?

    var 다참 = false;
    
    //가로선 검사
    if( 
        칸들[몇줄][0].textContent === 턴 && 
        칸들[몇줄][1].textContent === 턴 && 
        칸들[몇줄][2].textContent === 턴 )
        { 
        다참 = true;
        };
    //세로줄 검사
    if( 
        칸들[0][몇칸].textContent === 턴 &&
        칸들[1][몇칸].textContent === 턴 &&
        칸들[2][몇칸].textContent === 턴 
    ){
        다참 = true;
    };

    //대각선 검사
    if(
        몇줄 - 몇칸 === 0 //왼쪽에서 오른쪽으로 대각선 검사 필요한경우
    )
    {
        if(
        칸들[0][0].textContent === 턴 &&
        칸들[1][1].textContent === 턴 &&
        칸들[2][2].textContent === 턴 
        )
        {
            다참 = true;
        }
    }

    if(
        Math.abs(몇줄 - 몇칸) === 2 //오른쪽에서 왼쪽으로 대각선 검사 필요한경우
    )
    {
        if(
        칸들[0][2].textContent === 턴 &&
        칸들[1][1].textContent === 턴 &&
        칸들[2][0].textContent === 턴 
        )
        {
            다참 = true;
        }
    }
            
    }


    //다 찼을경우
    if(다참){
        결과.textContent = 턴 + '님이 승리 하셨습니다'; // 턴+텍스트문자를 결과에 넣어주고 결과 출력
        console.log(턴 , '님이 승리하셨습니다');
        
    
    //초기화 코드
    
        턴 = 'X';
        
        칸들.forEach(function(줄){
            //console.log('줄!!!',줄);
            줄.forEach(function(칸){
                //console.log(칸);
                칸.textContent ='';
            });
        });


    }else{ //다 안찼을경우
        if(턴 === 'X'){
            턴 = 'O';
        }else{
            턴 = 'X';
        }
    }

};

for(var i = 1 ; i <= 3 ; i += 1){
    var 줄 = document.createElement('tr');
    칸들.push([]);
    줄들.push(줄);
    for(var j = 1 ; j <= 3 ; j += 1){
        var 칸 = document.createElement('td');
        줄.appendChild(칸);
        칸들[i - 1].push(칸);
        칸.addEventListener('click',비동기콜백);
    }
    테이블.appendChild(줄);
}
바디.appendChild(테이블);
바디.appendChild(결과); // html화면에 결과를 어펜드 시켜줌

console.log('칸들',칸들,'줄들', 줄들);