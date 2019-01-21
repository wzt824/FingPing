
	function fun1(){
		//表单验证功能---如果不正确,有提示信息,若正确则无提示
		let hint = document.getElementById('hint');
		let userNameDom = document.getElementById('username');
		let userPassDom = document.getElementById('userpass');
		userNameDom.onblur=function(){//正则验证用户名,并且ajax判断用户名的唯一性
			let username = document.getElementById('username').value;
			hint.innerHTML = '';
			if(username=='' || username==null){
				hint.innerHTML = '用户名不能为空';
			}else if(username.length>16 || username.length<2){
				hint.innerHTML = '用户名格式不正确!';
			}else{
				let xhr = new XMLHttpRequest();
				xhr.open("GET","data/regcheckname.php?username="+username,true);
				xhr.onreadystatechange = function(){
					if(xhr.readyState==4 && xhr.status==200){
						let str = xhr.responseText;
						// console.info(str);
						if(str == 2){
							hint.innerHTML = '用户名已存在';
						}
					}
				}
				xhr.send();
			}
		}
		userPassDom.onblur = function(){
			let userpass = document.getElementById('userpass').value;
			hint.innerHTML = '';
			if(userpass==''){
				hint.innerHTML = '密码不能为空';
			}else if(userpass.length>16 || userpass.length<6){
				hint.innerHTML = '密码格式不正确!';
			}
		}
		
		//滑动人机验证
		let sliderDiv = document.getElementById('sliderDiv');
		let colorDiv = document.getElementById('colorDiv');
		let checkBox = document.getElementById('checkBox');
		let next = document.getElementById('next');
		let SG = false;
		sliderDiv.onmousedown = function(){
			SG = true;
		}
		document.onmousemove = function(evt){
			if(SG==false)return;
			let e = evt || window.event;
			sliderDiv.style.transition = null;
			colorDiv.style.transition = null;
			sliderDiv.style.left = e.clientX - checkBox.offsetLeft - sliderDiv.offsetWidth/2 + 'px';
			colorDiv.style.width = e.clientX - checkBox.offsetLeft + 'px';
			if(sliderDiv.offsetLeft<0){
				sliderDiv.style.left = 0;
			}
			if(sliderDiv.offsetLeft>=checkBox.offsetWidth-sliderDiv.offsetWidth){
				//在滑动到右边时判断,若提示信息为空则解锁
				SG = false;
				next.style.background = 'red';
				colorDiv.innerHTML = '验证通过!';
				if(hint.innerHTML==''){
					next.disabled = false;
				}
			}
		}
		sliderDiv.onmouseup = function(){
			SG = false;
			sliderDiv.style.transition = 'all .5s';
			colorDiv.style.transition = 'all .5s';
			sliderDiv.style.left = 0;
			colorDiv.style.width = 0;
			next.style.background = '#dfdfdf';
			colorDiv.innerHTML = '';
		}
		
		//注册功能
		let submit = document.getElementById('next');
		let username = document.getElementById('username');
		let userpass = document.getElementById('userpass');
		submit.onclick = function(){
			let xhr = new XMLHttpRequest();
			xhr.open("POST","data/reg.php",true);
			
			xhr.onreadystatechange = function(){
				if(xhr.readyState==4 && xhr.status==200){
						let str = xhr.responseText;
						console.info(str);
						if(str == 1){
							window.location.href='login.html';
							}
						
				}
			}
			
				xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				let str = "username="+username.value+"&userpass="+userpass.value;
				xhr.send(str);
		}
	}
	fun1();

	
function fun2(){
	//雪
	let musicNumber = 0;
	function musicSports(){
		let screen = document.getElementById('screen');
		let screenWidth = screen.offsetWidth;
		let screenHeight = screen.offsetHeight;
		let musicIco = document.createElement('span');
		let place = -50;
		screen.style.position = 'relative';
		musicIco.innerHTML = '&#10052';//&#10052雪花//&#9835音符
		musicIco.style.cssText = "color:#fff;position:absolute;font-size:20px;transition:opacity .5s";
		musicIco.style.fontSize = Math.floor(Math.random()*30 + 20) + 'px';
		musicIco.style.left = Math.floor((Math.random()*screenWidth)) + 'px';
		musicIco.style.top ='-50px';
		screen.appendChild(musicIco);
		setInterval(function(){
			place += 1
			if(place >=screenHeight){
				place = -50;
				musicIco.style.left = Math.floor((Math.random()*screenWidth)) + 'px';
			}
			musicIco.style.top = place+'px';
		},10);
		setInterval(function(){
			musicIco.style.opacity=1;
			setTimeout(function(){
				musicIco.style.opacity=.3;
			},750);
		},1500);
	}
	let timerD = setInterval(function(){
		musicNumber++;
		if(musicNumber==60){
			clearInterval(timerD);
		}
		musicSports();
	},100);
}
	fun2();
function fun3(){
	//滑块文字效果
	let textBg = document.getElementById('textBg');
	setInterval(function(){
		textBg.style.opacity = 0;
		setTimeout(function(){
			textBg.style.opacity = 1;
		},1000);
	},2000);
}
fun3();