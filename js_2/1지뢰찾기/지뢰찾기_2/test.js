var a = 'global';
var d = 2;

var x = function (){
    a = 'local';
    var b = 1;
    d;
    
}

x();

for(var i=0;i < 100 ; i++){
    setTimeout(function(){
        console.log(i);
    }, i * 1000);
}

// * 참고로 i * 1000 부분의 시간이 어떻게 돌아가냐면,
// * 1초기다리고 실행 그리고 2초기다리고실행 그리고 3초기다리고실행 ,,,,,99초기다리고실행 이게 전혀 아니고,
// * 그게 아니라
// * 1초와 2초 그리고 3초 이런식으로 간격을 정해주는거다
// * 그래서 1초와 2초사이의 간격이 1초씩 차이가나니까 1초마다 실행이 되는 식이다.
// * 초의 간격의 차이로 봐야된다.
// * 1초 (요사이의 간격이 1초)  2초 (요사이의 간격이 1초)   3초   (요사이의 간격이 1초) 4초........이렇게.....
// * 어떻게보면 스택이 쌓이는거라 보면된다.
// * 1초가 끝났으니 1초뒤에 2초 , 그리고 2초가 끝나면 2초뒤에 3초 이렇게 연결되는,,,,그니까 이미 3초라는 스택이 찍혀있으니 시작은 3초부터 하고 4초에 끝나는거다 그러면 그사이 간격이 1초라는 셈이 되는거다.


//여기서  설명
// 셋타임아웃 함수 안의 익명함수를 딱 봤을때,
// 콘솔로그를 찍는데,
//i 가 있는데 그럼 i는 i가 어딧지 하면서 i를 막 찾는다.
//일단 i는 저 익명함수 안에는 없다
//그럼 스코프를 타고 찾는다. 전역범위에서 찾아야한다.
// 그럼 for문 안에 var i = 0 이라고 딱 선언이 되어있네? i 찾았다 이렇게 되는거다.
// 결과적으로 로그안의 i는 100이 찍힌다.
// 일단 for문은 0.1초만에 빠르게 100번을 다 돈다. 왜냐면 컴퓨터는 엄청 빠르기 때문이다.
// 그래서 i 는 이미 다 돌아서 100이 되어있다.
// 이코드를 쫙 펴서 설명하자면,,,

setTimeout(function(){
    console.log(i);
}, 0 * 1000); // 여기 0초는 사실은 (1000이 1초) 100이 있다,,,(즉, 100은 0.1 초) 0초라서 바로실행되는게 아니고, 이벤트루프 거치기때문에,,,그렇다

setTimeout(function(){
    console.log(i);
}, 1 * 1000);

setTimeout(function(){
    console.log(i);
}, 2 * 1000);

setTimeout(function(){
    console.log(i);
}, 3 * 1000);

setTimeout(function(){
    console.log(i);
}, 4 * 1000);

setTimeout(function(){
    console.log(i);
}, 5 * 1000);

// 이렇게 100까지 빠르게 다도는건데,,,일단 저  i * 1000 부분은 계속 바뀐다 그래서 1초 2초 3초 4초 되니까 결국 1초마다 실행되는거다. 
//왜냐면 1초뒤에 2초니까 간격을 적어논거다 ..1초 지나고 이미 1초 지낫으니 2초뒤면 1초가 지난 2초가 되니 1초만에 실행하고 또 지금 2초인데 3초뒤에 실행이면 지금 2초니까 1초뒤에 3초니까 또 1초만에 실행하는거고,
//결국 1초만에 실행하는거고,,,,i값은 계속 변하고 var의 특성이 계속 수정되는거니까 값이 1초밖에 차이가 안나는거다.
//아무튼
//지금 저 콜솔로그의 i가 문제인데,,,저거는...
//일단 함수가 실행이 되기 전까지는 그냥 그 내용을 그대로 갖고만 있고 실행이 되지 않는다.
// 즉, 실행이 안되는 함수는 말그댈 리터럴함수인 상태이다.
//그래서 저 셋타임함수안의 익명함수는 for문이 다돌때까지는 실행이 안된상태이다.그래서 그냥 내용은 갖고만있다...


