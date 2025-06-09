import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Check,
  ClipboardList,
  Copy,
  Eye,
  Globe,
  ScanEyeIcon,
  Settings,
  Trash2Icon,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useUpdateSurvey } from "@/features/home/api/use-update-survey";
import { Link, useParams } from "wouter";
import { useSurveyListStore } from "@/store/surveys.store";
import { useDeleteSurvey } from "@/features/home/api/use-delete-survey";
import { protectedRoutes } from "@/routes";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LoadingStateText } from "@/components/loading-state-text";
import { toast } from "sonner";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

export const SurveyOptions = () => {
  const { surveyId } = useParams();
  const survey = useSurveyListStore((state) =>
    state.fetchSurveyById(surveyId!)
  );

  return (
    <div className="bg-black py-3   px-2 sticky top-0 z-50 justify-between flex mx-auto   backdrop-blur supports-[backdrop-filter]:bg-input w-10/12">
      <div className="flex items-center gap-3">
        <p className="font-medium text-lg">
          {survey?.title ?? "Untitled Survey"}
        </p>
      </div>
      <div className="flex gap-x-5">
        <Dialog>
          <DialogTrigger
            title="Publish Survey"
            className="focus:cursor-pointer hover:cursor-pointer"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Globe strokeWidth={1.3} size={22} />
              </TooltipTrigger>
              <TooltipContent>Publish Survey</TooltipContent>
            </Tooltip>
          </DialogTrigger>
          <DialogContent>
            <PublishSurveyForm isPublished={survey?.isPublished ?? false} />
          </DialogContent>
        </Dialog>
        <Link
          href={protectedRoutes.PREVIEW_SURVEY(surveyId ?? "")}
          className="flex"
          title="Preview"
        >
          <Tooltip>
            <TooltipTrigger>
              <ScanEyeIcon strokeWidth={1.5} size={22} />
            </TooltipTrigger>
            <TooltipContent>Preview Survey</TooltipContent>
          </Tooltip>
        </Link>
        <Link
          href={protectedRoutes.VIEW_SURVEY_RESPONSES(surveyId ?? "")}
          className="flex"
          title="Responses"
        >
          <Tooltip>
            <TooltipTrigger>
              <ClipboardList strokeWidth={1.3} size={22} />
            </TooltipTrigger>
            <TooltipContent>Survey Responses</TooltipContent>
          </Tooltip>
        </Link>
        <Dialog>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger
                title="Survey Settings"
                className="hover:cursor-pointer focus:cursor-pointer"
              >
                <Settings strokeWidth={1.3} size={22} />
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>Survey Settings</TooltipContent>
          </Tooltip>
          <DialogContent>
            <SurveyOptionsForm />
          </DialogContent>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger
            title="Delete Survey"
            className="focus:cursor-pointer hover:cursor-pointer"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Trash2Icon strokeWidth={1.3} stroke="red" size={22} />
              </TooltipTrigger>
              <TooltipContent className="bg-red-500">
                Delete Survey
              </TooltipContent>
            </Tooltip>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <SurveyDeletionPrompt />
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

const SurveyDeletionPrompt = () => {
  const { deleteSurvey } = useDeleteSurvey();
  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Are you sure you want to delete this survey?
        </AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          survey.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          className="bg-red-600"
          onClick={() => {
            deleteSurvey();
          }}
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
};

const PublishSurveyForm = ({ isPublished }: { isPublished: boolean }) => {
  const { form, handleSubmit } = useUpdateSurvey();
  const { surveyId } = useParams();
  const [isCopied, setIsCopied] = useState(false);
  console.log(isPublished);
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-6 mt-12 border" 
        >
          <FormField
            control={form.control}
            name="isPublished"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Title</FormLabel>
                <FormControl>
                  {/* <Switch

                    {...field}
                  /> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      {!isPublished ? (
        <>
          <div className="bg-muted p-4 border four-border mt-6 relative">
            <p className="overflow-clip max-w-xs">
              http://localhost:3000
              {protectedRoutes.ANSWER_SURVEY(surveyId ?? "")}
            </p>
            <div className="top-3 absolute flex right-2 gap-3">
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `            http://localhost:3000${protectedRoutes.ANSWER_SURVEY(
                      surveyId ?? ""
                    )}`
                  );
                  setIsCopied(true);
                  toast.success("Copied!");
                  setTimeout(() => {
                    setIsCopied(false);
                  }, 2000);
                }}
              >
                {isCopied ? <Check /> : <Copy />}
              </Button>
              <Link
                to={protectedRoutes.ANSWER_SURVEY(surveyId ?? "")}
                className="text-white bg-primary w-9 text-center items-center justify-center flex h-9"
              >
                <Eye strokeWidth={1.3} />
              </Link>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

const SurveyOptionsForm = () => {
  const { form, handleSubmit, loading } = useUpdateSurvey();

  return (
    <div>
      <DialogHeader className="mb-12">
        <DialogTitle className="font-medium text-lg absolute top-3">
          Survey Settings
        </DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter survey title"
                    className="border-muted"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter survey description"
                    className=" bg-transparent"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="border two-border p-4 mt-4 rounded-md">
            <p className="text-xs opacity-60 font-medium">Options</p>
            <div className="flex flex-col gap-6 py-4">
              <FormField
                control={form.control}
                name="requiresSignIn"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between ">
                    <div className="space-y-0.5">
                      <FormLabel>Requires Sign In</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="showProgressBar"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between ">
                    <div className="space-y-0.5">
                      <FormLabel>Show Progress Bar</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="showLinkToSubmitAnother"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between ">
                    <div className="space-y-0.5">
                      <FormLabel>Show Link to Submit Another</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button
              className="border two-border w-full"
              disabled={!form.formState.isDirty || loading}
            >
              {" "}
              {loading ? <LoadingStateText text="Saving" /> : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
};
