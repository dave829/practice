var 후보군 = Array(45)
    .fill()
    .map(function(요소,인덱스){
    return 인덱스 + 1;
});
    console.log(후보군);

var 셔플 = [];

while (후보군.length > 0 ){  
  var 이동값 = 후보군.splice(Math.floor(Math.random() * 후보군.length) , 1 )[0];
    셔플.push(이동값); 
}
console.log(셔플);

var 보너스 = 셔플[셔플.length - 1];
var 당첨숫자들 = 셔플.slice(0 , 6); 

console.log('당첨숫자들',당첨숫자들.sort(function(a , b){
return a - b;
}), '보너스' , 보너스);



// for(var i = 0;i < 당첨숫자들.length;i += 1){  // for문은 여기선 클로져 문제때매 안쓰고
//     setTimeout(function 비동기콜백함수(){
//     var 공 = document.createElement('div');
//     공.textContent = 당첨숫자들[i];
//     결과창.appendChild(공);
//     }, 1000); //밀리초 1000밀리초는 1초임! 
// }
    // var 공 = document.createElement('div');
    // 공.textContent = 보너스;
    // 결과창.appendChild(공);

    ///////////////////////////////////////////////////////////////////
    ///////////////////코드새로수정부분////////////////////////////////////////////////
//이 윗 부분 for문에 클로져 문제 다시 코드 작성!!! 아랫부분에다 작성할꼐요!
// for(var i = 0;i < 당첨숫자들.length;i ++ ){ 
//     (function 클로져(j){ 
//         setTimeout(function (){
//         var 공 = document.createElement('div');
//         공.textContent = 당첨숫자들[j];
//         결과창.appendChild(공);
//         }, 1000); 
//         })(i);
//     }
///////////////////////////////////////////////////////////////////
    ///////////////////코드새로수정부분////////////////////////////////////////////////

    var 결과창 = document.querySelector('#결과창');

    function 공색칠하기 (숫자 , 결과창){
        var 공 = document.createElement('div');
        공.textContent = 숫자;
        공.style.display = 'inline-block';
        공.style.border = '1px solid black';
        공.style.borderRadius = '10px';
        공.style.width = '20px';
        공.style.height = '20px';
        공.style.textAlign = 'center';
        공.style.marginRight = '10px';
       
        //공.id = '공아이디' + 숫자; // 이렇게 아이디로 할수도있고
        공.className = '공아이디' + 숫자;  // 클래스로 할수도 있음 // 그리고 사실 자바스크립트에서 정의하지말고 css파일안에서 정의하는게 좋다
       // 공.className = '공'; 이렇게 말이다. 이렇게해놓고 html로 가서 정의한다.
        

        공.style.fontSize = '12px';

        var 배경색;

        if(숫자 <= 10){
            배경색 = 'red';
        }else if(숫자 <= 20) {
            배경색 = 'orange';
        }else if(숫자 <= 30){
            배경색 = 'yellow';
        }else if(숫자 <= 40){
            배경색 = 'blue';
        }else{
            배경색 = 'green';
        }
        공.style.background = 배경색;
        결과창.appendChild(공);
    }

        //수정된 코드 (클로져 적용한 코드임)
    for(var i = 0 ; i < 당첨숫자들.length ; i++){
        (function 클로져(j){
            setTimeout(function (){
                공색칠하기(당첨숫자들[j], 결과창);
            }, (j + 1) * 1000);
            })(i);
    };

        setTimeout(function(){
        var 칸 = document.querySelector('.보너스'); //여기서 클래스에만 [0]을 붙이는 이유는 아이디는 한번만쓸수있는데, 클래스는 여러번 쓸수있기떄문에 식별을위해서 [0] 이런식으로 번호를 찾아주어야한다
        공색칠하기(보너스,칸);
        } , 7000);