export type AnswerType = 'single' | 'multi' | 'text' | 'conditional' | 'compound';

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
  type: 'single';
  options: Option[];
}

export interface MultiQuestion extends BaseQuestion {
  type: 'multi';
  options: Option[];
}

export interface TextQuestion extends BaseQuestion {
  type: 'text';
  placeholder?: string;
}

export interface ConditionalQuestion extends BaseQuestion {
  type: 'conditional';
  options: Option[];
  conditionalTriggerId: string;
  conditionalLabel: string;
  conditionalPlaceholder?: string;
}

export interface CompoundQuestion {
  id: string;
  type: 'compound';
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
    id: 'about-you',
    title: 'Tell Us About Yourself',
    subtitle: 'Help us understand who you are',
    questions: [
      {
        id: 'age-group',
        type: 'single',
        label: 'What is your age group?',
        required: true,
        options: [
          { id: 'under-18', label: 'Under 18' },
          { id: '18-24', label: '18–24' },
          { id: '25-34', label: '25–34' },
          { id: '35-44', label: '35–44' },
          { id: '45-54', label: '45–54' },
          { id: '55-plus', label: '55+' },
        ],
      },
      {
        id: 'grocery-buyer',
        type: 'single',
        label: 'Who usually purchases groceries in your household?',
        required: true,
        options: [
          { id: 'me', label: 'Mostly me' },
          { id: 'partner', label: 'My partner / spouse' },
          { id: 'shared', label: 'We share it' },
          { id: 'other-family', label: 'Another family member' },
        ],
      },
    ],
  },
  {
    id: 'masala-usage',
    title: 'Your Masala Choices',
    subtitle: 'Tell us about the brands you trust',
    questions: [
      {
        id: 'brands-used',
        type: 'multi',
        label: 'Which masala brands do you currently use? (Select all that apply)',
        required: true,
        options: [
          { id: 'badshah', label: 'Badshah' },
          { id: 'everest', label: 'Everest' },
          { id: 'mdh', label: 'MDH' },
          { id: 'catch', label: 'Catch' },
          { id: 'ramdev', label: 'Ramdev' },
          { id: 'other', label: 'Other' },
        ],
      },
      {
        id: 'primary-brand',
        type: 'single',
        label: 'Which brand do you reach for most often?',
        required: true,
        options: [
          { id: 'badshah', label: 'Badshah' },
          { id: 'everest', label: 'Everest' },
          { id: 'mdh', label: 'MDH' },
          { id: 'catch', label: 'Catch' },
          { id: 'ramdev', label: 'Ramdev' },
          { id: 'other', label: 'Other' },
        ],
      },
    ],
  },
  {
    id: 'activity-recall',
    title: 'The Badshah Experience',
    subtitle: "We'd love to know what you remember",
    questions: [
      {
        id: 'activity-location',
        type: 'single',
        label: 'Where did you first come across the Badshah promotional activity?',
        required: true,
        options: [
          { id: 'supermarket', label: 'Supermarket / Grocery store' },
          { id: 'mandi', label: 'Local mandi / Kirana store' },
          { id: 'online', label: 'Online / Social media' },
          { id: 'event', label: 'A community event' },
          { id: 'other', label: 'Somewhere else' },
        ],
      },
      {
        id: 'brand-interaction',
        type: 'compound',
        label: 'Tell us more about the activity',
        parts: [
          {
            id: 'brand-interaction-brand',
            type: 'text',
            label: 'Which brand did the promoter represent?',
            placeholder: 'e.g. Badshah, Everest…',
          },
          {
            id: 'brand-interaction-engaged',
            type: 'single',
            label: 'Did you personally interact with the activity?',
            options: [
              { id: 'yes', label: 'Yes' },
              { id: 'no', label: 'No' },
            ],
          },
        ],
      },
      {
        id: 'received-trial',
        type: 'conditional',
        label: 'Did you receive a trial pack or sample?',
        required: true,
        conditionalTriggerId: 'yes',
        conditionalLabel: 'What product did you receive?',
        conditionalPlaceholder: 'e.g. Chana Masala 50g…',
        options: [
          { id: 'yes', label: 'Yes' },
          { id: 'no', label: 'No' },
          { id: 'not-sure', label: "I'm not sure" },
        ],
      },
    ],
  },
  {
    id: 'trial-impact',
    title: 'After the Activity',
    subtitle: 'How did Badshah Masalas change your kitchen?',
    questions: [
      {
        id: 'tried-product',
        type: 'single',
        label: 'Did you try any Badshah product after the activity?',
        required: true,
        options: [
          { id: 'yes-trial', label: 'Yes, I used the trial pack' },
          { id: 'yes-bought', label: 'Yes, I bought a full pack' },
          { id: 'not-yet', label: "Not yet, but I'm planning to" },
          { id: 'no', label: 'No' },
        ],
      },
      {
        id: 'flavour-impression',
        type: 'single',
        label: 'How would you describe the flavour of Badshah?',
        options: [
          { id: 'very-flavourful', label: 'Very flavourful — exceeded my expectations' },
          { id: 'good', label: 'Good — on par with what I use' },
          { id: 'mild', label: 'A bit mild for my taste' },
          { id: 'not-tried', label: "I haven't tried it yet" },
        ],
      },
      {
        id: 'purchase-intent',
        type: 'single',
        label: 'How likely are you to purchase Badshah Masala?',
        required: true,
        options: [
          { id: 'very-likely', label: 'Very likely' },
          { id: 'likely', label: 'Likely' },
          { id: 'neutral', label: 'Neutral' },
          { id: 'unlikely', label: 'Unlikely' },
        ],
      },
      {
        id: 'switch-reason',
        type: 'multi',
        label: 'What would most influence you to switch to Badshah? (Pick up to 3)',
        options: [
          { id: 'taste', label: 'Better taste / aroma' },
          { id: 'price', label: 'Competitive price' },
          { id: 'availability', label: 'Wide availability' },
          { id: 'packaging', label: 'Fresh packaging / hygiene seal' },
          { id: 'variety', label: 'Greater product variety' },
          { id: 'recommendation', label: 'Friend / family recommendation' },
        ],
      },
      {
        id: 'favourite-dish',
        type: 'text',
        label: "What's your signature dish? (Optional)",
        placeholder: 'e.g. Maa ki dal, Butter chicken…',
      },
      {
        id: 'recommendation',
        type: 'single',
        label: 'Would you recommend Badshah to someone in your family?',
        required: true,
        options: [
          { id: 'definitely', label: 'Definitely' },
          { id: 'probably', label: 'Probably' },
          { id: 'not-sure', label: "Not sure yet" },
          { id: 'no', label: 'No' },
        ],
      },
    ],
  },
];
