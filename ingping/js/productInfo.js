// nav部分滚动效果
function fun1(){
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
}
fun1();

	function fun2(){
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
	}
	fun2();
	
	function fun3(){
			//支付部分效果
		let onceBuyBtn = document.getElementById('onceBuyBtn');
		let addCartBtn = document.getElementById('addCartBtn');
		let timerC = setInterval(function(){
			onceBuyBtn.style.backgroundColor = '#ff0036';
			addCartBtn.style.backgroundColor = '#ff6600';
			setTimeout(function(){
				onceBuyBtn.style.backgroundColor = '#ff6600';
				addCartBtn.style.backgroundColor = '#ff0036';
			},1000);
		},2000);
	}
	fun3();
	function fun4(){
	//右边滚动效果
		let sliderUl = document.getElementById('box1').firstElementChild;
		let sliderLiCount = 0;
		let timerE = setInterval(function(){
			sliderLiCount++;
			sliderLiCount = sliderLiCount%3;
			sliderUl.style.left = -sliderLiCount * 150 + 'px';
		},2000);
	}
	fun4();
	
	function fun5(){	
		//购物车加减
		let adda = document.getElementById('adda');
		let jiana = document.getElementById('jiana');
		let numValue = document.getElementById('numValue');
		adda.onclick=function(){
			numValue.value=parseInt(numValue.value)+1;
		}
		jiana.onclick=function(){
			(numValue.value<=1)?1:numValue.value=parseInt(numValue.value)-1;
		}
	}
		fun5();
	//放大镜
function bigMirrorfun(){
	let bigBox = document.getElementById('bigBox');
	let mirrorBox = document.getElementsByClassName('mirrorBox')[0];
	let showBox = document.getElementsByClassName('showBox')[0];
		bigBox.onmouseover = function(event){
	            let e = event || window.event;
	            if(e.target == bigBox ||  e.target == mirrorBox) {
					showBox.style.display = 'block';
					mirrorBox.style.display = 'block';
	            }
	        }
	    bigBox.onmouseout = function(event){
			showBox.style.display = 'none';
			mirrorBox.style.display = 'none';
		}
		bigBox.onmousemove = function(event){
			let e = event || window.event;
			let left1 =e.pageX-bigBox.offsetLeft-mirrorBox.offsetWidth/2;
			let top1 =e.pageY-bigBox.offsetTop-mirrorBox.offsetHeight/2;
			
	
			if(left1 <= 0) {       
				 left1 = 0;     
			} else if(left1 > bigBox.offsetWidth -  mirrorBox.offsetWidth) {       
				 left1 = bigBox.offsetWidth - mirrorBox.offsetWidth;         
			}     
			if(top1 <= 0) {       
				 top1 = 0;         
			} else if(top1 > bigBox.offsetHeight -  mirrorBox.offsetHeight) {       
				 top1 =  bigBox.offsetHeight -  mirrorBox.offsetHeight;   
			}
	
			mirrorBox.style.left = left1 + 'px';
			mirrorBox.style.top = top1 + 'px';
			showBox.style.backgroundPosition = (-2*left1) + 'px ' + (-2*top1) +'px';
		}
	// 选择
	let uls1 = document.getElementById('showProList').firstElementChild;
	let lis = uls1.children;
	for(let i=0;i<lis.length;i++){
		lis[i].onmouseenter = function(){
			let bgImg = getStyle(this,'backgroundImage');
			bigBox.style.backgroundImage = bgImg;
			showBox.style.backgroundImage = bgImg;
			for(let j=0;j<lis.length;j++){
				lis[j].style.border = '1px solid transparent';
			}
			lis[i].style.border = '1px solid #f60';
		}
	}
	
	function getStyle(domObj,attr){
		if(domObj.currentStyle){
			return domObj.currentStyle[attr];
		}else{
			return window.getComputedStyle(domObj)[attr];
		}
	}
}
bigMirrorfun();
function getProductInfo(){
	let goodsId = getCookie('goodsInfo');
	let xhr = new XMLHttpRequest();
	xhr.open('GET','data/getGoodsInfo.php?goodsId='+goodsId,false);
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4&&xhr.status==200){
			let goodsInfodata =JSON.parse(xhr.responseText);
			showGoodsInfo(goodsInfodata);
			shoppingHistory(goodsInfodata);
		}
	}
	xhr.send();
}
getProductInfo();

