import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
  | "file_document"
  | "file_image";

/** Type-safe mapping of options based on question type */
export type QuestionOptionsMap = {
  text: {
    placeholder: string;
    maxLength: number;
    minLength: number;
  };
  email: { placeholder: string; validation: "email"; required: boolean };
  number: {
    placeholder: string;
    min: number;
    max: number;
    step: number;
  };
  phone: {
    placeholder: string;
    validation: "phone";
    pattern: string;
  };
  multiple_choice: {
    choices: string[];
    allowOther: boolean;
  };
  checkbox: {
    choices: string[];
    minSelections: number;
    maxSelections: number;
  };
  dropdown: { choices: string[]; required: boolean };
  rating: { min: number; max: number; labels: string[]; required: boolean };
  likert: { scale: number; labels: string[]; required: boolean };
  linear_scale: {
    min: number;
    max: number;
    labels: { start: string; end: string };
  };
  date: { format: string; minDate: string; maxDate: string; required: boolean };
  time: { format: string; minTime: string; maxTime: string; required: boolean };
  datetime: {
    format: string;
    minDatetime: string;
    maxDatetime: string;
  };
  file_document: {
    acceptedFormats: string[];
    maxSizeMB: number;
  };
  file_image: {
    acceptedFormats: string[];
    maxSizeMB: number;
  };
};

/** Generic type for questions */
export type Question<T extends QuestionType = QuestionType> = {
  questionId: string;
  surveyId: string | null;
  questionText: string;
  questionType: T;
  options?: QuestionOptionsMap[T];
  required: boolean;
  orderNumber: number;
  createdAt: string;
};

/** Zustand store using an array */
type QuestionStore = {
  questions: Question[];
  addQuestion: <T extends QuestionType>(
    data: Omit<Question<T>, "createdAt" | "questionId">
  ) => void;
  updateQuestion: <T extends QuestionType>(
    id: string,
    updates: Partial<Question<T>>
  ) => void;
  removeQuestion: (id: string) => void;
};

export const useQuestionStore = create<QuestionStore>()(
  persist(
    (set) => ({
      questions: [],

      /** Add a new question */
      addQuestion: (data) =>
        set((state) => ({
          questions: [
            ...state.questions,
            {
              questionId: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
              ...data,
            },
          ],
        })),

      /** Update a question */
      updateQuestion: (id, updates) =>
        set((state) => ({
          questions: state.questions.map((q) =>
            q.questionId === id ? { ...q, ...updates } : q
          ),
        })),

      /** Remove a question */
      removeQuestion: (id) =>
        set((state) => ({
          questions: state.questions.filter((q) => q.questionId !== id),
        })),
    }),
    {
      name: "question-store", // unique name for the storage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
