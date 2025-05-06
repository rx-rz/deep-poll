import { api, APIError } from "@/lib/axios";
import { RegisterUserDto, registerUserSchema } from "../schemas";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { routes } from "@/routes";

type Response = {
  success: boolean;
  message: string;
};
export const useRegister = () => {
  const [_, navigate] = useLocation();
  const register = async (dto: RegisterUserDto): Promise<Response> => {
    const response = await api.post("/auth/register", dto);
    return response.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success("Account successfully created. Please login.");
      navigate(routes.LOGIN);
    },
    onError: (error) => {
      if (error instanceof APIError) {
        toast.error(error.message);
      }
    },
  });

  const form = useForm<RegisterUserDto>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const handleSubmit = (values: RegisterUserDto) => {
    mutate(values);
  };

  return {
    form,
    handleSubmit,
    loading: isPending,
  };
};
