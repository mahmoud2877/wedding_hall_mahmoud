import React, { useState, useEffect, useRef } from "react";
import "./InfiniteCardSlider.css"; // Import your CSS file

const InfiniteCardSlider = () => {
  const wrapperRef = useRef(null);
  const carouselRef = useRef(null);
  const cardRefs = useRef([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [cardPerView, setCardPerView] = useState(0);
  const [startX, setStartX] = useState(null);
  const [startScrollLeft, setStartScrollLeft] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  console.log(
    {
      wrapperRef,
      carouselRef,
      // scrollLift: carouselRef.scrollLeft,
      cardRefs,
      isAutoPlay,
      isDragging,
      cardPerView,
      startX,
      startScrollLeft,
      timeoutId,
    },
    "objectobject"
  );

  const cardData = [
    {
      name: "Photographer",
      title: "Sales Manager 1",
      image: "/header/header1.jpeg", // Replace with the actual image URL
    },
    {
      name: "Wedding planner",
      title: "Web Developer 2",
      image: "/header/header2.jpeg", // Replace with the actual image URL
    },
    {
      name: "Mackup artist",
      title: "Online Teacher 3",
      image: "/header/header3.jpeg", // Replace with the actual image URL
    },
    {
      name: "Suits & Dresses",
      title: "Freelancer 4",
      image: "/header/header4.jpeg", // Replace with the actual image URL
    },
    {
      name: "Singer",
      title: "Bank Manager 5",
      image: "/header/header5.jpeg", // Replace with the actual image URL
    },
    {
      name: "Else",
      title: "App Designer 6",
      image: "/header/header6.jpeg", // Replace with the actual image URL
    },
  ];
  // // Clear existing cards in the carousel
  // while (carouselRef.current.firstChild) {
  //   carouselRef.current.removeChild(carouselRef.current.firstChild);
  // }

  useEffect(() => {
    // Function to handle resizing and calculate cardPerView
    const handleResize = () => {
      const cardWidth = cardRefs.current[0]?.offsetWidth;
      if (cardWidth) {
        const calculatedCardPerView = Math.round(
          carouselRef.current.offsetWidth / cardWidth
        );
        setCardPerView(calculatedCardPerView); // Update cardPerView state
      }
    };

    // Attach resize event listener to update cardPerView when the window resizes
    window.addEventListener("resize", handleResize);

    // Initial calculation when the component mounts
    handleResize();

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Function to duplicate cards when cardPerView state changes
    const duplicateCards = () => {
      // Insert copies of the last few cards to the beginning of the carousel for infinite scrolling
      cardRefs.current
        .slice(-cardPerView)
        .reverse()
        .forEach((card) => {
          carouselRef.current.insertAdjacentHTML("afterbegin", card.outerHTML);
        });

      // Insert copies of the first few cards to the end of the carousel for infinite scrolling
      cardRefs.current.slice(0, cardPerView).forEach((card) => {
        carouselRef.current.insertAdjacentHTML("beforeend", card.outerHTML);
      });
    };

    // Duplicate cards when cardPerView changes
    duplicateCards();
  }, [cardPerView]); // Trigger the effect when cardPerView changes

  const dragStart = (e) => {
    setIsDragging(true);
    carouselRef.current.classList.add("dragging");
    setStartX(e.pageX);
    setStartScrollLeft(carouselRef.current.scrollLeft);
  };

  const dragging = (e) => {
    console.log("dragging", e.pageX, carouselRef.current.scrollLeft);
    // if (!isDragging) return;
    if (isDragging) {
      carouselRef.current.scrollLeft = startScrollLeft - (e.pageX - startX);
    }
  };

  const dragStop = () => {
    setIsDragging(false);
    if (carouselRef.current?.classList) {
      carouselRef.current?.classList?.remove("dragging");
      setIsAutoPlay(true);
    }
  };

  const infiniteScroll = () => {
    if (carouselRef.current.scrollLeft === 0) {
      carouselRef.current.classList.add("no-transition");
      carouselRef.current.scrollLeft =
        carouselRef.current.scrollWidth - 2 * carouselRef.current.offsetWidth;
      carouselRef.current.classList.remove("no-transition");
    } else if (
      Math.ceil(carouselRef.current.scrollLeft) ===
      carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
    ) {
      carouselRef.current.classList.add("no-transition");
      carouselRef.current.scrollLeft = carouselRef.current.offsetWidth;
      carouselRef.current.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if (!wrapperRef.current.matches(":hover")) {
      console.log("hover");
      autoPlay();
    }
  };

  const autoPlay = () => {
    if (window.innerWidth < 300 || !isAutoPlay) {
      //!isAutoPlay
      return;
    }
    const res = setTimeout(
      () => (carouselRef.current.scrollLeft += cardRefs.current[0].offsetWidth),
      2500
    );
    setTimeoutId(res);
  };

  useEffect(() => {
    // Start autoplay when the component mounts
    autoPlay();

    // Clean up the timeout on unmount
    return () => clearTimeout(timeoutId);
  }, []);
  document.addEventListener("mouseup", dragStop);

  // const handleLeft = () => {
  //   carouselRef.scrollLeft += cardRefs.current[0]?.offsetWidth;
  // };
  // const handleRight = () => {
  //   carouselRef.scrollLeft += -cardRefs.current[0]?.offsetWidth;
  // };
  return (
    <div
      className="wrapper"
      ref={wrapperRef}
      onMouseEnter={() => {
        console.log("entered");
        clearTimeout(timeoutId);
      }}
      onMouseOut={() => {
        console.log("enterout");
        autoPlay();
      }}
    >
      {/* <i id="left" className="fa-solid fa-angle-left" onClick={handleLeft}></i> */}
      <div
        className="carousel"
        ref={carouselRef}
        onMouseDown={dragStart}
        onMouseMove={dragging}
        // onMouseUp={dragStop}
        onScroll={infiniteScroll}
      >
        {/* Map over your card data and render them */}
        {cardData.map((card, index) => (
          <div
            className="card"
            key={index}
            ref={(ref) => {
              console.log(ref, "refCard", cardRefs.current);
              return (cardRefs.current[index] = ref);
            }}
          >
            <div className="imgF">
              <img src={card.image} alt="img" draggable="false" />
            </div>
            <h2>{card.name}</h2>
            <span>{card.title}</span>
          </div>
        ))}
      </div>
      {/* <i
        id="right"
        className="fa-solid fa-angle-right"
        onClick={handleRight}
      ></i> */}
    </div>
  );
};

export default InfiniteCardSlider;
