let menu = document.querySelector('.menu-icon');
let navbar = document.querySelector('.menu');
let newContent = document.querySelector('.new-content');

menu.onclick = () => {
  navbar.classList.toggle('active');
  menu.classList.toggle('move');
  bell.classList.remove('active')
}

//Notification 
let bell = document.querySelector('.notification');

document.querySelector('#bell-icon').onclick = () => {
  bell.classList.toggle('active')
}
// Swiper
var swiper = new Swiper(".games-content", {
  slidesPerView: 1,
  spaceBetween: 10,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    1068: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
});



// Custom scroll bar
window.onscroll = function () { mufunction() };
function mufunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById('scroll-bar').style.width = scrolled + '%';
}

function createBox(game,index){
  let newBox = document.createElement('div');
  newBox.className = "box";
  newBox.innerHTML = `<img src="img/new${index}.jpg" alt="">
                      <div class="box-text">
                          <h2>${game.boxText}</h2>
                          <h3>${game.genre}</h3>
                          <div class="rating-download">
                              <div class="rating">
                                  <i class='bx bxs-star'></i>
                                  <span>${game.rating}</span>
                              </div>
                              <a href="box_${index}.html" class="box-btn"><i class='bx bx-down-arrow-alt'></i></a>
                          </div>
                      </div>`;
  newContent.append(newBox);
}


gameArr.forEach((element,index) => createBox(element,index+1));