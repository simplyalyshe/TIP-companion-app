export const logoUri =
  "https://dru.tip.edu.ph/assets/Uploads/TIP-INFORMAL-LOGO-04-2.png";

const sharedSchedule = [
  {
    code: "CCS 1101",
    subject: "Introduction to Computing",
    room: "Comp Lab 2",
    time: "8:00 AM - 9:30 AM",
    day: "Monday",
  },
  {
    code: "MATH 137",
    subject: "Engineering Calculus",
    room: "Room 504",
    time: "10:00 AM - 11:30 AM",
    day: "Tuesday",
  },
  {
    code: "NSTP 1",
    subject: "Community Engagement",
    room: "Student Hall",
    time: "1:00 PM - 3:00 PM",
    day: "Wednesday",
  },
  {
    code: "ENG 101",
    subject: "Communication Skills",
    room: "Room 307",
    time: "9:00 AM - 10:30 AM",
    day: "Thursday",
  },
];

export const campusData = {
  qc: {
    id: "qc",
    name: "T.I.P. Quezon City",
    shortName: "QC",
    subtitle: "Aurora Boulevard campus for engineering, computing, and innovation.",
    address: "938 Aurora Boulevard, Cubao, Quezon City",
    phone: "(02) 8911-0964 / (02) 7917-8477 / 0917-177-2556",
    heroImage:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    about:
      "T.I.P. Quezon City opened in 1983 as part of the institution's expansion in Metro Manila. It now spans a larger academic footprint and includes innovation spaces such as the TechnoCoRe building.",
    announcements: [
      {
        title: "Midterm Advising Week",
        detail: "Academic advisers are available on the 3rd floor lobby from 9:00 AM to 4:00 PM.",
      },
      {
        title: "TechnoCoRe Open Lab",
        detail: "Prototype rooms and fabrication labs are open for project consultations this Friday.",
      },
      {
        title: "Intramurals Registration",
        detail: "Student org booths are open beside the main quadrangle until Saturday.",
      },
    ],
    contacts: [
      { label: "Main Trunk Line", value: "(02) 8911-0964" },
      { label: "Admissions", value: "(02) 7917-8477" },
      { label: "Mobile Hotline", value: "0917-177-2556" },
      { label: "Email", value: "info@tip.edu.ph" },
    ],
    mapHighlights: [
      "Main Building and Registration Hall",
      "TechnoCoRe Innovation Hub",
      "Engineering and Computing Laboratories",
      "Student Plaza and Organization Booths",
    ],
    quickLinks: ["Canvas", "Library", "Scholarships", "Student Services"],
    studentProfile: {
      name: "Andrea Mae Santos",
      program: "BS Information Technology",
      yearLevel: "2nd Year",
      studentId: "2026-QC-01428",
      email: "andrea.santos@tip.edu.ph",
    },
    schedule: sharedSchedule,
  },
  manila: {
    id: "manila",
    name: "T.I.P. Manila",
    shortName: "Manila",
    subtitle: "Historic Quiapo campus across the P. Casal and Arlegui sites.",
    address: "363 P. Casal St. / 1338 Arlegui St., Quiapo, Manila",
    phone: "(02) 8733-9117 / (02) 7918-8476 / 0917-177-2566",
    heroImage:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    about:
      "T.I.P. Manila traces the institution's roots in Quiapo and remains a busy urban campus serving generations of students in engineering, computing, architecture, and allied disciplines.",
    announcements: [
      {
        title: "Library Extension Hours",
        detail: "The Manila campus library will stay open until 7:00 PM during project week.",
      },
      {
        title: "Community Outreach Briefing",
        detail: "NSTP volunteers meet at the Arlegui function hall on Thursday afternoon.",
      },
      {
        title: "Career Center Desk",
        detail: "Resume reviews and internship advice are available near Student Services today.",
      },
    ],
    contacts: [
      { label: "P. Casal", value: "(02) 8733-9117" },
      { label: "Arlegui", value: "(02) 7918-8476" },
      { label: "Mobile Hotline", value: "0917-177-2566" },
      { label: "Email", value: "info@tip.edu.ph" },
    ],
    mapHighlights: [
      "P. Casal Academic Building",
      "Arlegui Annex and Student Halls",
      "Library and Study Commons",
      "Student Services and Guidance Office",
    ],
    quickLinks: ["Canvas", "Career Center", "FAQs", "Enrollment"],
    studentProfile: {
      name: "Miguel Antonio Reyes",
      program: "BS Civil Engineering",
      yearLevel: "3rd Year",
      studentId: "2026-MNL-00631",
      email: "miguel.reyes@tip.edu.ph",
    },
    schedule: [
      {
        code: "CE 201",
        subject: "Statics of Rigid Bodies",
        room: "Room 402",
        time: "7:30 AM - 9:00 AM",
        day: "Monday",
      },
      {
        code: "GE 104",
        subject: "Ethics",
        room: "Room 308",
        time: "10:00 AM - 11:30 AM",
        day: "Tuesday",
      },
      {
        code: "CE 215",
        subject: "Construction Materials",
        room: "Lab 1",
        time: "1:00 PM - 3:00 PM",
        day: "Wednesday",
      },
      {
        code: "PE 2",
        subject: "Physical Fitness",
        room: "Gym Area",
        time: "3:30 PM - 5:00 PM",
        day: "Friday",
      },
    ],
  },
};

export const branchOptions = [
  {
    key: "qc",
    title: "Quezon City",
    description: "Choose the Aurora Boulevard campus experience.",
  },
  {
    key: "manila",
    title: "Manila",
    description: "Choose the Quiapo campus experience.",
  },
];
