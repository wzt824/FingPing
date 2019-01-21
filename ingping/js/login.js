	function fun1(){
		let submit = document.getElementById('submit');
		let username = document.getElementById('username');
		let userpass = document.getElementById('userpass');
		submit.onclick = function(){
			let xhr = new XMLHttpRequest();
			xhr.open("POST","data/login.php",true);
			
					xhr.onreadystatechange = function(){
					if(xhr.readyState==4 && xhr.status==200){
							let str = xhr.responseText;
							if(str=='1'){
									setCookie('cname',document.getElementById('username').value,3);
									window.location.href='index.html';
							}else{
									alert('您的用户名和密码不匹配!');
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
		//音符
		let musicNumber = 0;
		function musicSports(){
			let screen = document.getElementById('screen');
			let screenWidth = screen.offsetWidth;
			let screenHeight = screen.offsetHeight;
			let musicIco = document.createElement('span');
			let place = -50;
			screen.style.position = 'relative';
			musicIco.innerHTML = '&#9835';//&#10052雪花//&#9835音符
			musicIco.style.cssText = "color:#fff;position:absolute;font-size:20px;transition:all .5s";
			musicIco.style.fontSize = Math.floor(Math.random()*30 + 20) + 'px';
			musicIco.style.left = Math.floor((Math.random()*screenWidth)-50) + 'px';
			musicIco.style.top ='-50px';
			musicIco.style.opacity = Math.ceil(Math.random()*2)/2;
			screen.appendChild(musicIco);
			setInterval(function(){
				place += 10
				if(place >=screenHeight){
					place = -50;
					musicIco.style.left = Math.floor((Math.random()*screenWidth)-50) + 'px';
				}
				musicIco.style.top = place+'px';
			},100);
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