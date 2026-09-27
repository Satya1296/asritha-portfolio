import { useEffect, useState } from "react";
import "./App.css";

function App() {

  /* ================= GITHUB PAGES ASSET PATH ================= */

  const asset = (fileName) =>
    `${import.meta.env.BASE_URL}${fileName}`;


  /* ================= WELCOME INTRO ================= */

  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);


  /* ================= PHOTO 3D TILT ================= */

  const handlePhotoMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.025)
    `;
  };


  const handlePhotoLeave = (e) => {
    e.currentTarget.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  };


  /* ================= SMOOTH CURSOR ================= */

  useEffect(() => {

    const cursor =
      document.querySelector(".custom-cursor");

    if (!cursor) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let cursorX = mouseX;
    let cursorY = mouseY;

    let animationFrame;

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateCursor = () => {

      cursorX +=
        (mouseX - cursorX) * 0.12;

      cursorY +=
        (mouseY - cursorY) * 0.12;

      cursor.style.transform = `
        translate3d(
          ${cursorX}px,
          ${cursorY}px,
          0
        )
        translate(-50%, -50%)
      `;

      animationFrame =
        requestAnimationFrame(
          animateCursor
        );
    };

    window.addEventListener(
      "mousemove",
      moveCursor
    );

    animationFrame =
      requestAnimationFrame(
        animateCursor
      );

    return () => {

      window.removeEventListener(
        "mousemove",
        moveCursor
      );

      cancelAnimationFrame(
        animationFrame
      );

    };

  }, []);


  /* ================= SCROLL REVEAL ================= */

  useEffect(() => {

    const revealItems =
      document.querySelectorAll(".reveal");

    revealItems.forEach((item, index) => {

      item.style.setProperty(
        "--reveal-delay",
        `${(index % 5) * 80}ms`
      );

    });

    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "show"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.08,
          rootMargin:
            "0px 0px -50px 0px",
        }
      );

    revealItems.forEach((item) => {
      observer.observe(item);
    });

    return () =>
      observer.disconnect();

  }, []);


  /* ================= DATA ================= */

  const services = [

    {
      number: "01",
      title: "Full Stack Developer",
      description:
        "Building responsive and scalable web applications using React.js, Node.js, Express.js, FastAPI and MongoDB.",
    },

    {
      number: "02",
      title: "AI Application Developer",
      description:
        "Developing practical AI-powered applications using Gemini AI, Groq AI and Generative AI technologies.",
    },

    {
      number: "03",
      title: "Back-End Developer",
      description:
        "Creating REST APIs, authentication systems and database-driven backend services with secure architecture.",
    },

    {
      number: "04",
      title: "Problem Solver",
      description:
        "Strengthening algorithmic thinking through competitive programming, Data Structures and Algorithms.",
    },

  ];


  const achievements = [

    {
      title: "900+",
      subtitle: "LeetCode Problems",
      description:
        "Solved 900+ problems and achieved the 365 Days Badge.",
    },

    {
      title: "350+",
      subtitle: "CodeChef Problems",
      description:
        "Solved 350+ problems and achieved a 2-Star rating.",
    },

    {
      title: "850+",
      subtitle: "Codeforces Rating",
      description:
        "Built consistency in competitive programming and problem solving.",
    },

    {
      title: "3★ / 4★",
      subtitle: "HackerRank",
      description:
        "3-Star in Python and C++, 4-Star in Java and SQL.",
    },

  ];


  const certifications = [

    {
      number: "01",
      title:
        "Oracle Certified Foundations Associate",
      organization: "Database",
    },

    {
      number: "02",
      title:
        "Microsoft Excel 2019 Associate",
      organization: "Microsoft",
    },

    {
      number: "03",
      title:
        "Python (Basic)",
      organization: "HackerRank",
    },

    {
      number: "04",
      title:
        "Microsoft Power Platform Fundamentals",
      organization: "Microsoft",
    },

  ];


  const projects = [

    {
      number: "01",
      type: "AI • FULL STACK",
      title: "PrepPilot AI",

      description:
        "AI-powered interview preparation platform with live camera and microphone based mock interviews, AI interviewer, proctoring controls and automated interview reports.",

      stack:
        "React.js • Express.js • Node.js • MongoDB • Gemini AI • Gmail API",

      github:
        "https://github.com/Satya1296/Prepilot",

      image:
        asset("preppilot-photo-only.png"),

    },

    {
      number: "02",
      type: "AI • CAREER • EDUCATION",
      title: "CareerVerse AI",

      description:
        "AI-powered career and scholarship platform providing personalized roadmaps, skill profiling, scholarship matching and location-based institution discovery.",

      stack:
        "React.js • FastAPI • Python • MongoDB • Groq AI",

      github:
        "https://github.com/Satya1296/CareerVerse-AI",

      image:
        asset("careerverse-photo-only.png"),

    },

    {
      number: "03",
      type: "FULL STACK • E-COMMERCE",
      title: "MERN E-Commerce",

      description:
        "Full-stack e-commerce application covering product discovery, cart management, checkout and order placement with REST APIs.",

      stack:
        "MongoDB • Express.js • React.js • Node.js • JavaScript",

      github:
        "https://github.com/Satya1296/E-commerce-Mern",

      image:
        asset("ecommerce-photo-only.png"),

    },

  ];


  return (

    <div className="site">


      {/* ================= WELCOME ================= */}

      {showWelcome && (

        <div className="welcome-screen">

          <div className="welcome-content">

            <p className="welcome-small">
              Welcome to my portfolio
            </p>

            <h2 className="welcome-title">
              ASRITHA<span>.</span>
            </h2>

            <div className="welcome-line"></div>

          </div>

        </div>

      )}


      {/* ================= CURSOR ================= */}

      <div className="custom-cursor"></div>


      {/* ================= EXTRA EFFECTS ================= */}

      <style>{`

        .custom-cursor {

          position: fixed;

          left: 0;
          top: 0;

          width: 42px;
          height: 42px;

          border:
            1.5px solid
            rgba(
              255,
              255,
              255,
              0.70
            );

          border-radius: 50%;

          pointer-events: none;

          z-index: 999999;

          will-change: transform;

          background: transparent;

          box-sizing: border-box;

          transition:
            width 0.25s ease,
            height 0.25s ease,
            border-color 0.25s ease;

          mix-blend-mode: difference;
        }


        html,
        body,
        a,
        button,
        input,
        textarea,
        select {

          cursor: none !important;

        }


        /* ================= WELCOME ================= */

        .welcome-screen {

          position: fixed;

          inset: 0;

          z-index: 1000000;

          background: #080808;

          display: flex;

          align-items: center;

          justify-content: center;

          overflow: hidden;

          pointer-events: none;

          animation:
            welcomeExit
            0.9s
            ease
            1.25s
            forwards;
        }


        .welcome-content {

          text-align: center;

          animation:
            welcomeContent
            1.35s
            cubic-bezier(
              0.22,
              1,
              0.36,
              1
            )
            forwards;
        }


        .welcome-small {

          margin:
            0 0 14px;

          font-size: 11px;

          letter-spacing:
            0.32em;

          color: #858585;

          text-transform:
            uppercase;

          animation:
            welcomeFade
            0.8s
            ease
            0.1s
            both;
        }


        .welcome-title {

          margin: 0;

          font-family:
            "Space Grotesk",
            sans-serif;

          font-size:
            clamp(
              56px,
              10vw,
              130px
            );

          line-height: 0.9;

          letter-spacing:
            -0.06em;

          font-weight: 600;

          color: #f4f4f0;

          animation:
            welcomeTitle
            1s
            cubic-bezier(
              0.22,
              1,
              0.36,
              1
            )
            0.15s
            both;
        }


        .welcome-title span {

          color:
            #b8ff35;

        }


        .welcome-line {

          width: 0;

          height: 1px;

          margin:
            25px auto 0;

          background:
            #b8ff35;

          animation:
            welcomeLine
            0.8s
            ease
            0.45s
            forwards;
        }


        @keyframes welcomeFade {

          from {

            opacity: 0;

            transform:
              translateY(12px);

          }

          to {

            opacity: 1;

            transform:
              translateY(0);

          }

        }


        @keyframes welcomeTitle {

          from {

            opacity: 0;

            transform:
              translateY(35px);

            letter-spacing:
              -0.01em;

          }

          to {

            opacity: 1;

            transform:
              translateY(0);

            letter-spacing:
              -0.06em;

          }

        }


        @keyframes welcomeLine {

          from {
            width: 0;
          }

          to {

            width:
              min(
                180px,
                35vw
              );

          }

        }


        @keyframes welcomeContent {

          0% {

            opacity: 1;

            transform:
              translateY(0);

          }

          72% {

            opacity: 1;

            transform:
              translateY(-8px);

          }

          100% {

            opacity: 0;

            transform:
              translateY(-28px);

          }

        }


        @keyframes welcomeExit {

          0% {

            opacity: 1;

            visibility:
              visible;

          }

          100% {

            opacity: 0;

            visibility:
              hidden;

          }

        }


        /* ================= PHOTO EFFECT ================= */

        .photo-card {

          transition:
            transform
            0.15s
            ease-out,
            box-shadow
            0.25s
            ease;

          transform-style:
            preserve-3d;

          will-change:
            transform;
        }


        .photo-card img {

          transform:
            translateZ(12px);

        }


        .photo-wrapper {

          position: relative;

          width: 580px;
          height: 580px;

          display: flex;

          align-items:
            center;

          justify-content:
            center;

          isolation:
            isolate;
        }


        .photo-card {

          position: relative;

          z-index: 5;

          width: 440px;
          height: 440px;

          border-radius: 50%;

          overflow: hidden;

          background:
            #72c914;

          border:
            2px solid
            rgba(
              140,
              255,
              40,
              0.55
            );

          box-shadow:

            0 0 35px
            rgba(
              115,
              205,
              20,
              0.16
            ),

            0 0 80px
            rgba(
              115,
              205,
              20,
              0.08
            );
        }


        .photo-card img {

          width: 100%;

          height: 100%;

          display: block;

          object-fit: cover;

          object-position:
            center top;

          border-radius:
            50%;
        }


        .photo-circle {

          position: absolute;

          width: 475px;
          height: 475px;

          left: 50%;
          top: 50%;

          transform:
            translate(
              -50%,
              -50%
            );

          border-radius:
            50%;

          border:
            1px solid
            rgba(
              120,
              220,
              30,
              0.42
            );

          z-index: 2;

          pointer-events:
            none;
        }


        .ring-one {

          position: absolute;

          width: 560px;
          height: 560px;

          left: 50%;
          top: 50%;

          transform:
            translate(
              -50%,
              -50%
            );

          border-radius:
            50%;

          border:
            1px solid
            rgba(
              120,
              220,
              30,
              0.25
            );

          z-index: 1;

          pointer-events:
            none;
        }


        .ring-two {

          position: absolute;

          width: 680px;
          height: 680px;

          left: 50%;
          top: 50%;

          transform:
            translate(
              -50%,
              -50%
            );

          border-radius:
            50%;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );

          z-index: 0;

          pointer-events:
            none;
        }


        .floating-label {

          position: absolute;

          z-index: 10;

          white-space:
            nowrap;
        }


        .label-one {

          left: 0;
          top: 90px;

        }


        .label-two {

          right: 0;
          bottom: 100px;

        }


        /* ================= RESPONSIVE ================= */

        @media (max-width: 1100px) {

          .photo-wrapper {

            width: 500px;
            height: 500px;

          }

          .photo-card {

            width: 380px;
            height: 380px;

          }

          .photo-circle {

            width: 410px;
            height: 410px;

          }

          .ring-one {

            width: 480px;
            height: 480px;

          }

          .ring-two {

            width: 570px;
            height: 570px;

          }

        }


        @media (max-width: 900px) {

          .photo-wrapper {

            width: 430px;
            height: 430px;

          }

          .photo-card {

            width: 330px;
            height: 330px;

          }

          .photo-circle {

            width: 355px;
            height: 355px;

          }

          .ring-one {

            width: 420px;
            height: 420px;

          }

          .ring-two {

            width: 500px;
            height: 500px;

          }

        }


        @media (max-width: 768px) {

          .custom-cursor {

            display: none;

          }

          html,
          body,
          a,
          button,
          input,
          textarea,
          select {

            cursor: auto !important;

          }

          .welcome-title {

            font-size:
              clamp(
                52px,
                16vw,
                90px
              );

          }

        }


        @media (max-width: 600px) {

          .photo-wrapper {

            width: 330px;
            height: 330px;

          }

          .photo-card {

            width: 260px;
            height: 260px;

          }

          .photo-circle {

            width: 280px;
            height: 280px;

          }

          .ring-one {

            width: 320px;
            height: 320px;

          }

          .ring-two {

            width: 370px;
            height: 370px;

          }

          .label-one {

            left: -10px;
            top: 40px;

          }

          .label-two {

            right: -10px;
            bottom: 45px;

          }

        }

      `}</style>


      {/* ================= NAVBAR ================= */}

      <header className="navbar">

        <div className="nav-container">

          <a
            href="#home"
            className="logo"
          >
            ASRITHA<span>.</span>
          </a>


          <nav>

            <a href="#about">
              About
            </a>

            <a href="#services">
              Services
            </a>

            <a href="#experience">
              Experience
            </a>

            <a href="#projects">
              Projects
            </a>

            <a href="#contact">
              Contact
            </a>

          </nav>


          <a
            href="#contact"
            className="nav-button"
          >
            Let's Talk

            <span>
              ↗
            </span>

          </a>

        </div>

      </header>


      {/* ================= HERO ================= */}

      <section
        className="hero"
        id="home"
      >

        <div className="hero-container">


          <div className="hero-left reveal">

            <p className="hero-small">
              COMPUTER SCIENCE ENGINEER
            </p>


            <h1>

              Asritha

              <br />

              <span>
                Satya.
              </span>

            </h1>


            <p className="hero-subtitle">

              Full Stack Developer

              <span>
                ×
              </span>

              AI Enthusiast

            </p>


            <p className="hero-description">

              Hands-on experience building
              intelligent web applications,
              AI-powered platforms and scalable
              backend systems.

            </p>


            <div className="hero-buttons">

              <a
                href="#projects"
                className="primary-button"
              >

                Explore My Work

                <span>
                  ↗
                </span>

              </a>


              <a
                href="#contact"
                className="secondary-button"
              >

                Contact Me

              </a>

            </div>

          </div>


          {/* ================= PHOTO ================= */}

          <div className="hero-right reveal">

            <div className="photo-wrapper">

              <div className="photo-circle"></div>


              <div
                className="photo-card"
                onMouseMove={
                  handlePhotoMove
                }
                onMouseLeave={
                  handlePhotoLeave
                }
              >

                <img
                  src={asset("asritha.jpg")}
                  alt="Asritha Satya"
                />

              </div>


              <div
                className="photo-ring ring-one"
              ></div>


              <div
                className="photo-ring ring-two"
              ></div>


              <div
                className="floating-label label-one"
              >
                FULL STACK
              </div>


              <div
                className="floating-label label-two"
              >
                AI × CODE
              </div>

            </div>


            {/* RESUME */}

            <a
              href={asset(
                "Patnala_Asritha_Satya_resume.pdf"
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="photo-resume-button"
            >

              <span>
                View Resume
              </span>

              <span>
                ↗
              </span>

            </a>

          </div>

        </div>


        <div className="hero-bottom">

          <span>
            SCROLL TO EXPLORE
          </span>

          <div className="scroll-line"></div>

        </div>

      </section>


      {/* ================= MOVING STRIP ================= */}

      <section className="moving-strip">

        <div className="moving-track">

          <span>
            FULL STACK DEVELOPMENT
          </span>

          <b>
            ✦
          </b>

          <span>
            GENERATIVE AI
          </span>

          <b>
            ✦
          </b>

          <span>
            PROBLEM SOLVING
          </span>

          <b>
            ✦
          </b>

          <span>
            REACT.JS
          </span>

          <b>
            ✦
          </b>

          <span>
            BACKEND DEVELOPMENT
          </span>

          <b>
            ✦
          </b>

          <span>
            FULL STACK DEVELOPMENT
          </span>

          <b>
            ✦
          </b>

          <span>
            GENERATIVE AI
          </span>

          <b>
            ✦
          </b>

        </div>

      </section>


      {/* ================= EXPERIENCE ================= */}

      <section
        className="company-section"
        id="experience"
      >

        <div className="container">

          <p className="section-number reveal">
            01 — INTERNSHIP
          </p>


          <h2 className="company-heading reveal">

            My

            <span>
              internship.
            </span>

          </h2>


          <div
            className="
              company-box
              internship-box
              reveal
            "
          >

            <div className="company-logo">
              TH
            </div>


            <div className="internship-left">

              <h3>
                Technical Hub
              </h3>

              <p>
                Full Stack Development Intern
              </p>

              <div className="company-date">
                MAY 2026 — JUNE 2026
              </div>

            </div>


            <div className="internship-right">


              <div className="internship-point">

                <span>
                  01
                </span>

                <p>

                  Automated{" "}

                  <strong>
                    8+ backend services
                  </strong>{" "}

                  and integrated{" "}

                  <strong>
                    10+ REST APIs
                  </strong>{" "}

                  using FastAPI, cutting
                  manual configuration effort
                  and enabling reliable
                  AI-driven functionality.

                </p>

              </div>


              <div className="internship-point">

                <span>
                  02
                </span>

                <p>

                  Shipped{" "}

                  <strong>
                    5+ React.js modules
                  </strong>{" "}

                  with MongoDB integration
                  and JWT authentication,
                  strengthening data security
                  and reducing unauthorized
                  access risk.

                </p>

              </div>


              <div className="internship-stack">

                <span>
                  React.js
                </span>

                <span>
                  FastAPI
                </span>

                <span>
                  Python
                </span>

                <span>
                  MongoDB
                </span>

                <span>
                  Groq AI
                </span>

                <span>
                  JWT
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= ABOUT ================= */}

      <section
        className="about-section"
        id="about"
      >

        <div className="container">

          <p className="section-number reveal">
            02 — ABOUT ME
          </p>


          <div className="about-grid">

            <div className="about-title reveal">

              <h2>

                Building

                <br />

                <span>
                  with purpose.
                </span>

              </h2>

            </div>


            <div className="about-content reveal">

              <p className="about-big">

                I'm a Computer Science
                undergraduate passionate
                about building intelligent
                and practical digital experiences.

              </p>


              <p>

                My interests lie in Full-Stack
                Development, Generative AI,
                backend engineering and
                problem solving. I enjoy taking
                an idea and turning it into a
                working product.

              </p>


              <p>

                Through internships, projects,
                hackathons and competitive
                programming, I continuously
                work on improving both my
                technical skills and ability to
                solve real-world problems.

              </p>

            </div>

          </div>


          {/* STATS */}

          <div className="stats">

            <div className="stat reveal">

              <strong>
                900+
              </strong>

              <span>
                LeetCode Problems
              </span>

            </div>


            <div className="stat reveal">

              <strong>
                350+
              </strong>

              <span>
                CodeChef Problems
              </span>

            </div>


            <div className="stat reveal">

              <strong>
                9.23
              </strong>

              <span>
                GPA / 10
              </span>

            </div>


            <div className="stat reveal">

              <strong>
                3
              </strong>

              <span>
                Major Projects
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* ================= SERVICES ================= */}

      <section
        className="services-section"
        id="services"
      >

        <div className="container">

          <p className="section-number reveal">
            03 — SERVICES
          </p>


          <div className="section-heading-row">

            <h2 className="reveal">

              What I

              <span>
                do.
              </span>

            </h2>


            <p className="heading-description reveal">

              Combining development, AI
              and problem-solving to create
              practical technology solutions.

            </p>

          </div>


          <div className="services-list">

            {services.map((service) => (

              <div
                className="service-row reveal"
                key={service.number}
              >

                <span className="service-number">
                  {service.number}
                </span>


                <h3>
                  {service.title}
                </h3>


                <p>
                  {service.description}
                </p>


                <span className="service-icon">
                  ↗
                </span>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================= HIGHLIGHTS ================= */}

      <section className="highlight-section">

        <div className="container">

          <p className="section-number reveal">
            04 — HIGHLIGHTS
          </p>


          <div className="highlight-heading reveal">

            <h2>

              Consistency

              <br />

              <span>
                creates progress.
              </span>

            </h2>

          </div>


          <div className="achievement-grid">

            {achievements.map(
              (item, index) => (

                <div
                  className="
                    achievement-card
                    reveal
                  "
                  key={item.subtitle}
                >

                  <span
                    className="
                      achievement-number
                    "
                  >
                    0{index + 1}
                  </span>


                  <strong>
                    {item.title}
                  </strong>


                  <h3>
                    {item.subtitle}
                  </h3>


                  <p>
                    {item.description}
                  </p>


                  <span
                    className="
                      achievement-arrow
                    "
                  >
                    ↗
                  </span>

                </div>

              )
            )}

          </div>


          {/* ================= WOMEN WHO MASTER ================= */}

          <div
            className="
              hackathon-feature
              reveal
            "
          >

            <div className="hackathon-number">
              05
            </div>


            <div className="hackathon-content">

              <p>
                HACKATHON EXPERIENCE
              </p>


              <h3>

                Women Who Master

                <span>
                  — 2026
                </span>

              </h3>


              <h4>
                Certificate of Excellence —
                Zonal Round
              </h4>


              <p
                className="
                  hackathon-description
                "
              >

                Participated in the Generative AI
                initiative by Logitech and Aspire
                For Her, among 2,500 shortlisted
                participants from 1,20,000+
                applications.

              </p>

            </div>


            <div className="hackathon-arrow">
              ↗
            </div>

          </div>


          {/* ================= GOOGLE HACKSPRINT ================= */}

          <div
            className="
              hackathon-feature
              reveal
            "
          >

            <div className="hackathon-number">
              06
            </div>


            <div className="hackathon-content">

              <p>
                HACKATHON EXPERIENCE
              </p>


              <h3>
                Google HackSprint
              </h3>


              <h4>
                Hackathon Participation
              </h4>


              <p
                className="
                  hackathon-description
                "
              >

                Participated in Google HackSprint,
                gaining hands-on experience in
                collaborative problem solving,
                innovation and building
                technology-driven solutions.

              </p>

            </div>


            <div className="hackathon-arrow">
              ↗
            </div>

          </div>

        </div>

      </section>


      {/* ================= CERTIFICATIONS ================= */}

      <section
        className="
          certification-section
        "
      >

        <div className="container">

          <p className="section-number reveal">
            05 — CERTIFICATIONS
          </p>


          <div
            className="
              section-heading-row
            "
          >

            <h2 className="reveal">

              Learning &

              <span>
                certifications.
              </span>

            </h2>

          </div>


          <div className="certification-list">

            {certifications.map(
              (certificate) => (

                <div
                  className="
                    certificate-row
                    reveal
                  "
                  key={certificate.number}
                >

                  <span>
                    {certificate.number}
                  </span>


                  <h3>
                    {certificate.title}
                  </h3>


                  <p>
                    {certificate.organization}
                  </p>


                  <b>
                    ↗
                  </b>

                </div>

              )
            )}

          </div>

        </div>

      </section>


      {/* ================= PROJECTS ================= */}

      <section
        className="projects-section"
        id="projects"
      >

        <div className="container">

          <p className="section-number reveal">
            06 — PROJECTS
          </p>


          <div className="projects-heading">

            <h2 className="reveal">

              Selected

              <span>
                work.
              </span>

            </h2>


            <p className="reveal">

              A collection of projects where I
              combined development, AI and
              real-world problem solving.

            </p>

          </div>


          <div className="project-list">

            {projects.map(
              (project) => (

                <article
                  className="
                    project-card
                    reveal
                  "
                  key={project.number}
                >


                  <div className="project-image">

                    {/* PROJECT PHOTO */}

                    <img
                      src={project.image}
                      alt={`${project.title} project cover`}
                      className="project-photo"
                    />


                    <span
                      className="
                        project-index
                      "
                    >
                      {project.number}
                    </span>


                    <div
                      className="
                        project-corner
                      "
                    >
                      ↗
                    </div>

                  </div>


                  <div className="project-content">

                    <p
                      className="
                        project-type
                      "
                    >
                      {project.type}
                    </p>


                    <h3>
                      {project.title}
                    </h3>


                    <p
                      className="
                        project-description
                      "
                    >
                      {project.description}
                    </p>


                    <p
                      className="
                        project-stack
                      "
                    >
                      {project.stack}
                    </p>


                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        project-link
                      "
                    >

                      VIEW PROJECT

                      <span>
                        ↗
                      </span>

                    </a>

                  </div>

                </article>

              )
            )}

          </div>

        </div>

      </section>


      {/* ================= EDUCATION ================= */}

      <section
        className="
          education-section
        "
      >

        <div className="container">

          <p className="section-number reveal">
            07 — EDUCATION
          </p>


          <div
            className="
              education-card
              reveal
            "
          >

            <div>

              <p
                className="
                  education-date
                "
              >
                AUG 2024 — PRESENT
              </p>


              <h2>

                B.Tech in Computer Science
                & Engineering

              </h2>


              <h3>
                Aditya University
              </h3>

            </div>


            <div className="education-gpa">

              <small>
                GPA
              </small>


              <strong>
                9.23
              </strong>


              <span>
                /10
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* ================= CONTACT ================= */}

      <section
        className="contact-section"
        id="contact"
      >

        <div className="container">

          <p className="section-number reveal">
            08 — CONTACT
          </p>


          <div className="contact-intro">


            <div
              className="
                contact-heading
                reveal
              "
            >

              <h2>

                Let's build

                <br />

                something

                <br />

                <span>
                  meaningful.
                </span>

              </h2>

            </div>


            <div
              className="
                contact-intro-text
                reveal
              "
            >

              <p>

                Have an opportunity, project
                or idea? Let's connect and
                create something useful
                together.

              </p>

            </div>

          </div>


          {/* ================= CONTACT GRID ================= */}

          <div className="contact-grid">


            {/* ================= LEFT ================= */}

            <div className="contact-details">


              {/* EMAIL */}

              <div
                className="
                  contact-detail
                  reveal
                "
              >

                <span
                  className="
                    contact-detail-number
                  "
                >
                  01
                </span>


                <div>

                  <p
                    className="
                      contact-label
                    "
                  >
                    EMAIL
                  </p>


                  <a
                    href="mailto:asrithasatya12@gmail.com"
                    className="
                      contact-value
                    "
                  >
                    asrithasatya12@gmail.com
                  </a>

                </div>

              </div>


              {/* PHONE */}

              <div
                className="
                  contact-detail
                  reveal
                "
              >

                <span
                  className="
                    contact-detail-number
                  "
                >
                  02
                </span>


                <div>

                  <p
                    className="
                      contact-label
                    "
                  >
                    PHONE
                  </p>


                  <a
                    href="tel:7780498313"
                    className="
                      contact-value
                    "
                  >
                    +91 77804 98313
                  </a>

                </div>

              </div>


              {/* LOCATION */}

              <div
                className="
                  contact-detail
                  reveal
                "
              >

                <span
                  className="
                    contact-detail-number
                  "
                >
                  03
                </span>


                <div>

                  <p
                    className="
                      contact-label
                    "
                  >
                    LOCATION
                  </p>


                  <p
                    className="
                      contact-value
                    "
                  >
                    Andhra Pradesh, India
                  </p>

                </div>

              </div>


              {/* SOCIALS */}

              <div
                className="
                  contact-social-block
                  reveal
                "
              >

                <p
                  className="
                    contact-label
                  "
                >
                  SOCIALS
                </p>


                <div
                  className="
                    contact-socials
                  "
                >


                  {/* GITHUB */}

                  <a
                    href="https://github.com/Satya1296"
                    target="_blank"
                    rel="noreferrer"
                  >

                    GitHub

                    <span>
                      ↗
                    </span>

                  </a>


                  {/* LINKEDIN */}

                  <a
                    href="
                      https://www.linkedin.com/in/asrithasatya12/
                    "
                    target="_blank"
                    rel="noopener noreferrer"
                  >

                    LinkedIn

                    <span>
                      ↗
                    </span>

                  </a>


                  {/* RESUME */}

                  <a
                    href={asset(
                      "Patnala_Asritha_Satya_resume.pdf"
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >

                    Resume

                    <span>
                      ↗
                    </span>

                  </a>

                </div>

              </div>

            </div>


            {/* ================= RIGHT CARD ================= */}

            <div
              className="
                contact-card
                reveal
              "
            >


              <div
                className="
                  contact-card-top
                "
              >

                <p>
                  GET IN TOUCH
                </p>

                <span>
                  ↗
                </span>

              </div>


              <p
                className="
                  contact-card-title
                "
              >
                Have something in mind?
              </p>


              <p
                className="
                  contact-card-description
              "
              >

                I'm always open to discussing
                interesting projects,
                opportunities, hackathons
                and ideas.

              </p>


              {/* ================= GMAIL BUTTON ================= */}

              <a
                href="
                  https://mail.google.com/mail/?view=cm&fs=1&to=asrithasatya12@gmail.com
                "
                target="_blank"
                rel="noopener noreferrer"
                className="
                  contact-main-button
                "
              >

                <span>
                  Send me an email
                </span>

                <span>
                  ↗
                </span>

              </a>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer>

        <div
          className="
            container
            footer-inner
          "
        >

          <div
            className="
              footer-logo
            "
          >

            ASRITHA
            <span>
              .
            </span>

          </div>


          <p>
            Full Stack Developer • AI Enthusiast
          </p>


          <a href="#home">
            BACK TO TOP ↑
          </a>

        </div>

      </footer>


    </div>

  );

}

export default App;