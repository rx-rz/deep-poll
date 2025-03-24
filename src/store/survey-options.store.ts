import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { z } from "zod";
import { surveyOptionsSchema } from "@/features/questions-creator/form/survey-options-form";

type SurveyOptions = z.infer<typeof surveyOptionsSchema>;
type SurveyOptionsStore = {
  options: SurveyOptions;
  updateOptions: (updates: Partial<SurveyOptions>) => void;
};

export const useSurveyOptionsStore = create<SurveyOptionsStore>()(
  persist(
    (set) => ({
      options: {
        title: "Untitled Survey",
        description: "",
        collectEmailAddresses: false,
        requiresSignIn: false,
        showProgressBar: false,
        showLinkToSubmitAnother: false,
      },

      updateOptions: (updates) =>
        set((state) => ({
          options: { ...state.options, ...updates },
        })),
    }),
    {
      name: "survey-options-store", // unique name for the storage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
