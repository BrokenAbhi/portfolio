
const downArrow = document.querySelector(".arrow-scroller");
const project = document.querySelector(".projects");

downArrow.addEventListener("click",function() {
    project.scrollIntoView({behavior: "smooth"});
});

// moving cursor //

 document.addEventListener('DOMContentLoaded', function () {
      const cursor = document.querySelector('.cursour');
      document.addEventListener('mousemove', (event) => {
      moveCursor(event, cursor);
      });

      function moveCursor(event, cursor) {
         const x = event.clientX - cursor.parentElement.getBoundingClientRect().left;
         const y = event.clientY - cursor.parentElement.getBoundingClientRect().top;
        cursor.style.left = x + 'px';
        cursor.style.top = y + 'px';
      }
    });

// locomotive smooth scroll //
    
    const scroll = new LocomotiveScroll({
    el: document.querySelector('#flex-container'),
    smooth: true
});

//  animation on anchor tags //

gsap.from(".anime",{
  stagger: .1,
  opacity:0,
  y:10,
  duration:2,
  ease: Power2
})

gsap.from(".left",{
  stagger: .2,
  opacity:0,
  y:10,
  duration:1,
  ease: Power2
})


// animates the texts //

Shery.textAnimate("#self", {
  style: 1,
  y: 10,
  delay: 0.1,
  duration: 2,
  ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  multiplier: 0.1,
});

Shery.textAnimate(".text-one" , {
  style: 1,
  y: 10,
  delay: 0.1,
  duration: 2,
  ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  multiplier: 0.1,
});

Shery.textAnimate(".paragraph" , {
  style: 1,
  y: 10,
  delay: 0.1,
  duration: 2,
  ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  multiplier: 0.1,
});


Shery.textAnimate(".thought" , {
  style: 1,
  y: 10,
  delay: 0.1,
  duration: 2,
  ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  multiplier: 0.1,
});

// here we will render our first project on server // 

document.addEventListener("DOMContentLoaded",() => {
  const projectOne  = document.querySelectorAll(".project-one");
  projectOne.forEach((project) => {
    project.addEventListener("click",() =>{
        window.location.href= "/project-one";
      });
    });
});

// here we will render our chatApp project //
document.addEventListener("DOMContentLoaded", () => {
  const chatApp = document.querySelectorAll(".chatApp");
  chatApp.forEach((project) => {
    project.addEventListener("click", () => {
      window.location.href = "/chatApp";
    });
  });
});

// here we will render our second project on server // 


document.addEventListener("DOMContentLoaded",() => {
  const projectTwo  = document.querySelectorAll(".project-two");
  projectTwo.forEach((project) => {
    project.addEventListener("click",() =>{
        window.location.href= "/project-two";
      });
    });
});

// here we will render our third project on server // 


document.addEventListener("DOMContentLoaded",() => {
  const projectThree  = document.querySelectorAll(".project-three");
  projectThree.forEach((project) => {
    project.addEventListener("click",() =>{
        window.location.href= "/project-three";
      });
    });
});

// here we will render our API based project on server // 

document.addEventListener("DOMContentLoaded",() => {
  const Stocks  = document.querySelectorAll(".stock-market");
  Stocks.forEach((project) => {
    project.addEventListener("click",() =>{
        window.location.href= "/stock-market";
      });
    });
});

document.addEventListener("DOMContentLoaded",() => {
  const Stocks  = document.querySelectorAll(".qr-generator");
  Stocks.forEach((project) => {
    project.addEventListener("click",() =>{
        window.location.href= "/qr-generator";
      });
    });
});


const numbercontainer = document.getElementById("number")
  for (i=1; i<=27; i++){
    const numberElement = document.createElement("div");
    numberElement.className = 'number';
    numberElement.textContent = i;
    numbercontainer.appendChild(numberElement);
  }

  // Code for sending form data //
document.getElementById("sendButton").addEventListener("click", function(){
  const name = document.getElementById("nameInput").value;
  const email = document.getElementById("emailInput").value;
  const message = document.getElementById("messageInput").value;

  console.log("Name:" + name);
  console.log("Email: " + email);
  console.log("Message: "+ message);

 // here we will validate form //
  // if(name.trim() === '' || email.trim() === '' || message.trim() === '')
  // alert("Please fill all the field before sending.")
  //   else{
  //     mailOpitons();
  //   }

  

  //here we will send the data form the form //

  fetch("/submit-form",{
    method: "POST",
    headers: {
       "Content-Type" : "application/json",
    },
    body:JSON.stringify({name, email,message}),

  })

  .then((response) =>response.text())
  .then((data) =>{
    alert("I will get to you soon")
    // if(data.success){
    //   alert("Email sent successfully");
    // } else{
    //   alert("Failed to send Email");
    // }
    clearForm();
  });
});

function clearForm(){
  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");
  const messageInput = document.getElementById("messageInput");

  nameInput.value = "";
  emailInput.value = "";
  messageInput.value = "";
}

