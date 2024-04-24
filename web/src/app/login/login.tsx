import React from "react";
import { ActionButton } from "@/components/common";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionData } from "@/lib/hooks";
import { authUser } from "@/services/auth";
import { useNavigate } from "@/router";
import { toast } from "sonner";
import CONFIG from "@/lib/config";

export function LoginForm() {
  const [email, setemail] = React.useState("");
  const [password, setpassword] = React.useState("");
  const navigate = useNavigate();
  const { pending, handleAction } = useActionData({
    actionFn: () => authUser(email, password),
    onSucceed: (params) => {
      localStorage.setItem(CONFIG.token_key, params.token);
      if (params.role === "admin") navigate("/admin");
      else navigate("/user");
    },
    onError: () => toast("Please check your credentials and try again.")
  });

  const handleLogin = React.useCallback(() => {
    if (email === "" || password === "") toast("Please, fill the credentials");
    else handleAction();
  }, [email, handleAction, password]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <ActionButton
          label="Sign in"
          className="w-full"
          onClick={handleLogin}
          pending={pending}
        />
      </CardFooter>
    </Card>
  );
}
