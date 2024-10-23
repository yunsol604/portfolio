
// 한페이지씩 스크롤
// let $html = $("html");
// let page = 1;
// let lastPage = $(".section").length;

// $html.animate({scrollTop:0},10);

// $(window).on("wheel", function(e){

//    if($html.is(":animated")) return;

//    if(e.originalEvent.deltaY > 0){
//       if(page== lastPage) return;

//       page++;
//    } else if(e.originalEvent.deltaY < 0) {
//       if(page == 1) return;

//       page--;
//    }
//    let posTop = (page-1) * $(window).height();

//    $html.animate({scrollTop : posTop});

// });


const sections = document.querySelectorAll('.section')
const vw = window.innerWidth

sections.forEach((section) => {
   section.style.width = vw
})

// 마우스 커서
let mouseCursor = document.querySelector(".cursor");
window.addEventListener("mousemove", function(e) {
   mouseCursor.style.left = e.pageX + "px";
   mouseCursor.style.top = e.pageY + "px";
});

window.addEventListener("wheel", function(e){
	e.preventDefault();
},{passive : false});

// 한페이지씩 스크롤
let page = 1;
let lastPage = $(".section").length;

$("html").animate({scrollTop:0},10);

$(window).on("wheel", function(e){

   if($("html").is(":animated")) return;

   if(e.originalEvent.deltaY > 0){
      if(page== lastPage) return;

      if($(window).scrollTop() === $('#skill').offset().top) return;

      page++;
   } else if(e.originalEvent.deltaY < 0) {
      if(page == 1) return;

      page--;
   }
   let posTop = (page-1) * $(window).height();

   $("html").animate({scrollTop : posTop});

   // if(posTop === 1838) alert()
   // if(posTop === $('#skill').offset().top) return
   // else $("html").animate({scrollTop : posTop});
});

// title>h2 백그라운드 애니메이션 재생
gsap.registerPlugin(ScrollTrigger);

$('.section').each(function() {
   let titleDiv = $(this).find('.title div');

   ScrollTrigger.create({
      trigger: $(this),
      start: "top 80%",
      onEnter: () => {
         titleDiv.addClass('animate');
      },
      onLeaveBack: () => {
         titleDiv.removeClass('animate');
      },
      toggleActions: "play none none reset",
   });
});

//skill

// onePage
// 페이지 로드 시 #gnb li에 active 클래스 추가
$('#gnb li').each(function(index) {
   $(this).delay(index * 200).queue(function(next) {
      $(this).addClass('active');
      next();
   });
});

// 페이지가 로드되자마자 스크롤 위치 확인
checkHeaderVisibility();

// 스크롤 시 #onePage에서만 .main_header 숨기기
$(window).on('scroll', function() {
   checkHeaderVisibility();
});

// .main_header 숨김/보임 상태를 확인하는 함수
function checkHeaderVisibility() {
   let scrollPosition = $(window).scrollTop();
   let onePageHeight = $('#onePage').height();

   if (scrollPosition < onePageHeight) {
      $('.main_header').fadeOut(); // #onePage에 있을 때 숨김
   } else {
      $('.main_header').fadeIn(); // 다른 페이지에서는 다시 보임
   }
}

// webProject
$(window).on('scroll', function() {
   let webProjectSection = $('#webProject').offset().top;
   let scrollPosition = $(window).scrollTop();
   let windowHeight = $(window).height();

   // 스크롤이 #webProject 섹션에 도달하면 애니메이션 실행
   if (scrollPosition + windowHeight > webProjectSection + 100) {
      $('#webProject .web_list').addClass('active');
   } else {
      $('#webProject .web_list').removeClass('active');
   }
});

const dsSwiper = new Swiper('.ds_swiper', {
   // // loop: true,
   // autoplay: {
   //    delay: 3000,
   //    disableOnInteraction: false,
   // },
   centeredSlides: true,
   loop: true,
   loopedSlides: 1,
   slidesPerView: 3,
   spaceBetween: 60,
   navigation: {
      nextEl: '.swiper-btn-next',
      prevEl: '.swiper-btn-prev',
   },
   autoplay: true,
});



// 스크롤트리거
// gsap.registerPlugin(ScrollTrigger);

// // #skill 섹션의 li 요소에 대해 가로 스크롤 효과를 구현
// let skillItems = document.querySelectorAll("#skill .skill_name li");
// let totalItems = skillItems.length;
// let sectionWidth = totalItems * 100; // 각 li의 가로 크기만큼 총 길이 설정

