export const SITE = {
  name: "ilm Smart Academy",
  tagline: "Join in the light of knowledge",
  phone1: "+916384066550",
  phone2: "+916384066551",
  phoneDisplay1: "63840 66550",
  phoneDisplay2: "63840 66551",
  email: "contact@ilmsmartacademy.com",
  address: "No.3 Peters Road, Royapettah, Chennai – 600 014 (Opp Everest Medicals)",
  hours: "Monday – Saturday · 4:00 PM – 9:00 PM",
  whatsapp: "916384066551",
};

export const SUBJECTS = [
  { name: "Mathematics", icon: "Sigma", grades: "1st – 12th" },
  { name: "Physics", icon: "Atom", grades: "8th – 12th" },
  { name: "Chemistry", icon: "FlaskConical", grades: "8th – 12th" },
  { name: "Biology", icon: "Leaf", grades: "8th – 12th" },
  { name: "Economics", icon: "TrendingUp", grades: "11th & 12th" },
  { name: "Commerce", icon: "Briefcase", grades: "11th & 12th" },
  { name: "Accountancy", icon: "Calculator", grades: "11th & 12th" },
  { name: "Business Maths", icon: "LineChart", grades: "11th & 12th" },
  { name: "Hindi", icon: "BookText", grades: "All Grades" },
  { name: "All Subjects", icon: "Library", grades: "1st – 9th" },
  { name: "Science", icon: "Microscope", grades: "1st – 10th" },
  { name: "Social Science", icon: "Globe", grades: "1st – 10th" },
  { name: "English", icon: "BookOpen", grades: "1st – 12th" },
  { name: "Tamil", icon: "Languages", grades: "1st – 12th" },
] as const;

export const SYLLABI = ["CBSE", "Matriculation", "Samacheer Kalvi"] as const;

export const FACILITIES = [
  {
    title: "Air-Conditioned Rooms",
    desc: "Comfortable, focused study environment all year round.",
  },
  { title: "Highly Qualified Faculty", desc: "Experienced, caring teachers across every subject." },
  { title: "CCTV Surveillance", desc: "Students are monitored throughout class hours for safety." },
  { title: "Small Batches", desc: "Personal attention with limited seats per batch." },
  {
    title: "Online + Offline",
    desc: "Attend live in-platform via Jitsi or join through Zoom links.",
  },
  { title: "Regular Tests", desc: "Weekly assessments and parent progress updates." },
] as const;

export const FACULTY = [
  {
    name: "A.Mohammed Ibnu Soud",
    subjects: [
      "Physics"
    ],
    grades: "10th – 12th",
    gradeLevels: [10, 11, 12],
    experience: "18 years",
    bio: "B.Sc, M.Sc Physics, B.ed. Teaches Physics for 10th, 11th, and 12th.",
    rating: 4.8,
    reviews: 104,
  },
  {
    name: "C. Madhankumar",
    subjects: ["Mathematics", "Business Maths"],
    grades: "10th – 12th",
    gradeLevels: [10, 11, 12],
    experience: "12 yrs",
    bio: "B.E, M.B.A (M.Sc), B.Ed. Specialist in Maths for 10th CBSE and 10th-12th State Board.",
    rating: 4.9,
    reviews: 121,
  },
  {
    name: "Z. Thameem Nisha",
    subjects: [
      "All Subjects",
      "Tamil",
      "English",
      "Mathematics",
      "Science",
      "Social Science",
      "Economics",
      "Commerce",
    ],
    grades: "1st – 7th, 11th & 12th",
    gradeLevels: [1, 2, 3, 4, 5, 6, 7, 11, 12],
    experience: "6 yrs",
    bio: "B.A. Corporate Economics. Teaches 1st to 7th all subjects, and 11th & 12th Commerce & Economics.",
    rating: 4.7,
    reviews: 89,
  },
  {
    name: "K. Poorani",
    subjects: [
      "Tamil",
      "English",
      "Physics",
      "Chemistry",
      "Biology",
      "Science",
    ],
    grades: "10th",
    gradeLevels: [10],
    experience: "5 yrs",
    bio: "M.Sc (Physics). 10th CBSE Science only, 10th State Board all subjects (Except Maths).",
    rating: 4.9,
    reviews: 95,
  },
  {
    name: "Thaherunisa",
    subjects: ["Hindi"],
    grades: "All Grades",
    gradeLevels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    experience: "15 yrs",
    bio: "Hindi Pandit.",
    rating: 4.9,
    reviews: 130,
  },
  {
    name: "Nabesha Begum",
    subjects: ["Commerce", "Accountancy"],
    grades: "11th & 12th",
    gradeLevels: [11, 12],
    experience: "7 yrs",
    bio: "M.Com.",
    rating: 4.8,
    reviews: 76,
  },
] as const;

export const REVIEWS = [
  {
    name: "Aarav M.",
    role: "Class 12, CBSE",
    text: "Scored 96 in Maths thanks to Madhankumar sir's daily problem sets. The AC classroom helps me focus.",
    rating: 5,
  },
  {
    name: "Sneha K.",
    role: "Class 10, Samacheer",
    text: "Teachers explain till you really understand. My Physics improved from 62 to 89 in one term.",
    rating: 5,
  },
  {
    name: "Mrs. Devi (Parent)",
    role: "Parent of Class 11 student",
    text: "Regular updates and CCTV monitoring give us complete peace of mind.",
    rating: 5,
  },
  {
    name: "Vignesh R.",
    role: "Class 12, Matriculation",
    text: "Trial class itself was so well-structured we joined the same day. Highly recommend.",
    rating: 5,
  },
  {
    name: "Anjali S.",
    role: "Class 9, CBSE",
    text: "Small batches mean every doubt gets cleared. The online Jitsi class works smoothly even at home.",
    rating: 4,
  },
  {
    name: "Mr. Khan (Parent)",
    role: "Parent of NEET aspirant",
    text: "Biology mind-maps from Poorani ma'am have been a game-changer for revisions.",
    rating: 5,
  },
] as const;

