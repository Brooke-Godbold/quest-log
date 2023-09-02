import PropTypes from "prop-types";

import { useForm } from "react-hook-form";
import { fromUnixTime } from "date-fns";
import { toast } from "react-hot-toast";

import { useEffect } from "react";

import { useUser } from "../../../query/auth/useUser";
import { useUpdateMessage } from "../../../query/message/useUpdateMessage";
import { useConversations } from "../../../contexts/ConversationsContext";
import { useIsBlocked } from "../../../hooks/useIsBlocked";

import { IoSend } from "react-icons/io5";

import Notification from "../../../ui/notification/Notification.component";

import {
  NewMessageTextArea,
  SendMessageButton,
  StyledNewMessage,
} from "./NewMessage.styles";
import { filterWhiteSpace } from "../../../utils/filterWhiteSpace";

function NewMessage({ conversation }) {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { isDirty },
  } = useForm();
  const { user } = useUser();

  const { updateMessages, isUpdatingMessage } = useUpdateMessage(user?.id);

  const { currentConversation } = useConversations();
  const { isBlocked, isLoadingBlocked } = useIsBlocked(
    currentConversation,
    user?.id
  );

  function onSendMessage(data) {
    if (isBlocked) {
      toast.error((t) => (
        <Notification
          toast={t}
          text="You've been blocked from contacting this user"
        />
      ));
      return;
    }

    if (!user) return;

    if (filterWhiteSpace(data.message).length === 0) {
      reset();
      return;
    }

    const createdAt = fromUnixTime(Date.now() / 1000);

    const newMessage = {
      userId: user.id,
      content: data.message.trim(),
      createdAt,
      isViewed: false,
    };

    const updatedConversation = [...conversation.conversation, newMessage];

    const newData = {
      messagesId: conversation.id,
      data: updatedConversation,
    };

    updateMessages(newData, { onSuccess: () => reset() });
  }

  useEffect(
    function () {
      reset();
    },
    [conversation, reset]
  );

  useEffect(() => {
    if (!isDirty) setFocus("message");
  }, [isDirty, setFocus]);

  return (
    <StyledNewMessage onSubmit={handleSubmit(onSendMessage)}>
      {conversation && (
        <>
          <NewMessageTextArea
            id="message"
            disabled={isUpdatingMessage || isLoadingBlocked}
            {...register("message", { required: true })}
          />
          <SendMessageButton disabled={isUpdatingMessage || isLoadingBlocked}>
            <IoSend />
          </SendMessageButton>
        </>
      )}
    </StyledNewMessage>
  );
}

NewMessage.propTypes = {
  conversation: PropTypes.object,
};

export default NewMessage;
