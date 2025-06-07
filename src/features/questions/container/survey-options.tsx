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
import { ClipboardList, Eye, Settings, Trash2Icon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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

export const SurveyOptions = () => {
  const { surveyId } = useParams();
  const survey = useSurveyListStore((state) =>
    state.fetchSurveyById(surveyId!)
  );

  {
    /* <Link
          href={protectedRoutes.CREATE_SURVEY(surveyId ?? "")}
          className="inline-block"
          title="Edit Survey Questions"
        >
          <Edit3 strokeWidth={1.3} />
        </Link> */
  }
  {
    /* <Link
          href={protectedRoutes.ANSWER_SURVEY(surveyId ?? "")}
          className="inline-block"
        >
          <Pen strokeWidth={1.3} />
        </Link> */
  }
  return (
    <div className=" py-3 px-2 sticky top-0 z-50 justify-between flex w-full  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-3">
        <p className="font-medium text-lg">
          {survey?.title ?? "Untitled Survey"}
        </p>
      </div>
      <div className="flex gap-x-6 items-center">
        <Link
          href={protectedRoutes.PREVIEW_SURVEY(surveyId ?? "")}
          className="inline-block"
          title="Preview"
        >
          <Tooltip>
            <TooltipTrigger>
              <Eye strokeWidth={1.3} />
            </TooltipTrigger>
            <TooltipContent>Preview Survey</TooltipContent>
          </Tooltip>
        </Link>
        <Link
          href={protectedRoutes.VIEW_SURVEY_RESPONSES(surveyId ?? "")}
          className="inline-block"
          title="Responses"
        >
          <Tooltip>
            <TooltipTrigger>
              <ClipboardList strokeWidth={1.3} />
            </TooltipTrigger>
            <TooltipContent>Survey Responses</TooltipContent>
          </Tooltip>
        </Link>
        <Dialog>
          <DialogTrigger
            title="Survey Settings"
            className="hover:cursor-pointer focus:cursor-pointer"
          >
            <Settings strokeWidth={1.3} />
          </DialogTrigger>
          <DialogContent>
            <SurveyOptionsForm />
          </DialogContent>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger
            title="Delete Survey"
            className="focus:cursor-pointer hover:cursor-pointer mb-1"
          >
            <Trash2Icon strokeWidth={1.3} stroke="red" />
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
          className="bg-gradient-to-br from-red-500 to-red-700 hover:bg-red-500 text-white"
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
