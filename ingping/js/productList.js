	function fun1(){
		//nav部分滚动效果
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
				//购物车加减效果
		let values = document.getElementsByClassName('s1');
		let add = document.getElementsByClassName('s2');
		for(let i=0;i<add.length;i++){
			add[i].firstElementChild.onclick = function(){
				values[i].innerHTML =parseInt(values[i].innerHTML)+1;
			}
			add[i].lastElementChild.onclick = function(){
				// values[i].innerHTML =parseInt(values[i].innerHTML)-1;
				(values[i].innerHTML<=1)?values[i].innerHTML==1:values[i].innerHTML--;
			}
		}
	}
	fun2();
	
	
	function fun3(){
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
		let wel = document.getElementById('wel');
		let moveNav = document.getElementById('header');
		window.onscroll = function(){
				//吸顶搜索框
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
				backTop.style.opacity = (document.documentElement.scrollTop - 200)/400;
			}
	}
	fun3();
	function fun4(){
		if(getCookie('selectProduct')!=undefined){
			let xhr = new XMLHttpRequest();
			xhr.open('get','data/getGoodsList.php',false);
			xhr.onreadystatechange=function(){
				if(xhr.readyState==4&&xhr.status==200){
					let data=JSON.parse(xhr.responseText);
					console.info(data); 
					showGoods(data);
				}
			}
			xhr.send(); 
		}
	}
	fun4();
function showGoods(data){
	let productListBox=document.getElementById('productListBox');
	let str='';
	for(let i=0;i<data.length;i++){
		if(data[i].goodsType.indexOf(getCookie('selectProduct'))!=-1 || data[i].goodsName.indexOf(getCookie('selectProduct'))!=-1 || getCookie('selectProduct').indexOf(data[i].goodsType)!=-1 || getCookie('selectProduct').indexOf(data[i].goodsName)!=-1){
			str +='<li><a href="javascript:;" class="proImgBox"><span id="goodsId">'+data[i].goodsId+'</span><img src="'+data[i].goodsImg+'" alt=""></a>\
			<p class="proPrice pTextIndent">$ '+data[i].goodsPrice+'</p>\
			<p class="descript pTextIndent">'+data[i].goodsName+'</p>\
			<p class="evaluate pTextIndent"><i class="iconfont icon-xiaoxi fontColor1"></i><span class="fontColor1">'+data[i].beiyong1+'</span><i class="iconfont icon-iconfontzhizuobiaozhun023148 fontColor2"></i><span class="fontColor2">'+data[i].beiyong2+'</span></p>\
			<p class="lastP">\
				<span class="s1">1</span>\
				<span class="s2"><a href="javascript:;"></a><a href="javascript:;"></a></span>\
				<a href="javascript:;"><span class="s3">加入购物车</span></a>\
				<span class="s4"><b>&#9825</b><em>收藏</em></span>\
			</p>\
			</li>'
		}
	}
	productListBox.innerHTML = str;
	console.info(getCookie('selectProduct'));
}

function goodsInfoCookie(){
	let goodsBox = document.getElementsByClassName('proImgBox');
	for(let i=0;i<goodsBox.length;i++){
		goodsBox[i].onclick=function(){
			let goodsId = this.firstElementChild.innerHTML;
			setCookie('goodsInfo',goodsId,1);
			window.open('productInfo.html');
		}
	}
}
goodsInfoCookie();

