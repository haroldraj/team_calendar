import { auth } from "@/lib/utils";

type AuthReturnValues = {
  token: string;
  role: "admin" | "user";
};

export async function authUser(
  email: string,
  password: string
): Promise<AuthReturnValues> {
  const response = await auth
    .post<AuthReturnValues>("/auth/sign-in", { email, password })
    .catch((err) => {
      throw err;
    });

  return response.data;
}