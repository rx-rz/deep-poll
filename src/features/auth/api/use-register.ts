import { api } from "@/lib/axios";
import { RegisterUserDto, registerUserSchema } from "../schemas";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Response = {
  success: boolean;
  message: string;
};
export const useRegister = () => {
  const register = async (dto: RegisterUserDto): Promise<Response> => {
    const response = await api.post("/auth/register", dto);
    return response.data;
  };

  const { data, error, mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      location.reload();
    },
    onError: (error) => {
      console.log(error);
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
    error,
    loading: isPending,
  };
};