// 다시 정리하자면!!!!!!!!!!!>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//일단 포문이 실행되면 

setTimeout(function(){
    console.log(i);
}, 0 * 1000);

setTimeout(function(){
    console.log(i);
}, 1 * 1000);
setTimeout(function(){
    console.log(i);
}, 2 * 1000);
setTimeout(function(){
    console.log(i);
}, 3 * 1000);
setTimeout(function(){
    console.log(i);
}, 99 * 1000);

// 포문이 실행되면 일단 저 셋타임함수 전체코드가 스택에서 큐로옮겨간다(옮겨갈때 익명함수는 실행이 안된상태임 왜냐면 셋타임함수가 실행이 되는 시점이 1초후 니까) 왜냐면 비동기니까, 근데 i * 1000 이부분은 카운트가 된다 왜냐면 , 포문이 실행되고 빠르게 100번을 스택으로 집어 넣거든 (그럼 그동시에 이부분의 i * 1000 i값도 변경이 쫘라락같이 변경 되겠지) 
//이렇게 0부터 99 번까지 반복이 쫙 된다 (요 순서대로 스택에 쫘라락 들어가서 (비동기이니까) 콜에 다시 쫘라락하고 들어간다 )
// 딱 요까지 가 스택에서 -> 콜로 옴겨진 모습이다.
// 다시 설명하자면 
setTimeout(function(){
    console.log(i);
}, 0 * 1000);
// 0번을 예로들자면, 딱 이렇게 생긴 그대로 스택으로 가서(처음에 스택에 갈때 이미 i 의 값은 0임! = 0 * 1000 요부분 i값이 매번 변경된채로~) 바로 큐로 넘어간다. 그럼 (비동기함수니까 큐로간거고...) 
//그래서 저 코드가 큐에 있다가 1초후에 실행되려면 1초뒤에 저 코드가 큐에서 다시 스택으로 옮겨진다. 이시점이 저코드(셋타임함수)가 실행이되는 시점이다.// 자세히 말하면 셋타임함수가 실행이되면 자연스럽게 익명함수도 실행이 되겠지
//그리고 그다음은,,,순서는 콜에 저렇게 옮겨진 0부터 99까지의 셋타임함수들이 차례대로 순서대로 (1초마다) 나갈 차례인것이다. 어디로? 다시 스택으로 1초마다 하나씩 나간다. 그럼 1초에 0부터 1 , 2 , 3 , 4 ~ 99 해서 나가게되는데 그말은 즉, 나가면 스택에서 실행되는거다.
//그러면 그 실행이 되서 i값은 100이 할당되고 종료. (스택에서 빠져나가는(종료되는) 시점이다.)

setTimeout(function(){
    console.log(100);//결과값 100
}, 0 * 1000); 
//이렇게 이게 1초후에 거칠곳 다거쳐서 실행된 코드의 모습이다. 이다음 차례도 이어서 설명하자면,

//그러면 그다음코드 차례 (이게 뭔말이냐면 그다음 코드의 위치는 지금 콜에 대기하고있는 애들이다 즉, 0번째가 방금 1초기다렸다가 나갔으니까 이제는 1번차례이다.1번도 1초뒤 바로 나갈예정임~이런식으로 99까지 콜에서 스택으로 나간다.)
//아무튼 그다음 코드가 1초후에 시작이 되겠지?(반복문이니까!!!!!!!!!!계속 반복됨)
setTimeout(function(){
    console.log(i);
}, 1 * 1000);
//이 코드가 큐에서 대기하다가 1초뒤에 스택으로 옮겨져서 또 실행을 해
// 그러면
setTimeout(function(){
    console.log(100); //결과값 100
}, 1 * 1000);
//요렇게 스택으로가고 실행후 종료 (정확히는 빠져나가면서 실행이 되는거지) 아무튼 이렇게 하나하나씩 코드가 진행된다.

