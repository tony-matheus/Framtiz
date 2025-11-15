"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Building, Calendar, MapPin, Award, Code } from "lucide-react"

const experiences = [
  {
    id: 1,
    company: "TechCorp Industries",
    position: "Senior Full-Stack Developer",
    location: "San Francisco, CA",
    period: "2022 - Present",
    description:
      "Leading development of scalable web applications serving 1M+ users. Architected microservices infrastructure and mentored junior developers.",
    achievements: [
      "Improved application performance by 40%",
      "Led team of 6 developers",
      "Implemented CI/CD pipeline reducing deployment time by 60%",
    ],
    technologies: ["React", "Node.js", "AWS", "Docker", "TypeScript"],
    type: "full-time",
  },
  {
    id: 2,
    company: "StartupXYZ",
    position: "Frontend Developer",
    location: "Remote",
    period: "2020 - 2022",
    description:
      "Built responsive web applications from scratch using modern frameworks. Collaborated with design team to create pixel-perfect user interfaces.",
    achievements: [
      "Developed 15+ production applications",
      "Reduced bundle size by 35%",
      "Implemented design system used across 10+ projects",
    ],
    technologies: ["React", "Vue.js", "Tailwind CSS", "JavaScript", "Figma"],
    type: "full-time",
  },
  {
    id: 3,
    company: "Digital Agency Pro",
    position: "Junior Developer",
    location: "New York, NY",
    period: "2019 - 2020",
    description:
      "Developed client websites and web applications. Gained experience in full-stack development and project management.",
    achievements: [
      "Delivered 20+ client projects on time",
      "Learned 5 new technologies",
      "Received 'Rising Star' award",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "WordPress"],
    type: "full-time",
  },
  {
    id: 4,
    company: "University of Technology",
    position: "Computer Science Student",
    location: "Boston, MA",
    period: "2015 - 2019",
    description:
      "Bachelor's degree in Computer Science with focus on software engineering and web development. Graduated Magna Cum Laude.",
    achievements: [
      "GPA: 3.8/4.0",
      "Dean's List for 6 semesters",
      "Led university coding bootcamp",
    ],
    technologies: ["Java", "Python", "C++", "SQL", "Git"],
    type: "education",
  },
]

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const index = Math.floor(latest * experiences.length)
      setActiveIndex(Math.min(index, experiences.length - 1))
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-slate-950 px-4 py-20"
      id="experience"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute left-10 top-1/4 size-64 rotate-45 border border-purple-600"></div>
        <div className="absolute bottom-1/4 right-10 size-48 rotate-12 border border-green-400"></div>
      </div>

      <div className="container relative z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 flex items-center justify-center">
            <div className="mr-3 size-2 animate-pulse bg-green-400"></div>
            <div className="font-mono text-sm text-green-400">
              CAREER_PROGRESSION
            </div>
            <div className="ml-3 size-2 animate-pulse bg-purple-600"></div>
          </div>
          <h2 className="mb-6 bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-3xl font-bold text-transparent md:text-5xl">
            EXPERIENCE_LOG
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-slate-300">
            A journey through professional growth, technical mastery, and
            impactful contributions to the tech industry.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-6xl">
          {/* Timeline Line */}
          <div className="absolute inset-y-0 left-8 w-1 bg-slate-800 md:left-1/2">
            <motion.div
              className="w-full origin-top bg-gradient-to-b from-purple-600 to-green-400"
              style={{
                scaleY: useTransform(scrollYProgress, [0, 1], [0, 1]),
              }}
            />
          </div>

          {/* Experience Items */}
          <div className="space-y-16">
            {experiences.map((experience, index) => {
              const isLeft = index % 2 === 0
              const isActive = index <= activeIndex

              return (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col md:flex-row`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-8 z-20 md:left-1/2 md:-translate-x-1/2">
                    <motion.div
                      className={`size-6 rounded-full border-4 transition-all duration-500 ${
                        isActive
                          ? "border-purple-400 bg-purple-600 shadow-lg shadow-purple-600/50"
                          : "border-slate-600 bg-slate-800"
                      }`}
                      animate={{
                        scale: isActive ? 1.2 : 1,
                        boxShadow: isActive
                          ? "0 0 20px rgba(139, 92, 246, 0.5)"
                          : "0 0 0px rgba(139, 92, 246, 0)",
                      }}
                    >
                      {experience.type === "education" ? (
                        <Award className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 text-white" />
                      ) : (
                        <Building className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 text-white" />
                      )}
                    </motion.div>
                  </div>

                  {/* Content Card */}
                  <div
                    className={`ml-16 w-full md:ml-0 md:w-5/12 ${
                      isLeft ? "md:mr-8" : "md:ml-8"
                    }`}
                  >
                    <motion.div
                      className="group relative border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:border-purple-600/50"
                      whileHover={{ y: -5 }}
                    >
                      {/* Corner accents */}
                      <div className="absolute -left-1 -top-1 size-3 bg-purple-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
                      <div className="absolute -bottom-1 -right-1 size-3 bg-green-400 opacity-0 transition-opacity group-hover:opacity-100"></div>

                      {/* Company and Position */}
                      <div className="mb-4">
                        <h3 className="mb-2 text-xl font-bold text-slate-100 transition-colors group-hover:text-purple-400">
                          {experience.position}
                        </h3>
                        <div className="mb-2 flex items-center font-mono text-sm text-green-400">
                          <Building className="mr-2 size-4" />
                          {experience.company}
                        </div>
                        <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                          <div className="flex items-center">
                            <Calendar className="mr-1 size-3" />
                            {experience.period}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="mr-1 size-3" />
                            {experience.location}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mb-4 leading-relaxed text-slate-300">
                        {experience.description}
                      </p>

                      {/* Achievements */}
                      <div className="mb-4">
                        <h4 className="mb-2 flex items-center font-mono text-sm text-purple-400">
                          <Award className="mr-1 size-3" />
                          KEY ACHIEVEMENTS
                        </h4>
                        <ul className="space-y-1">
                          {experience.achievements.map(
                            (achievement, achIndex) => (
                              <li
                                key={achIndex}
                                className="flex items-start text-xs text-slate-300"
                              >
                                <span className="mr-2 mt-2 size-1 shrink-0 rounded-full bg-green-400"></span>
                                {achievement}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="mb-2 flex items-center font-mono text-sm text-green-400">
                          <Code className="mr-1 size-3" />
                          TECHNOLOGIES
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {experience.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="border border-slate-700 bg-slate-800 px-2 py-1 font-mono text-xs text-slate-300 transition-colors hover:border-purple-600"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
