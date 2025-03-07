"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

// ContainerScroll Component
export const ContainerScroll = ({
  titleComponent,
  children,
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);
     // Define scroll-based animations
     const fadeUp = useTransform(scrollYProgress, [0, 1], [0, 1]);
     const slideUp = useTransform(scrollYProgress, [0, 1], [50, 0]);

  // Scroll-based animation for the width and margin
  const containerWidth = useTransform(scrollYProgress, [0, 1], ["80vw", "100vw"]); 
  const containerMargin = useTransform(scrollYProgress, [0, 1], ["10vw", "0vw"]); 
  

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
      style={{ backgroundColor: "#e6c4af", scrollBehavior: "smooth",
        width: containerWidth,
        marginLeft: containerMargin,
        marginRight: containerMargin,
         }} 
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

// Header Component
export const Header = ({
  translate,
  titleComponent,
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="max-w-5xl mx-auto text-center"
    >
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-black text-center leading-tight">
        <span className="cover-letter-block">PERSONALIZED COVER LETTERS IN MINUTES !!!</span>
      </h1>
    </motion.div>
  );
};

// Card Component
export const Card = ({
  rotate,
  scale,
  imageSrc,
  children,
}) => {


  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[45rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Description of the image"
            className="h-full w-full object-cover rounded-2xl"
          />
        ) : (
          children
        )}
      </div>
    </motion.div>
  );
};