// 즉 코드가 1초마다 하나하나씩 큐에서 실행이 되는거고,
//그럼 그전 코드들은 어디에 어떻게 있냐면? 아까 설명했듯이 그전 애들은 이미 스택에서 큐로 이동했던 애들이고(100번 다돌아서) 큐에대기하고 있는애들이 1초마다 실행되는거임 
//그니까 처음은 차곡차곡 스택->큐 에 쌓여서 100개가 큐에 대기상태임.(정확히 말하자면 큐에서 그렇게 오래대기하지 않고 1초뒤에 바로 빠져나감)
// 오해하지말아야할 부분은 for문에서 100을 이미 다 돌았다는 말은 , 처음에 for문이 실행되서 스택으로 가잖아 그게 직렬로 100번 실행은 다 시켰다 라는 뜻이다.
//그래서  100번 다 돈 애들이 큐에서 대기를 하고있는거다.
//그래서 처음 루프돌때  i * 1000 값이 적용이되서 나온 코드고 

//즉,

//-포문0실행,,그러면,, 그럼 0부터 해서 99까지 일단 돌려~ 주르륵 차례대로 실행~(일단 스택으로 다 밀어넣어 ->
/// -> 그럼 스택에있는 애들이 ->(들어갈때 0 * 1000 요 i 값이 바뀐상태로 들어감) ->
//-> 어근데 비동기네 그러면서 큐로 다시 넣어줌 그럼 큐에 들어가 있다가 1초뒤에 실행 하렴~ 그리고나서 바로 스택에 옮겨지고 마지막으로 함수실행~(이때는 이미 포문은 100번이 실행이 다 된채 스택에서 큐로 옮겨진상태임!! 메모리에 쌓여있는 상태임!!!) 그리고 1초 지난후 스택에옮겨지고(이때 셋타임함수 실행됨-> 익명함수실행됨 i값 찍어보니 100임 왜냐면 포문이 이미 실행을 100번다 돌아서 우리 뒤에 기다리고있네?  그값은 100이네..아무튼 이미 큐에 적재되있는걸 스택으로 넣고해서 계속 순서대로 1초마다 실행시키는 거임)   


// 이건 <스택메모리상태>
//-포문0
//-포문1
//-포문2
//-포문3
//-포문4
//~
//-포문99
//이렇게 포문이 이미 다 돌고 큐로 넣어주는 상황임(이미 i는 100임) 그래서 큐로 옴기고 그리고 큐에서 1초 기다렸다가 스택으로 다시 가는거임!
//포문은 스택에서 100번 다 이미 다돈상태(for문이 하는 일은 빠르게 차례대로 0부터 99까지 아주 빠르게 실행시켜서 스택에서->큐로가서 쌓이는 중임 ㅋㅋ )로 큐로 패스하는거임 


//-큐0
//-큐1
//-큐2
//-큐3
//.
//.
//-큐99

//여기서 >>>>>>>>>>>>>>>>>>>>>>중요한건>>>>>>>>>>>>>>>>>>>> 처음 스택에서 큐로 보낼때 이미 99까지 다 루프가 돈 상황이라는거임 
// 즉, 비동기가 "1초후 실행" 이렇게 ...되기전에 이미 100번 다돌고 애들은 큐에 대기하는 상태라는 말이다.