export const SCHEDULE = [
  {
    day: "Monday",
    slots: [
      { time: "4:00 – 5:30 PM", subject: "Mathematics (10th)", faculty: "Madhankumar" },
      { time: "5:45 – 7:15 PM", subject: "Physics (12th)", faculty: "Poorani" },
      { time: "7:30 – 9:00 PM", subject: "Chemistry (12th)", faculty: "Poorani" },
    ],
  },
  {
    day: "Tuesday",
    slots: [
      { time: "4:00 – 5:30 PM", subject: "Biology (11th)", faculty: "Poorani" },
      { time: "5:45 – 7:15 PM", subject: "Accountancy (12th)", faculty: "Nabesha" },
      { time: "7:30 – 9:00 PM", subject: "Mathematics (12th)", faculty: "Madhankumar" },
    ],
  },
  {
    day: "Wednesday",
    slots: [
      { time: "4:00 – 5:30 PM", subject: "Economics (12th)", faculty: "Thameem Nisha" },
      { time: "5:45 – 7:15 PM", subject: "Chemistry (10th)", faculty: "Poorani" },
      { time: "7:30 – 9:00 PM", subject: "Physics (11th)", faculty: "Poorani" },
    ],
  },
  {
    day: "Thursday",
    slots: [
      { time: "4:00 – 5:30 PM", subject: "Business Maths (12th)", faculty: "Madhankumar" },
      { time: "5:45 – 7:15 PM", subject: "Biology (12th)", faculty: "Poorani" },
      { time: "7:30 – 9:00 PM", subject: "Commerce (11th)", faculty: "Thameem Nisha" },
    ],
  },
  {
    day: "Friday",
    slots: [
      { time: "4:00 – 5:30 PM", subject: "Physics (11th)", faculty: "A.Mohammed Ibnu Soud" },
      { time: "5:45 – 7:15 PM", subject: "Physics (10th)", faculty: "Poorani" },
      { time: "7:30 – 9:00 PM", subject: "Accountancy (11th)", faculty: "Nabesha" },
    ],
  },
  {
    day: "Saturday",
    slots: [
      { time: "4:00 – 6:00 PM", subject: "Doubt-clearing (All)", faculty: "All Faculty" },
      { time: "6:15 – 8:00 PM", subject: "Mock Tests (10th & 12th)", faculty: "All Faculty" },
    ],
  },
] as const;

export const TOPPERS = [
  {
    name: "Aarav Mehta",
    grade: "Class 12 · CBSE",
    score: "97.4%",
    year: "2025",
    subject: "Maths 100 / Physics 98",
    quote: "Madhankumar sir's daily problem sets made boards feel routine.",
  },
  {
    name: "Sneha Karthik",
    grade: "Class 10 · Samacheer",
    score: "493 / 500",
    year: "2025",
    subject: "Science 99 / Maths 100",
    quote: "Small batches meant every doubt was answered the same day.",
  },
  {
    name: "Vignesh Raj",
    grade: "Class 12 · Matriculation",
    score: "591 / 600",
    year: "2024",
    subject: "Commerce stream topper",
    quote: "Mock tests every Saturday rewired how I revised.",
  },
  {
    name: "Anjali Suresh",
    grade: "Class 12 · CBSE",
    score: "96.2%",
    year: "2024",
    subject: "Biology 99 · NEET 658",
    quote: "Poorani ma'am's mind-maps were my single best NEET resource.",
  },
  {
    name: "Farhan Ahmed",
    grade: "Class 10 · CBSE",
    score: "96.0%",
    year: "2024",
    subject: "All five subjects 95+",
    quote: "AC rooms, calm vibe and teachers who actually care.",
  },
  {
    name: "Divya Lakshmi",
    grade: "Class 12 · Samacheer",
    score: "588 / 600",
    year: "2023",
    subject: "Bio-Maths group topper",
    quote: "Chemistry mnemonics from Poorani ma'am saved me hours.",
  },
] as const;

export const RESULT_STATS = [
  { n: "98%", l: "Pass rate · Class 12 boards" },
  { n: "62", l: "Centum scores since 2020" },
  { n: "340+", l: "Students above 90%" },
  { n: "1500+", l: "Alumni & current students" },
] as const;

export const GALLERY = [
  { title: "Senior Maths batch · Saturday mock", cat: "Classroom", hue: 260, accent: 85 },
  { title: "Chemistry practical · Class 12", cat: "Lab", hue: 78, accent: 260 },
  { title: "AC study hall · evening shift", cat: "Facility", hue: 250, accent: 88 },
  { title: "Founder's Day · 2025", cat: "Events", hue: 28, accent: 260 },
  { title: "Toppers felicitation · 2024 batch", cat: "Events", hue: 88, accent: 260 },
  { title: "NEET workshop · Sunday special", cat: "Workshop", hue: 200, accent: 88 },
  { title: "Doubt-clearing corner", cat: "Classroom", hue: 260, accent: 78 },
  { title: "Parent-teacher review meet", cat: "Events", hue: 30, accent: 260 },
  { title: "Library & reference shelf", cat: "Facility", hue: 88, accent: 260 },
] as const;
