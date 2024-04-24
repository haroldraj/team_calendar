import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";
import { useActionData } from "@/lib/hooks";
import { toast } from "sonner";
import { useNavigate } from "@/router";

export default function LogOut() {
  const navigate = useNavigate();
  const { handleAction } = useActionData({
    actionFn: () => {
      setTimeout(() => {
        localStorage.clear();
      }, 3000);
      return Promise.resolve();
    },
    onSucceed: () => {
      toast("Successfully disconnected");
      navigate("/");
    }
  });

  return (
    <Button variant="outline" size="icon" onClick={handleAction}>
      <LogOutIcon className="size-4" />
    </Button>
  );
}
