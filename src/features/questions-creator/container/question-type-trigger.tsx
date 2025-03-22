import {
  Type,
  Mail,
  Hash,
  Phone,
  CircleDot,
  CheckSquare,
  ChevronDown,
  BarChart,
  Star,
  ThumbsUp,
  Calendar,
  Clock,
  CalendarClock,
  File,
  Image,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useQuestionStore } from "@/store/questions.store";

export const QuestionTypeTrigger = () => {
  const [open, setOpen] = useState(false);
  const { addQuestion } = useQuestionStore();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full h-12 border mt-3 hover:cursor-pointer">
        Click here to create a question
      </DialogTrigger>
      <DialogContent className="max-h-[600px] py-5 overflow-y-scroll">
        <DialogHeader>Text Inputs</DialogHeader>
        <Button
          variant={"outline"}
          className="hover:cursor-pointer"
          onClick={() => {
            setOpen(false);
            addQuestion({
              questionType: "text",
              questionText:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
              required: true,
              surveyId: "",
              options: {
                placeholder: "Enter your text",
                minLength: 1,
                maxLength: 255,
              },
            });
          }}
        >
          <Type className="mr-2 h-4 w-4" />
          Short answer
        </Button>
        <Button
          variant={"outline"}
          onClick={() => {
            setOpen(false);
            addQuestion({
              questionType: "email",
              questionText:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
              required: true,
              surveyId: "",
              options: {
                placeholder: "Enter your text",
                allowDuplicates: false,
                allowedDomains: [],
                disallowedDomains: [],
                maxLength: 255,
                minLength: 1,
              },
            });
          }}
        >
          <Mail className="mr-2 h-4 w-4" />
          Email address
        </Button>
        <Button
          variant={"outline"}
          onClick={() => {
            setOpen(false);
            addQuestion({
              questionType: "number",
              questionText:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
              required: true,
              surveyId: "",
              options: {
                placeholder: "Enter a number",
                allowDecimal: false,
                max: Infinity,
                min: -Infinity,
              },
            });
          }}
        >
          <Hash className="mr-2 h-4 w-4" />
          Number
        </Button>
        <Button variant={"outline"}>
          <Phone className="mr-2 h-4 w-4" />
          Phone Number
        </Button>

        <DialogHeader>Selection Inputs</DialogHeader>
        <Button
          variant={"outline"}
          onClick={() => {
            setOpen(false);
            addQuestion({
              questionType: "multiple_choice",
              questionText:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
              required: true,
              surveyId: "",
              options: {
                allowOther: false,
                choices: [],
                randomizeOrder: false,
              },
            });
          }}
        >
          <CircleDot className="mr-2 h-4 w-4" />
          Multiple choice (select one)
        </Button>
        <Button
          variant={"outline"}
          onClick={() => {
            setOpen(false);
            addQuestion({
              questionType: "checkbox",
              questionText:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
              required: true,
              surveyId: "",
              options: {
                choices: [],
                maxSelections: 1,
                minSelections: 1,
                randomizeOrder: false,
              },
            });
          }}
        >
          <CheckSquare className="mr-2 h-4 w-4" />
          Checkboxes (select multiple)
        </Button>
        <Button
          variant={"outline"}
          onClick={() => {
            setOpen(false);
            addQuestion({
              questionType: "dropdown",
              questionText:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
              required: true,
              surveyId: "",
              options: {
                allowSearch: true,
                choices: [],
              },
            });
          }}
        >
          <ChevronDown className="mr-2 h-4 w-4" />
          Dropdown menu
        </Button>

        <DialogHeader>Scale inputs</DialogHeader>
        <Button
          variant={"outline"}
          onClick={() => {
            setOpen(false);
            addQuestion({
              questionType: "linear_scale",
              questionText:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
              required: true,
              surveyId: "",
              options: {
                labels: { start: "Poor", end: "Excellent" },
                max: 5,
                min: 2,
              },
            });
          }}
        >
          <BarChart className="mr-2 h-4 w-4" />
          Linear scale (rate from 1-5, 1-10, etc.)
        </Button>
        <Button
          variant={"outline"}
          onClick={() => {
            setOpen(false);
            addQuestion({
              questionType: "rating",
              questionText:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
              required: true,
              surveyId: "",
              options: {
                labels: [],
                max: 5,
                min: 2,
              },
            });
          }}
        >
          <Star className="mr-2 h-4 w-4" />
          Rating (stars, thumbs up/down)
        </Button>
        <Button
          variant={"outline"}
          onClick={() => {
            setOpen(false);
            addQuestion({
              questionType: "likert",
              questionText:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
              required: true,
              surveyId: "",
              options: {
                labels: [
                  "Strongly disagree",
                  "disagree",
                  "Somewhat disagree",
                  "Neither agree nor disagree",
                  "Somewhat agree",
                  "Agree",
                  "Strongly agree",
                ],
                scale: 7,
                statement: "",
              },
            });
          }}
        >
          <ThumbsUp className="mr-2 h-4 w-4" />
          Likert scale (agree/disagree scales)
        </Button>

        <DialogHeader>Date and time picker</DialogHeader>
        <Button
          variant={"outline"}
          onClick={() => {
            setOpen(false);
            addQuestion({
              questionType: "date",
              questionText:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
              required: true,
              surveyId: "",
              options: {
                allowPastDates: true,
                format: "YYYY-mm-dd",
                maxDate: "",
                minDate: "",
              },
            });
          }}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Date picker
        </Button>
        <Button
          variant={"outline"}
          onClick={() => {
            setOpen(false);
            addQuestion({
              questionType: "time",
              questionText:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
              required: true,
              surveyId: "",
              options: {
                format: "",
                maxTime: "",
                minTime: "",
              },
            });
          }}
        >
          <Clock className="mr-2 h-4 w-4" />
          Time picker
        </Button>
        <Button
          variant={"outline"}
          onClick={() => {
            setOpen(false);
            addQuestion({
              questionType: "datetime",
              questionText:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
              required: true,
              surveyId: "",
              options: {
                format: "",
                maxDatetime: "",
                minDatetime: "",
              },
            });
          }}
        >
          <CalendarClock className="mr-2 h-4 w-4" />
          Date and time picker
        </Button>

        <DialogHeader>File uploads</DialogHeader>
        <Button variant={"outline"}>
          <File className="mr-2 h-4 w-4" />
          Document uploads
        </Button>
        <Button variant={"outline"}>
          <Image className="mr-2 h-4 w-4" />
          Image uploads
        </Button>
      </DialogContent>
    </Dialog>
  );
};
