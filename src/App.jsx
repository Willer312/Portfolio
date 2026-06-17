import { useState } from "react";
import hoverPanel from "./assets/ui/text_hover.png";
import { motion, AnimatePresence } from "framer-motion";
import portraitPlaceholder from "./assets/portraits/Character2.png";

const backSound = new Audio("/sounds/back.wav");
const selectSound = new Audio("/sounds/select.wav");

const hoverSounds = [
  new Audio("/sounds/hover.wav")
];

function ProjectCard({ title, tech, github }) {
  return (
    <a
      href={github}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => playHoverSound()}
      className="
        block
        border-l-4
        border-cyan-400
        bg-slate-900/40
        p-6
        hover:bg-slate-800/60
        hover:translate-x-2
        transition-all
        duration-200
      "
    >
      <h2
        className="
          text-3xl
          font-black
          text-cyan-300
          mb-2
        "
      >
        {title}
      </h2>

      <p className="text-cyan-400">
        {tech}
      </p>
    </a>
  );
}

function SkillBar({ skill, value }) {
  return (
    <div className="mb-4">
      <div className="flex items-center mb-2">
        <span className="text-xl font-semibold flex-1">
          {skill}
        </span>

        <span className="text-cyan-300 font-bold w-12 text-right">
          {value}
        </span>
      </div>

      <div className="h-4 bg-slate-800 rounded overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="
            h-full
            bg-cyan-400
            shadow-[0_0_15px_rgba(34,211,238,0.6)]
          "
        />
      </div>
    </div>
  );
}

const selectorPositions = [
  { top: 170, left: -60 },
  { top: 260, left: -85 },
  { top: 340, left: 30 },
  { top: 430, left: 20 },
];

function playSelectSound() {
  selectSound.currentTime = 0;
  selectSound.play();
}

function playBackSound() {
  backSound.currentTime = 0;
  backSound.play();
}

function playHoverSound() {
  hoverSounds[0].currentTime = 0;
  hoverSounds[0].play();
}

