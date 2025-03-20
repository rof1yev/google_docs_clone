import { ITemplate } from "@/interface";

export const templates: ITemplate[] = [
  {
    id: "blank",
    label: "Blank Document",
    imageUrl: "/blank-document.svg",
    initialContent: "",
  },
  {
    id: "software-proposal",
    label: "Software Development Proposal",
    imageUrl: "/software-proposal.svg",
    initialContent: `
      <h1>Software Development Proposal</h1>
      <h2>Project Overview</h2>
      <p>Brief description of the project deliverables and requirements.</p>

      <h2>Scope of Work</h2>
      <p>Detailed breakdown of project deliverables and requirements.</p>

      <h2>Timeline</h2>
      <p>Project milestones and delivery schedule.</p>

      <h2>Budget</h2>
      <p>Cost breakdown and payment terms.</p>
    `,
  },
  {
    id: "project-proposal",
    label: "Project Proposal",
    imageUrl: "/project-proposal.svg",
    initialContent: `
      <h1>Project Proposal</h1>
      <h2>Executive Summary</h2>
      <p>Brief overview of the project proposal.</p>

      <h2>Project goals</h2>
      <p>Key objectives and expected outcomes.</p>

      <h2>Implementation Plan</h2>
      <p>Strategy and methodology for project execution.</p>

      <h2>Resources Required</h2>
      <p>Team, equipment, and budget requirements.</p>
    `,
  },
  {
    id: "business-latter",
    label: "Business Latter",
    imageUrl: "/business-letter.svg",
    initialContent: `
      <h1>Business Letter</h1>
      <p>This is a business letter template.</p>
    `,
  },
  {
    id: "resume",
    label: "Resume",
    imageUrl: "/resume.svg",
    initialContent: `
      <h1>[Your name]</h1>
      <p>[Contact Information]</p>

      <h2>Professional Summary</h2>
      <p>Brief overview of your professional background and key strengths.</p>

      <h2>Work Experience</h2>
      <p>[Company name] - [Position] <br/> [Date Range]</p>

      <h2>Education</h2>
      <p>[Degree] - [Institution] <br/> [Graduation Year]</p>

      <h2>Skills</h2>
      <p>List of relevant skills and competencies.</p>
    `,
  },
  {
    id: "cover-letter",
    label: "Cover Letter",
    imageUrl: "/cover-letter.svg",
    initialContent: `
      <p>[Your name] <br/> [Your Address] <br/> [City, State ZIP]</p>

      <p>[Date]</p>

      <p>[Recipient's Name] <br/> [Company Name] <br/> [Company Address]</p>

      <p>I am writing to express my interest in [position] at [company name].</p>

      <p>Sincerely, <br/> [Your name]</p>
    `,
  },
  {
    id: "letter",
    label: "Letter",
    imageUrl: "/letter.svg",
    initialContent: `
      <p>Subject: [Email Subject]</p>

      <p>Dear [Recipient],</p>

      <p>I hope this email finds you well.</p>

      <p>[Email Body]</p>

      <p>Best regards, <br/> [Your name]</p>
    `,
  },
];

export const LEFT_MARGIN: number = 56;
export const RIGHT_MARGIN: number = 56;
