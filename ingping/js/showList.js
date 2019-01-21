
//左侧边栏效果
let LquickLink = document.getElementById('LquickLink');

let wel = document.getElementById('wel');
let moveNav = document.getElementById('header');
window.onscroll = function(){
	if(document.documentElement.scrollTop>=600){
		LquickLink.style.left = '2%';
		LquickLink.style.height = '310px';
	}else{
		LquickLink.style.left = '-3%';
		LquickLink.style.height = '0';
	}
	backTop.style.opacity = (document.documentElement.scrollTop - 1000)/500;
	//movenav
	let scrollH = document.documentElement.scrollTop || document.body.scrollTop;
	if(scrollH>=200){
		wel.style.position = 'fixed';
		wel.style.top = 0;
		wel.style.zIndex = 10;
		moveNav.style.position = 'fixed';
		moveNav.style.top = 0;
		moveNav.style.zIndex = 9;
		moveNav.style.width = "100%";
		moveNav.style.boxShadow = '0px 4px 8px #888888 ';
	}else{
		moveNav.style.position = 'relative';
		moveNav.style.width = '1200px';
		wel.style.position = 'relative';
		// wel.style.zIndex = '0';
		moveNav.style.boxShadow = '0 0 0 0 #888888';
	}
}


function funa(){
	//导航效果
	let placeTop = document.getElementsByClassName('h3Title');
	let arrPlace =[];
	for(let i=0;i<placeTop.length;i++){
		arrPlace.push(placeTop[i].offsetTop-100);
	}
	let liclick = document.getElementsByClassName('gps');
	let timerA = null;
	let temp;
	document.onscroll = function(){
		for(let i=0;i<liclick.length;i++){
			if(document.documentElement.scrollTop>=arrPlace[i]){
				for(let j=0;j<liclick.length;j++){
					liclick[j].style.background = '#656565';
				}
				liclick[i].style.background = '#f60';
			}
		}

	}
}
funa();

	

		//图片遮罩层滑动
		let moveDiv = document.getElementsByClassName('moveDiv');
		let timerB = null;
		let moveDivTop = -110;

		timerB = setInterval(function(){
			moveDivTop += 10;
			for(let i=0;i<moveDiv.length;i++){
				moveDiv[i].style.top = moveDivTop +'px';
			}
			if(moveDivTop>=470){
				moveDivTop=-110;
			}
		},20);
