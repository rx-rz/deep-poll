import {
  Type,
  AlignLeft,
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

export const QuestionTypeTrigger = () => {
  return (
    <Dialog>
      <DialogTrigger className="w-full h-12 border mt-3 hover:cursor-pointer">
        Click here to create a question
      </DialogTrigger>
      <DialogContent className="max-h-[600px] py-5 overflow-y-scroll">
        <DialogHeader>Text Inputs</DialogHeader>
        <Button variant={"outline"}>
          <Type className="mr-2 h-4 w-4" />
          Short answer (single line text)
        </Button>
        <Button variant={"outline"}>
          <AlignLeft className="mr-2 h-4 w-4" />
          Paragraph (multi-line text)
        </Button>
        <Button variant={"outline"}>
          <Mail className="mr-2 h-4 w-4" />
          Email address
        </Button>
        <Button variant={"outline"}>
          <Hash className="mr-2 h-4 w-4" />
          Number
        </Button>
        <Button variant={"outline"}>
          <Phone className="mr-2 h-4 w-4" />
          Phone Number
        </Button>

        <DialogHeader>Selection Inputs</DialogHeader>
        <Button variant={"outline"}>
          <CircleDot className="mr-2 h-4 w-4" />
          Multiple choice (select one)
        </Button>
        <Button variant={"outline"}>
          <CheckSquare className="mr-2 h-4 w-4" />
          Checkboxes (select multiple)
        </Button>
        <Button variant={"outline"}>
          <ChevronDown className="mr-2 h-4 w-4" />
          Dropdown menu
        </Button>

        <DialogHeader>Scale inputs</DialogHeader>
        <Button variant={"outline"}>
          <BarChart className="mr-2 h-4 w-4" />
          Linear scale (rate from 1-5, 1-10, etc.)
        </Button>
        <Button variant={"outline"}>
          <Star className="mr-2 h-4 w-4" />
          Rating (stars, thumbs up/down)
        </Button>
        <Button variant={"outline"}>
          <ThumbsUp className="mr-2 h-4 w-4" />
          Likert scale (agree/disagree scales)
        </Button>

        <DialogHeader>Date and time picker</DialogHeader>
        <Button variant={"outline"}>
          <Calendar className="mr-2 h-4 w-4" />
          Date picker
        </Button>
        <Button variant={"outline"}>
          <Clock className="mr-2 h-4 w-4" />
          Time picker
        </Button>
        <Button variant={"outline"}>
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