//다시 스택 0초후 실행 (i값은 100 임 왜냐면 차례대로 실행되니까 저위를 봐라 이미 100번 돈값이 100이라고 찍혀있네? 그럼 100 갔고와!)
//다시 스택 1초후 실행 (i값은 100 임 왜냐면 차례대로 실행되니까 저위를 봐라 이미 100번 돈값이 100이라고 찍혀있네? 그럼 100 갔고와!)
//다시 스택 2초후 실행 (i값은 100 임 왜냐면 차례대로 실행되니까 저위를 봐라 이미 100번 돈값이 100이라고 찍혀있네? 그럼 100 갔고와!)
//다시 스택 3초후 실행 (i값은 100 임 왜냐면 차례대로 실행되니까 저위를 봐라 이미 100번 돈값이 100이라고 찍혀있네? 그럼 100 갔고와!)
//다시 스택 4초후 실행 (i값은 100 임 왜냐면 차례대로 실행되니까 저위를 봐라 이미 100번 돈값이 100이라고 찍혀있네? 그럼 100 갔고와!)
//.
//.
//.
//다시 스택 99초후 실행 (i값은 100 임 왜냐면 차례대로 실행되니까 저위를 봐라 이미 100번 돈값이 100이라고 찍혀있네? 그럼 100 갔고와!)

// 최종 정리 
//포인트는 포문은 100번 반복실행을 시키면 아주빠르게 스택으로 넣고 (비동기인걸알고는) -> 큐로 옴겨서 애들은 대기 (딱 요까지가 이미 i값이 100 인 상태인 애들이 100명 기다리고 있는상태임 , 즉, 큐에서 100명이 대기타고있다고 생각하면됨!)
//그러면 대기하다가 1초후마다 함수가 스택으로 옴겨지면서 실행이 되고 i값을 찍어보니 100이 나오고
// 코드의 포인트는 큐에서 100명이 대기하고, 그 다음 이 100명은 하나하나씩 1초마다 실행이 차곡차곡 되는거임! 



//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>그래서 해결방법은?





// ============
// ==========중간설명==================

// >>>>>>>>>>>>>>>>일반함수

// for(var i = 0;i < 5;i++){
// 	function a(){
// 		return console.log(i);
		
//     };a();
// };

// console.log('i갑',i);


// 일반 함수는 for문에서 돌때
// 일단 바로 함수가 바로 호출되서 실행이 된다.
// 그리고 스택에서 처리할때
// 바로바로 i값을 실시간으로 받아서 온다.
// 즉, i값을 그때그때 참조한다.(외부변수 참조 클로져)



// -----------------------------------------
// >>>>>>>>>>>>>>>>>비동기함수

// for(var i = 0;i < 5;i++){
// 	setTimeout(function(){
// 		console.log(i);
// 	},i * 1000);
// };

// console.log('i갑',i);


// 셋타임함수(비동기)는 for문에서 돌때
// 일단 바로 호출이 되지않는다. 그래서 셋타임함수 자체가 실행이 안된채로
// 그냥 리터럴값으로 된채 바깥의 i값만 카운팅된채 for문을 돈다. 
// 그래서 다돌면 (스택에서 빠져나가서, 큐로 옴겨지겠지...)
// 1초뒤에 실행이 되면서 , 이미 다돈 i값을 참조한다(외부변수 참조 = 클로져)






// =================================

// 그래서 해결방법은?


// *참고로 이코드는 애초에 그냥 일반함수안에 셋타임아웃(비동기)함수를 넣은 구조인데,
// 그래서 결국 셋타임아웃이 큐로 들어갔다 나올때 x값을 찍는건데,
// 그럼 x값은 애초에 i값을 전달받아서 파라미터로 저장이 되있는 세팅이거든요.
// 그러면, 일단 클로져의 큰 특징이 이 환경을 다 기억하고(메모리에 넣어두고있다)있다는 거고,
// 그말은 개개의 함수들이 포문을 도는데 파라미터가 다 함수별로 저장이 되있다는 뜻이고, 
// 그런데, 일단 이코드가 외부함수는 스택에서 끝이 나거든요, 근데 
// 어떻게 셋타임함수의 x가 외부함수의 x파라미터를 참조하냐면,
// 클로져는 다 기억하고있다. 즉 다 들고있다는 말입니다.
// 그래서 내부 클로져가 종료된 시점의 외부함수 스코프를 아직 들고 있다는 소리고, 스코프를 아직 다 들고 있어서 , 이제 그 파라미터를 참조를 해오는 것입니다.

