import { Survey } from '@/types/survey';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type SurveyListStore = {
    surveys: Survey[];
    addSurvey: (survey: Survey) => void;
    updateSurvey: (id: string, updates: Partial<Survey>) => void;
    deleteSurvey: (id: string) => void;
    fetchSurveyById: (id: string) => Survey | undefined;
    setSurveys: (surveys: Survey[]) => void;
};

export const useSurveyListStore = create<SurveyListStore>()(
    persist(
        (set, get) => ({
            surveys: [],
            addSurvey: (survey) =>
                set((state) => ({ surveys: [...state.surveys, survey] })),
            updateSurvey: (id, updates) =>
                set((state) => ({
                    surveys: state.surveys.map((survey) =>
                        survey.id === id ? { ...survey, ...updates } : survey
                    ),
                })),
            deleteSurvey: (id) =>
                set((state) => ({
                    surveys: state.surveys.filter((survey) => survey.id !== id),
                })),
            fetchSurveyById: (id) => {
                const surveys = get().surveys;
                return surveys.find((survey) => survey.id === id);
            },
            setSurveys: (surveys) => set({ surveys }),
        }),
        {
            name: 'survey-list-store',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
