
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Button } from "@/components/ui/moving-border";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";


function GridBackgroundDemo() {

  const words = [
    {
      text: "Unleash",
    },
    {
      text: "your",
    },
    {
      text: "creativity",
    },
    {
      text: "with",
    },
    {
      text: "CodeOrbit.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  const people = [
    {
      id: 1,
      name: "John Doe",
      designation: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    {
      id: 2,
      name: "Robert Johnson",
      designation: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      name: "Jane Smith",
      designation: "Data Scientist",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 4,
      name: "Emily Davis",
      designation: "UX Designer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 5,
      name: "Tyler Durden",
      designation: "Soap Developer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    },
    {
      id: 6,
      name: "Dora",
      designation: "The Explorer",
      image:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
    },
  ];

  return (
    <div className="h-[41.5rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col items-center justify-center gap-4">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="__intro flex flex-col justify-center items-center">
        <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base p-4 text-center">
          The ultimate online coding playground to craft, test, and share your projects in real-time!
        </p>
        <TypewriterEffectSmooth words={words} />
      </div>
      <Link to='/compiler'>
        <Button
          borderRadius="1.75rem"
          className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
        >
          Let's Get Started
        </Button>
      </Link>
      <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="flex"><AnimatedTooltip items={people} /></div>
     
        <div className="flex flex-col gap-2 justify-center items-center sm:items-start">
                <div className="flex gap-0.5">
                  <Star className="h-4 w-4 text-blue-500 fill-blue-500"/>
                  <Star className="h-4 w-4 text-blue-500 fill-blue-500"/>
                  <Star className="h-4 w-4 text-blue-500 fill-blue-500"/>
                  <Star className="h-4 w-4 text-blue-500 fill-blue-500"/>
                  <Star className="h-4 w-4 text-blue-500 fill-blue-500"/>
                </div>

                <p><span className="font-semibold z-20">1.250</span> happy users</p>
              </div>
      </div>
    </div>
  );
}
export default GridBackgroundDemo