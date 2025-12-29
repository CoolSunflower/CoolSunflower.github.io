export const siteConfig = {
  name: "Adarsh Gupta",
  title: "Adarsh Gupta | Software Engineer & Researcher",
  description:
    "Full-stack engineer building at the intersection of systems and scale. From embedded wildlife sensors to cloud-scale microservices.",
  email: "iamadarshgupta8@gmail.com",
  phone: "+91-9650946587",
  github: "https://github.com/CoolSunflower",
  linkedin: "https://linkedin.com/in/adarshgupta",
  location: "India",
};

export const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Research", href: "#research" },
  { name: "Contact", href: "#contact" },
];

export const stats = [
  { value: 54, suffix: "+", label: "Production Diffs" },
  { value: 99, suffix: "%", label: "Test Coverage" },
  { value: 9.33, suffix: "", label: "GPA" },
  { value: 60, suffix: "+", label: "Team Members Led" },
];

export const techStack = [
  "React",
  "TypeScript",
  "Go",
  "Python",
  "C/C++",
  "gRPC",
  "Kafka",
  "Microservices",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Kubernetes",
  "TensorFlow",
  "PyTorch",
  "Three.js",
  "OpenGL",
  "AWS",
  "GCP",
  "Node.js",
  "GraphQL",
];

export const experiences = [
  {
    id: 1,
    company: "Fortune 500 Healthcare Company",
    role: "AI & Full-Stack Engineer",
    type: "Project",
    period: "Aug 2025 - Current",
    location: "Remote",
    description:
      "Building a social media listening platform analyzing 10K+ daily posts across X, Reddit, Instagram, and medical journals for real-time brand sentiment tracking.",
    achievements: [
      "Integrated fine-tuned LLM-based sentiment and relevancy models with dynamic filters for 200+ sub-brands",
      "Developed role-based dashboard with user-level categorization, reporting, and export features",
      "Cut project costs by 35% through serverless GPU and VPS infrastructure deployment",
    ],
    tech: ["Python", "LLMs", "React", "PostgreSQL", "AWS"],
    color: "#00f0ff",
  },
  {
    id: 2,
    company: "Uber",
    role: "Software Engineering Intern",
    type: "Full-time",
    period: "May 2025 - July 2025",
    location: "Bangalore, India",
    description:
      "Built and shipped a full-stack fleet partner performance dashboard with scalable concurrent data retrieval system.",
    achievements: [
      "Accelerated large dataset queries (70K+ rows / 45MB) by 27x",
      "Reduced on-call engineer workload by 30% with Force End Job feature",
      "Landed 54 production diffs (20 KLoC) with 99% unit test coverage across 5 microservices",
    ],
    tech: ["React", "Go", "gRPC", "Kafka", "Grafana"],
    color: "#ff6b35",
  },
  {
    id: 3,
    company: "Uber",
    role: "UberSTAR Software Engineering Intern",
    type: "Internship",
    period: "May 2024 - July 2024",
    location: "Bangalore, India",
    description:
      "Cut new program launch time by 50% by onboarding HCV (Shuttle) and B2B workflows to internal platform.",
    achievements: [
      "Reduced launch time from 14 to 7 days",
      "Engineered hybrid driver/rider seamless check-in flow",
      "Resolved critical simulation framework issues driving cross-team adoption",
    ],
    tech: ["Go", "Fx", "Glue", "Cadence", "Microservices"],
    color: "#a855f7",
  },
];

