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
import { Edit, Eye, Trash2Icon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useUpdateSurvey } from "@/features/home/api/use-update-survey";
import { Link, useParams } from "wouter";
import { useSurveyListStore } from "@/store/surveys.store";
import { useDeleteSurvey } from "@/features/home/api/use-delete-survey";
import { protectedRoutes } from "@/routes";

export const SurveyOptions = () => {
  const { surveyId } = useParams();
  const survey = useSurveyListStore((state) =>
    state.fetchSurveyById(surveyId!)
  );
  return (
    <div className="border py-3 px-2 sticky top-0 z-50 justify-between flex w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <p>{survey?.title ?? "Untitled"}</p>
      <div className="space-x-3">
        <Link
          href={protectedRoutes.PREVIEW(surveyId ?? "")}
          className="inline-block"
        >
          <Eye strokeWidth={0.9} />
        </Link>
        <Dialog>
          <DialogTrigger>
            <Edit strokeWidth={0.9} />
          </DialogTrigger>
          <DialogContent>
            <SurveyOptionsForm />
          </DialogContent>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger>
            <Trash2Icon strokeWidth={0.9} stroke="red" />
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
  const { form, handleSubmit } = useUpdateSurvey();

  return (
    <>
      <DialogHeader className="mb-4">
        <DialogTitle className="font-medium text-lg">
          Survey Options
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
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter survey title" {...field} />
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter survey description"
                    className="rounded-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-8 py-4 border px-3 -lg">
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
          <DialogFooter className="mt-4">
            <Button>Save</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};
