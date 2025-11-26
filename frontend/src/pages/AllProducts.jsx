import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { TfiBriefcase, TfiCrown, TfiCup, TfiGithub } from "react-icons/tfi";

export default function AllProducts() {
  const [isOpen, setIsOpen] = useState(true);
  const timelineRef = useRef(null);
  const sidebarLabelsContainerRef = useRef(null); // Ref for parent container

  useLayoutEffect(() => {
    const labelElements =
      sidebarLabelsContainerRef.current?.querySelectorAll(".sidebar-labels");
    if (!labelElements || labelElements.length === 0) return;

    timelineRef.current = gsap.timeline({
      defaults: { ease: "power1.out", duration: 0.3 },
    });

    if (isOpen) {
      labelElements.forEach((labelEl) => {
        const fullWidth = labelEl.scrollWidth;
        timelineRef.current.to(
          labelEl,
          {
            width: fullWidth,
            xPercent: 0,
            opacity: 1,
            marginLeft: "0.9rem",
          },
          0
        ); // Animate all at once
      });
    } else {
      labelElements.forEach((labelEl) => {
        timelineRef.current.to(
          labelEl,
          {
            opacity: 0,
            xPercent: -15,
            width: 0,
            marginLeft: ".2rem",
          },
          0
        ); // Animate all at once
      });
    }
  }, [isOpen]);

  return (
    <div className="size-full border-1 flex relative">
      {/* Sidebar */}
      <div className="sidebar h-full bg-white items-start relative flex">
        {/* Icons */}
        <div
          className="sidebar-icons flex flex-col"
          ref={sidebarLabelsContainerRef}
        >
          <button className="flex items-center hover:bg-black/20 p-3 cursor-pointer">
            <TfiBriefcase size={"35px"} className="z-10" />
            <p className="sidebar-labels flex-1 text-lg text-start ml-[0.9rem] z-0 overflow-hidden whitespace-nowrap">
              Briefcase
            </p>
          </button>
          <button className="flex items-center hover:bg-black/20 p-3 cursor-pointer">
            <TfiCrown size={"35px"} className="z-10" />
            <p className="sidebar-labels flex-1 text-lg text-start ml-[0.9rem] z-0 overflow-hidden whitespace-nowrap">
              Briefcase
            </p>
          </button>
          <button className="flex items-center hover:bg-black/20 p-3 cursor-pointer">
            <TfiCup size={"35px"} className="z-10" />
            <p className="sidebar-labels flex-1 text-lg text-start ml-[0.9rem] z-0 overflow-hidden whitespace-nowrap">
              Briefcase
            </p>
          </button>
          <button className="flex items-center hover:bg-black/20 p-3 cursor-pointer">
            <TfiGithub size={"35px"} className="z-10" />
            <p className="sidebar-labels flex-1 text-lg text-start ml-[0.9rem] z-0 overflow-hidden whitespace-nowrap">
              Briefcase
            </p>
          </button>
        </div>
      </div>

      {/* Toggle Button */}
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer border p-2"
        >
          {!isOpen ? "Open" : "Close"}
        </button>
      </div>
    </div>
  );
}
