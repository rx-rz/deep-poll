import { api, APIError } from "@/lib/axios";
import { LoginUserDto, loginUserSchema } from "../schemas";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { protectedRoutes } from "@/routes";
import { toast } from "sonner";

type Response = {
  success: boolean;
  data: {
    account_id: string;
    email: string;
    is_verified: boolean;
    name: string;
  };
};
export const useLogin = () => {
  const [_, navigate] = useLocation();

  const login = async (dto: LoginUserDto): Promise<Response> => {
    const response = await api.post("/auth/login", dto);
    return response.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: ({ data }) => {
      localStorage.setItem("deep-poll-user", JSON.stringify({ ...data }));
      toast.success("User logged in successfully");
      navigate(protectedRoutes.HOME);
    },
    onError: (error) => {
      if (error instanceof APIError) {
        toast.error(error.message);
      }
    },
  });

  const form = useForm<LoginUserDto>({
    resolver: zodResolver(loginUserSchema),
  });

  const handleSubmit = (values: LoginUserDto) => {
    mutate(values);
  };

  return {
    form,
    handleSubmit,
    loading: isPending,
  };
};
