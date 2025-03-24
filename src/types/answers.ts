import { QuestionType } from "@/types/questions";

export type Answer<T extends QuestionType> = T extends
  | "text"
  | "email"
  | "phone"
  | "date"
  | "time"
  | "datetime"
  ? string
  : T extends "number" | "rating" | "slider" | "linear_scale"
  ? number
  : T extends "multiple_choice" | "checkbox" | "dropdown"
  ? string[]
  : T extends "file"
  ? { fileName: string; fileUrl: string; fileSizeMB: number }[]
  : T extends "likert"
  ? number
  : any;


