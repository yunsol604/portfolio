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



gsap.registerPlugin(ScrollTrigger);

// 각 섹션에 대해 ScrollTrigger 설정
$('.section').each(function() {
   let titleDiv = $(this).find('.title div');  // .title 안의 div 요소 선택

   // ScrollTrigger를 사용하여 각 섹션의 title div에 애니메이션 적용
   ScrollTrigger.create({
      trigger: $(this),  // 각 섹션이 트리거될 때
      start: "top 80%",  // 섹션의 상단이 화면의 80% 지점에 도달하면 시작
      onEnter: () => {
         // 애니메이션 실행을 위해 클래스 추가
         titleDiv.addClass('animate');  // 'animate' 클래스 추가
      },
      onLeaveBack: () => {
         // 뒤로 스크롤할 때 애니메이션 다시 실행하려면 클래스 제거
         titleDiv.removeClass('animate');
      },
      toggleActions: "play none none reset",  // 한 번만 실행 후 스크롤 다시 올라오면 애니메이션 재실행
   });
});
