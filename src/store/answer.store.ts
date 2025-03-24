import { Answer } from "@/types/answers";
import { QuestionType } from "@/types/questions";
import { create } from "zustand";

type AnswerStore = {
  answers: { [questionId: string]: any };
  setAnswer: <T extends QuestionType>(
    questionId: string,
    answer: Answer<T>
  ) => void;
  getAnswer: <T extends QuestionType>(
    questionId: string
  ) => Answer<T> | undefined;
  resetAnswers: () => void;
};

export const useAnswerStore = create<AnswerStore>((set, get) => ({
  answers: {},
  setAnswer: (questionId, answer) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer },
    })),
  getAnswer: (questionId) => get().answers[questionId],
  resetAnswers: () => set({ answers: {} }),
}));
