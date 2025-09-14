import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "@/features/auth/validators/auth.schema";
import { useLogin } from "../hooks/useLogin";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export const LoginForm = () => {
  const { mutate: login, isPending } = useLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    login(data);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left illustration */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-b from-teal-100 to-white dark:from-teal-900 dark:to-gray-900 items-center justify-center p-6 md:p-12">
        <div className="flex flex-col space-y-6 max-w-md h-full">
          <h1 className="text-4xl font-bold text-foreground">
            Unlock Your Team{" "}
            <span className="text-teal-600 dark:text-teal-400">
              Performance
            </span>
          </h1>
          <p className="text-muted-foreground">
            Manage your school efficiently with NoteManager École 221. Access
            all your notes, classes, and students in one place.
          </p>
          <img
            src="https://cdn.pixabay.com/photo/2023/06/21/05/43/skull-8078524_640.png"
            alt="Team illustration"
            className="w-full max-h-[56vh] mt-auto object-contain"
          />
        </div>
      </div>

      {/* Right form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-background p-6">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold text-center text-foreground">
            Welcome to NoteManager École 221
          </h2>
          <p className="text-center text-muted-foreground">
            Connectez-vous avec vos identifiants pour accéder à votre espace.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ex: admin@ecole221.sn"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Votre mot de passe"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={isPending}
                size="lg"
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Se connecter
              </Button>
            </form>
          </Form>
          <div className="text-center text-sm text-muted-foreground">
            <p>Plateforme de gestion des notes - École 221</p>
          </div>
        </div>
      </div>
    </div>
  );
};
