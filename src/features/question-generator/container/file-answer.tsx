import { QuestionOptionsMap } from "@/types/questions";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UploadCloudIcon } from "lucide-react";
import { useState } from "react";

type FileAnswerProps = {
  id: string;
  questionText: string;
  options: QuestionOptionsMap["file"];
  required: boolean;
  control: Control<any>;
};

export const FileAnswer = ({
  id,
  options,
  control,
}: FileAnswerProps) => {
  const { allowMultiple, acceptedFormats, maxSizeMB, maxFiles } = options;

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileErrors, setFileErrors] = useState<string[]>([]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: File[]) => void
  ) => {
    const files = event.target.files;

    if (files) {
      const fileArray = Array.from(files);
      const validFiles: File[] = [];
      const errors: string[] = [];
      if (files.length > maxFiles) {
        errors.push(`You can only upload a maximum of ${maxFiles} files.`);
      }
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
      
      onChange(validFiles); // Update react-hook-form using field.onChange
      //   setAnswer(id, validFiles); // Update answer store
    }
  };

  return (
    <FormField
      control={control}
      name={id}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div>
              <input
                type="file"
                id={`file-upload-${id}`}
                multiple={allowMultiple}
                accept={acceptedFormats
                  ?.map((format) => `.${format}`)
                  .join(",")}
                onChange={(e) => handleFileChange(e, field.onChange)}
                className="hidden"
              />
              <label htmlFor={`file-upload-${id}`}>
                <Button variant="outline" asChild>
                  <span>
                    <UploadCloudIcon className="mr-2 h-4 w-4" />
                    {selectedFiles.length > 0
                      ? `Selected ${selectedFiles.length} file(s)`
                      : "Upload File(s)"}
                  </span>
                </Button>
              </label>
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
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
