let player;
let obstaclemix = [];
let timer = 0;
let jumping = false;
let jumpingTime = 0;
let img1, img2;

function preload() {
  img1 = loadImage('maya.png');
  img2 = loadImage('running.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // player 객체 초기화 (크기만 살짝 키움)
  player = {
    x: 30,
    y: height / 2 - 100 / 2,  // 화면 중앙에 맞춘 y값
    width: 100,  // 크기 키우기
    height: 100,  // 크기 키우기
    draw() {
      image(img2, this.x, this.y, this.width, this.height);
    }
  }
}

function draw() {
  background(255);
  timer++;

  // 장애물 생성
  if (timer % 300 === 0) {
    let obstacle = new Obstacle();
    obstaclemix.push(obstacle);
  }

  // 장애물 업데이트
  for (let i = obstaclemix.length - 1; i >= 0; i--) {
    let obstacle = obstaclemix[i];
    obstacle.update();
    obstacle.draw();

    // 화면을 벗어난 장애물 삭제
    if (obstacle.x < -obstacle.width) {
      obstaclemix.splice(i, 1);
    }

    // 충돌 체크
    if (collision(player, obstacle)) {
      noLoop();  // 충돌 시 게임 멈춤
    }
  }

  // 점프 로직
  if (jumping) {
    player.y -= 5;
    jumpingTime += 5;
    if (jumpingTime > 150) {
      jumping = false;
      jumpingTime = 0;
    }
  } else if (player.y < height / 2 - player.height / 2) {
    player.y += 5;
  }

  // player 그리기
  player.draw();
}

// 창 크기 조절 대응
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // 화면 크기가 변경될 때 player 위치를 중앙으로 재조정
  player.y = height / 2 - player.height / 2;
  obstaclemix.forEach(obstacle => {
    obstacle.y = height / 2 - obstacle.height / 2;
  });
}

function keyPressed() {
  if (key === ' ') {
    jumping = true;
  }
}

// 장애물 클래스
class Obstacle {
  constructor() {
    this.x = width;  // 오른쪽 끝에서 시작
    this.y = height / 2 - 75 / 2;  // 중앙에 위치 (플레이어와 크기가 다르지만 그대로 유지)
    this.width = 75;  // 장애물 크기는 그대로 유지
    this.height = 75;  // 장애물 크기는 그대로 유지
  }

  update() {
    this.x -= 3;  // 장애물 왼쪽으로 이동 (속도는 그대로)
  }

  draw() {
    image(img1, this.x, this.y, this.width, this.height);
  }
}

// 충돌 감지 함수
function collision(player, obstacle) {
  return (player.x + player.width > obstacle.x &&
          player.x < obstacle.x + obstacle.width &&
          player.y + player.height > obstacle.y &&
          player.y < obstacle.y + obstacle.height);
}
