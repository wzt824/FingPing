//tab选项卡效果
let tabs = document.getElementsByClassName('tabmenu');
let tabUls = document.getElementById('ulsBox').children;
for(let i in tabs){
	if(i>0){
		tabUls[i].style.opacity = '0';		
		tabUls[i].style.zIndex = '-1';
	}
	tabs[i].onmouseenter = function(){
		for(let j=0; j<tabs.length;j++){
			tabs[j].style.borderBottom = '0';
			tabs[j].style.color = '#333333';
			tabUls[j].style.opacity = '0';			
			tabUls[j].style.zIndex = '-1';
		}
		tabUls[i].style.opacity = '1';			
		tabUls[i].style.zIndex = '1';
		this.style.borderBottom = '3px solid #ff6600';
		this.style.color = '#ff6600';
	}
	
}

//rollInfo滚动效果
let subInfo = document.getElementById('rollInfo').children[0];
subInfo.innerHTML += subInfo.innerHTML;
subInfo.style.position = 'absolute';
let timer = null;
let H = 0;
timer = setInterval(function(){
	H += -subInfo.offsetHeight/6;
	subInfo.style.top = H + 'px';
	if(H<=-subInfo.offsetHeight/2){
		H = 0;
	}
},2000);

//右侧边栏返回顶部效果
let backTop = document.getElementById('backTop');
backTop.onclick = backTopfun;
	function backTopfun(){
		let timer = null;
			timer = setInterval(function(){
				document.documentElement.scrollTop -=document.documentElement.scrollTop/100 +1;
				if(document.documentElement.scrollTop==0){
					clearInterval(timer);
				}
		},1)
	}
	
	





