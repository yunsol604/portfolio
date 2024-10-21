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
$(document).ready(function() {
   $(window).on('scroll', function() {
      let skillSection = $('#skill').offset().top;
      let scrollPosition = $(window).scrollTop();
      let windowHeight = $(window).height();

      // 스크롤이 #skill 섹션에 도달하면 애니메이션 실행
      if (scrollPosition + windowHeight > skillSection + 100) {
         $('#skill .skill_name').addClass('active');
      } else {
         $('#skill .skill_name').removeClass('active');
      }
   });
});

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
   // spaceBetween: 80,
   navigation: {
      nextEl: '.swiper-btn-next',
      prevEl: '.swiper-btn-prev',
   },
})