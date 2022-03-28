init(250,"mylegend",800,480,main);
var backlayer;
var loadinglayer;
var imglist={};
var imgData=[
	{name:"title",path:"images/title.png"},
	{name:"shitou",path:"images/shitou.png"},
	{name:"jiandao",path:"images/jiandao.png"},
	{name:"bu",path:"images/bu.png"}	
];
var arr=["jiandao","shitou","bu"];
var shitou;
var index=0;
var player;
var bool=false;
var comp;
var gamelayer;
var btn1;
var btn2;
var btn3;
var checkwin=[[0,-1,1],[1,0,-1],[-1,1,0]];
var resultlayer;
var win=0;
var lose=0;
var draw=0;
var benju;
var alltext;
var wintext;
var losetext;
var drawtext;
function main(){
	backlayer=new LSprite();
	addChild(backlayer);
	loadinglayer=new LoadingSample3();
	backlayer.addChild(loadinglayer);
	LLoadManage.load(
		imgData,
		function(progress){
			loadinglayer.setProgress(progress);
		},
		function(result){
			imglist=result;
			backlayer.removeChild(loadinglayer);
			loadinglayer=null;
			gameInit();
		}
	);
}
function gameInit(){
	backlayer.graphics.drawRect(10,'#080',[0,0,800,480],true,'black');
	var title=new LBitmap(new LBitmapData(imglist["title"]));
	backlayer.addChild(title);
	title.x=(800-title.width)/2;
	title.y=20;

	comp=new LSprite();
	shitou=new LBitmap(new LBitmapData(imglist[arr[index]]));
	comp.addChild(shitou);
	backlayer.addChild(comp);

	comp.x=(800-title.width)/2+360;
	comp.y=150;
	comp.addEventListener(LMouseEvent.MOUSE_UP,onUp)

	player=new LBitmap(new LBitmapData(imglist["shitou"]));
	backlayer.addChild(player);
	player.x=(800-title.width)/2+50;
	player.y=150;

	var txt=new LTextField();
	backlayer.addChild(txt);
	txt.text="game player";
	txt.weight="bolder";
	txt.size=24;
	txt.color="#ffffff";
	txt.x=220;
	txt.y=100;
	txt=new LTextField();
	backlayer.addChild(txt);
	txt.text="computer";
	txt.weight="bolder";
	txt.size=24;
	txt.color="#ffffff";
	txt.x=550;
	txt.y=100;
	txt=null;

	gamelayer=new LSprite();
	gamelayer.graphics.drawRect(4,'#080',[0,0,title.width,150],true,"#333");
	backlayer.addChild(gamelayer);
	gamelayer.x=(800-title.width)/2+50;
	gamelayer.y=300;
	txt=new LTextField();
	txt.text="punch";
	txt.x=5;
	txt.y=5;
	txt.weight="bolder";
	txt.size=18;
	txt.color="#fff";
	gamelayer.addChild(txt);
	txt=null;

	btn1=getResult("shitou");
	gamelayer.addChild(btn1);
	btn1.addEventListener(LMouseEvent.MOUSE_UP,onbtn);
	btn1.x=75;
	btn1.y=50;

	btn2=getResult("jiandao");
	gamelayer.addChild(btn2);
	btn2.addEventListener(LMouseEvent.MOUSE_UP,onbtn);
	btn2.x=175;
	btn2.y=50;

	btn3=getResult("bu");
	gamelayer.addChild(btn3);
	btn3.addEventListener(LMouseEvent.MOUSE_UP,onbtn);
	btn3.x=275;
	btn3.y=50;

	initResult();
}
function initResult(){
	resultlayer=new LSprite();
	resultlayer.graphics.drawRect(4,'#080',[0,0,150,220],true,'#333');
	backlayer.addChild(resultlayer);
	resultlayer.x=20;
	resultlayer.y=150;
	alltext=new LTextField();
	resultlayer.addChild(alltext);
	alltext.text="total times:"+(win+lose+draw);
	alltext.size=10;
	alltext.color="#fff";
	alltext.weight="bolder";
	alltext.x=15;
	alltext.y=10;

	wintext=new LTextField();
	wintext.text="win   times:"+win;
	wintext.size=10;
	wintext.color="#fff";
	wintext.weight="bolder";
	wintext.x=15;
	wintext.y=30;
	resultlayer.addChild(wintext);
	
	losetext=new LTextField();
	losetext.text="lose  times:"+lose;
	losetext.size=10;
	losetext.color="#fff";
	losetext.weight="bolder";
	losetext.x=15;
	losetext.y=50;
	resultlayer.addChild(losetext);

	drawtext=new LTextField();
	drawtext.text="draw  times:"+draw;
	drawtext.size=10;
	drawtext.color="#fff";
	drawtext.weight="bolder";
	drawtext.x=15;
	drawtext.y=70;
	resultlayer.addChild(drawtext);

	txt=new LTextField();
	txt.text="==============";
	txt.size=10;
	txt.color="#080";
	txt.weight="bolder";
	txt.x=15;
	txt.y=100;
	resultlayer.addChild(txt);
	
	benju=new LTextField();
	benju.text="welcome";
	benju.size=20;
	benju.weight="bolder";
	benju.color="#f00";
	benju.x=25;
	benju.y=170;
	resultlayer.addChild(benju);
}
function onbtn(event,display){
	player.bitmapData=new LBitmapData(imglist[display.name]);
	backlayer.removeEventListener(LEvent.ENTER_FRAME,onFrame);
	switch(checkwin[arr.indexOf(display.name)][index]){
		case 0:
			draw+=1;
			benju.text="YOU DRAW";
			break;
		case 1:
			win+=1;
			benju.text="YOU WIN";
			break;
		case -1:
			lose+=1;
			benju.text="YOU LOSE";
			break;
	}
	wintext.text="win   times:"+win;
	losetext.text="lose  times:"+lose;
	drawtext.text="draw  times:"+draw;
	alltext.text="total times:"+(win+lose+draw);
}
function getResult(val){
	var pic1=new LBitmap(new LBitmapData(imglist[val]));
	pic1.scaleX=0.5;
	pic1.scaleY=0.5;
	var pic2=new LBitmap(new LBitmapData(imglist[val]));
	pic2.scaleX=0.5;
	pic2.scaleY=0.5;
	pic2.x=2;
	pic2.y=2;
	var btn=new LButton(pic1,pic2);
	btn.name=val;
	return btn;
}
function onUp(event){
		backlayer.addEventListener(LEvent.ENTER_FRAME,onFrame);
		
}
function onFrame(event){
	index++;
	if(index>2){
		index=0;
	}
	shitou.bitmapData=new LBitmapData(imglist[arr[index]]);
}