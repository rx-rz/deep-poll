import { QuestionOptionsMap } from "@/types/questions";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { useAnswerStore } from "@/store/answer.store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DropdownAnswerProps = {
  id: string;
  questionText: string;
  options: QuestionOptionsMap["dropdown"];
  required: boolean;
  control: Control<any>;
};

export const DropdownAnswer = ({
  id,
  options,
  control,
}: DropdownAnswerProps) => {
  const { choices, allowSearch } = options;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const setAnswer = useAnswerStore((state) => state.setAnswer);

  if (allowSearch) {
    return (
      <FormField
        control={control}
        name={id}
        render={({ field }) => (
          <FormItem>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Command className="rounded-md border border-input">
                    <CommandInput
                      placeholder="Search options..."
                      className="h-10 border-0 p-2 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                      value={value}
                      onValueChange={setValue}
                    />
                  </Command>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-max-content md:w-[510px]">
                <Command>
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {choices
                        .filter((choice) =>
                          value
                            ? choice.toLowerCase().includes(value.toLowerCase())
                            : true
                        )
                        .map((choice) => (
                          <CommandItem
                            key={choice}
                            value={choice}
                            onSelect={(currentValue) => {
                              field.onChange(currentValue);
                              setValue(currentValue);
                              setOpen(false);
                              setAnswer(id, currentValue);
                            }}
                          >
                            {choice}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  } else {
    return (
      <FormField
        control={control}
        name={id}
        render={({ field }) => (
          <FormItem>
            <Select
              onValueChange={(currentValue) => {
                field.onChange(currentValue);
                setAnswer(id, currentValue);
              }}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {choices.map((choice) => (
                  <SelectItem key={choice} value={choice}>
                    {choice}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
};
