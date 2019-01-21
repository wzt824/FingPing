
    $('#select').oninput = baiduJSONP; 
    $('#select').onblur = function(){
        $('#selectValues').innerHTML = '';
    }
    $('#selectValues').onmouseenter = selectLi;
	$('#selectValues').onkeypress = function(evt){
		let e = evt || window.event
		if(e.keyCode==13){
			console.log(222);
			$('#selectValues').innerHTML = '';
		}
	}
    $('#select').onkeydown = upDownselect;



    var index = -1;
function $(str){
    if(str.charAt(0)=='#'){
        return document.getElementById(str.substring(1));
    }else if(str.charAt(0)=='.'){
        return document.getElementsByClassName(str.substring(1));
    }else{
        return document.getElementsByTagName(str);
    }
}

function baiduJSONP(){
    $('script')[$('script').length-1].remove();
    let Oscript = document.createElement('script');
    let selectword = $('#select').value;
    Oscript.src = "http://suggestion.baidu.com/su?wd="+selectword+"&cb=showData";
    document.documentElement.appendChild(Oscript);
}

function showData(data){
    // console.info(data);
    $('#selectValues').innerHTML = '';
    for(let i=0;i<data.s.length;i++){
        let Oli = document.createElement('li');
        Oli.innerHTML = data.s[i];
        $('#selectValues').appendChild(Oli);
    }
}
function selectLi(){
    for(let i=0;i<$('#selectValues').children.length;i++){
        $('#selectValues').children[i].onmouseenter = function(){
            for(let i=0;i<$('#selectValues').children.length;i++){
                $('#selectValues').children[i].className = '';
            }
            this.className = 'liHover';
            $('#select').value = this.innerHTML;
            index = i;
        }
    }
}
function upDownselect(event){
    let e = event || window.event;
    if(e.keyCode==38 && index<=0){
        index=$('#selectValues').children.length-1;
    }else if(e.keyCode == 38 && index>=0){
        index--;
    }else if(e.keyCode == 40 && index>=$('#selectValues').children.length-1){
        index=0;
    }else if(e.keyCode == 40 && index<=$('#selectValues').children.length-1){
        index++;
	}else{
        return;
    }
    for(let i=0;i<$('#selectValues').children.length;i++){
        $('#selectValues').children[i].className = '';
    }
    $('#selectValues').children[index].className ='liHover';
    $('#select').value = $('#selectValues').children[index].innerHTML;
}
