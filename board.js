var x = 200;
var y = 200;

let playerImg;
let targets = []; // 타겟들을 배열로 관리
let playerWidth = 300;
let playerHeight = 300;

let isColliding = false; // 충돌 발생 여부 플래그
let fadeAmount = 0; // 페이드 효과를 위한 변수

function setup() {
  createCanvas(2560, 1440);

  // 타겟 위치 및 크기 배열 설정
  targets.push({ img: loadImage('test.jpg'), x: 500, y: 500, w: 200, h: 200 });
  targets.push({ img: loadImage('test.jpg'), x: 700, y: 300, w: 200, h: 200 });
  targets.push({ img: loadImage('test.jpg'), x: 1000, y: 700, w: 200, h: 200 });
  targets.push({ img: loadImage('test.jpg'), x: 1500, y: 1000, w: 200, h: 200 });
  targets.push({ img: loadImage('test.jpg'), x: 2000, y: 400, w: 200, h: 200 });
}

function preload() {
  playerImg = loadImage('IMG_player.PNG', img => {
    let aspectRatio = img.height / img.width;
    playerWidth = 100;
    playerHeight = playerWidth * aspectRatio;
  });
}

function draw() {
  background(220);
  
  // 타겟 이미지를 배열을 이용하여 그리기
  for (let i = 0; i < targets.length; i++) {
    image(targets[i].img, targets[i].x, targets[i].y, targets[i].w, targets[i].h);
  }
  
  // 플레이어 이미지 그리기
  image(playerImg, x, y, playerWidth, playerHeight);
  
  // 충돌 발생 시 페이드 효과
  if (isColliding) {
    fadeScreen();
    return;
  }

  // 충돌 감지
  for (let i = 0; i < targets.length; i++) {
    if (checkCollision(x, y, targets[i].x, targets[i].y, playerWidth, playerHeight, targets[i].w, targets[i].h)) {
      console.log("Collision detected!"); // 디버깅용 로그
      isColliding = true; // 충돌 발생 플래그 설정

      // 3초 후에 jumpgame.html로 이동
      setTimeout(() => {
        window.location.href = 'jumpgame.html';
      }, 3000);
      break;  // 한 번 충돌하면 더 이상 체크하지 않음
    }
  }
}

function fadeScreen() {
  // 화면이 점점 어두워지는 효과
  fadeAmount += 2; // 페이드 속도 조절 (숫자가 클수록 빨라짐)
  fill(0, fadeAmount); // 투명도 증가
  rect(0, 0, width, height); // 화면을 덮는 사각형 그리기
}

function keyPressed() {
  // 충돌이 발생하지 않은 경우에만 플레이어 이동
  if (!isColliding) {
    if (keyCode === UP_ARROW) {
      y = y - 50;
    } else if (keyCode === DOWN_ARROW) {
      y = y + 50;
    }
    if (keyCode === LEFT_ARROW) {
      x = x - 50;
    } else if (keyCode === RIGHT_ARROW) {
      x = x + 50;
    }
  }
}

// 충돌 감지 함수
function checkCollision(x1, y1, x2, y2, width1, height1, width2, height2) {
  return (
    x1 < x2 + width2 &&
    x1 + width1 > x2 &&
    y1 < y2 + height2 &&
    y1 + height1 > y2
  );
}
