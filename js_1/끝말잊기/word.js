var 단어 = document.getElementById('word');
var 입력창 = document.getElementById('write');
var 버튼 = document.getElementById('button');
var 결과창 = document.getElementById('result');

버튼.addEventListener('click' , function(){
    if(단어[단어.length - 1] === 입력창.value[0]){
        결과창.alert('딩동댕');
        단어= 입력창.value;
    }else{
        
    }
})

