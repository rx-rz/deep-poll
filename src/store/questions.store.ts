import { Question, QuestionType } from "@/types/questions";
import { createId } from "@paralleldrive/cuid2";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type QuestionStore = {
  questions: Question[];
  addQuestion: <T extends QuestionType>(
    data: Omit<Question<T>, "createdAt" | "questionId" | "orderNumber">
  ) => void;
  updateQuestion: <T extends QuestionType>(
    id: string,
    updates: Partial<Question<T>>
  ) => void;
  removeQuestion: (id: string) => void;
  getQuestion: (id: string) => Question | undefined;
};

export const useQuestionStore = create<QuestionStore>()(
  persist(
    (set, get) => ({
      questions: [],
      addQuestion: (data) =>
        set((state) => ({
          questions: [
            ...state.questions,
            {
              questionId: createId(),
              orderNumber: state.questions.length + 1,
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

      /** Get a question by ID */
      getQuestion: (id) => {
        return get().questions.find((q) => q.questionId === id);
      },
    }),
    {
      name: "question-store", // unique name for the storage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
