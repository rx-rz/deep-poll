export type QuestionType =
  | "text"
  | "email"
  | "number"
  | "phone"
  | "multiple_choice"
  | "checkbox"
  | "dropdown"
  | "rating"
  | "likert"
  | "linear_scale"
  | "date"
  | "time"
  | "datetime"
  | "file"
  | "slider";

export type QuestionOptionsMap = {
  text: {
    placeholder?: string;
    isMultiline: boolean;
    minAnswerLength: number;
    maxAnswerLength: number;
  };
  email: {
    placeholder?: string;
    minEmailLength: number;
    maxEmailLength: number;
    allowedDomains?: string;
    disallowedDomains?: string;
    allowDuplicates: boolean;
  };
  number: {
    placeholder?: string;
    allowDecimal: boolean;
    min: number;
    max: number;
  };
  phone: {
    allowedCountries: string[]; // ISO country codes (e.g., ['US', 'CA'])
    format: string; // e.g., '(XXX) XXX-XXXX'
  };
  multiple_choice: {
    choices: string[];
    maxLengthForOtherParameter: number;
    allowOther: boolean; // Allow an "Other" option with text input
    randomizeOrder: boolean; // Randomize the order of choices
  };
  checkbox: {
    choices: string[];
    minSelections: number;
    maxSelections: number;
    randomizeOrder: boolean; // Randomize the order of choices
  };
  dropdown: {
    choices: string[];
    allowSearch: boolean;
  };
  rating: {
    min: number; // Minimum rating (e.g., 1)
    max: number; // Maximum rating (e.g., 5)
    labels: string[]; // Labels for each rating (e.g., ["Poor", "Excellent"])
  };
  likert: {
    scale: number; // Number of points on the scale (e.g., 5, 7)
    labels: string[]; // Labels for each point on the scale
  };
  linear_scale: {
    min: number; // Starting value
    max: number; // Ending value
    labels: { start: string; end: string }; // Labels for start and end points
  };
  date: {
    format:
      | "ISO e.g 2023-04-05"
      | "MM/DD/YYYY (US Format) e.g 04/15/2023"
      | "DD/MM/YYYY (UK/European Format)  e.g 15/04/2023"
      | "Month name, day and year e.g April 15, 2023"; // Date format (e.g., 'YYYY-MM-DD')
    minDate: string; // Minimum selectable date
    maxDate: string; // Maximum selectable date
  };
  time: {
    format:
      | "24-hour with seconds e.g 14:30:45"
      | "24-hour without seconds e.g 14:30"
      | "12-hour with AM/PM e.g 2:30 PM"
      | "12-hour with seconds e.g 2:30:45 PM"; // Time format (e.g., 'HH:mm')
    minTime: string; // Minimum time
    maxTime: string; // Maximum time
  };
  datetime: {
    format:
      | "ISO e.g 2023-04-15T14:30:45"
      | "Date and 12-hour time e.g Apr 15, 2023 2:30 PM"
      | "Date and 24-hour time e.g 15/04/2023 14:30"
      | "Full date and time e.g April 15, 2023 14:30:45"; // Datetime format (e.g., 'YYYY-MM-DDTHH:mm')
    minDatetime: string; // Minimum datetime
    maxDatetime: string; // Maximum datetime
  };
  file: {
    allowMultiple: boolean;
    acceptedFormats: string[]; // Allowed file extensions (e.g., ['pdf', 'docx'])
    maxSizeMB: number; // Maximum file size in MB
    maxFiles: number; // Maximum number of files that can be uploaded
  };

  slider: {
    min: number; // Minimum value
    max: number; // Maximum value
    step: number; // Step increment
    labels: { start: string; end: string }; // Labels for start and end
    range: boolean;
    defaultValue?: number | [number, number]; // Default value(s)
  };
};

export type Question<T extends QuestionType = QuestionType> = {
  questionId: string;
  surveyId: string | null;
  questionText?: string;
  questionType: T;
  options?: QuestionOptionsMap[T];
  required: boolean;
  orderNumber: number;
  createdAt: string;
};

