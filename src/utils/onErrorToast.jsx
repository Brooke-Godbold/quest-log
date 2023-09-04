import { toast } from "react-hot-toast";
import Notification from "../ui/notification/Notification.component";

export const onErrorToast = (e, clearErrors, reset) => {
  Object.keys(e).forEach((key) =>
    toast.error(() => <Notification text={e[key].message} />)
  );
  clearErrors?.();
  reset?.();
};
