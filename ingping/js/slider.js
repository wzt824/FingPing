
class slider{
    constructor(obj){
        this.timer = null;
        this.imgArray = [];
        this.liArray = [];
        this.currOrd = 0;
        this.initData(obj);
        this.createUI();
        this.go();
        this.addEvent();   
    }
    initData(obj){
        let defaultObj ={
            box : null,
            imgs : null,
			bgDivColor:null,
			imgWidth:750,
			imgHeight : 450,
            timeSpace :4000,
			effectTime : 1000,
            pointerColor :'#cccccc',
            pointerHeightColor :'orange',
            pointerWidth :30,
            pointerHeight :30,
            pointerBorderRadius:'50%',
			imgPlace : 0
        }
        for(let key in defaultObj){
            obj[key]&&(defaultObj[key]=obj[key]);
        }
                
        for(let key in defaultObj){
            this[key]=defaultObj[key];
        }
    }
    createUI(){
		this.box.style.position = 'relative';
        let Oul = document.createElement('ul');
        Oul.style.cssText = "width:100%;position:absolute;left:0;top:95%;list-style:none;z-index:2;display:flex;justify-content:center";
        for(let i in this.imgs){
			let bgDiv = document.createElement('div');
            let Oimg = document.createElement('img');
            let Oli = document.createElement('li');
			bgDiv.style.cssText = "position:absolute;top:0;left:0";
			bgDiv.style.width = this.box.offsetWidth + 'px';
			bgDiv.style.height = this.box.offsetHeight +'px';
			bgDiv.style.backgroundColor = this.bgDivColor[i];
            Oimg.style.cssText = "position:absolute;top:0;display:block";
            Oli.style.cssText = "margin:0 10px;cursor:pointer";
            if(i==0){
                bgDiv.style.opacity = 1;
                Oli.style.backgroundColor = this.pointerHeightColor;
            }else{
                bgDiv.style.opacity = 0;
                Oli.style.backgroundColor = this.pointerColor;
            }
            Oimg.src = this.imgs[i];
            Oimg.style.width = this.imgWidth + 'px';
            Oimg.style.height = this.imgHeight + 'px';
			Oimg.style.left = this.imgPlace + 'px';
            Oli.style.width = this.pointerWidth + 'px';
            Oli.style.height = this.pointerHeight + 'px';
            Oli.style.borderRadius = this.pointerBorderRadius;
			bgDiv.appendChild(Oimg);
            this.imgArray.push(bgDiv);
            this.liArray.push(Oli);
            this.box.appendChild(bgDiv);
            Oul.appendChild(Oli);
			this.box.appendChild(bgDiv);
        }
        this.box.appendChild(Oul);
    }

    go(){
        this.timer = setInterval(()=>{
            let outOrd = this.currOrd;
            this.currOrd++;
            this.currOrd = this.currOrd%this.imgArray.length;
            this.showImg(outOrd,this.currOrd);
            this.showLi(outOrd,this.currOrd);
        },this.timeSpace);
    }
    showImg(outOrd,currOrd){
        if(outOrd==currOrd)return;
        this.imgArray[currOrd].style.opacity = 0;
        this.imgArray[outOrd].style.opacity = 1;
        this.changeOpacity(this.imgArray[outOrd],this.imgArray[currOrd]);
    }
    showLi(outOrd,currOrd){
        this.liArray[outOrd].style.backgroundColor = this.pointerColor;
        this.liArray[currOrd].style.backgroundColor = this.pointerHeightColor;
    }
    stop(){
        clearInterval(this.timer);
    }
    jumpImgLi(i){
        let outOrd = this.currOrd;
        this.currOrd = i;
        this.showImg(outOrd,this.currOrd);
        this.showLi(outOrd,this.currOrd);
    }
    addEvent(){
        this.box.onmouseenter = ()=>{
            this.stop();
        }
        this.box.onmouseleave = ()=>{
            this.go();
        }
        for(let i in this.liArray){
            this.liArray[i].onclick = ()=>{
                this.jumpImgLi(i);
            }
        }
    }
    changeOpacity(outOrd,currOrd){
        let opacityTimer = null;
        let opacityValue = 0;
        opacityTimer = setInterval(()=>{
            opacityValue +=1/100;
            if(opacityValue>=1){
                clearInterval(opacityTimer);
                opacityValue = 1;
            }
            outOrd.style.opacity = 1-opacityValue;
            currOrd.style.opacity = opacityValue;
        },this.effectTime/100)
    }
}
//数据操作
	let imgPlace = document.getElementById('sort').offsetWidth + document.getElementById('sort').offsetLeft;
	let bannerSlider = new slider({
		box : document.getElementById('box'),
		imgs : ["images/sliderImg1.jpg","images/sliderImg2.jpg","images/sliderImg3.jpg","images/sliderImg4.jpg","images/sliderImg5.jpg","images/sliderImg6.jpg","images/sliderImg7.jpg"],
		pointerColor : 'rgba(255,255,255,.4)',
		pointerHeightColor : 'rgba(255,255,255,.9)',
		pointerWidth : 40,
		pointerHeight : 6,
		pointerBorderRadius : '0%',
		imgWidth : 750,
		imgHeight : 450,
		timeSpace : 4000,
		effectTime : 500,
		bgDivColor : ["#63decc","#e50150","#ff95fe","#ff86a7","#66d3f2","#ffa060","#fa75a0"],
		imgPlace:imgPlace
	})