// // #skill 섹션을 수평 스크롤로 설정
// gsap.to("#skill .skill_name ul", {
//    xPercent: -100 * (totalItems - 1), // 전체 리스트를 수평으로 스크롤
//    ease: "none",
//    scrollTrigger: {
//       trigger: "#skill",
//       start: "top top", // 섹션의 상단이 화면 상단에 닿을 때 시작
//       end: () => "+=" + sectionWidth, // 전체 li 요소 길이만큼 스크롤
//       pin: true, // 섹션 고정
//       scrub: true, // 스크롤에 따라 자연스럽게 움직임
//       snap: 1 / (totalItems - 1), // li 요소별로 딱딱 맞게 스냅 설정
//    },
// });

gsap.registerPlugin(ScrollTrigger);

// const pinnedImageWrappers = document.querySelectorAll('#slider');

// if (pinnedImageWrappers) {
//    pinnedImageWrappers.forEach((wrapper) => {
//       const inner = wrapper.querySelector('#slider li');
//       gsap.to(inner, {
//          x: () => -(inner.scrollWidth - document.documentElement.clientWidth) + 'px',
//          ease: 'none',
//          scrollTrigger: {
//                start: 'top',
//                trigger: wrapper,
//                pin: true,
//                scrub: 1,
//                invalidateOnRefresh: true,
//                end: () => `+=${inner.offsetWidth}`
//          }
//       });
//    });
// }

// #skill
const skillSection = document.querySelector('#skill'); // '#skill' ID 선택 시 # 제거
const slider = document.getElementById('slider'); // 'slider' 요소 선택
const sliderItems = slider.children; // 슬라이더 내부의 li 요소들 선택
const totalItems = sliderItems.length; // 총 li 개수
const slideWidth = sliderItems[0].offsetWidth; // 각 li의 너비
const maxScroll = -(slideWidth * (totalItems - 1)); // 전체 스크롤 범위 계산

let currentIndex = 0; // 현재 보여지는 li의 인덱스

// 마우스 휠 이벤트 리스너 추가
skillSection.addEventListener('wheel', function(e) {
   e.preventDefault(); // 기본 휠 이벤트 방지

   // 휠을 아래로 내리면 다음 슬라이드로
   if (e.deltaY > 0 && currentIndex < totalItems - 1) {
      currentIndex++;
   }
   // 휠을 위로 올리면 이전 슬라이드로
   else if (e.deltaY < 0 && currentIndex > 0) {
      currentIndex--;
   }

   // 슬라이더를 오른쪽에서 왼쪽으로 이동시키는 애니메이션
   slider.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
   slider.style.transition = 'transform 1s ease-in-out';
});

// gsap.registerPlugin(ScrollTrigger);

// // #skill 섹션의 li 요소에 대해 가로 스크롤 효과를 구현
// const skillSection = document.querySelector('#skill');
// const slider = document.getElementById('slider');
// const sliderItems = slider.children;
// const totalItems = sliderItems.length;
// const slideWidth = sliderItems[0].offsetWidth;
// const maxScroll = -(slideWidth * (totalItems - 1));

// let currentIndex = 0;

// // 마우스 휠 이벤트 리스너 추가
// skillSection.addEventListener('wheel', function(e) {
//    e.preventDefault(); // 기본 휠 이벤트 방지

//    // 휠을 아래로 내리면 다음 슬라이드로
//    if (e.deltaY > 0 && currentIndex < totalItems - 1) {
//       currentIndex++;
//    }
//    // 휠을 위로 올리면 이전 슬라이드로
//    else if (e.deltaY < 0 && currentIndex > 0) {
//       currentIndex--;
//    }

//    // 슬라이더를 오른쪽에서 왼쪽으로 이동시키는 애니메이션
//    slider.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
//    slider.style.transition = 'transform 1s ease-in-out';

//    // 모든 li가 다 보인 후 다음 페이지로 스크롤
//    if (currentIndex === totalItems - 1 && e.deltaY > 0) {
//       ScrollTrigger.getById('skillTrigger').kill(); // 스크롤 트리거 종료
//       $('html').animate({ scrollTop: $('#webProject').offset().top }, 1000); // 다음 페이지로 스크롤 이동
//    }
// });

// // GSAP 스크롤 트리거 설정
// ScrollTrigger.create({
//    id: 'skillTrigger',
//    trigger: '#skill',
//    start: 'top top',
//    end: () => '+=' + (slideWidth * totalItems), // 전체 li 요소의 길이만큼 끝
//    pin: true,
//    scrub: true,
//    onLeave: () => {
//       // 모든 li가 다 보여지고 나서 휠을 계속 내리면 다음 페이지로 이동
//       $('html').animate({ scrollTop: $('#webProject').offset().top }, 1000);
//    }
// });
