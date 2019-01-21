	function loginStatus(){
		let welDom = document.getElementById('welLeft');
		if(getCookie('cname')!=undefined){
			welDom.innerHTML = "<span>欢迎您!&nbsp;&nbsp;</span><a href='javascript:;'>"+getCookie('cname')+"</a>[<a href='javascript:;' id='quit'>退出</a>]";
			let quit = document.getElementById('quit');
			quit.onclick = function(){
				welDom.innerHTML='<span>您好! 欢迎来到音平商城</span>[\
			<a href="login.html" target="_blank">请登录</a> |\
			<a href="reg.html" target="_blank">免费注册</a>]';
			setCookie('cname','',-1);
			}
		}
	}
	loginStatus();

// function setImgCookie(){
// 	let products = document.getElementsByClassName('proImgBox');
// 	for(let i=0;i<products.length;i++){
// 		products[i].onmousedown=function(){
// 			let history = products[i].children[0].src;
// 			setCookie('productHistory',history,1);
// 		}
// 	}
// }
// setImgCookie();
