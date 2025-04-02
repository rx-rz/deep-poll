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
    statement: string; // Statement being rated
  };
  linear_scale: {
    min: number; // Starting value
    max: number; // Ending value
    labels: { start: string; end: string }; // Labels for start and end points
  };
  date: {
    format: string; // Date format (e.g., 'YYYY-MM-DD')
    minDate?: string; // Minimum selectable date
    maxDate?: string; // Maximum selectable date
    allowPastDates: boolean; // Allow dates in the past
  };
  time: {
    format: string; // Time format (e.g., 'HH:mm')
    minTime?: string; // Minimum time
    maxTime?: string; // Maximum time
    allowElapsedTime: boolean; // Allow elapsed time (e.g., 1 hour from now)
  };
  datetime: {
    format: string; // Datetime format (e.g., 'YYYY-MM-DDTHH:mm')
    minDatetime?: string; // Minimum datetime
    maxDatetime?: string; // Maximum datetime
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

// signature: {
//   placeholder: string; // Placeholder text (e.g., "Sign here")
//   penColor: string; // Default pen color
//   backgroundColor: string; // Background color
//   clearButtonLabel: string; // Text for the clear button
// };
// matrix: {
//   rows: string[]; // Row labels (e.g., questions or categories)
//   columns: string[]; // Column labels (e.g., rating scale)
//   allowMultipleSelections: boolean; // Allow multiple selections per row
// };
// toggle: {
//   labels: { on: string; off: string }; // Labels for on/off states
//   defaultState: boolean; // Default toggle state
// };
