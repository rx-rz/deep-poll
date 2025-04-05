import { QuestionOptionsMap, QuestionType } from "@/types/questions";

export const defaultQuestionOptions: {
  [key in QuestionType]: QuestionOptionsMap[key];
} = {
  text: {
    placeholder: "",
    minAnswerLength: 1,
    maxAnswerLength: 255,
    isMultiline: false,
  },
  email: {
    placeholder: "",
    minEmailLength: 1,
    maxEmailLength: 255,
    allowedDomains: "",
    disallowedDomains: "",
    allowDuplicates: false,
  },
  number: {
    placeholder: "",
    allowDecimal: false,
    min: -Infinity,
    max: Infinity,
  },
  phone: { allowedCountries: [], format: "" },
  multiple_choice: {
    choices: [],
    allowOther: false,
    maxLengthForOtherParameter: 255,
    randomizeOrder: false,
  },
  checkbox: {
    choices: [],
    minSelections: 1,
    maxSelections: 5,
    randomizeOrder: false,
  },
  dropdown: { choices: [], allowSearch: false },
  rating: { min: 1, max: 5, labels: [] },
  likert: { scale: 5, labels: [], statement: "" },
  linear_scale: { min: 1, max: 5, labels: { start: "", end: "" } },
  date: {
    format: "ISO e.g 2023-04-05",
    minDate: "",
    maxDate: "",
    allowPastDates: true,
  },
  time: {
    format: "12-hour with AM/PM e.g 2:30 PM",
    minTime: "",
    maxTime: "",
    allowElapsedTime: true,
  },
  datetime: { format: "yyyy-MM-dd HH:mm", minDatetime: "", maxDatetime: "" },
  file: {
    acceptedFormats: [],
    maxSizeMB: 1,
    maxFiles: 1,
    allowMultiple: false,
  },
  slider: {
    min: 0,
    max: 100,
    step: 1,
    labels: { start: "", end: "" },
    defaultValue: 0,
    range: false,
  },
};
