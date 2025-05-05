import { Answer } from "@/types/answers";
import { QuestionType } from "@/types/questions";
import { create } from "zustand";

type AnswerStore = {
  answers: { [id: string]: any };
  setAnswer: <T extends QuestionType>(
    id: string,
    answer: Answer<T>
  ) => void;
  getAnswer: <T extends QuestionType>(
    id: string
  ) => Answer<T> | undefined;
  resetAnswers: () => void;
};

export const useAnswerStore = create<AnswerStore>((set, get) => ({
  answers: {},
  setAnswer: (id, answer) =>
    set((state) => ({
      answers: { ...state.answers, [id]: answer },
    })),
  getAnswer: (id) => get().answers[id],
  resetAnswers: () => set({ answers: {} }),
}));
