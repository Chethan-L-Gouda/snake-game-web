let main:HTMLDivElement=<HTMLDivElement>document.getElementById('main')!;
let item:HTMLCanvasElement=<HTMLCanvasElement>document.getElementById('item')!;
let html :HTMLHtmlElement = <HTMLHtmlElement>document.getElementsByTagName('html')[0]!;
let scoreboard :HTMLDivElement = <HTMLDivElement>document.getElementById('scoreboard')!;
let ctx:CanvasRenderingContext2D = item.getContext('2d');
let gameStart:boolean = false;
try{
	screen.orientation.lock('landscape').then(()=>console.log(`Locked ${screen.orientation}`)).catch(()=>console.log('ERROR'));
}catch(e){
	console.log(e);
}
ctx.canvas.height=1000
ctx.canvas.width=1000
let ydirect:number=0
let xdirect:number=0
let moveDis=40;
let boxSize=38;
let boxCount=25;
let x_cord:number=0;
let x:number;
let y_cord:number=0;
let score:number=0;
let img = new Image();
img.src='./images/applepng.png';
function keyClicked(event : KeyboardEvent){
	let key :string = event.key;
	if(key==='w' || key ==='ArrowUp'){
		event.preventDefault();
		if(ydirect===1)
			return;
		xdirect=0;
		ydirect=-1;
	}else if(key === 'a' || key==='ArrowLeft'){
		event.preventDefault();
		if(xdirect===1)
			return;
		ydirect=0;
		xdirect=-1;
	}else if(key==='s'||key==='ArrowDown'){
		event.preventDefault();
		if(ydirect===-1)
			return;
		xdirect=0;
		ydirect=1;
	}else if(key==='d'||key==='ArrowRight'){
		event.preventDefault();
		if(xdirect===-1)
			return;
		ydirect=0;
		xdirect=1;
	}
}
html.addEventListener('keydown',(event : KeyboardEvent)=>{
	gameStart=true;
	keyClicked(event);
});
function buttonClicked(event:Event){
	let target = <HTMLButtonElement>event.target;
	let id = target.id;
	if(id==='up'){
		if(ydirect===1)
			return;
		xdirect=0;
		ydirect=-1;
	}else if(id ==='left'){
		if(xdirect===1)
			return;
		ydirect=0;
		xdirect=-1;
	}else if(id==='down'){
		if(ydirect===-1)
			return;
		xdirect=0;
		ydirect=1;
	}else if(id==='right'){
		if(xdirect===-1)
			return;
		ydirect=0;
		xdirect=1;
	}

}
let controls:HTMLCollectionOf<Element> = document.getElementsByClassName('direc')!;
for (let i:number=0;i<4;i++){
	gameStart=true;
	controls[i].addEventListener('click',(event:Event)=>{
		buttonClicked(event);
	});
}
function clearCanvas(){
	ctx.clearRect(0,0,1000,1000);
}
let y:number=0;
function gameOver(){
	clearInterval(loop);
	console.log('game over!');
	ctx.fillStyle='rgba(56,56,56,1)';
	ctx.fillRect(200,400,600,200);
	ctx.fillStyle='rgb(11, 235, 160)';
	ctx.font='100px verdana';
	ctx.fillText('Game Over',300,525);
	x_cord=0;y_cord=0;
	score=0;
}
function changeCord(){
	x_cord=x_cord+(xdirect*(moveDis));
	y_cord=y_cord+(ydirect*(moveDis));
	if(x_cord>1000-moveDis || x_cord<0 || y_cord>1000-moveDis || y_cord<0) gameOver();
}
let appEaten:boolean=true;
var apple_x:number,apple_y:number;
function apple(){
	ctx.fillStyle='rgba(225,111,111,1)';
	if(appEaten){
		apple_x=Math.floor((Math.random())*1000);
		apple_x=apple_x-(apple_x%moveDis);
		apple_y=Math.floor((Math.random())*1000);
		apple_y=apple_y-(apple_y%moveDis);
		if(apple_x>950) apple_x=950;
		if(apple_x<50) apple_x=50;
		if(apple_y>950) apple_y=950;
		if(apple_y<50) apple_y=50;
		appEaten=false;
	}
	ctx.drawImage(img,apple_x,apple_y);
}
let slength:number=0;
let tx_cord: Array<number>;let ty_cord:Array<number>;
let snakeLength:number=0;
interface Cords{
	x:number,
	y:number
}
let snakeBlockCords : Array<Cords>;
function drawSnakeBlocks(){
	
}
function drawSnake(){
	ctx.fillStyle='violet';
	ctx.fillRect(x_cord,y_cord,boxSize,boxSize);
	for(let i=1;i<=slength;i++)
		ctx.fillRect(tx_cord[i],ty_cord[i],boxSize,boxSize);
}
function eaten(){
	if(((x_cord+20>=apple_x)&&(x_cord+20<=(apple_x+40)))&&((y_cord+20>=apple_y)&&(y_cord+20<=(apple_y+40)))){
		appEaten=true;
		score++;
	}
	scoreboard.innerHTML=`<span>Score : ${score}<br/>Level : ${level}</span>`;
}
var level:number=0;
var loop:any;
function mainloop(){
	if(score ===0 ) level=1;
	else level=Math.ceil(Math.log2(score))+1;
	clearCanvas();
	drawSnake();
	apple();
	changeCord();
	eaten();
	loop = setTimeout(mainloop,1000/(level*1.2));
}
mainloop();
