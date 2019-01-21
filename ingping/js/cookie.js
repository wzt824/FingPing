//设置cookie
function setCookie(cname, cvalue, expdays) {
	var txt = cname + '=' + cvalue;
	if(expdays) {
		var d = new Date();
		d.setDate(d.getDate() + expdays);
		expires = ";expires=" + d.toGMTString();
	}
	document.cookie = txt + expires;
}

//获取cookie
// function getCookie(cname) {
// 	var ca = document.cookie.split(';');
// 	for(var i in ca) {
// 		//判断一下,有没有user这个字符串
// 		if(ca[i].indexOf(cname) != -1) {
// 			return ca[i].substring(cname.length + 1);
// 		}
// 	}
// }

     var getCookie = function (name) {
       var arr;
       var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if (arr = document.cookie.match(reg))
         return unescape(arr[2]);
       else
        return null;
     };

//检测cookie
function checkCookie(user) {
	var username = getCookie(user);

	if(username != undefined) {
		alert('欢迎回家' + username + ',家是温暖的港湾！');
	} else {
		username = window.prompt('新成员，请输入您的大名：', '');
		//			判断用户输入的之是否符合你的要求
		if(username.length > 3) {
			console.info(123)
			//				添加cookie
			setCookie('name', username, 7);
		}
	}
}