function App() {
  const [screen, setScreen] = useState("MAIN");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState("forward");

  const changeScreen = (target, direction = "forward") => {
    setTransitionDirection(direction);
    setIsTransitioning(true);

    setTimeout(() => {
      setScreen(target);
    }, 250);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const menuItems = [
    "STATUS",
    "SKILLS",
    "PROJECTS",
    "CONTACT"
  ];

  
  return (
    <div className="h-screen overflow-hidden bg-slate-950 text-white">
      <div className="flex h-full">

        {/* LEFT MENU */}
        <AnimatePresence>
          {screen === "MAIN" && (
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: 0 }}
              exit={{
              x: -500,
              opacity: 0
            }}
              transition={{ duration: 0.35 }}
              className="w-[35%] flex flex-col justify-center pl-16 relative"
    >

            {hoveredIndex !== null && (
              <motion.img
                src={hoverPanel}
                alt=""
                animate={{
                  top: selectorPositions[hoveredIndex].top,
                  left: selectorPositions[hoveredIndex].left,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
                style={{
                  position: "absolute",
                  width: "550px",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />
            )}

            {menuItems.map((item, index) => (
              <button
              style={{
                width: "fit-content"
              }}
                key={item}
                onClick={() => {
                  playSelectSound();
                  setHoveredIndex(null);
                  changeScreen(item, "forward");
                }}
                onMouseEnter={() => {
                  setHoveredIndex(index);
                  playHoverSound();
                }}
                className={`
                  inline-flex
                  items-center
                  relative
                  text-left
                  text-6xl
                  font-black
                  uppercase
                  transition-all
                  duration-200
                  mb-6
                  ${
                    hoveredIndex === index
                      ? "translate-x-6 text-cyan-300"
                      : "text-white"
                  }
                `}
              >
                <span className="relative z-20">
                  {item}
                </span>
              </button>
            ))}

          </motion.div>
      )}
</AnimatePresence>

        {/* RIGHT CONTENT */}
<div className="w-[65%] h-full overflow-hidden">

  <AnimatePresence mode="wait">

    {screen === "MAIN" && (
      <motion.div
        key="MAIN"
        initial={{ x: 150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{
          x: -850,
          opacity: 0
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
        className="w-full h-full relative"
      >
        <div className="absolute bottom-[-60px] right-0">

          <motion.div
            animate={{
              y: [0, -5, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.img
              src={portraitPlaceholder}
              alt=""
              initial={{
                x: 250,
                opacity: 0
              }}
              animate={{
                x: [250, -15, 0],
                opacity: 1
              }}
              exit={{
                opacity: 0
              }}
              transition={{
                x: {
                  duration: 0.45,
                  ease: "easeOut"
                },
                opacity: {
                  duration: 0.01
                }
              }}
              className="h-[110vh] object-contain"
            />
          </motion.div>

        </div>
      </motion.div>
    )}
    {screen === "STATUS" && (
      <motion.div
        key="STATUS"
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{
          duration: 0.15,
          ease: "easeInOut",
        }}
        className="w-full h-full relative"
      >

        {/* PORTRAIT */}
        <div className="fixed top-[0px] left-[-100px] z-0">

          <motion.div
            animate={{
              y: [0, -5, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img
              src={portraitPlaceholder}
              alt=""
              className="
                h-[110vh]
                object-contain
                scale-x-[-1]
                drop-shadow-[0_0_25px_rgba(34,211,238,0.35)]
              "
            />
          </motion.div>

        </div>

        {/* STATUS INFO */}
        <div
          className="
            absolute
            top-1/2
            left-[42rem]
            -translate-y-1/2
            z-10
            max-w-[700px]
          "
        >

          <h1
            className="
              text-7xl
              font-black
              text-cyan-300
              mb-10
            "
          >
            STATUS
          </h1>

          <div className="space-y-8">

            <div>
              <p className="text-cyan-400 font-bold text-sm tracking-[0.2em]">
                NAME
              </p>

              <p className="text-3xl font-semibold">
                Willian Yehezkiel Alvin
              </p>
            </div>

            <div>
              <p className="text-cyan-400 font-bold text-sm tracking-[0.2em]">
                ROLE
              </p>

              <p className="text-2xl">
                Computer Science Student
              </p>
            </div>

            <div>
              <p className="text-cyan-400 font-bold text-sm tracking-[0.2em]">
                INTERESTS
              </p>

              <ul className="mt-2 space-y-2 text-xl">
                <li>• Machine Learning</li>
                <li>• Computer Vision</li>
                <li>• Software Development</li>
                <li>• Data Science</li>
                <li>• UI/UX Design</li>
              </ul>
            </div>

            <div>
              <p className="text-cyan-400 font-bold text-sm tracking-[0.2em]">
                CURRENTLY
              </p>

              <ul className="mt-2 space-y-2 text-xl">
                <li>• BINUS University Computer Science Undergraduate</li>
                <li>• Learning Better Menu Design</li>
                <li>• Studying Machine Learning</li>
                <li>• Learning Computer Vision</li>
                <li>• Uploading a Paper to ICORIS2026 About Machine Learning</li>
              </ul>
            </div>

          </div>

          <button
            onMouseEnter={() => playHoverSound()}
            onClick={() => {
              playBackSound();
              setHoveredIndex(null);
              changeScreen("MAIN", "backward");
            }}
            className="
              mt-14
              text-5xl
              font-black
              uppercase
              hover:text-cyan-300
              transition-colors
            "
          >
            &lt; Back
          </button>

        </div>

      </motion.div>
    )}

    {screen === "SKILLS" && (
      <motion.div
        key="SKILLS"
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{
          duration: 0.15,
          ease: "easeInOut",
        }}
        className="w-full h-full relative overflow-hidden"
      >

        {/* BACKGROUND PORTRAIT */}
        <div className="fixed top-[0px] left-[-100px] z-0">

          <motion.div
            animate={{
              y: [0, -5, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img
              src={portraitPlaceholder}
              alt=""
              className="
                h-[110vh]
                object-contain
                scale-x-[-1]
                opacity-100
                drop-shadow-[0_0_25px_rgba(34,211,238,0.35)]
              "
            />
          </motion.div>

        </div>

        {/* CONTENT */}
        <div className="relative z-10 ml-[34rem] pl-16 pr-4 py-16 h-full overflow-y-auto"
>

          <h1
            className="
              text-7xl
              font-black
              text-cyan-300
              mb-12
            "
          >
            SKILLS
          </h1>

          <div className="mb-12">
            <h2 className="text-cyan-400 font-bold tracking-[0.2em] mb-6">
              AI & DATA
            </h2>

            <SkillBar skill="Machine Learning" value={95} />
            <SkillBar skill="Computer Vision" value={70} />
            <SkillBar skill="Data Analysis" value={78} />
            <SkillBar skill="Scikit-Learn" value={74} />
            <SkillBar skill="TensorFlow" value={60} />
            <SkillBar skill="PyTorch" value={60} />
          </div>

          {/* WEB DEVELOPMENT */}
          <div className="mb-12">
            <h2 className="text-cyan-400 font-bold tracking-[0.2em] mb-6">
              WEB DEVELOPMENT
            </h2>

            <SkillBar skill="React" value={85} />
            <SkillBar skill="Tailwind CSS" value={85} />
            <SkillBar skill="Framer Motion" value={88} />
            <SkillBar skill="HTML" value={79} />
            <SkillBar skill="CSS" value={86} />
            <SkillBar skill="JavaScript" value={84} />
          </div>

          {/* PROGRAMMING */}
          <div className="mb-12">
            <h2 className="text-cyan-400 font-bold tracking-[0.2em] mb-6">
              PROGRAMMING
            </h2>

            <SkillBar skill="Python" value={83} />
            <SkillBar skill="JavaScript" value={84} />
            <SkillBar skill="C" value={90} />
          </div>

          {/* TOOLS */}
          <div className="mb-12">
            <h2 className="text-cyan-400 font-bold tracking-[0.2em] mb-6">
              TOOLS
            </h2>

            <SkillBar skill="Git" value={80} />
            <SkillBar skill="GitHub" value={85} />
            <SkillBar skill="Google Colab" value={90} />
            <SkillBar skill="Jupyter Notebook" value={73} />
            <SkillBar skill="VS Code" value={92} />
          </div>

          <button
            onMouseEnter={() => playHoverSound()}
            onClick={() => {
              playBackSound();
              setHoveredIndex(null);
              changeScreen("MAIN", "backward");
            }}
            className="
              mt-8
              mb-16
              text-5xl
              font-black
              uppercase
              hover:text-cyan-300
              transition-colors
            "
          >
            &lt; Back
          </button>

        </div>

      </motion.div>
    )}

    {screen === "PROJECTS" && (
      <motion.div
        key="PROJECTS"
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{
          duration: 0.15,
          ease: "easeInOut",
        }}
        className="
          w-full
          h-full
          overflow-y-auto
          px-16
          py-16
        "
      >
        <h1
          className="
            text-7xl
            font-black
            text-cyan-300
            mb-12
          "
        >
          PROJECTS
        </h1>

        <div className="grid grid-cols-2 gap-8">

          <a
            href="https://github.com/Willer312/AI-TBcompanion.git"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => playHoverSound()}
            onClick={() => playSelectSound()}
            className="
              block
              border-l-4
              border-cyan-400
              bg-slate-900/40
              p-6
              hover:bg-slate-800/60
              hover:translate-x-2
              transition-all
              duration-200
            "
          >
            <h2 className="text-3xl font-black text-cyan-300 mb-2">
              AI TBCompanion
            </h2>

            <p className="text-cyan-400 mb-4">
              HTML • API Integration
            </p>

            <p className="text-slate-300">
              A smart assistant for tuberculosis patients, providing personalized treatment plans 
              and health monitoring by a medical professional.
            </p>

            <p className="mt-4 text-cyan-300 font-bold">
              ► VIEW PROJECT
            </p>
          </a>

          <a
            href="https://pokerml-ovmrb6qydwttlsyzm2sax3.streamlit.app/"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => playHoverSound()}
            onClick={() => playSelectSound()}
            className="
              block
              border-l-4
              border-cyan-400
              bg-slate-900/40
              p-6
              hover:bg-slate-800/60
              hover:translate-x-2
              transition-all
              duration-200
            "
          >
            <h2 className="text-3xl font-black text-cyan-300 mb-2">
              Poker Classification
            </h2>

            <p className="text-cyan-400 mb-4">
              Machine Learning
            </p>

            <p className="text-slate-300">
              Classification model capable of identifying poker hands and recommending optimal strategies.
            </p>

            <p className="mt-4 text-cyan-300 font-bold">
              ► VIEW PROJECT
            </p>
          </a>

          <a
            href="https://drive.google.com/file/d/1Cz-XsLXqaxeIeAZB3sbIOzzZtnwLb2cu/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => playHoverSound()}
            onClick={() => playSelectSound()}
            className="
              block
              border-l-4
              border-cyan-400
              bg-slate-900/40
              p-6
              hover:bg-slate-800/60
              hover:translate-x-2
              transition-all
              duration-200
            "
          >
            <h2 className="text-3xl font-black text-cyan-300 mb-2">
              Social Media Effects on Personality Research Paper
            </h2>

            <p className="text-cyan-400 mb-4">
              Machine Learning • Data Science
            </p>

            <p className="text-slate-300">
              Research project exploring relationships between
              online behavior and mental health.
            </p>

            <p className="mt-4 text-cyan-300 font-bold">
              ► VIEW REPORT
            </p>
          </a>

          <a
            href="https://huggingface.co/spaces/asipnana/SudokuProject"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => playHoverSound()}
            onClick={() => playSelectSound()}
            className="
              block
              border-l-4
              border-cyan-400
              bg-slate-900/40
              p-6
              hover:bg-slate-800/60
              hover:translate-x-2
              transition-all
              duration-200
            "
          >
            <h2 className="text-3xl font-black text-cyan-300 mb-2">
              Sudoku Solver
            </h2>

            <p className="text-cyan-400 mb-4">
              Python • Machine Learning
            </p>

            <p className="text-slate-300">
              A traditional computer vision application for solving Sudoku puzzles.
            </p>

            <p className="mt-4 text-cyan-300 font-bold">
              ► VIEW PROJECT
            </p>
          </a>

        </div>

        <button
          onMouseEnter={() => playHoverSound()}
          onClick={() => {
            playBackSound();
            setHoveredIndex(null);
            changeScreen("MAIN", "backward");
          }}
          className="
            mt-12
            mb-16
            text-5xl
            font-black
            uppercase
            hover:text-cyan-300
            transition-colors
          "
        >
          &lt; Back
        </button>

      </motion.div>
    )}

    {screen === "CONTACT" && (
  <motion.div
    key="CONTACT"
    initial={{ x: 300, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: 300, opacity: 0 }}
    transition={{
      duration: 0.15,
      ease: "easeInOut",
    }}
    className="w-full h-full relative"
  >

    {/* PORTRAIT */}
    <div className="absolute right-0 bottom-0 z-0">

      <motion.div
        animate={{
          y: [0, -5, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <img
          src={portraitPlaceholder}
          alt=""
          className="
            h-[100vh]
            object-contain
            drop-shadow-[0_0_25px_rgba(34,211,238,0.35)]
          "
          style={{
            transform: "translateX(30px)",
          }}
        />
      </motion.div>

    </div>

    {/* CONTENT */}
    <div
      className="
        absolute
        top-1/2
        left-24
        -translate-y-1/2
        z-10
        max-w-[700px]
      "
    >

      <h1
        className="
          text-7xl
          font-black
          text-cyan-300
          mb-12
        "
      >
        CONTACT
      </h1>

      <div className="space-y-8">

        <div>
          <p className="text-cyan-400 font-bold tracking-widest">
            EMAIL
          </p>

          <a
            href="mailto:willianalvin312@gmail.com"
            onMouseEnter={() => playHoverSound()}
            onClick={() => playSelectSound()}
            className="
              text-3xl
              hover:text-cyan-300
              transition-colors
            "
          >
            willianalvin312@gmail.com
          </a>
        </div>

        <div>
          <p className="text-cyan-400 font-bold tracking-widest">
            GITHUB
          </p>

          <a
            href="https://github.com/Willer312"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => playHoverSound()}
            onClick={() => playSelectSound()}
            className="
              text-3xl
              hover:text-cyan-300
              transition-colors
            "
          >
            github.com/Willer312
          </a>
        </div>

        <div>
          <p className="text-cyan-400 font-bold tracking-widest">
            LINKEDIN
          </p>

          <a
            href="https://www.linkedin.com/in/willian-alvin-86790435a"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => playHoverSound()}
            onClick={() => playSelectSound()}
            className="
              text-3xl
              hover:text-cyan-300
              transition-colors
            "
          >
            Willian Alvin
          </a>
        </div>

      </div>

      <button
        onMouseEnter={() => playHoverSound()}
        onClick={() => {
          playBackSound();
          setHoveredIndex(null);
          changeScreen("MAIN", "backward");
        }}
        className="
          mt-16
          text-5xl
          font-black
          uppercase
          hover:text-cyan-300
          transition-colors
        "
      >
        &lt; BACK
      </button>

    </div>

  </motion.div>
)}
  </AnimatePresence>

</div>
  <AnimatePresence>
    {isTransitioning && (
      <>
        <motion.div
          initial={{
            x:
              transitionDirection === "forward"
                ? "100%"
                : "-100%"
          }}
          animate={{
            x:
              transitionDirection === "forward"
                ? "-100%"
                : "100%"
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          className="
            fixed
            top-0
            left-0
            w-full
            h-1/2
            bg-cyan-400
            z-50
          "
        />

        <motion.div
          initial={{
            x:
              transitionDirection === "forward"
                ? "100%"
                : "-100%"
          }}
          animate={{
            x:
              transitionDirection === "forward"
                ? "-100%"
                : "100%"
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            delay: 0.05,
          }}
          className="
            fixed
            bottom-0
            left-0
            w-full
            h-1/2
            bg-cyan-300
            z-50
          "
        />
      </>
    )}
  </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