export const projects = [
  {
    id: 1,
    title: "Hospital Management System",
    subtitle: "Full-Stack MERN Application",
    description:
      "Led a 60-member team to deliver & deploy a full-stack MERN hospital management system with multi-role authentication, EMR, billing, and staff/patient management.",
    longDescription:
      "Built the Admin Analytics Panel providing real-time insights on patient trends, financial metrics, and staff performance. Implemented a scalable recurring email notification system with BullMQ + Redis.",
    tech: ["React", "Node.js", "MongoDB", "Redis", "BullMQ"],
    github: "https://github.com/CoolSunflower/HMIS",
    period: "Feb 2025 - Apr 2025",
    featured: true,
    color: "#00f0ff",
    category: "fullstack",
  },
  {
    id: 2,
    title: "Lunar Superresolution",
    subtitle: "InterIIT Tech Meet",
    description:
      "Applied GNNs and CNNs for deep spatial superresolution of lunar surface composition data from Chandrayaan-2.",
    longDescription:
      "Achieved subpixel resolution of <2km × 2km from original 12.5km × 100km inputs. Developed dynamic online optimization pipeline using Lagrangian and non-convex optimization heuristics.",
    tech: ["Python", "PyTorch", "GNN", "CNN", "Optimization"],
    period: "Nov 2024 - Dec 2024",
    featured: true,
    color: "#ff6b35",
    category: "ml",
  },
  {
    id: 3,
    title: "ZoionNet",
    subtitle: "IEEE COMSOC 2024 Honorary Mention",
    description:
      "Low-power acoustic sensor system for wildlife detection, mitigating human-animal conflict in Methagiri.",
    longDescription:
      "Built dual-state CNN classifier on embedded systems achieving 94.5% accuracy in species identification. Integrated real-time alerts and cloud-based dashboard for forest rangers.",
    tech: ["Embedded C", "CNN", "IoT", "Cloud"],
    period: "Jan 2024 - May 2024",
    featured: true,
    color: "#22c55e",
    category: "ml",
  },
  {
    id: 4,
    title: "AMACS Code Editor",
    subtitle: "High-Performance Editor in C",
    description:
      "Developed a high-performance code editor in C with GPU rendering via SDL2 and OpenGL.",
    longDescription:
      "Features regex-based search, file system manipulation, custom lexer for C/C++ with real-time syntax highlighting, cursor tracking, and code selection.",
    tech: ["C", "OpenGL", "SDL2", "FreeType", "GLEW"],
    github: "https://github.com/CoolSunflower/AMacs",
    period: "Jun 2024 - Current",
    featured: false,
    color: "#a855f7",
    category: "systems",
  },
  {
    id: 5,
    title: "Router Simulation Platform",
    subtitle: "Network Systems",
    description:
      "High-performance router simulator with 8 I/O ports, integrating Priority, WFQ, RR, and iSLIP scheduling algorithms.",
    longDescription:
      "Benchmarked schedulers under realistic workloads (uniform, non-uniform, bursty traffic). Identified iSLIP as most efficient for fairness and minimizing HOL blocking.",
    tech: ["C++", "Networking", "Algorithms"],
    github: "https://github.com/CoolSunflower/RouterC-",
    period: "Sep 2024",
    featured: false,
    color: "#f59e0b",
    category: "systems",
  },
  {
    id: 6,
    title: "MicroC Compiler",
    subtitle: "Compiler Frontend",
    description:
      "Implemented a compiler front-end for MicroC using Flex (lexical analysis) and Bison (parsing).",
    longDescription:
      "Supports data types, operators, control flow, functions, pointers, and arrays with scoped symbol tables. Generates Three-Address Code (TAC) and Quadruple representations.",
    tech: ["C", "Flex", "Bison", "Compilers"],
    github: "https://github.com/CoolSunflower/TAC-for-uC",
    period: "Apr 2025",
    featured: false,
    color: "#ec4899",
    category: "systems",
  },
  {
    id: 7,
    title: "Drone Controller",
    subtitle: "Autonomous Systems",
    description:
      "Tri-mode communication system for autonomous drones with real-time control, telemetry, and QUIC-based file transfer.",
    longDescription:
      "Multithreaded TCP server handling concurrent telemetry streams. Secure QUIC file transfer for video/images with encryption and integrity checks.",
    tech: ["C++", "QUIC", "TCP", "Multithreading"],
    period: "Aug 2024",
    featured: false,
    color: "#06b6d4",
    category: "systems",
  },
];

export const publications = [
  {
    title:
      "Attention-driven spatio-temporal graph networks for full-field acceleration prediction",
    venue: "46th Symposium on Ultrasonic Electronics (USE)",
    location: "Japan",
    date: "Nov 2025",
    status: "Accepted",
    authors: "A. Gupta, S. Ojha, S. K. Ayop, and A. Habib",
  },
  {
    title:
      "STSR-Net: Spatio-Temporal Graph Neural Network for Full-Field Structural Response Prediction",
    venue: "ASME 52nd Annual Review of Progress in QNDE",
    location: "Montreal, Canada",
    date: "Jul 2025",
    status: "Accepted",
  },
  {
    title:
      "SANGAM: SystemVerilog Assertion Generation via Monte Carlo Tree Self-Refine",
    venue: "IEEE 1st International Conference on LLM-Aided Design (LAD)",
    location: "Stanford, CA, USA",
    date: "Jun 2025",
    status: "Published",
    link: "https://arxiv.org/pdf/2506.13983",
  },
  {
    title:
      "Stacked Ensemble of Fine-Tuned CNNs for Knee Osteoarthritis Severity Grading",
    venue: "IEEE 15th Annual UEMCON",
    location: "IBM T.J. Watson Research Center, NY",
    date: "Oct 2024",
    status: "Published",
  },
];

export const research = [
  {
    institution: "IIT Guwahati, Multimedia Lab",
    role: "B. Tech Project",
    period: "July 2025 – Current",
    location: "India",
  },
  {
    institution: "UiT The Arctic University of Norway",
    role: "Research Intern",
    period: "Jan 2025 – Current",
    location: "Tromsø, Norway",
    lab: "Acoustic Sensing and Imaging Lab",
  },
  {
    institution: "IIT Guwahati",
    role: "Research Assistant",
    period: "July 2025 – Current",
    location: "India",
    advisor: "Dr. Teena Sharma",
  },
];

export const education = {
  institution: "Indian Institute of Technology, Guwahati",
  degree: "B. Tech, Computer Science and Engineering",
  gpa: "9.33/10",
  minor: "Data Science and Artificial Intelligence",
  minorGpa: "9.75/10",
  expected: "May 2026",
};
