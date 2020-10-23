var 바디 = document.body;

var 숫자후보 = [1,2,3,4,5,6,7,8,9];

var 숫자배열 = [];


for (var i = 0;i < 4; i ++ ){
     var 뽑은것 = 숫자후보.splice(Math.floor(Math.random() * 9 - i),1)[0]; //pop은 마지막꺼순으로 하나씩 뽑아나가는거다
        숫자배열.push(뽑은것); // push는 앞에서부터 하나씩 넣는것
}
console.log(숫자배열); // 9 8 7 6 이렇게...

var 결과 = document.createElement('h1');
바디.append(결과);


var 폼 = document.createElement('form');
document.body.append(폼);

var 입력창 = document.createElement('input');
//입력창.type = 'number';
폼.append(입력창);
입력창.type = 'text';
입력창.maxLength = 4;


var 버튼 = document.createElement('button');
버튼.textContent = '입력!';
폼.append(버튼);

var 틀린횟수 = 0;
폼.addEventListener('submit' , function(e){  //엔터쳤을때
    e.preventDefault();
        var 답 = 입력창.value;
    //console.log(답,숫자배열,답===숫자배열.join(''));
    if(답===숫자배열.join('')){ //답이 맞으면
        결과.textContent = '홈런';
        입력창.value = '';
        입력창.focus();
        숫자후보 = [1,2,3,4,5,6,7,8,9];
        숫자배열 = [];
        for (var i = 0;i < 4; i ++ ){
            var 뽑은것 = 숫자후보.splice(Math.floor(Math.random() * 9 - i),1)[0]; //pop은 마지막꺼순으로 하나씩 뽑아나가는거다
               숫자배열.push(뽑은것); // push는 앞에서부터 하나씩 넣는것
       }
       console.log(숫자배열);
       틀린횟수 = 0;
    }else{ //답이 틀리면
        var 답배열 = 답.split(''); 
        var 스트라이크 = 0;
        var 볼 = 0;
        틀린횟수 += 1;
        if(틀린횟수 > 3){ //5번 넘어서틀린경우
            결과.textContent = '10회 틀려서 실패! 답은' +숫자배열.join(',')+'입니다';
            입력창.value = '';
            입력창.focus();
            console.log(틀린횟수+'번 틀렸습니다');
            숫자후보 = [1,2,3,4,5,6,7,8,9];
        숫자배열 = [];
        
        for (var i = 0;i < 4; i ++ ){
            var 뽑은것 = 숫자후보.splice(Math.floor(Math.random() * 9 - i),1)[0]; //pop은 마지막꺼순으로 하나씩 뽑아나가는거다
               숫자배열.push(뽑은것); // push는 앞에서부터 하나씩 넣는것
       }
       console.log(숫자배열);
        }
        
        console.log('답이틀리면',답배열);
        for(var i = 0;i<3;i++){
            if(Number(답배열[i])===숫자배열[i]){ //같은자리인지 확인
                스트라이크 += 1;
                console.log('같은자리인지');
            }else if(숫자배열.indexOf(Number(답배열[i])) > -1){ //같은자리는 아니지만 숫자가 겹쳤는지?확인
                볼 += 1; 
                console.log('같은자리는 아니지만 ');
            }
        }
        결과.textContent = 스트라이크 + '스트라이크'+ 볼 + '볼 입니다';
        입력창.focus();
        입력창.value = '';
    }

});