// for(var i=0;i < 100 ; i++){
//    function 클로져(x){
// 	  setTimeout(function(){
//         		console.log(x);
//     	}, x * 1000);
//    }클로져(i);
// }

// // 이렇게 처음에 셋타임함수(비동기)를 일반함수로 감싸주고,
// //파라미터로 i값을 전달한다. 
// //그러면 for문돌면서 100개의 함수가 만들어지는 것이고,
// //그럼100개의 함수가 각각의 영역,스코프를 가지면서 실행을 할것이고, 그러면 그 100개의함수들 각각 하나하나의 함수영역에 i값을 파라미터로 전달해서 , 파라미터에다가 저장을 해놓는 셈이 되는것이다.
// (여기까지는 일단 외부함수가 스택에서 실행되고 종료까지 되는 상태이고 ,물런 종료되기 전에 셋타임함수를 큐에 넣어주고 종룍가 된다(아시다시피 큐에있는 셋타임함수는 아직 실행이 안된상태 곧 1초후에 실행이 되겠죠?)
// 일단
// 아무튼
//  아래코드처럼>>>>>

// function 클로져(0){  // 이렇게 파라미터로 0을 받아두고(저장해두고)
// 	  setTimeout(function(){
//         		console.log(x);
//     	}, 0 * 1000);
//    }클로져(0);
// //요상태로 하고 셋함수 큐에 넘기고, 외부함수 종료!

// function 클로져(1){ // 이렇게 파라미터로 1을 받아두고(저장해두고)
// 	  setTimeout(function(){
//         		console.log(x);
//     	}, 1 * 1000);
//    }클로져(1);
// //요상태로 하고 셋함수 큐에 넘기고, 외부함수 종료!

// function 클로져(2){ // 이렇게 파라미터로 2을 받아두고(저장해두고)
// 	  setTimeout(function(){
//         		console.log(x);
//     	}, 2 * 1000);
//    }클로져(2);
// //요상태로 하고 셋함수 큐에 넘기고, 외부함수 종료!

// function 클로져(3){  // 이렇게 파라미터로 3을 받아두고(저장해두고)
// 	  setTimeout(function(){
//         		console.log(x);
//     	}, 3 * 1000);
//    }클로져(3);
// //요상태로 하고 셋함수 큐에 넘기고, 외부함수 종료!

// .
// .
// .

// 이렇게 99까지 돌고나면
// 외부함수는 다 돌았고, 그말은 외부함수는 다 실행이되서
// 종료까지 되었다는소리고,
// 물런 종료되기 전에 셋타임함수를 큐에 넘겨주고 종료됨.

// 그러면 사실 코드는 이렇게 됩니다.
// function 클로져(99){  
// 	  setTimeout(function(){
//         		console.log(x);
//     	}, 99 * 1000);
//    }클로져(99);

// 요 상태로 스택에서 끝나고 i값은 99로 다 덮어씌워진상태이고,
// 그러나 외부함수가 종료된 그 시점에서 내부함수의 클로져의 각각의 함수 스코프는 여전히 살아있는 상태이다.

// 그러면 사실 또 코드는 이렇게 남겨져있는 것이다.

// function 클로져(0){  
// 	  setTimeout(function(){
//         		console.log(x);
//     	}, 0 * 1000);
//    }클로져(99);

// function 클로져(1){  
// 	  setTimeout(function(){
//         		console.log(x);
//     	}, 1 * 1000);
//    }클로져(99);

// function 클로져(2){  
// 	  setTimeout(function(){
//         		console.log(x);
//     	}, 2 * 1000);
//    }클로져(99);

// function 클로져(3){  
// 	  setTimeout(function(){
//         		console.log(x);
//     	}, 3 * 1000);
//    }클로져(99);

// .
// .
// .
// function 클로져(99){  
// 	  setTimeout(function(){
//         		console.log(x);
//     	}, 99 * 1000);
//    }클로져(99);

