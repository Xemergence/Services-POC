import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import LoginForm from "./LoginForm";
import { Button } from "../ui/button";
import { CheckCircle } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Eye, EyeOff, Mail, User } from "lucide-react";

interface AuthFormProps {
  defaultTab?: "login" | "signup";
  onLogin?: (data: { email: string; password: string }) => void;
  onSignup?: (data: { name: string; email: string; password: string }) => void;
  isLoading?: boolean;
  isVerificationSent?: boolean;
}

// Define the signup form schema
const signupSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onSubmit?: (values: {
    name: string;
    email: string;
    password: string;
  }) => void;
  isLoading?: boolean;
}

// Inline SignupForm component
const SignupForm = ({
  onSubmit = () => {},
  isLoading = false,
}: SignupFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleFormSubmit = (data: SignupFormValues) => {
    onSubmit({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="name"
            placeholder="John Doe"
            className="pl-10"
            {...register("name")}
          />
        </div>
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            placeholder="you@example.com"
            className="pl-10"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="pl-10"
            {...register("password")}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-7 w-7"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            className="pl-10"
            {...register("confirmPassword")}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-7 w-7"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full mt-4" disabled={isLoading}>
        {isLoading ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
};

const AuthForm = ({
  defaultTab = "login",
  onLogin = () => {},
  onSignup = () => {},
  isLoading = false,
  isVerificationSent = false,
}: AuthFormProps) => {
  const [activeTab, setActiveTab] = useState<
    "login" | "signup" | "verification"
  >(defaultTab);
  const [verificationEmail, setVerificationEmail] = useState("");

  const handleLoginSubmit = (data: { email: string; password: string }) => {
    onLogin(data);
  };

  const handleSignupSubmit = (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    setVerificationEmail(data.email);
    onSignup(data);
    if (!isLoading) {
      setActiveTab("verification");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {activeTab === "login"
            ? "Welcome Back"
            : activeTab === "signup"
              ? "Create Account"
              : "Verify Your Email"}
        </CardTitle>
        <CardDescription className="text-center">
          {activeTab === "login"
            ? "Sign in to access your account"
            : activeTab === "signup"
              ? "Fill in your details to get started"
              : "Check your inbox to complete registration"}
        </CardDescription>
      </CardHeader>

      {activeTab !== "verification" ? (
        <>
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "login" | "signup")}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm onSubmit={handleLoginSubmit} isLoading={isLoading} />
            </TabsContent>
            <TabsContent value="signup">
              <CardContent className="p-6">
                <SignupForm
                  onSubmit={handleSignupSubmit}
                  isLoading={isLoading}
                />
              </CardContent>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <CardContent className="p-6 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <p className="text-center mb-6">
            We've sent a verification email to{" "}
            <strong>{verificationEmail}</strong>. Please check your inbox and
            click the verification link to complete your registration.
          </p>
          <div className="space-y-4 w-full">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setActiveTab("login")}
            >
              Back to Login
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Didn't receive the email? Check your spam folder or{" "}
              <Button
                variant="link"
                className="p-0 h-auto font-normal"
                onClick={() => setActiveTab("signup")}
              >
                try again
              </Button>
            </p>
          </div>
        </CardContent>
      )}

      {activeTab !== "verification" && (
        <CardFooter className="flex flex-col space-y-4 p-6 pt-0">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" type="button" className="w-full">
              Google
            </Button>
            <Button variant="outline" type="button" className="w-full">
              Facebook
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default AuthForm;
