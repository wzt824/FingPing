	
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
	//购物车数据处理

		function fn1(){//计算每一行的数据--加-减-汇总金额
			let oneTypeMoney = document.getElementsByClassName('oneTypeMoney');
			let add1 = document.getElementsByClassName('add1');
			let reduce = document.getElementsByClassName('reduce');
			let values = document.getElementsByClassName('values');
			let onePriceValue = document.getElementsByClassName('onePriceValue');
			let deletes = document.getElementsByClassName('deletes');
			for(let i=0;i<add1.length;i++){
				oneTypeMoney[i].innerHTML=values[i].value * onePriceValue[i].innerHTML;
				add1[i].onclick = function(){
					values[i].value = parseInt(values[i].value) + 1;
					oneTypeMoney[i].innerHTML=values[i].value * onePriceValue[i].innerHTML;
					fn2();
					updata(getCookie('cname'),deletes[i].id,values[i].value,);
				}
				reduce[i].onclick = function(){
					(values[i].value<=1)?values[i].value=1:values[i].value=parseInt(values[i].value)-1;
					oneTypeMoney[i].innerHTML=values[i].value * onePriceValue[i].innerHTML;
					fn2();
					updata(getCookie('cname'),deletes[i].id,values[i].value,);
				}
			}
		}
		function fn2(){//计算结算栏的数据--已选商品--总金额--优惠--订单金额
			let total = document.getElementById('total');
			let discounts = document.getElementById('discounts');
			let allMoney = document.getElementById('allMoney');
			let check1 = document.getElementsByClassName('check1');
			let oneTypeMoney = document.getElementsByClassName('oneTypeMoney');
			let checkNum = document.getElementsByClassName('checkNum');
			let yhjg = document.getElementsByClassName('yhjg');
			let sum=0;
			let shoppingNum=0;
			let yhjgCount=0;
			for(let i=0;i<check1.length;i++){
				if(check1[i].checked==true){
					shoppingNum++;
					sum +=parseInt(oneTypeMoney[i].innerHTML);
					yhjgCount +=parseInt(yhjg[i].innerHTML);
				}
			}
			discounts.innerHTML = yhjgCount;
			checkNum[0].innerHTML = shoppingNum;
			total.innerHTML = sum;
			allMoney.innerHTML = total.innerHTML - parseInt(discounts.innerHTML);
		}
		function fn3(){//选项框改变数据
			let check1 = document.getElementsByClassName('check1');
			let checkAll = document.getElementsByClassName('checkAll');
			for(let i=0;i<check1.length;i++){
				check1[i].oninput = function(){
					fn1();
					fn2();
					let checkedCount = 0;//点击控制全选框
					for(let j=0;j<check1.length;j++){
						if(check1[j].checked==true){
							checkedCount++;
						}
					}
					if(checkedCount==check1.length){
						checkAll[0].checked=true;
						checkAll[1].checked=true;
					}else{
						checkAll[0].checked=false;
						checkAll[1].checked=false;
					}
				}
			}
		}
		function fn4(){//全选框
			let checkAll = document.getElementsByClassName('checkAll');
			let check1 = document.getElementsByClassName('check1');
			checkAll[0].oninput = function(){
				if(checkAll[0].checked==true){
					for(let j=0;j<check1.length;j++){
						if(check1[j].checked==false){
							check1[j].checked=true;
						}
					}
					checkAll[1].checked=true;
				}else{
					for(let i=0;i<check1.length;i++){
						check1[i].checked=false;
					}
					checkAll[1].checked=false;
				}
				fn2();
			}
			checkAll[1].oninput = function(){
				if(checkAll[1].checked==true){
					for(let j=0;j<check1.length;j++){
						if(check1[j].checked==false){
							check1[j].checked=true;
						}
					}
					checkAll[0].checked=true;
				}else{
					for(let i=0;i<check1.length;i++){
						check1[i].checked=false;
					}
					checkAll[0].checked=false;
				}
				fn2();
			}
		}
		function fn5(){//点击删除
			let deletes = document.getElementsByClassName('deletes');
			for(let i=0;i<deletes.length;i++){
				deletes[i].onclick = function(){
					if(confirm('确定要删除该购买的商品吗?')){
						let xhr=new XMLHttpRequest();
						xhr.open("get","data/deleteGoods.php?vipName="+getCookie('cname')+"&goodsId="+this.id,true);
						console.info(this.id);
						xhr.onreadystatechange=function(){
							if(xhr.readyState==4&&xhr.status==200){
								let s=xhr.responseText;
								if(s==1){
									document.getElementById('cartCon').children[i].style.transform = 'scale(0)';
									setTimeout(function(){
										document.getElementById('cartCon').children[i].remove();
										fn1();
										fn2();
										fn3();
										fn4();
										fn5();
										rightCartCount();
									},500)
								}else{
									alert('删除失败!');
								}
							}
						}
						xhr.send();
					}
				}
			}
		}
		// function fn6(){//删除选中商品
		// 	let deleteGoods = document.getElementById('deleteGoods');
		// 	let lis = document.getElementById('cartCon').children;
		// 	let check1 = document.getElementsByClassName('check1');
		// 	deleteGoods.onclick = function(){
		// 		for(let i=0;i<check1.length;i++){
		// 			if(check1[i].checked==true){
		// 				lis[i].remove(); 
		// 				fn2();
		// 			}
		// 		}
		// 	}
		// }

		// fn6();
		
	function getShoppingCart(){
		let cname = getCookie('cname');
		if(cname==null||cname==undefined||cname==''){
			alert('请登录!');
		}
		let xhr = new XMLHttpRequest();
		xhr.open("get","data/getShoppingCart.php?vipName="+cname,true);
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4&&xhr.status==200){
				let CartData=JSON.parse(xhr.responseText);
				showCartInfo(CartData);
				fn1();
				fn2();
				fn3();
				fn4();
				fn5();
			}
		}
		xhr.send();
	}
	getShoppingCart();
	function showCartInfo(CartData){
		let str ='';
		let CartCon = document.getElementById('cartCon');
		for(let i=0;i<CartData.length;i++){
			str +='<li>\
			<div class="lid1"><input type="checkbox" checked class="check1"></div>\
			<div class="shoppingImg"><img src="'+CartData[i].goodsImg+'" ></div>\
			<div class="shoppingInfo">\
				<p>'+CartData[i].goodsName+'</p>\
			</div>\
			<div class="onePrice"><span>$ <b class="onePriceValue">'+CartData[i].goodsPrice+'</b></span></div>\
			<div class="number">\
				<div class="numberCon">\
					<span class="add1">+</span>\
					<input type="text" name="'+CartData[i].goodsId+'" value="'+CartData[i].goodsCount+'" class="values" />\
					<span class="reduce">-</span>\
				</div>\
			</div>\
			<div class="jinE"><span>$ <b class="oneTypeMoney"></b></span></div>\
			<span class="yhjg">'+CartData[i].beiyong5+'</span>\
			<div class="operate"><span class="deletes" id="'+CartData[i].goodsId+'">删除</span></div>\
		</li>'
		}
		CartCon.innerHTML=str;
		
		updataCounts();
	}

