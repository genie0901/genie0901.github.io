/*화면의 verticalBar를 마우스로 드래그해서 
/*재생플레이어와 챗창의 화면너비 비율을 조절하는 자바스크립트 코드*/
// Query the element
const resizer = document.getElementsByClassName('gutter');
const leftSide = resizer[0].previousElementSibling;
const rightSide = resizer[0].nextElementSibling;

let isMobileCheck = isMobile();


// The current position of mouse
let x = 0;
let y = 0;

// Width of left side
let leftWidth = 0;
let topHeight = 0;

//마우스 드래그시 작동
const mouseMoveHandler = function (e) {
    let innerWidth = window.innerWidth;
    let dx;
    let dy;
    // How far the mouse or touch has been moved
    if (isMobileCheck) {
        // 모바일인 경우
        dx = e.touches[0].clientX - x;
        dy = e.touches[0].clientY - y;
    } else {
        dx = e.clientX - x;
        dy = e.clientY - y;
    }
    //모바일화면(768px이하)일때와 아닐 때 구분
    if (innerWidth > 768) {
        const newLeftWidth = (leftWidth + dx) * 100 / resizer[0].parentNode.getBoundingClientRect().width;
        /*재생플레이어 최소 너비는 전체화면의 10% 이상 90미만으로 제한*/
        if (newLeftWidth >= 10 && newLeftWidth < 90) {
            leftSide.style.width = `${newLeftWidth}%`;
            rightSide.style.width = `${100 - newLeftWidth}%`;
        }
    } else {
        const newTopHeight = (topHeight + dy) * 100 / resizer[0].parentNode.getBoundingClientRect().height;
        /*재생플레이어 최소 높이는 전체화면의 20% 이상 80미만으로 제한*/
        if (newTopHeight >= 20 && newTopHeight < 80) {
            leftSide.style.height = `${newTopHeight}%`;
            rightSide.style.height = `${100 - newTopHeight}%`;
        }
    }
    /*console.error("움직일때너비",newLeftWidth);*/

    document.body.style.cursor = 'col-resize';
    leftSide.style.userSelect = 'none';
    leftSide.style.pointerEvents = 'none';

    rightSide.style.userSelect = 'none';
    rightSide.style.pointerEvents = 'none';
};
const mouseUpHandler = function () {
    resizer[0].style.removeProperty('cursor');
    document.body.style.removeProperty('cursor');

    leftSide.style.removeProperty('user-select');
    leftSide.style.removeProperty('pointer-events');

    rightSide.style.removeProperty('user-select');
    rightSide.style.removeProperty('pointer-events');

    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
    //모바일용 이벤트 리스너에서 핸들러 삭제
    document.removeEventListener('touchmove', mouseMoveHandler);
    document.removeEventListener('touchend', mouseUpHandler);
};

// Handle the 마우스클릭 event
// that's triggered when user drags the resizer
const mouseDownHandler = function (e) {
    // Get the current touch positionS
    if (isMobileCheck) {
        //모바일 일때 
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
    } else {
        x = e.clientX;
        y = e.clientY;
    }
    leftWidth = leftSide.getBoundingClientRect().width;
    topHeight = leftSide.getBoundingClientRect().height;
    /*console.error("클릭시너비",leftWidth);*/
    // Attach the listeners to `document`
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
    //모바일용 이벤트 리스너 등록
    document.addEventListener('touchmove', mouseMoveHandler);
    document.addEventListener('touchend', mouseUpHandler);
};
// Attach the handler
resizer[0].addEventListener('mousedown', mouseDownHandler);
resizer[0].addEventListener('touchstart', mouseDownHandler);
//데스크탑,모바일 화면을 전환할때마다 각 조정 후 화면 크기  고정되는 문제로 매순간 마다 화면 초기화
window.onresize = function (event) {
    isMobileCheck = isMobile();
    var innerWidth = window.innerWidth;
    if (innerWidth > "768") {
        leftSide.style.height = "100%";
        rightSide.style.height = "100%";
    } else {
        leftSide.style.width = "100%";
        rightSide.style.width = "100%";
    }
}
