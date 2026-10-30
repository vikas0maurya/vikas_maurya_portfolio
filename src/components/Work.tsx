import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const projects = [
  {
    title: "Trekhops",
    category: "Travel & Digital Marketing",
    tools: "Photoshop, Premiere Pro, After Effects, Canva",
    description:
      "Social media creatives, campaign flyers for domestic and international destinations, motion graphic reels, and long-form promotional videos.",
    image: "/images/Trekhops.png",
  },
  {
    title: "Castle Waterford",
    category: "Property & Wedding Venues",
    tools: "Photoshop, Illustrator, Premiere Pro, After Effects, Canva",
    description:
      "Visually appealing social posts highlighting property and wedding venues, alongside cinematic reels with smooth storytelling transitions.",
    image: "/images/Castle Waterford.png",
  },
  {
    title: "OPOChoice",
    category: "Eco-Friendly Brand Identity",
    tools: "Adobe Photoshop, Illustrator",
    description:
      "Biodegradable tableware layout designs and modern website marketing banners aligned with the sustainable brand vision.",
    image: "/images/OPOChoice.png",
  },
  {
    title: "Taufaa",
    category: "Packaging & Social Media",
    tools: "Photoshop, Illustrator, Premiere Pro, After Effects",
    description:
      "Modern product mockups, packaging designs, clean social media brand communication, and engaging reels with smooth motion transitions.",
    image: "/images/Taufaa.png",
  },
  {
    title: "RSK Developers",
    category: "Real Estate Branding",
    tools: "Adobe Illustrator",
    description:
      "Clean, modern corporate brand logo and informative marketing flyers to reinforce RSK Developers' real estate presence.",
    image: "/images/RSK Developers.png",
  },
];

const Work = () => {
  useGSAP(() => {
    const workFlex = document.querySelector(".work-flex") as HTMLElement;
    const workSection = document.querySelector(".work-section") as HTMLElement;
    if (!workFlex || !workSection) return;

    const getScrollAmount = () => {
      // Use the actual DOM position of the last box's right edge.
      // This correctly accounts for margin-left, padding-right, and all
      // responsive breakpoint overrides — no manual arithmetic needed.
      const boxes = workFlex.querySelectorAll(".work-box");
      if (!boxes.length) return 0;
      const lastBox = boxes[boxes.length - 1] as HTMLElement;
      const lastBoxRect = lastBox.getBoundingClientRect();
      const style = window.getComputedStyle(workFlex);
      const paddingRight = parseFloat(style.paddingRight) || 0;
      // lastBoxRect.right = right edge of last card in viewport coordinates.
      // Adding paddingRight ensures the trailing gap is also scrolled into view.
      return Math.max(0, lastBoxRect.right + paddingRight - window.innerWidth);
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: workSection,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          id: "work",
        },
      });

      tl.to(workFlex, {
        x: () => -getScrollAmount(),
        ease: "none",
      });
    });

    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          Featured <span>Projects</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools Used</h4>
                <p>{project.tools}</p>
                <p
                  style={{
                    marginTop: "12px",
                    fontSize: "14px",
                    lineHeight: "1.5",
                  }}
                >
                  {project.description}
                </p>
              </div>
              <WorkImage image={project.image} alt={project.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
