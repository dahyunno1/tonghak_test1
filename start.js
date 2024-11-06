let bgImg; // 배경 이미지 변수
let clickImg; // 클릭할 이미지 변수
let imgWidth = 200; // 클릭할 이미지 너비
let imgHeight; // 클릭할 이미지 높이 (원본 비율로 계산)
let imgX, imgY; // 클릭할 이미지 위치

function preload() {
    bgImg = loadImage('IMG_jump_screen.PNG'); // 배경 이미지 로드
    clickImg = loadImage('letsstart.png', img => {
        // 이미지 로드 후 원본 비율에 맞춰 높이 계산
        let aspectRatio = img.height / img.width;
        imgHeight = imgWidth * aspectRatio;
    });
}

function setup() {
    createCanvas(windowWidth, windowHeight); // 창 크기에 맞춘 캔버스 생성
    imgX = (width - imgWidth) / 2; // 클릭할 이미지 초기 X 위치 (중앙)
    imgY = (height - imgHeight) / 2; // 클릭할 이미지 초기 Y 위치 (중앙)
}

function draw() {
    image(bgImg, 0, 0, width, height); // 배경 이미지 그리기
    image(clickImg, imgX, imgY, imgWidth, imgHeight); // 클릭할 이미지 그리기
    if (mouseX > imgX && mouseX < imgX + imgWidth &&
        mouseY > imgY && mouseY < imgY + imgHeight) {
        cursor('pointer'); // 손 모양 커서
    } else {
        cursor('default'); // 기본 커서
    }
}

function mousePressed() {
    // 클릭한 위치가 클릭할 이미지 안인지 확인
    if (mouseX > imgX && mouseX < imgX + imgWidth &&
        mouseY > imgY && mouseY < imgY + imgHeight) {
        window.location.href = 'board.html'; // 이동할 페이지 URL을 넣어주세요
    }
}
