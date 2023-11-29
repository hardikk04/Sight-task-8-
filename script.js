function locoScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

locoScroll();

let loder = document.querySelector(".loder");
let loderText = document.querySelector(".loder-text");
let loderTextH1 = document.querySelector(".loder-text>h1");
loderText.addEventListener("click", () => {
  loder.style.opacity = 0;
  loder.style.zIndex = -9;
});

loderText.addEventListener("mouseenter", () => {
  loderText.style.borderColor = "#fff";
  loderTextH1.textContent = "Click here";
});

loderText.addEventListener("mouseleave", () => {
  loderText.style.borderColor = "#1750de";
  loderTextH1.textContent = "Sight";
});

let cursor = document.querySelector(".cursor");
let cursorH1 = document.querySelector(".cursor>h1");

document.addEventListener("mousemove", (dets) => {
  cursor.style.left = dets.x - 10 + "px";
  cursor.style.top = dets.y - 10 + "px";
});

let allImg = document.querySelectorAll(".img");

allImg.forEach((dets) => {
  dets.addEventListener("mouseenter", () => {
    cursor.style.height = "15vh";
    cursor.style.width = "15vh";
    cursor.style.backgroundColor = "#fff";
    cursorH1.style.opacity = 1;
  });

  dets.addEventListener("mouseleave", () => {
    cursor.style.height = "1.5vh";
    cursor.style.width = "1.5vh";
    cursor.style.backgroundColor = "#1750de";
    cursorH1.style.opacity = 0;
  });
});

let telegram = document.querySelector(".telegram");
let telegramH3 = document.querySelector(".page7-top-right-dets>h3");

telegram.addEventListener("mouseenter", () => {
  telegram.style.color = "#1750de";
  telegramH3.style.color = "#1750de";
});

telegram.addEventListener("mouseleave", () => {
  telegram.style.color = "#fff";
  telegramH3.style.color = "#fff";
});
