import { Question, QuestionType } from "@/types/questions";
import { createId } from "@paralleldrive/cuid2";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type QuestionStore = {
  questions: Question[];
  apiQueuedQuestions: Question[];
  addApiQueuedQuestion: (id: string, question: Question) => void;
  setQuestions: (questions: Question[]) => void;
  resetApiQueuedQuestions: () => void;
  removeApiQueuedQuestion: (id: string) => void;
  resetQuestions: () => void;
  addQuestion: <T extends QuestionType>(
    data: Omit<Question<T>, "createdAt" | "id" | "orderNumber">
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
      apiQueuedQuestions: [],
      setQuestions: (q) =>
        set(() => ({
          questions: q,
        })),
      addQuestion: (data) =>
        set((state) => ({
          questions: [
            ...state.questions,
            {
              id: createId(),
              orderNumber: state.questions.length + 1,
              createdAt: new Date().toISOString(),
              ...data,
            },
          ],
        })),
      addApiQueuedQuestion: (id, data) => {
        const existingUpdatedQuestion = get().apiQueuedQuestions.find(
          (question) => question.id === id
        );
        set((state) => ({
          apiQueuedQuestions: existingUpdatedQuestion
            ? [
                ...state.apiQueuedQuestions.filter(
                  (question) => question.id === existingUpdatedQuestion.id
                ),
                { ...data },
              ]
            : [...state.apiQueuedQuestions, { ...data }],
        }));
      },
      resetApiQueuedQuestions: () =>
        set(() => ({
          apiQueuedQuestions: [],
        })),
      resetQuestions: () =>
        set(() => ({
          questions: [],
        })),

      /** Update a question */
      updateQuestion: (id, updates) =>
        set((state) => ({
          questions: state.questions.map((q) =>
            q.id === id ? { ...q, ...updates } : q
          ),
        })),

      /** Remove a question */
      removeQuestion: (id) =>
        set((state) => ({
          questions: state.questions.filter((q) => q.id !== id),
        })),
      removeApiQueuedQuestion: (id) => {
        set((state) => ({
          apiQueuedQuestions: state.apiQueuedQuestions.filter((q) => q.id !== id),
        }));
      },
      /** Get a question by ID */
      getQuestion: (id) => {
        return get().questions.find((q) => q.id === id);
      },
    }),
    {
      name: "question-store", // unique name for the storage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