// 저기 일반외부함수의 각각의 기록들이 저장되어있고,
// 클로져에서는 그 스코프를 아직 들고있다.(이미 종료된 함수지만...)


// 그래서 또
// 이어가자면,

// 이제 셋타임함수들이 100개가 큐에서 대기를 하고있는건데,
// 그러면,
// 이제 드디어,
// 1초뒤에 하나씩 셋타임함수가 스택을거쳐서 실행이 되는데
// 그럼 이제
// 콘솔x값을 찍어보는건데, 
// 그럼 x값은 어디서 참조해 오냐면?
// 바로
// 외부함수에 파라미터에서 참조를 해 옵니다.
// 무슨 말이냐면,
// 외부함수는 종료가 되었음에도 불구하고,
// 클로져라는 특성상 이미 종료가 된 외부함수의 스코프도 여전히 들고있는 상황이라는 겁니다.
// 그래서 외부함수의 파라미터값을 참조 가능한 겁니다.


// function 클로져(0){  
// 	  setTimeout(function(){
//         		console.log(0);
//     	}, 0 * 1000);
//    }클로져(99);

// function 클로져(1){  
// 	  setTimeout(function(){
//         		console.log(1);
//     	}, 1 * 1000);
//    }클로져(99);

// function 클로져(2){  
// 	  setTimeout(function(){
//         		console.log(2);
//     	}, 2 * 1000);
//    }클로져(99);

// function 클로져(3){  
// 	  setTimeout(function(){
//         		console.log(3);
//     	}, 3 * 1000);
//    }클로져(99);

// .
// .
// .
// function 클로져(99){  
// 	  setTimeout(function(){
//         		console.log(99);
//     	}, 99 * 1000);
//    }클로져(99);


// 이렇게 되서 마무리가 된다.

//즉  , 콘솔로그 안의 x 값은 뭘 어디를 가르키냐면, 바로 외부함수 의 파라미터를 가르킨다.


//>>>>>>>>>>>>>>>>>>>매개변수 자세하게 설명>>>>>>>>>>>>>>>>>>>>>
// 
function 클로져(x){  
     	  setTimeout(function(){
             		console.log(x);
         	}, x * 1000);
        }클로져(i);

        //여기서 봐야할 특징들은 바로,
        // 함수스코프의 특징이다. 
        // 자신의 함수안에 선언된 변수는 자신의 함수스코프를 벗어날수 없다.
        //그리고 저 외부함수 매개변수 x는 저함수를 못벗어난다 (참고로 매개변수의 x는 var가 아니다.  일반변수가 아니고 말그대로 매개변수이다. 하지만 var과 똑같다)
        // 일단 저 x매개변수(파라미터)는  마치 var x = 0; 이거라고 보면된다 똑같다.
        //음...
        function 클로져(x){  //이렇게 매개변수 x 는 
            var x = 0; //여기 변수 x 를 선언한거랑 똑같다고 보면된다.
            setTimeout(function(){
                      console.log(x);
              }, x * 1000);
         }클로져(i);

         // 즉 외부함수 (클로져함수)의 매개변수(파라미터) x는 외부(클로져)함수 바깥으로 빠져나갈수없고(함수스코프 특성상), 오로지 갖쳐있게된다.
         //그래서 개개의 함수가 만들어질때 개개의 x값을 지니고(저장하고, 가지고) 있는거다.

         // 그리고 보통은

         for(var i=0;i < 100 ; i++){
                function 클로져(x){
             	  setTimeout(function(){
                    		console.log(x);
                	}, x * 1000);
               }클로져(i);
            }

            //이렇게 따로 함수선언을 하지않고, 즉시실행함수로 만들어쓴다.

            for(var i=0;i < 100 ; i++){
                (function 클로져(x){
             	  setTimeout(function(){
                    		console.log(x);
                	}, x * 1000);
               })(i);
            }
            //이렇게 즉시 실행함수로 쓴다...이렇게 짧게 표현을 한다.

            