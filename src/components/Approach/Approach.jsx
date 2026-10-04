import React from 'react';
import './Approach.css';

const STEPS = [
  {
    id: 1,
    title: 'Understand the Client’s Needs',
    description:
      'We listen first. Every legal challenge is unique, and so is every client. Through thoughtful conversations and clear, jargon-free communication, we identify what truly matters—whether it\'s protecting their business, resolving a dispute, or securing their future.',
    howWeDoIt: [
      'We ask the right questions to clarify goals and concerns.',
      'We explain legal options in plain, human language.',
      'We ensure clients feel heard, understood, and valued.',
    ],
  },
  {
    id: 2,
    title: 'Break Down the Legal Issue',
    description:
      'Law can be complex. Our job is to simplify without losing accuracy. We take apart the issue, analyzing risks, opportunities, and legal pathways—making it easy for clients to grasp what’s at stake.',
    howWeDoIt: [
      'We use structured thinking to break problems into clear, actionable parts.',
      'We filter out the noise and focus on what’s essential.',
      'We guide clients with a step-by-step roadmap of the legal process.',
    ],
  },
  {
    id: 3,
    title: 'Prioritize Strategy & Approach',
    description:
      'Not every case needs an aggressive fight. Some need negotiation, others need litigation, and some need creative legal structuring. We weigh the options and choose the smartest, most effective approach—always with the client’s best interest in mind.',
    howWeDoIt: [
      'We explain trade-offs in simple, honest terms.',
      'We tailor solutions based on urgency, cost, and impact.',
      'We keep clients involved—no surprises, just strategy.',
    ],
  },
  {
    id: 4,
    title: 'Take Action & Advocate Relentlessly',
    description:
      'Once the course is set, we execute with precision and persistence. Whether drafting airtight contracts, negotiating settlements, or representing in court, we deliver with clarity, confidence, and competence.',
    howWeDoIt: [
      'We draft documents that are clear, strong, and enforceable.',
      'We anticipate challenges and stay two steps ahead.',
      'We handle legal complexities so clients can focus on their lives.',
    ],
  },
  {
    id: 5,
    title: 'Deliver Results & Build Lasting Trust',
    description:
      'Success isn’t just winning a case—it’s peace of mind. We close every engagement with clear next steps, insights for the future, and a commitment to being there whenever our clients need us again.',
    howWeDoIt: [
      'We translate outcomes into real-world impact.',
      'We provide transparent, forward-thinking advice.',
      'We aim for long-term relationships—not just one-time wins.',
    ],
  },
];

const Approach = () => {
  return (
    <div className="approach-container">
      <h1 className="primaryText">How We Serve Our Clients: A 5-Step Approach</h1>

      {STEPS.map((step) => (
        <div key={step.id} className="step-card">
          <div className="step-icon">{step.id}</div>
          <div className="step-content">
            <h2>{step.title}</h2>
            <p>{step.description}</p>
            <div className="how-we-do-it">
              <h3> How we do it:</h3>
              <ul>
                {step.howWeDoIt.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Approach;