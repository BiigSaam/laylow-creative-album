"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react"
import { ReactLenis, LenisRef } from 'lenis/react'
import CanvasExperience from "./components/CanvasExperience";

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft += event.deltaY;
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  const lenisRef = useRef<LenisRef | null>(null);

  useEffect(() => {
    function update(time: DOMHighResTimeStamp): void {
      lenisRef.current?.lenis?.raf(time);
    }

    const animationFrameId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleSmoothScroll = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, sectionId: string) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ReactLenis options={{ autoRaf: false }} ref={lenisRef}>
      <div className="relative h-screen">
        {/* Navbar fixe */}
        <nav className="fixed top-0 left-0 w-full h-16 text-white flex items-center justify-between px-6 z-50">
          <div className="font-bold text-lg mx-2 mt-5 cursor-pointer" onClick={(e) => handleSmoothScroll(e, "home")}>
            <Image src="/mainLogo.png" alt="Logo" width={178} height={38} />
          </div>
          <ul className="flex gap-11 font-kode mx-14 mt-2 text-base">
            <li className="hover:text-gray-100 text-mainGreen cursor-pointer uppercase">
              <a href="#section1" onClick={(e) => handleSmoothScroll(e, "section1")}>CONCEPT</a>
            </li>
            <li className="hover:text-gray-100 text-mainGreen cursor-pointer uppercase">
              <a href="#section2" onClick={(e) => handleSmoothScroll(e, "section2")}>Jacquette</a>
            </li>
            <li className="hover:text-gray-100 text-mainGreen cursor-pointer uppercase">
              <a href="#section3" onClick={(e) => handleSmoothScroll(e, "section3")}>tracklist</a>
            </li>
            <li className="hover:text-gray-100 text-mainGreen cursor-pointer uppercase">
              <a href="#section4" onClick={(e) => handleSmoothScroll(e, "section4")}>precommande</a>
            </li>
          </ul>
        </nav>

        {/* Conteneur scrollable horizontalement */}
        <div ref={scrollContainerRef} className="overflow-x-auto h-screen overflow-y-hidden">
          <div className="grid grid-flow-col gap-0">
            {/* Section 1 */}
            <div id="home"  className="bg-bgColor w-screen h-screen flex items-center justify-center">
              <div className="grid grid-cols-12 gap-4 w-full h-full px-8 relative">
                {/* Video de fond */}
                {/* <video
                src="/trinity.mp4"
                autoPlay
                loop
                className="absolute inset-0 w-full h-full object-cover"
                /> */}

                {/* Texte centré */}
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-4xl z-10">
                  <h1 className="text-mainGreen tracking-wider text-9xl font-climate">
                    GREEN <span className="font-msOutline text-[140px]">PILL</span>
                  </h1>
                </div>

                {/* Image positionnée sur la 1ère colonne */}
                <div className="absolute col-span-1 col-start-1 left-2 -bottom-10 w-48 h-48 object-contain z-20">
                  <Image
                    src="/section1Footer.png"
                    alt="footerIMG"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div id="section1" className="bg-bgColor w-screen h-screen flex items-center justify-center overflow-hidden">
              <div className="grid grid-cols-12 gap-4 w-full h-full px-8">
                <div className="col-start-2 col-span-4 flex flex-col gap-9 items-center justify-center">
                  {/* Texte en haut */}
                  <div className="text-left mb-4">
                    <p className="text-mainGreen text-sm">
                      Bienvenue dans <span className="font-climate">GreenPill</span>, un voyage aux confins de l&apos;esprit. Ici, chaque morceau est une porte, chaque beat une clé. <br /><br /> Laisse-toi happer par cette pilule verte, où les rêves et les vérités s&apos;entremêlent. Entre lumière froide et chaos intérieur, l&apos;histoire. Reste ou pars. Tu choisis.
                    </p>
                  </div>

                  {/* Image au milieu */}
                  <motion.div
                    className="relative w-[292px] h-[147px] mb-4 hover:drop-shadow-[0_4px_6px_rgba(0,255,0,0.7)]"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 30 }}
                    drag
                    dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                    style={{ position: "relative" }}
                  >
                    <div className="absolute w-full h-full cursor-pointer">
                      <Image
                        src="/noun-y2k-globe.png"
                        alt="footerIMG"
                        layout="fill"
                        objectFit="contain"
                        draggable={false} // Désactive le drag natif du navigateur
                      />
                    </div>
                  </motion.div>

                  {/* Texte en bas */}
                  <div className="text-left">
                    <p className="text-mainGreen text-sm">
                      Sous la bannière de Digital Nova, l&apos;album le réel et virtuel. Entre récits introspectifs et sonorités futuristes, Laylow livre un album-concept où l&apos;émotion brute rencontre l&apos;expérimentation sonore.
                    </p>
                  </div>
                </div>
                <div className="col-start-8 col-span-5 relative w-full h-full px-80">
                  <Image
                    src="/laylowIMG.png"
                    alt="LaylowBitmap"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>

            {/* Section 3 */}
            {/* <div className="bg-green-500 w-screen h-screen flex items-center justify-center">
            <div className="grid grid-cols-12 gap-4 w-full h-full px-8">
            </div>
          </div> */}
            {/* New Section */}
            <div id="section2" className="bg-bgColor w-screen h-screen flex items-center justify-center">
              <div className="flex flex-row gap-44 px-16">
                {/* Left Paragraph */}
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-mainGreen text-sm">
                  Avec GreenPill, Laylow repousse encore les limites. Pour amplifier l&apos;expérience et impliquer ses fans, il permet à chacun de créer sa propre cover, reflet personnel de l&apos;univers de l&apos;album.
                  </p>
                </div>

                {/* Center Image and Buttons */}
                <div className="flex flex-col items-center justify-center gap-4 mr-10">
                  <div className="relative w-96 h-96">
                    <Image
                      src="/pngWing.png"
                      alt="Center Image"
                      layout="fill"
                      objectFit="contain"
                    />
                    <div className="absolute inset-0 left-10 top-10 w-96 m-auto z-10 h-96">
                      <CanvasExperience/>
                    </div>
                  </div>
                  <div className="flex gap-4 ml-5">
                    <motion.button className="bg-secondaryBlue text-mainGreen px-4 py-2 rounded-sm"
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 200 }}>GENERER</motion.button>
                    <motion.button className="bg-secondaryBlue text-mainGreen px-4 py-2 rounded-sm"
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 200 }}>EXPORTER</motion.button>
                  </div>
                </div>

                {/* Right Paragraph */}
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-mainGreen text-sm">
                  &quot;Cet album, c’est votre voyage autant que le mien. Vous donner la possibilité de créer votre cover, c’est une façon de vous remercier et de partager avec vous une part de l’univers de GreenPill. Exprimez vos émotions, et faites-en quelque chose qui vous appartient.&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div id="section3" className="w-screen h-screen flex items-center justify-center relative">
              <div className="flex flex-col gap-20 w-full h-full mx-28" style={{ marginTop: '40vh' }}>
                <div className="flex flex-row justify-between mb-4 px-2">
                  <div className="flex-1">
                    <h3 className="text-mainGreen text-6xl font-black">TRACKLIST</h3>
                  </div>
                  <div className="flex-1 flex justify-end">
                    <motion.div className="relative w-60 h-24 drop-shadow-[0_4px_6px_rgba(0,255,0,0.7)]" animate={{ y: [0, -30, 0] }} transition={{ repeat: Infinity, duration: 10 }}>
                      <Image
                        src="/noun-y2k-sparkle.png"
                        alt="footerIMG"
                        layout="fill"
                        objectFit="contain"
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Tracklist */}
                <div className="flex flex-wrap text-sm justify-center gap-4">
                  {["AIMR02", "SOUTH DRIFT", "Nuit City ft Damso", "Et si ?", "Green Pill", "Matrix Fever", "GRILLZ", "MAMAN", "Trix Shit ft SCH", "OUTRO"].map((title, index) => (
                    <div
                      key={index}
                      className="w-[calc(20%-1rem)] h-[57px] border-[0.1px] border-mainGreen bg-transparent p-0 m-0 flex items-center justify-center text-mainGreen"
                    >
                      {index + 1}. {title}
                    </div>
                  ))}
                </div>
                <div className="flex flex-row justify-between mt-4 px-2 gap-32">
                  <div>
                    <p className="text-mainGreen text-sm">Prenez cette pilule et laissez-vous transporter à travers ses 10 titres, chacun étant un voyage unique. Un son, une expérience, une immersion totale dans l&apos;univers de Laylow.</p>
                  </div>
                  <motion.div className="w-80 h-24 relative drop-shadow-[0_4px_6px_rgba(0,255,0,0.7)]" animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 60 }}>
                    <Image
                      src="/noun-y2k-globe.png"
                      alt="footerIMG"
                      layout="fill"
                      objectFit="contain"
                    />
                  </motion.div>
                  <div className="">
                    <p className="text-mainGreen text-sm">&quot;J’ai travaillé dur sur cet album, merci pour votre soutien et votre force. C’est pour vous&quot;</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div id="section4" className="bg-bgColor w-screen h-screen flex flex-col items-center justify-between text-mainGreen font-bold px-8 py-4 overflow-hidden">
              {/* Partie supérieure */}
              <motion.div
                className="flex w-full mb-4 gap-20 mt-40"
                animate={{ x: ["0%", "-100%"] }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              >
                {[...Array(18)].map((_, index) => (
                  <h3 key={index} className="text-7xl uppercase font-bold">Précommande</h3>
                ))}
              </motion.div>

              {/* Partie centrale : Waitlist */}
              <div className="flex gap-4 bg-transparent border-[0.1px] border-mainGreen pl-6 pr-2 py-2 rounded-sm mb-10">
                <input
                  type="email"
                  placeholder="Entrez votre email"
                  className="bg-transparent text-mainGreen focus:outline-none placeholder-mainGreen w-96"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="bg-mainGreen text-black px-4 py-4 rounded-[1px]"
                >
                  Rejoindre la waitlist
                </motion.button>
              </div>

              {/* Partie inférieure */}
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-8xl">20 / 06 - OUT</h1>
                <div className="flex justify-between w-full px-4 text-sm">
                  <span className="-ml-3">2025 ALL RIGHTS RESERVED</span>
                  <span className="flex gap-4">
                    <a href="#" className="hover:underline">CREDITS</a>
                    <a href="#" className="hover:underline">MENTIONS LÉGALES</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReactLenis>
  );
}
