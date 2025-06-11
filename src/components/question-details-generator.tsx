import { Question, QuestionOptionsMap } from "@/types/questions";
import { ReactNode } from "react";

export const QuestionDetailsGenerator = ({
  question,
}: {
  question: Question;
}) => {
  switch (question.questionType) {
    case "text":
      const textOptions = question.options as QuestionOptionsMap["text"];
      return (
        <OptsWrapper>
          <p>
            {textOptions.minAnswerLength !== undefined && (
              <span>
                Minimum of{" "}
                <b className="text-primary">{textOptions.minAnswerLength}</b>{" "}
                characters,{" "}
              </span>
            )}
            {textOptions.maxAnswerLength !== undefined && (
              <span>
                Maximum of{" "}
                <b className="text-primary">{textOptions.maxAnswerLength}</b>{" "}
                characters{" "}
              </span>
            )}
          </p>
        </OptsWrapper>
      );
    case "email":
      const emailOptions = question.options as QuestionOptionsMap["email"];
      return (
        <OptsWrapper>
          <p>
            {emailOptions.minEmailLength !== undefined && (
              <span>
                Minimum of{" "}
                <b className="text-primary">{emailOptions.minEmailLength}</b>{" "}
                characters,{" "}
              </span>
            )}
            {emailOptions.maxEmailLength !== undefined && (
              <span>
                Maximum of{" "}
                <b className="text-primary">{emailOptions.maxEmailLength}</b>{" "}
                characters.{" "}
              </span>
            )}
            {emailOptions.allowedDomains && (
              <span>
                Allowed domains:{" "}
                <b className="text-primary">{emailOptions.allowedDomains}</b>.{" "}
              </span>
            )}
            {emailOptions.disallowedDomains && (
              <span>
                Disallowed domains:{" "}
                <b className="text-primary">{emailOptions.disallowedDomains}</b>
                .{" "}
              </span>
            )}
          </p>
        </OptsWrapper>
      );
    case "number":
      const numberOptions = question.options as QuestionOptionsMap["number"];
      return (
        <OptsWrapper>
          <p>
            {numberOptions.min !== undefined && (
              <span>
                Minimum value:{" "}
                <b className="text-primary">{numberOptions.min}</b>,{" "}
              </span>
            )}
            {numberOptions.max !== undefined && (
              <span>
                Maximum value:{" "}
                <b className="text-primary">{numberOptions.max}</b>.{" "}
              </span>
            )}
            {numberOptions.allowDecimal ? (
              <span>Allows decimals.</span>
            ) : (
              <span>Does not allow decimals.</span>
            )}
          </p>
        </OptsWrapper>
      );
    case "phone":
      const phoneOptions = question.options as QuestionOptionsMap["phone"];
      return (
        <OptsWrapper>
          <p>
            {phoneOptions.allowedCountries.length > 0 && (
              <span>
                Allowed countries:{" "}
                <b className="text-primary">
                  {phoneOptions.allowedCountries.join(", ")}
                </b>
                .{" "}
              </span>
            )}
            {phoneOptions.format && (
              <span>
                Format: <b className="text-primary">{phoneOptions.format}</b>.
              </span>
            )}
          </p>
        </OptsWrapper>
      );
    case "multiple_choice":
      const multipleChoiceOptions =
        question.options as QuestionOptionsMap["multiple_choice"];
      return (
        <OptsWrapper>
          <p>
            {multipleChoiceOptions.allowOther && (
              <span>
                Allows "Other" with maximum length of{" "}
                <b className="text-primary">
                  {multipleChoiceOptions.maxLengthForOtherParameter}
                </b>
                .{" "}
              </span>
            )}
          </p>
        </OptsWrapper>
      );
    case "checkbox":
      const checkboxOptions =
        question.options as QuestionOptionsMap["checkbox"];
      return (
        <OptsWrapper>
          <p>
            {checkboxOptions.minSelections !== undefined && (
              <span>
                <b className="text-primary">{checkboxOptions.minSelections}</b>{" "}
                minimum selections {" "}
              </span>
            )}
            {checkboxOptions.maxSelections !== undefined && (
              <span>
                <b className="text-primary">{checkboxOptions.maxSelections}</b>{" "}
                maximum selections
              </span>
            )}
          </p>
        </OptsWrapper>
      );

    case "date":
      const dateOptions = question.options as QuestionOptionsMap["date"];
      return (
        <OptsWrapper>
          <p>
            Formatted as  <b className="text-primary">{dateOptions.format}</b>.{" "}
            {dateOptions.minDate && (
              <span>
                Minimum date:{" "}
                <b className="text-primary">{dateOptions.minDate}</b>.{" "}
              </span>
            )}
            {dateOptions.maxDate && (
              <span>
                Maximum date:{" "}
                <b className="text-primary">{dateOptions.maxDate}</b>.
              </span>
            )}
          </p>
        </OptsWrapper>
      );
    case "time":
      const timeOptions = question.options as QuestionOptionsMap["time"];
      return (
        <OptsWrapper>
          <p>
            Format: <b className="text-primary">{timeOptions.format}</b>.{" "}
            {timeOptions.minTime && (
              <span>
                Minimum time:{" "}
                <b className="text-primary">{timeOptions.minTime}</b>.{" "}
              </span>
            )}
            {timeOptions.maxTime && (
              <span>
                Maximum time:{" "}
                <b className="text-primary">{timeOptions.maxTime}</b>.
              </span>
            )}
          </p>
        </OptsWrapper>
      );
    case "datetime":
      const datetimeOptions =
        question.options as QuestionOptionsMap["datetime"];
      return (
        <OptsWrapper>
          <p>
            Format: <b className="text-primary">{datetimeOptions.format}</b>.{" "}
            {datetimeOptions.minDatetime && (
              <span>
                Minimum datetime:{" "}
                <b className="text-primary">{datetimeOptions.minDatetime}</b>.{" "}
              </span>
            )}
            {datetimeOptions.maxDatetime && (
              <span>
                Maximum datetime:{" "}
                <b className="text-primary">{datetimeOptions.maxDatetime}</b>.
              </span>
            )}
          </p>
        </OptsWrapper>
      );
    case "file":
      const fileOptions = question.options as QuestionOptionsMap["file"];
      return (
        <OptsWrapper>
          <p>
            {fileOptions.allowMultiple ? (
              <span>Multiple files allowed. </span>
            ) : (
              <span>Single file allowed. </span>
            )}
            {fileOptions.acceptedFormats.length > 0 && (
              <span>
                Accepted formats:{" "}
                <b className="text-primary">
                  {fileOptions.acceptedFormats.join(", ")}
                </b>
                .{" "}
              </span>
            )}
            {fileOptions.maxSizeMB !== undefined && (
              <span>
                Max size:{" "}
                <b className="text-primary">{fileOptions.maxSizeMB} MB</b>.{" "}
              </span>
            )}
            {fileOptions.maxFiles !== undefined && (
              <span>
                Max files:{" "}
                <b className="text-primary">{fileOptions.maxFiles}</b>.
              </span>
            )}
          </p>
        </OptsWrapper>
      );
    case "slider":
      const sliderOptions = question.options as QuestionOptionsMap["slider"];
      return (
        <OptsWrapper>
          <p>
            Slider from <b className="text-primary">{sliderOptions.min}</b> to{" "}
            <b className="text-primary">{sliderOptions.max}</b> with a step of{" "}
            <b className="text-primary">{sliderOptions.step}</b>.{" "}
            {sliderOptions.labels && (
              <span>
                (Start: "
                <b className="text-primary">{sliderOptions.labels.start}</b>",
                End: "<b className="text-primary">{sliderOptions.labels.end}</b>
                ").{" "}
              </span>
            )}
            {sliderOptions.range && <span>Allows range selection. </span>}
            {sliderOptions.defaultValue !== undefined && (
              <span>
                Default value:{" "}
                <b className="text-primary">
                  {Array.isArray(sliderOptions.defaultValue)
                    ? sliderOptions.defaultValue.join(" - ")
                    : sliderOptions.defaultValue}
                </b>
                .
              </span>
            )}
          </p>
        </OptsWrapper>
      );
    default:
      return null;
  }
};

const OptsWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="text-xs block opacity-60">{children}</div>;
};
