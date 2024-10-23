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
let $html = $("html");
let page = 1;
let lastPage = $(".section").length;

$html.animate({scrollTop:0},10);

$(window).on("wheel", function(e){

   if($html.is(":animated")) return;

   if(e.originalEvent.deltaY > 0){
      if(page== lastPage) return;

      page++;
   } else if(e.originalEvent.deltaY < 0) {
      if(page == 1) return;

      page--;
   }
   let posTop = (page-1) * $(window).height();

   $html.animate({scrollTop : posTop});

});

// onePage
$(document).ready(function() {
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
});

// skill 안됨
// $(document).ready(function() {
//    let liElements = $('#skill .skill_name li');  // 모든 li 요소들 선택
//    let skillSection = $('#skill').offset().top;  // #skill 섹션 위치

//    // 스크롤 이벤트 핸들러
//    $(window).on('scroll', function() {
//       let scrollPosition = $(window).scrollTop();
//       let windowHeight = $(window).height();

//       // 스크롤이 #skill 섹션에 도달하면 li 하나씩 순차적으로 나타나게 함
//       if (scrollPosition + windowHeight > skillSection + 100) {
//          liElements.each(function(index) {
//             $(this).delay(index * 200).queue(function(next) {
//                $(this).css({
//                   'opacity': '1',
//                   'transform': 'translateX(0)'  // 원래 위치로 이동
//                });
//                next();
//             });
//          });
//       }
//    });
// });


// webProject
$(document).ready(function() {
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
});

const dsSwiper = new Swiper('.ds_swiper', {
   loop: true,
   autoplay: {
      delay: 3000,
      disableOnInteraction: false,
   },
   centeredSlides: true,
   slidesPerView: 3,
   spaceBetween: 20,
   navigation: {
      nextEl: '.swiper-btn-next',
      prevEl: '.swiper-btn-prev',
   },
});

// 스크롤트리거
$(document).ready(function() {
   gsap.registerPlugin(ScrollTrigger);

   // #skill 섹션의 li 요소에 대한 애니메이션 설정
   gsap.from("#skill .skill_name li", {
      x: 200,  // 가로로 200px만큼 오른쪽에서 시작
      opacity: 0,  // 시작할 때 투명하게
      stagger: 0.2,  // 각 요소가 0.2초 간격으로 순차적으로 나타남
      duration: 1,  // 각 애니메이션의 지속 시간
      ease: "power2.out",  // 부드러운 애니메이션
      scrollTrigger: {
         trigger: "#skill",  // #skill 섹션이 트리거될 때 애니메이션 실행
         start: "top 80%",  // 화면의 80% 지점에 도달하면 애니메이션 시작
         toggleActions: "play none none none",  // 한 번만 재생
      }
   });
});