function updata(vipName,goodsId,goodsCount){
	let xhr = new XMLHttpRequest();
	xhr.open("get","data/updateGoodsCount.php?vipName="+vipName+"&goodsId="+goodsId+"&goodsCount="+goodsCount,true);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4&&xhr.status==200){
			let c=JSON.parse(xhr.responseText);
			if(c==1){
				console.info('购物车修改成功');
				rightCartCount();
				fn1();
				fn2();
			}else{
				alert('修改失败!');
			}
		}
	}
	xhr.send();
}
//input 手动修改数量
function updataCounts(){
	let values = document.getElementsByClassName('values');
	for(let i=0;i<values.length;i++){
		values[i].onblur = function(){
			if(pattern.test(this.value)){
				if(isNaN(this.value)){
					this.value = 1;
				}else if(this.value<2){
					this.value = 1;
				}else{
					this.value = Math.ceil(this.value);
				}
			updata(getCookie('cname'),this.name,this.value);
		}
	}
}
//读取商城浏览记录cookie
function getShoppingHistory(){
	if(getCookie('shoppingHistory')==undefined||getCookie('shoppingHistory')==null){
		return;
	}
	let shoppingHistory=getCookie('shoppingHistory').split('|');
	let str = '';
	for(let i in shoppingHistory){
		let name = shoppingHistory[i].split('!')[0];
		let img = shoppingHistory[i].split('!')[1];
		str +='<div class="box1">\
		<img src="'+img+'" alt="">\
		<p>'+name+'</p>\
	</div>';
	}
	document.getElementById('historyBox').innerHTML=str;
}
getShoppingHistory();
