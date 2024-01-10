var swiper = new Swiper(".swiper-container", {
  spaceBetween: 10,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

document.addEventListener("DOMContentLoaded", () => {
  const gridContainer = document.getElementById("gridContainer");

  // url which we insert in the box  //
  const ImageUrl = [
    "https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym13JTIwY2Fyc3xlbnwwfHwwfHx8MA%3D%3D",
    "https://unsplash.com/photos/blue-bmw-coupe-on-brown-asphalt-road-QD-8l-8_uJg",
    "https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym13JTIwY2Fyc3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1512206818698-0038a42885fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Ym13JTIwY2Fyc3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1603831126198-a53fd2a50da5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym13JTIwY2Fyc3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1603189661342-e45f1374f890?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym13JTIwY2Fyc3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Ym13JTIwY2Fyc3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1528597469186-bddab681a37f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJtdyUyMGNhcnN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/flagged/photo-1575790951850-333691bffcd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJtdyUyMGNhcnN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1533903358278-37d1f66f5d9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGJtdyUyMGNhcnN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1517153295259-74eb0b416cee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJtdyUyMGNhcnN8ZW58MHx8MHx8fDA%3D",
  ];



  // Create 16 boxes
  for (let i = 0; i < 16; i++) {
    const box = document.createElement("div");
    box.classList.add("box");

    const innerDiv = document.createElement("div");
    innerDiv.classList.add("inner-div");

    const ImgElement = document.createElement("img");
    const randomimageUrls =
    ImageUrl[Math.floor(Math.random() * ImageUrl.length)];

    

    ImgElement.src = randomimageUrls;
    ImgElement.alt = `Image ${i + 1}`;
    ImgElement.classList.add("grid-items");

    box.appendChild(ImgElement);
    box.appendChild(innerDiv);

    gridContainer.appendChild(box);
  }
});


// toggle //
// document.addEventListener("DOMContentLoaded", ()=>{
//   const toggle  = document.querySelectorAll('ri-sun-line');
//   const body = document.body;

//   toggle.addEventListener('Click',() =>{
//     body.classList.toggle('dark-mode')
//   })

// })

document.addEventListener("DOMContentLoaded", function () {
  // Set the countdown time to 40 minutes
  var countdownDate = new Date();
  countdownDate.setMinutes(countdownDate.getMinutes() + 40);

  var daysElement = document.getElementById("days");
  var hoursElement = document.getElementById("hours");
  var minutesElement = document.getElementById("minutes");
  var secondsElement = document.getElementById("seconds");

  function updateTimer() {
    var now = new Date().getTime();
    var distance = countdownDate - now;

    if (distance > 0) {
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysElement.textContent = days;
      hoursElement.textContent = hours < 10 ? "0" + hours : hours;
      minutesElement.textContent = minutes < 10 ? "0" + minutes : minutes;
      secondsElement.textContent = seconds < 10 ? "0" + seconds : seconds;
    } else {
      clearInterval(timerInterval);
      daysElement.textContent = "00";
      hoursElement.textContent = "00";
      minutesElement.textContent = "00";
      secondsElement.textContent = "00";
    }
  }

  // Initial call to display timer values immediately
  updateTimer();

  // Update the timer every second
  var timerInterval = setInterval(updateTimer, 1000);
});






document.addEventListener("DOMContentLoaded", function () {
  const cartButton = document.getElementById("cart-icon");
  const cart = document.getElementById("cart");

  if (!cartButton) {
    console.error("Cart button not found.");
  }

  if (!cart) {
    console.error("Cart element not found.");
  }

  // Toggle cart visibility on button click
  cartButton.addEventListener("click", function (e) {
    console.log("Cart button clicked.");
    cart.classList.toggle("active");
    e.stopPropagation(); // Prevent the click event from propagating to document
  });

  // Hide cart on click outside the cart
  document.addEventListener("click", function (e) {
    if (!cart.contains(e.target) && e.target !== cartButton) {
      console.log("Clicked outside the cart. Hiding cart.");
      cart.classList.remove("active");
    }
  });
});
