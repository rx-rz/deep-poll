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
  Activity,
  Calendar,
  Clock,
  FileText,
  Image,
  Menu,
} from "lucide-react";
import { ReactNode } from "react";

export const QuestionIcon: { [key in QuestionType]: ReactNode } = {
  text: <Text size={18} strokeWidth={1.9} />,
  email: <Mail size={18} strokeWidth={1.9} />,
  number: <Hash size={18} strokeWidth={1.9} />,
  phone: <Phone size={18} strokeWidth={1.9} />,
  multiple_choice: <List size={18} strokeWidth={1.9} />,
  checkbox: <CheckSquare size={18} strokeWidth={1.9} />,
  dropdown: <Menu size={18} strokeWidth={1.9} />,
  rating: <Star size={18} strokeWidth={1.9} />,
  likert: <BarChart size={18} strokeWidth={1.9} />,
  linear_scale: <Activity size={18} strokeWidth={1.9} />,
  date: <Calendar size={18} strokeWidth={1.9} />,
  time: <Clock size={18} strokeWidth={1.9} />,
  datetime: <Calendar size={18} strokeWidth={1.9} />, // Reusing Calendar
  file_document: <FileText size={18} strokeWidth={1.9} />,
  file_image: <Image size={18} strokeWidth={1.9} />,
};
