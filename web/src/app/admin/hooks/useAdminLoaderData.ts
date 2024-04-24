import { ActionTypeListType, UserListType } from "@/lib/types";
import { useLoaderData } from "react-router-dom";

export function useAdminLoaderData() {
  const data = useLoaderData()

  return data as {users:UserListType,actions:ActionTypeListType}
}