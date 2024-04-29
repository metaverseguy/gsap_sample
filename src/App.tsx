import { useRef, useState } from "react";
import "./App.css";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

const arrayLength5 = [...Array(5)];
console.log(arrayLength5);

function App() {
  gsap.registerPlugin(MotionPathPlugin);
  const [count, setCount] = useState<any>(0);
  const movingDivRefs = useRef<HTMLElement[]>([]);
  const flowers = document.querySelectorAll(".flower");

  document.addEventListener("click", (event) => {
    movingDivRefs.current.forEach((divRef, index) => {
      gsap.fromTo(
        divRef,
        { y: event.clientY },
        {
          delay: 0.01 * index,
          duration: 1,
          ease: "power1.in",
          y: 0,
        }
      );
      gsap.fromTo(
        divRef,
        { x: event.clientX },
        {
          delay: 0.01 * index,
          duration: 1,
          ease: "power1.out",
          x: 1200,
        }
      );
      gsap.fromTo(
        divRef,
        { scale: 1 },
        {
          delay: 0.01 * index,
          scale: 0,
          ease: "power2.in",
          duration: 1,
        }
      );
      gsap.to(".btn", {
        boxShadow: "0px 0px 70px 35px rgb(255, 165, 0)",
        delay: 0.6,
        scale: 1.3,
        duration: 0.5,
        ease: "power2.in",
        repeat: 1,
        yoyo: true,
      });
    });
    setCount(count + 1);
    if (count === 4) {
      flowers.forEach((flower) => {
        const tl = gsap.timeline({ repeat: -1 });

        tl.fromTo(
          flower,
          {
            x: 100,
            y: 300,
          },
          {
            duration: 2,
            x: Math.floor(Math.random() * 50) + 200,
            y: Math.floor(Math.random() * 50) + 400,
            rotation: Math.random() * 360,
            ease: "power2.out",
          }
        );
      });
    }
  });

  return (
    <>
      {arrayLength5.map((item, index) => (
        <div
          key={index}
          ref={(e) => (movingDivRefs.current[index] = e as HTMLElement)}
          className="movingDiv w-[30px] h-[30px] absolute bg-yellow-500 rounded-full"
        ></div>
      ))}
      <div className="flex justify-end">
        <button className="btn mr-[100px] mt-4">Count : {count}</button>
      </div>
      <div className="container relative w-[100vw] h-[100vh]">
        <div className="flower w-5 h-5 absolute bg-[rgb(255,56,255)]"></div>
        <div className="flower w-5 h-5 absolute bg-[rgb(48,255,210)]"></div>
        <div className="flower w-5 h-5 absolute bg-[rgb(53,134,255)]"></div>
      </div>
    </>
  );
}

export default App;
