import { QuestionOptionsMap } from "@/types/questions";
import { Control, UseFormSetValue } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UploadCloudIcon } from "lucide-react";
import { QuestionLabel } from "./question-label";
import { useAnswerStore } from "@/store/answer.store";
import { useState } from "react";
import { Input } from "@/components/ui/input";

type FileAnswerProps = {
  questionId: string;
  questionText: string;
  options: QuestionOptionsMap["file"];
  required: boolean;
  control: Control<any>;
  setValue: UseFormSetValue<any>;
};

export const FileAnswer = ({
  questionId,
  questionText,
  options,
  required,
  control,
  setValue,
}: FileAnswerProps) => {
  const { allowMultiple, acceptedFormats, maxSizeMB, maxFiles } = options;
  const setAnswer = useAnswerStore((state) => state.setAnswer);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileErrors, setFileErrors] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const validFiles: File[] = [];
      const errors: string[] = [];

      fileArray.forEach((file) => {
        const fileExtension = file.name.split(".").pop()?.toLowerCase();
        const fileSizeMB = file.size / (1024 * 1024);

        if (acceptedFormats && !acceptedFormats.includes(fileExtension || "")) {
          errors.push(`Invalid file format: ${file.name}`);
        } else if (maxSizeMB && fileSizeMB > maxSizeMB) {
          errors.push(
            `File too large (${file.name}). Max size: ${maxSizeMB} MB`
          );
        } else {
          validFiles.push(file);
        }
      });

      if (allowMultiple) {
        setSelectedFiles([...selectedFiles, ...validFiles]);
      } else {
        setSelectedFiles(validFiles.slice(0, 1)); // Take only the first file
      }

      setFileErrors(errors);
      setValue(
        questionId,
        validFiles.map((file) => file.name)
      ); // Update react-hook-form
    }
  };

  return (
    <FormField
      control={control}
      name={questionId}
      render={({ field }) => (
        <FormItem>
          <QuestionLabel questionText={questionText} required={required} />
          <FormControl>
            <Input
              {...field}
              id={`file-upload-${questionId}`}
              multiple={allowMultiple}
              accept={acceptedFormats?.map((format) => `.${format}`).join(",")}
              onChange={handleFileChange}
              className="hidden"
            />
            <label htmlFor={`file-upload-${questionId}`}>
              <Button variant="outline" asChild>
                <span>
                  <UploadCloudIcon className="mr-2 h-4 w-4" />
                  Upload File(s)
                </span>
              </Button>
            </label>
            {selectedFiles.length > 0 && (
              <div className="mt-2">
                <p>Selected Files:</p>
                <ul>
                  {selectedFiles.map((file) => (
                    <li key={file.name}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
            {fileErrors.length > 0 && (
              <div className="mt-2">
                <p className="text-red-500">File Errors:</p>
                <ul>
                  {fileErrors.map((error, index) => (
                    <li key={index} className="text-red-500">
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
