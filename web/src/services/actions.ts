import { ActionTypeListType } from "@/lib/types";
import { api, getAPIHeader } from "@/lib/utils";

export async function getActionTypes(): Promise<ActionTypeListType> {
  const response = await api
    .get<{ actions: ActionTypeListType }>("/type-action", getAPIHeader())
    .catch((err) => {
      throw err;
    });

  return Promise.resolve(response.data.actions);
}

export async function createActionType(actionTypeName: string) {
  return api.post("/type-action", { name: actionTypeName }, getAPIHeader());
}

export async function editActionType(id: number, name: string) {
  return api.patch("/type-action/" + id, { name }, getAPIHeader());
}

export async function deleteActionType(id: number) {
  return api.delete("/type-action/" + id, getAPIHeader());
}
