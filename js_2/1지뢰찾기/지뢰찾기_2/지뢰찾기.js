
var tbody = document.querySelector('#table tbody'); 

var dataset = []; 

document.querySelector('#exec').addEventListener('click',function(){

         //블럭 내부 먼저 초기화 코드
        tbody.innerHTML = ''; 

        //먼저 가로,세로,지뢰개수 파악
        var hor = parseInt(document.querySelector('#hor').value);
        var ver = parseInt(document.querySelector('#ver').value);
        var mine = parseInt(document.querySelector('#mine').value);

         //지뢰위치 뽑기 코드
        var 후보군 = Array(hor * ver) 
            .fill() 
            .map(function(요소,인덱스){ 
            return 인덱스;  
             });
        
        var 셔플 = []; //여기 셔플에는 지뢰의 위치들이 최종적으로 담기게된다.
        
        while (후보군.length > 80 ){  
             var 이동값 = 후보군.splice(Math.floor(Math.random() * 후보군.length) , 1 )[0];
             셔플.push(이동값); 
        }
        
         //아래는 지뢰테이블 만들기 코드!!!
        for(var i = 0; i < ver; i += 1){ 
            var arr =[]; 
            dataset.push(arr); 
            var tr = document.createElement('tr');
            tbody.appendChild(tr);
                for(var j = 0 ; j < hor ; j += 1){ 
                    arr.push(1); 
                    var td = document.createElement('td');
                    
                    td.addEventListener('contextmenu',function(e){ 
                        e.preventDefault();
                        var 부모tr = e.currentTarget.parentNode; 
                        var 부모tbody = e.currentTarget.parentNode.parentNode; 
                        var 칸 = Array.prototype.indexOf.call(부모tr.children,e.currentTarget); 
                        var 줄 = Array.prototype.indexOf.call(부모tbody.children,부모tr);
                        
                        if(['','X'].includes(e.currentTarget.textContent)){
                             e.currentTarget.textContent = '!';     
                        }else if(e.currentTarget.textContent === '!'){
                            e.currentTarget.textContent = '?';
                        }else if(e.currentTarget.textContent === '?'){ 
                            if(dataset[줄][칸] === 1){ 
                                e.currentTarget.textContent = '';
                            }else if(dataset[줄][칸] === 'X'){
                                e.currentTarget.textContent = 'X';
                                }
                            }
                        });
                    tr.appendChild(td);
                    
                    //아래코드는 클릭했을때 주변지뢰 갯수 알려주는 기능 코드
                    td.addEventListener('click',function(e){  
                        var 부모tr = e.currentTarget.parentNode; 
                        var 부모tbody = e.currentTarget.parentNode.parentNode; 
                        var 칸 = Array.prototype.indexOf.call(부모tr.children,e.currentTarget);
                        var 줄 = Array.prototype.indexOf.call(부모tbody.children,부모tr);
                        
                        if(dataset[줄][칸] === 'X'){
                                     e.currentTarget.textContent = '펑!';
                        }else {
                                    var 주변 = [ 
                                                dataset[줄][칸-1],dataset[줄][칸+1],
                                            ];
                                        
                                    if(dataset[줄-1]){ 
                                        주변 = 주변.concat([dataset[줄-1][칸-1],dataset[줄-1][칸],dataset[줄-1][칸+1]]);
                                    }
                                    if(dataset[줄+1]){ 
                                        주변 = 주변.concat([dataset[줄+1][칸-1],dataset[줄+1][칸],dataset[줄+1][칸+1]]); 
                                    }
                                    console.log(주변); 
                                    
                                    e.currentTarget.textContent = 주변.filter(function(v){  
                                    return v === 'X' 
                                    }).length;
                                };
                            });
                        }
                    }     
      
             //아래코드는_지뢰심기코드
            for (var k = 0;k < 셔플.length;k++){ 
                    var 세로 = Math.floor(셔플[k] / 10); 
                    var 가로 = 셔플[k] % 10; 
                    tbody.children[세로].children[가로].textContent = 'X';
                    dataset[세로][가로] = 'X'; 
                 }; 

        });
