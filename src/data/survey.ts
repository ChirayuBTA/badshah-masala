export type AnswerType =
  | "single"
  | "multi"
  | "text"
  | "conditional"
  | "compound";

export interface Option {
  id: string;
  label: string;
}

export interface BaseQuestion {
  id: string;
  label: string;
  required?: boolean;
}

export interface SingleQuestion extends BaseQuestion {
  type: "single";
  options: Option[];
}

export interface MultiQuestion extends BaseQuestion {
  type: "multi";
  options: Option[];
}

export interface TextQuestion extends BaseQuestion {
  type: "text";
  placeholder?: string;
}

export interface ConditionalQuestion extends BaseQuestion {
  type: "conditional";
  options: Option[];
  conditionalTriggerId: string;
  conditionalLabel: string;
  conditionalPlaceholder?: string;
}

export interface CompoundQuestion {
  id: string;
  type: "compound";
  label: string;
  parts: (SingleQuestion | TextQuestion)[];
}

export type Question =
  | SingleQuestion
  | MultiQuestion
  | TextQuestion
  | ConditionalQuestion
  | CompoundQuestion;

export interface Section {
  id: string;
  title: string;
  subtitle: string;
  questions: Question[];
}

export type SurveyConfig = Section[];

export const survey: SurveyConfig = [
  {
    id: "about-you",
    title: "About You",
    subtitle: "Help us understand who you are",
    questions: [
      {
        id: "age-group",
        type: "single",
        label: "Age Group",
        required: true,
        options: [
          { id: "below-25", label: "Below 25" },
          { id: "25-35", label: "25–35" },
          { id: "36-45", label: "36–45" },
          { id: "46-55", label: "46–55" },
          { id: "55-plus", label: "55+" },
        ],
      },
      {
        id: "grocery-buyer",
        type: "single",
        label: "Who usually purchases groceries in your household?",
        required: true,
        options: [
          { id: "self", label: "Self" },
          { id: "spouse", label: "Spouse" },
          { id: "parents", label: "Parents" },
          { id: "shared", label: "Shared Decision" },
        ],
      },
    ],
  },
  {
    id: "masala-usage",
    title: "Current Masala Usage",
    subtitle: "Tell us about the brands you trust",
    questions: [
      {
        id: "brands-used",
        type: "multi",
        label:
          "Which masala brands do you currently use? (Select all that apply)",
        required: true,
        options: [
          { id: "everest", label: "Everest" },
          { id: "mdh", label: "MDH" },
          { id: "badshah", label: "Badshah" },
          { id: "suhana", label: "Suhana" },
          { id: "catch", label: "Catch" },
          { id: "tata-sampann", label: "Tata Sampann" },
          { id: "local-homemade", label: "Local/Homemade" },
          { id: "other", label: "Other" },
        ],
      },
      {
        id: "primary-brand",
        type: "single",
        label: "Which is your primary masala brand today?",
        required: true,
        options: [
          { id: "everest", label: "Everest" },
          { id: "mdh", label: "MDH" },
          { id: "badshah", label: "Badshah" },
          { id: "suhana", label: "Suhana" },
          { id: "catch", label: "Catch" },
          { id: "tata-sampann", label: "Tata Sampann" },
          { id: "local-homemade", label: "Local/Homemade" },
          { id: "other", label: "Other" },
        ],
      },
    ],
  },
  {
    id: "activity-recall",
    title: "Badshah Activity Recall",
    subtitle: "We'd love to know what you remember",
    questions: [
      {
        id: "activity-location",
        type: "single",
        label:
          "Do you remember seeing any Masala activity, stall, sampling, or promoter in your:",
        required: true,
        options: [
          { id: "society", label: "Society" },
          { id: "workplace", label: "Workplace/Corporate Office" },
          { id: "both", label: "Both" },
          { id: "dont-remember", label: "Don't Remember" },
        ],
      },
      {
        id: "brand-interaction",
        type: "conditional",
        label: "Did you interact with the Badshah activity?",
        required: true,
        conditionalTriggerId: "no",
        conditionalLabel: "Which brand did you see?",
        conditionalPlaceholder: "Enter brand name",
        options: [
          { id: "yes", label: "Yes" },
          { id: "no", label: "No" },
        ],
      },

      // Compound implementation (kept for reference — do not delete)
      // {
      //   id: "brand-interaction",
      //   type: "compound",
      //   label: "Which Brand and Did you interact with the Badshah activity?",
      //   parts: [
      //     {
      //       id: "brand-interaction-engaged",
      //       type: "single",
      //       label: "Did you interact with the Badshah activity?",
      //       options: [
      //         { id: "yes", label: "Yes" },
      //         { id: "no", label: "No" },
      //       ],
      //     },
      //     {
      //       id: "brand-interaction-brand",
      //       type: "text",
      //       label: "Brand",
      //       placeholder: "Enter brand name",
      //     },
      //   ],
      // },
      {
        id: "received-trial",
        type: "conditional",
        label: "Did you receive a food trial or product during the activity?",
        required: true,
        conditionalTriggerId: "yes",
        conditionalLabel: "Which One?",
        conditionalPlaceholder: "e.g. Chana Masala, Biryani…",
        options: [
          { id: "yes", label: "Yes" },
          { id: "no", label: "No" },
          { id: "dont-remember", label: "Don't Remember" },
        ],
      },
    ],
  },
  {
    id: "trial-impact",
    title: "Trial & Purchase Impact",
    subtitle: "How did Badshah Masalas change your kitchen?",
    questions: [
      {
        id: "used-before-activity",
        type: "single",
        label:
          "Had you ever used Badshah Masalas before attending this activity?",
        required: true,
        options: [
          { id: "yes", label: "Yes" },
          { id: "no", label: "No" },
        ],
      },
      {
        id: "tried-after-activity",
        type: "single",
        label: "Did you try Badshah after the activity?",
        required: true,
        options: [
          { id: "yes", label: "Yes" },
          { id: "no", label: "No" },
        ],
      },
      {
        id: "purchased-after-activity",
        type: "single",
        label: "Did you purchase Badshah after the activity?",
        required: true,
        options: [
          { id: "yes", label: "Yes" },
          { id: "no", label: "No" },
        ],
      },
      {
        id: "purchase-frequency",
        type: "single",
        label: "How many times have you purchased Badshah since the activity?",
        required: true,
        options: [
          { id: "never", label: "Never Purchased" },
          { id: "once", label: "Purchased Once" },
          { id: "two-three", label: "Purchased 2–3 Times" },
          { id: "more-than-three", label: "Purchased More Than 3 Times" },
        ],
      },
      {
        id: "currently-using",
        type: "single",
        label: "Are you currently using Badshah Masalas?",
        required: true,
        options: [
          { id: "yes", label: "Yes" },
          { id: "no", label: "No" },
        ],
      },
      {
        id: "usage-change",
        type: "single",
        label: "Compared to before the activity, your usage of Badshah is:",
        required: true,
        options: [
          { id: "started", label: "Started Using After Activity" },
          { id: "more-often", label: "Using More Often" },
          { id: "same", label: "Using Same As Before" },
          { id: "stopped", label: "Stopped Using" },
          { id: "never-used", label: "Never Used" },
        ],
      },
    ],
  },
];
