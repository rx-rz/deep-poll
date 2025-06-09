import {
  Type,
  Mail,
  Hash,
  CircleDot,
  CheckSquare,
  ChevronDown,
  BarChart,
  ThumbsUp,
  Calendar,
  Clock,
  CalendarClock,
  File,
  Sliders,
  
  Plus,
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
import { defaultQuestionOptions } from "@/lib/default-question-options";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useParams } from "wouter";

export const QuestionTypeTrigger = () => {
  const { surveyId } = useParams();
  const [open, setOpen] = useState(false);
  const { addQuestion } = useQuestionStore();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="h-fit bg-primary text-white four-border  border-secondary  transition-colors duration-150 border-dashed p-4 mt-6 shadow-sm  hover:cursor-pointer ">
          <Plus className="mx-auto text-white" strokeWidth={1.3} />
      </DialogTrigger>
      <DialogContent className="max-h-[800px]  py-5 overflow-y-scroll   border-black rounded-none">
        <p className="font-medium">Input Choices</p>
        <div className="mt-12">
          <DialogHeader className="text-sm font-bold opacity-90 mb-4">
            Text Inputs
          </DialogHeader>
          <div className="grid grid-cols-3 gap-2">
            <Button
              className="hover:cursor-pointer text-center flex flex-col h-full bg-secondary  border"
              variant={"default"}
              onClick={() => {
                setOpen(false);
                addQuestion({
                  questionType: "text",
                  questionText:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                  required: true,
                  surveyId: surveyId ?? "",
                  options: {
                    ...defaultQuestionOptions.text,
                  },
                });
              }}
            >
              <Type size={30} />
              <p className="text-xs">Text</p>
            </Button>
            <Button
              className="hover:cursor-pointer  text-center flex flex-col h-full bg-secondary  border"
              variant={"default"}
              onClick={() => {
                setOpen(false);
                addQuestion({
                  questionType: "email",
                  questionText:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                  required: true,
                  surveyId: "",
                  options: {
                    ...defaultQuestionOptions.email,
                  },
                });
              }}
            >
              <Mail size={30} />
              <p className="text-xs">Email</p>
            </Button>
            <Button
              className="hover:cursor-pointer  text-center flex flex-col h-full bg-secondary  border"
              variant={"default"}
              onClick={() => {
                setOpen(false);
                addQuestion({
                  questionType: "number",
                  questionText:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                  required: true,
                  surveyId: "",
                  options: {
                    ...defaultQuestionOptions.number,
                  },
                });
              }}
            >
              <Hash size={30} />
              <p className="text-xs">Number</p>
            </Button>
          </div>
        </div>
        <div>
          <DialogHeader className="text-sm font-bold opacity-90 mb-4">
            Selection Inputs
          </DialogHeader>
          <div className="grid grid-cols-3 gap-2">
            <Button
              className="hover:cursor-pointer  text-center text-xs flex flex-col h-full bg-secondary  border"
              variant={"default"}
              onClick={() => {
                setOpen(false);
                addQuestion({
                  questionType: "multiple_choice",
                  questionText:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                  required: true,
                  surveyId: "",
                  options: {
                    ...defaultQuestionOptions.multiple_choice,
                  },
                });
              }}
            >
              <CircleDot className="mr-2 h-4 w-4" />
              Multiple choice
            </Button>
            <Button
              className="hover:cursor-pointer text-xs  text-center flex flex-col h-full bg-secondary  border"
              variant={"default"}
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
              Checkboxes
            </Button>
            <Button
              className="hover:cursor-pointer  text-center flex text-xs flex-col h-full bg-secondary  border"
              variant={"default"}
              onClick={() => {
                setOpen(false);
                addQuestion({
                  questionType: "dropdown",
                  questionText:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                  required: true,
                  surveyId: "",
                  options: {
                    ...defaultQuestionOptions.dropdown,
                  },
                });
              }}
            >
              <ChevronDown className="mr-2 h-4 w-4" />
              Dropdown menu
            </Button>
          </div>
        </div>
        <div>
          <DialogHeader className="font-bold text-sm mb-4">
            Scale inputs
          </DialogHeader>
          <div className="grid grid-cols-3 gap-2">
            <Button
              className="hover:cursor-pointer  text-center flex text-xs flex-col h-full bg-secondary  border"
              variant={"default"}
              onClick={() => {
                setOpen(false);
                addQuestion({
                  questionType: "linear_scale",
                  questionText:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                  required: true,
                  surveyId: "",
                  options: {
                    ...defaultQuestionOptions.linear_scale,
                  },
                });
              }}
            >
              <BarChart />
              <p> Linear scale</p>
            </Button>
            <Button
              className="hover:cursor-pointer  text-center flex text-xs flex-col h-full bg-secondary  border"
              variant={"default"}
              onClick={() => {
                setOpen(false);
                addQuestion({
                  questionType: "slider",
                  questionText:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                  required: true,
                  surveyId: "",
                  options: {
                    ...defaultQuestionOptions.slider,
                  },
                });
              }}
            >
              <Sliders className="mr-2 h-4 w-4" />
              Slider
            </Button>
            <Button
              className="hover:cursor-pointer  text-center flex text-xs flex-col h-full bg-secondary  border"
              variant={"default"}
              onClick={() => {
                setOpen(false);
                addQuestion({
                  questionType: "likert",
                  questionText:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                  required: true,
                  surveyId: "",
                  options: {
                    ...defaultQuestionOptions.likert,
                  },
                });
              }}
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              Likert scale
            </Button>
          </div>
        </div>
        <div>
          <DialogHeader className="font-bold text-sm mb-4">
            Date and time
          </DialogHeader>
          <div className="grid grid-cols-3 gap-2">
            <Button
              className="hover:cursor-pointer  text-center flex text-xs flex-col h-full bg-secondary  border"
              variant={"default"}
              onClick={() => {
                setOpen(false);
                addQuestion({
                  questionType: "date",
                  questionText:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                  required: true,
                  surveyId: "",
                  options: {
                    ...defaultQuestionOptions.date,
                  },
                });
              }}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Date picker
            </Button>
            <Button
              className="hover:cursor-pointer  text-center flex text-xs flex-col h-full bg-secondary  border"
              variant={"default"}
              onClick={() => {
                setOpen(false);
                addQuestion({
                  questionType: "time",
                  questionText:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                  required: true,
                  surveyId: "",
                  options: {
                    ...defaultQuestionOptions.time,
                  },
                });
              }}
            >
              <Clock className="mr-2 h-4 w-4" />
              Time picker
            </Button>
            <Button
              className="hover:cursor-pointer  text-center flex text-xs flex-col h-full bg-secondary  border"
              variant={"default"}
              onClick={() => {
                setOpen(false);
                addQuestion({
                  questionType: "datetime",
                  questionText:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                  required: true,
                  surveyId: "",
                  options: {
                    ...defaultQuestionOptions.datetime,
                  },
                });
              }}
            >
              <CalendarClock className="mr-2 h-4 w-4" />
              Date and time picker
            </Button>
          </div>
        </div>
        <div>
          <DialogHeader className="text-sm font-bold mb-4">
            File uploads
          </DialogHeader>
          <Button
            className="hover:cursor-pointer w-full  text-center flex text-xs flex-col py-8 bg-secondary  border"
            variant={"default"}
            onClick={() => {
              setOpen(false);
              addQuestion({
                questionType: "file",
                questionText:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                required: true,
                surveyId: "",
                options: {
                  acceptedFormats: ["pdf", "docx", "jpg", "png"],
                  allowMultiple: false,
                  maxSizeMB: 1,
                  maxFiles: 1,
                },
              });
            }}
          >
            <File className="mr-2 h-4 w-4" />
            File
          </Button>
        </div>
        <Accordion
          type="single"
          collapsible
          className="bg-muted border two-border rounded-md px-2 py-1 mx-1"
        >
          <AccordionItem value="question-type-info">
            <AccordionTrigger className="text-xs">
              Info on input types
            </AccordionTrigger>
            <AccordionContent className="text-sm flex flex-col gap-2 mt-3">
              <p>
                <span className="font-medium">Text:</span> Enter a short
                response. You can use letters, numbers, and symbols. Avoid
                emojis unless specified.
              </p>

              <p>
                <span className="font-medium">Email:</span> Enter a valid email
                address (e.g. you@example.com). Some domains may be restricted.
              </p>

              <p>
                <span className="font-medium">Number:</span> Enter a valid
                number within the allowed range. Decimals may or may not be
                allowed depending on the question.
              </p>

              <p>
                <span className="font-medium">Multiple Choice:</span> Select one
                option from the list. Some questions may allow an "Other" option
                to type your own.
              </p>

              <p>
                <span className="font-medium">Checkbox:</span> Select all
                options that apply. Minimum or maximum selections may be
                required.
              </p>

              <p>
                <span className="font-medium">Dropdown:</span> Choose one option
                from a searchable dropdown list.
              </p>

              <p>
                <span className="font-medium">Linear Scale:</span> Select a
                value along a continuous scale (e.g. from 1 to 10), often
                labeled on each end.
              </p>

              <p>
                <span className="font-medium">Likert:</span> Respond using a
                scale (e.g. Strongly Disagree to Strongly Agree) across multiple
                related statements.
              </p>

              <p>
                <span className="font-medium">Slider:</span> Drag the handle to
                choose a value or range within a defined minimum and maximum.
              </p>

              <p>
                <span className="font-medium">Date:</span> Pick a date using the
                calendar input. Format and limits may apply.
              </p>

              <p>
                <span className="font-medium">Time:</span> Select a time of day.
                This may be in 12-hour or 24-hour format, with or without
                seconds.
              </p>

              <p>
                <span className="font-medium">Datetime:</span> Choose both date
                and time in a single input. Format may vary.
              </p>

              <p>
                <span className="font-medium">File:</span> Upload one or more
                files. File types, size, and quantity may be limited.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DialogContent>
    </Dialog>
  );
};