// 3d animation for first projects div //
document.addEventListener("DOMContentLoaded", () =>{
  const projectone = document.querySelector(".project-one");

  let animationTimeOut;

  projectone.addEventListener("mousemove",(e) =>{
    const boxRect = projectone.getBoundingClientRect();
    const mouseX = (e.clientX - boxRect.left) / boxRect.width;
    const mouseY = (e.clientY - boxRect.top) / boxRect.height;
    const maxRotation = 13;
    const rotationX = (mouseY - 0.5) * maxRotation * 2;
    const rotationY = -(mouseX - 0.5) * maxRotation * 2;
    projectone.style.transform = `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    projectone.style.border = "none"
    clearTimeout(animationTimeOut);
  });

  projectone,addEventListener('mouseleave', () =>{
    animationTimeOut = setTimeout(() => {
      projectone.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      },0);
   });
});

// 3d animation for second projects div //

document.addEventListener("DOMContentLoaded", () =>{
  const projectthree = document.querySelector(".project-three");

  let animationTimeOut;

  projectthree.addEventListener("mousemove",(e) =>{
    const boxRect = projectthree.getBoundingClientRect();
    const mouseX = (e.clientX - boxRect.left) / boxRect.width;
    const mouseY = (e.clientY - boxRect.top) / boxRect.height;
    const maxRotation = 13;
    const rotationX = (mouseY - 0.5) * maxRotation * 2;
    const rotationY = -(mouseX - 0.5) * maxRotation * 2;
    projectthree.style.transform = `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    projectthree.style.border = "none"
    clearTimeout(animationTimeOut);
  });

  projectthree,addEventListener('mouseleave', () =>{
    animationTimeOut = setTimeout(() => {
      projectthree.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      },0);
   });
});

// 3d animation for third projects div //

document.addEventListener("DOMContentLoaded", () =>{
  const projectwo = document.querySelector(".project-two");

  let animationTimeOut;

  projectwo.addEventListener("mousemove",(e) =>{
    const boxRect = projectwo.getBoundingClientRect();
    const mouseX = (e.clientX - boxRect.left) / boxRect.width;
    const mouseY = (e.clientY - boxRect.top) / boxRect.height;
    const maxRotation = 13;
    const rotationX = (mouseY - 0.5) * maxRotation * 2;
    const rotationY = -(mouseX - 0.5) * maxRotation * 2;
    projectwo.style.transform = `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    projectwo.style.border = "none"
    clearTimeout(animationTimeOut);
  });

  projectwo,addEventListener('mouseleave', () =>{
    animationTimeOut = setTimeout(() => {
      projectwo.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      },0);
   });
});

// 3d animartion for another project // 
document.addEventListener("DOMContentLoaded", () =>{
  const stockMarket = document.querySelector(".stock-market");

  let animationTimeOut;

  stockMarket.addEventListener("mousemove",(e) =>{
    const boxRect = stockMarket.getBoundingClientRect();
    const mouseX = (e.clientX - boxRect.left) / boxRect.width;
    const mouseY = (e.clientY - boxRect.top) / boxRect.height;
    const maxRotation = 13;
    const rotationX = (mouseY - 0.5) * maxRotation * 2;
    const rotationY = -(mouseX - 0.5) * maxRotation * 2;
    stockMarket.style.transform = `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    stockMarket.style.border = "none"
    clearTimeout(animationTimeOut);
  });

  stockMarket,addEventListener('mouseleave', () =>{
    animationTimeOut = setTimeout(() => {
      stockMarket.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      },0);
   });
});

document.addEventListener("DOMContentLoaded", () =>{
  const qrGenerator = document.querySelector(".qr-generator");

  let animationTimeOut;

  qrGenerator.addEventListener("mousemove",(e) =>{
    const boxRect = qrGenerator.getBoundingClientRect();
    const mouseX = (e.clientX - boxRect.left) / boxRect.width;
    const mouseY = (e.clientY - boxRect.top) / boxRect.height;
    const maxRotation = 13;
    const rotationX = (mouseY - 0.5) * maxRotation * 2;
    const rotationY = -(mouseX - 0.5) * maxRotation * 2;
    qrGenerator.style.transform = `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    qrGenerator.style.border = "none"
    clearTimeout(animationTimeOut);
  });

  qrGenerator,addEventListener('mouseleave', () =>{
    animationTimeOut = setTimeout(() => {
      qrGenerator.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      },0);
   });
});


 // here we will give the animation for chatApp //
document.addEventListener("DOMContentLoaded", () => {
  const projectwo = document.querySelector(".chatApp");

  let animationTimeOut;

  projectwo.addEventListener("mousemove", (e) => {
    const boxRect = projectwo.getBoundingClientRect();
    const mouseX = (e.clientX - boxRect.left) / boxRect.width;
    const mouseY = (e.clientY - boxRect.top) / boxRect.height;
    const maxRotation = 13;
    const rotationX = (mouseY - 0.5) * maxRotation * 2;
    const rotationY = -(mouseX - 0.5) * maxRotation * 2;
    projectwo.style.transform = `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    projectwo.style.border = "none";
    clearTimeout(animationTimeOut);
  });

  projectwo,
    addEventListener("mouseleave", () => {
      animationTimeOut = setTimeout(() => {
        projectwo.style.transform =
          "perspective(1000px) rotateX(0deg) rotateY(0deg)";
      }, 0);
    });
});

