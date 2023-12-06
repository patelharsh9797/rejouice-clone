// TODO: Function Calls
locoMotiveScroll();
cursorEffect("#page1", "#page1-content");
cursorEffect("#page4", "#page4");
page2Effect();
image2Video();
// TODO: Event Functions

function locoMotiveScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
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
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function cursorEffect(pageId, contentId) {
  const page = document.querySelector(pageId);
  const page1Content = document.querySelector(contentId);
  const cursor = page.querySelector(".cursor");

  page1Content.addEventListener("mousemove", (dets) => {
    gsap.to(cursor, {
      x: dets.x,
      y: dets.y,
    });
  });

  page1Content.addEventListener("mouseenter", (dets) => {
    gsap.to(cursor, {
      scale: 1,
      opacity: 1,
    });
  });

  page1Content.addEventListener("mouseleave", (dets) => {
    gsap.to(cursor, {
      scale: 0,
      opacity: 0,
    });
  });
}

function page2Effect() {
  gsap.from(".elem h1", {
    y: 120,
    stagger: 0.5,
    duration: 1,
    scrollTrigger: {
      trigger: "#page2",
      scroller: "#main",
      start: "top 40%",
      end: "top 37%",
      scrub: 2,
    },
  });
  gsap.from(".elem h4, .elem h3", {
    y: 20,
    stagger: 0.2,
    duration: 0.5,
    scrollTrigger: {
      trigger: "#page2",
      scroller: "#main",
      start: "top 80%",
      end: "top 60%",
      scrub: 2,
    },
  });
}

function image2Video() {
  const allImageBox = document.querySelectorAll("#page3-elements .box");
  allImageBox.forEach((box) => {
    const videoElem = box.querySelector("video");
    box.addEventListener("mouseenter", () => {
      videoElem.currentTime = 0;
      videoElem.play();
    });
    box.addEventListener("mouseleave", () => {
      videoElem.pause();
    });
  });
}
