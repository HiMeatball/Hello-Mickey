let points = [[8,2],[9,1], [16,1], [17,2],[17,3],[16,4],[17,4],[17,5],[14,8],[18,8],[19,9],[19,10],[15,14],[16,15],[16,17],[14,19],[12,19],[10,17],[10,15],[11,14],[10,13],[9,14],[7,14],[5,12],[5,10],[7,8],[9,8],[10,9],[11,8],[8,5],[8,2],[5,4],[6,5],[6,7],[4,7],[3,6],[3,4],[5,2],[8,2]]; //list資料，
let ctx;
let lineScale = 1; // 線條初始大小
let lineSize; //線條大小


function setup() {   //只會執行一次的函數
  createCanvas(windowWidth, windowHeight); //設定一個畫布，寬為整個視窗的寬度windowWidth，高度為整個視窗的高度windowHeight
  background(100);
  //把points 內的值都*20
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points[i].length; j++) {
      points[i][j] = points[i][j] * 20;
    }
  }

	ctx = canvas.getContext('2d');
	ctx.lineWidth = 15;
	ctx.lineCap = 'round'

	//------
	gradientLine(ctx, 160, 40, 320, 340, '#f8edeb','pink','#005f73','black'); //漸層。起點(8,2)終點(16,17)

}

function draw() {
  background(255);

  // scale(50)
  translate(width/3, height*2/3); //原本原點在左上角，利用這指令把原點放到視窗的中心
  let scaleValue = map(mouseX, 0, width, 0.1, 2);
  scale(scaleValue);


  textSize(30)  //文字大小
  textFont("fantasy"); //字型
  fill('#0a9396');  //設定顏色
  text("Hello!Mickey", 400, 0)  //顯示文字

  scale(1, -1);  //上下翻轉
  for (let i = 0; i < points.length-1; i++) {
   line(points[i][0], points[i][1], points[i+1][0], points[i+1][1]);
   }
  line(points[points.length-1][0], points[points.length-1][1], points[0][0], points[0][1]); //把最後一點與第一點的連線

  // 從小到大五層線條
  //let scaleValue = 1;
  for (let j = 0; j < 4; j++) {
    scaleValue *= 0.9; // 線條縮小比例
    scale(scaleValue); // 縮放畫布

    strokeWeight(10);
    for (let i = 0; i < points.length-1; i++) {
      line(points[i][0], points[i][1], points[i+1][0], points[i+1][1]);
    }
  }
  
}

// 以下函數主要畫從(x1,y1)~(x2,y2)間，顏色為c1到c2的變化

function gradientLine(ctx, x1, y1, x2, y2, c0, c1, c2, c3) {
  const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
  gradient.addColorStop(0, c0);
  gradient.addColorStop(0.3, c1);
  gradient.addColorStop(0.7, c2);
  gradient.addColorStop(1, c3);
  ctx.strokeStyle = gradient;

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function mouseMoved() {
  // 根據滑鼠的x位置，調整線段的大小
  size = map(mouseX, 0, width, 10, 100);
}
