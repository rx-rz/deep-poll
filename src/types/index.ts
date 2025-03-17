export type QuestionType =
  | "text_short"
  | "text_paragraph"
  | "email"
  | "number"
  | "phone"
  | "multiple_choice"
  | "checkbox"
  | "dropdown"
  | "linear_scale"
  | "rating"
  | "likert"
  | "date"
  | "time"
  | "datetime"
  | "file_document"
  | "file_image";

export const questionTypeMapping: Record<QuestionType, string> = {
  text_short: "text",
  text_paragraph: "text",
  email: "text",
  number: "text",
  phone: "text",
  multiple_choice: "multiple_choice",
  checkbox: "checkbox",
  dropdown: "dropdown",
  linear_scale: "rating",
  rating: "rating",
  likert: "rating",
  date: "date",
  time: "date",
  datetime: "date",
  file_document: "file_upload",
  file_image: "file_upload",
};

export const options = {
  text: {
    placeholder: "Enter your response",
    maxLength: 500,
    minLength: 1,
    multiline: false,
    required: true,
  },
  email: {
    placeholder: "Enter your email",
    validation: "email",
    required: true,
  },
  number: {
    placeholder: "Enter a number",
    min: 0,
    max: 100000,
    step: 1,
    required: true,
  },
  phone: {
    placeholder: "Enter your phone number",
    validation: "phone",
    pattern: "^\\+?[1-9]\\d{1,14}$",
    required: true,
  },
  multiple_choice: {
    choices: ["Option 1", "Option 2", "Option 3"],
    allowOther: false,
    randomizeOrder: false,
    required: true,
  },
  checkbox: {
    choices: ["Option 1", "Option 2", "Option 3"],
    allowOther: false,
    minSelections: 1,
    maxSelections: 3,
    required: true,
  },
  dropdown: {
    choices: ["Option 1", "Option 2", "Option 3"],
    randomizeOrder: false,
    required: true,
  },
  rating: {
    min: 1,
    max: 5,
    labels: ["Poor", "Fair", "Good", "Very Good", "Excellent"],
    required: true,
  },
  likert: {
    scale: 5,
    labels: [
      "Strongly Disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly Agree",
    ],
    required: true,
  },
  linear_scale: {
    min: 1,
    max: 10,
    labels: {
      start: "Low",
      end: "High",
    },
    required: true,
  },
  date: {
    format: "YYYY-MM-DD",
    minDate: "2020-01-01",
    maxDate: "2030-12-31",
    required: true,
  },
  time: {
    format: "HH:mm",
    minTime: "00:00",
    maxTime: "23:59",
    required: true,
  },
  datetime: {
    format: "YYYY-MM-DD HH:mm",
    minDatetime: "2020-01-01 00:00",
    maxDatetime: "2030-12-31 23:59",
    required: true,
  },
  file_upload: {
    allowedTypes: ["image/*", "application/pdf", "application/msword"],
    maxSizeMB: 10,
    maxFiles: 1,
    required: true,
  },
};
