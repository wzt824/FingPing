		//搜索框cookie设置
		function productListCookie(){
			let selectBtn = document.getElementById('btn');
			let selectValue = document.getElementById('select');
			selectBtn.onclick = function(){
				setCookie('selectProduct',selectValue.value,1);
				window.open('productList.html');
			}
		}
		productListCookie();