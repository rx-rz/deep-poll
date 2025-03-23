import { QuestionType } from "@/store/questions.store";
import {
  Text,
  Mail,
  Hash,
  Phone,
  List,
  CheckSquare,
  Star,
  BarChart,
  Calendar,
  Clock,
  Menu,
  ChartBarBig,
  File,
  Sliders,
} from "lucide-react";
import { ReactNode } from "react";

export const QuestionIcon: { [key in QuestionType]: ReactNode } = {
  text: <Text size={10} strokeWidth={1.9} />,
  email: <Mail size={10} strokeWidth={1.9} />,
  number: <Hash size={10} strokeWidth={1.9} />,
  phone: <Phone size={10} strokeWidth={1.9} />,
  multiple_choice: <List size={10} strokeWidth={1.9} />,
  checkbox: <CheckSquare size={10} strokeWidth={1.9} />,
  dropdown: <Menu size={10} strokeWidth={1.9} />,
  rating: <Star size={10} strokeWidth={1.9} />,
  likert: <BarChart size={10} strokeWidth={1.9} />,
  linear_scale: <ChartBarBig size={10} strokeWidth={1.9} />,
  date: <Calendar size={10} strokeWidth={1.9} />,
  time: <Clock size={10} strokeWidth={1.9} />,
  datetime: <Calendar size={10} strokeWidth={1.9} />, // Reusing Calendar
  file: <File size={10} strokeWidth={1.9} />,
  slider: <Sliders size={10} strokeWidth={1.9} />,
};
