import { api } from "@/lib/axios";
import { LoginUserDto, loginUserSchema } from "../schemas";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const login = async (dto: LoginUserDto): Promise<Response> => {
    const response = await api.post("/auth/login", dto);
    return response.data;
  };

  const {mutate, isPending} = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
        console.log(data);
    },
    onError: (error) => {
        console.log(error);
    }
  })

  const form = useForm<LoginUserDto>({
    resolver: zodResolver(loginUserSchema),
    
  })

  const handleSubmit = (values: LoginUserDto) => {
    mutate(values)
  }

  return {
    form,
    handleSubmit,
    loading: isPending
  }
};
