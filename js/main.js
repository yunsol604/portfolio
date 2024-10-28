gsap.registerPlugin(ScrollTrigger);

checkHeaderVisibility(); // 페이지가 로드되자마자 .main_header 함수 호출

$(window).on('scroll', function() { // 스크롤 이벤트 .main_header 함수 호출
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
$(window).on('wheel', function(e) {
   e.preventDefault();
}, {passive: false});


const vw = $(window).width(); // 윈도우 너비 변수
$('.section').each(function() {
   $(this).css('width', vw); // 윈도우 가로 스크롤 생김 현상 제거

   // title>h2 형광펜 효과 애니메이션
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

// ** onePage (HOME)
// 페이지 로드 시 #gnb li에 active 클래스 추가하여 애니메이션 효과
$('#gnb li').each(function(index) {
   $(this).delay(index * 200).queue(function(next) {
      $(this).addClass('active');
      next();
   });
});

// ** skill 스크롤 트리거
gsap.to('#slider', {
   x: () => -($('#slider li').innerWidth() * ($('#slider li').length - 1)),  // 전체 슬라이더를 가로로 이동
   scrollTrigger: {
      trigger: '#skill',
      start: 'top top',
      end: () => '+=' + ($('#slider li').innerWidth() * $('#slider li').length),  // 각 li의 넓이만큼 스크롤 끝 지점 설정
      pin: true,
      scrub: 6,
      snap: 1 / ($('#slider li').length),
      markers: false
   }
});

// ** webProject가 로드되면 li가 자연스럽게 올라오도록 애니메이션
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

// ** dsProject 스와이퍼
const dsSwiper = new Swiper('.ds_swiper', {
   loop: true,
   autoplay: true,
   centeredSlides: true,
   loopedSlides: 1,
   slidesPerView: 3,
   spaceBetween: 60,
   navigation: {
      nextEl: '.swiper-btn-next',
      prevEl: '.swiper-btn-prev',
   },
   pagination: {
      el: '.swiper-pagination',
      clickable: true,
   }
});
//li의 id와 팝업 이미지의 이름을 같게
$('.ds_swiper li a').click(function(e) {
   e.preventDefault();
   const imgName = $(this).parent().attr('id')
   $('#dsProject .popup img').attr('src',`./img/design/${imgName}.png`)
   $('#dsProject .popup').show()
   $('html').css({'overflow': 'hidden'})
})
$('#dsProject .popup').click(function() {
   $(this).hide()
   $('html').css({'overflow-y': 'auto'})
})



// ***** 보류
// 마우스 커서 커스텀
// let mouseCursor = document.querySelector(".cursor");
// window.addEventListener("mousemove", function(e) {
//    mouseCursor.style.left = e.pageX + "px";
//    mouseCursor.style.top = e.pageY + "px";
// });

// 한페이지씩 스크롤
// let page = 1;
// let lastPage = $(".section").length;

// $("html").animate({scrollTop:0},10);

// $(window).on("wheel", function(e){

//    if($("html").is(":animated")) return;

//    if(e.originalEvent.deltaY > 0){
//       if(page== lastPage) return;

//       if($(window).scrollTop() === $('#skill').offset().top) return;

//       page++;
//    } else if(e.originalEvent.deltaY < 0) {
//       if(page == 1) return;

//       page--;
//    }
//    let posTop = (page-1) * $(window).height();

//    $("html").animate({scrollTop : posTop});
// });


