	function rightCartCount(){
		let Count=0;
		let CartCount = document.getElementById('CartCount');
		let cname = getCookie('cname');
		let xhr = new XMLHttpRequest();
		xhr.open("get","data/getShoppingCart.php?vipName="+cname,false);
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4&&xhr.status==200){
				let CartData=JSON.parse(xhr.responseText);
				for(let i in CartData){
					Count +=parseInt(CartData[i].goodsCount);
				}
				CartCount.innerHTML=Count;
			}
		}
		xhr.send();
	}
	rightCartCount();