function showGoodsInfo(goodsInfo){
	let bigBox = document.getElementById('bigBox');
	let showBox = document.getElementById('showBox');
	let Gname = document.getElementById('goodsName');
	let Gprice = document.getElementById('goodsPrice');
	let Gdesc = document.getElementById('desc');
	let Ghpd = document.getElementById('hpd');
	let Gpls = document.getElementById('pls');
	let Gsds = document.getElementById('sds');
	let yh = document.getElementById('yh');
	let simg1=document.getElementById('showProList').firstElementChild.children[0];
	let simg2=document.getElementById('showProList').firstElementChild.children[1];
	let simg3=document.getElementById('showProList').firstElementChild.children[2];
	let simg4=document.getElementById('showProList').firstElementChild.children[3];
	let simg5=document.getElementById('showProList').firstElementChild.children[4];
	bigBox.style.backgroundImage="url(../ingping/"+goodsInfo.goodsImg+")";
	showBox.style.backgroundImage = "url(../ingping/"+goodsInfo.goodsImg+")";
	Gname.innerHTML = goodsInfo.goodsName;
	Gprice.innerHTML = goodsInfo.goodsPrice;
	Gdesc.innerHTML = goodsInfo.goodsDesc;
	Ghpd.innerHTML = goodsInfo.beiyong2;
	Gpls.innerHTML = goodsInfo.beiyong1;
	Gsds.innerHTML = goodsInfo.beiyong4;
	yh.innerHTML ="该商品优惠"+ goodsInfo.beiyong5 +"元哦!";
	simg1.style.backgroundImage =  "url(../ingping/"+goodsInfo.goodsImg+")";
	simg2.style.backgroundImage =  "url(../ingping/"+goodsInfo.beiyong6+")";
	simg3.style.backgroundImage =  "url(../ingping/"+goodsInfo.beiyong7+")";
	simg4.style.backgroundImage =  "url(../ingping/"+goodsInfo.beiyong8+")";
	simg5.style.backgroundImage =  "url(../ingping/"+goodsInfo.beiyong9+")";
}

function addCartfun(){
	let addCartBtn = document.getElementById('addCartBtn');
	addCartBtn.onclick = function(){
		let numValue = document.getElementById('numValue').value;
		let cname=getCookie('cname');
		let goodsId=getCookie('goodsInfo');
		if(cname==null || cname==undefined || cname==''){
			alert('添加失败,请登录哦');
			return;
		}
		let xhr = new XMLHttpRequest();
		xhr.open("get","data/addShoppingCart.php?vipName="+cname+"&goodsId="+goodsId+"&goodsCount="+numValue,true);
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4&&xhr.status==200){
				let d = xhr.responseText;
				if(d==1){
					rightCartCount();
					alert('添加成功!请查看购物车');
				}else if(d==0){
					alert('添加失败!');
				}
			}
		}
		xhr.send();
	}
}
addCartfun();
//设置商城浏览记录cookie
function shoppingHistory(data){
	let history;
	if(getCookie('shoppingHistory')==undefined ||getCookie==null ||getCookie==''){
		history= data.goodsName+'!'+data.goodsImg
	}else{
		if(getCookie('shoppingHistory').split('|').length<4){
			history=getCookie('shoppingHistory')+'|'+data['goodsName']+'!'+data.goodsImg;
		}else{
			let a = getCookie('shoppingHistory').split('|');
			a.shift();
			a = a.join('|');
			history=a +'|'+data['goodsName']+'!'+data.goodsImg;
		}
		
	}
	setCookie('shoppingHistory',history,1);
	console.info(getCookie('shoppingHistory'));
}