
var 이미지좌표 = 0; //여기서 이미지좌표의 초기값은 0이지만 아래 셋인터벌에의해서 이미지좌료의값이 계속 바뀐다.
var 가위바위보 = { // 딕셔너리자료구조 
    바위:'0',
    가위:'-300px',
    보:'-570px',
}

//console.log(Object.entries(가위바위보));

function 컴퓨터의선택(이미지좌표){
    return Object.entries(가위바위보).find(function(v){
        //console.log('vvvvvvv',v[1]);
        return v[1] === 이미지좌표; //여기서 v[1] 의 1 은 예를들어 v만 찍으면 "보"랑 "-570px"이 같이 뜬다. 그래서 숫자랑 비교해야되니까 v[1]v의 두번쨰배열이 숫자니까 숫자로주고 비교대상도 숫자로주는거다
    })[0]; //배열이 첫번째 꺼(문자)를 가져오게 0으로 준다.// 여기 0을 안주고 예를들어 v만찍으면 "보"랑 "-570px"이 같이 뜬다.그래서 문자만나오게 첫번쨰가 문자니까~
};

var 인터벌;

function 인터벌메이커(){
    인터벌 = setInterval(function(){ // 셋 인터벌은 그냥 글로벌에 정의했기떄문에 자동으로 호출되고 실행되고 (특정간격으로 계속 실행한다) , 참고로 셋타임아웃은 한번실행하고 끝난다.
        if(이미지좌표 === 가위바위보.바위){
            이미지좌표 = 가위바위보.가위;
        }else if(이미지좌표 === 가위바위보.가위){
            이미지좌표 = 가위바위보.보;
        }else{
            이미지좌표 = 가위바위보.바위;
        }
        document.querySelector('#computer').style.background = 
    'url(rcp1.jpeg) ' + 이미지좌표
    },100);
}

인터벌메이커();

//console.log(document.querySelectorAll('.btn'));

var 점수표 = {
    가위:1,
    바위:0,
    보:-1,
};

document.querySelectorAll('.btn').forEach(function(btn){ //쿼리셀렉터는 forEach반복문안에서 쿼리셀렉터를 넣어주면된다.
    btn.addEventListener('click',function(){ 
        clearInterval(인터벌);
        setTimeout(function(){
            인터벌메이커();
        },1000);
        var 나의선택 = this.textContent;
        console.log(나의선택,컴퓨터의선택(이미지좌표));
        // 버튼을 누를때 비교과되어 뭔가가 되야되니까, 즉 클릭이벤트가 일어날때 뭘 할지 이벤트안에(여기에서) 함수에서 기능을 추가해보자!
        
        var 나의점수 = 점수표[나의선택];
        var 컴퓨터점수 = 점수표[컴퓨터의선택(이미지좌표)];
        var 점수차 = 나의점수 - 컴퓨터점수;

        if(점수차 === 0){
            console.log('비겼습니다');
        }else if([-1,2].includes(점수차)){ //배열안의 값들중 ()괄호안의 값과 일치하면 이라는 코드
            console.log('이겼습니다!!');
        }else{
            console.log('졌습니다ㅜㅜ');
        }
        
        //줄이기 전 코드
        // if(나의선택 === '가위'){
        //     if(컴퓨터의선택(이미지좌표) === '가위'){
        //         console.log('비겼습니다.');
        //     }else if(컴퓨터의선택(이미지좌표) === '바위'){
        //         console.log('졌습니다ㅜㅜ');
        //     }else{
        //         console.log('이겼습니다!!');
        //     }
        // }else if(나의선택 === '바위'){
        //     if(컴퓨터의선택(이미지좌표) === '가위'){
        //         console.log('이겼습니다!!');
        //     }else if(컴퓨터의선택(이미지좌표) === '바위'){
        //         console.log('비겼습니다.');
        //     }else{
        //         console.log('졌습니다ㅜㅜ');
        //     }
        // }else if(나의선택 === '보'){
        //     if(컴퓨터의선택(이미지좌표) === '가위'){
        //         console.log('졌습니다ㅜㅜ');
        //     }else if(컴퓨터의선택(이미지좌표) === '바위'){
        //         console.log('이겼습니다!!');
        //     }else{
        //         console.log('비겼습니다.');
        //     }
        // }

                //로직짜보기....
                // 가위 = 1 , 바위 = 0 , 보 = -1 
                // 나/컴퓨터 가위     바위    보
                //  가위    1/1b0    1/0f1   1/-1w2  
                //  바위    0/1w-1   0/0b0   0/-1f1
                //  보     -1/1f-2   -1/0w-1  -1/-1b0

                //규칙
                // 비긴것 b a-a = 0
                // 이긴것 w a-a = -1 , 2
                // 진것 f = else 

    });
});



