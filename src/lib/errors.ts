import { toast } from "sonner";

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string,
    public details: any
  ) {
    super(message);
    this.name = "APIError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export const handleAPIErrors = (error: unknown) => {
    console.error(error)
  if (error instanceof APIError) {
    toast.error(error.message);
  } else {
    toast.error("An error occured.");
  }
};
