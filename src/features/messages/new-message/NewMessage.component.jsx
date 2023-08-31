import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import {
  NewMessageTextArea,
  SendMessageButton,
  StyledNewMessage,
} from "./NewMessage.styles";

import { IoSend } from "react-icons/io5";
import { fromUnixTime } from "date-fns";
import { useUser } from "../../auth/useUser";
import { useUpdateMessage } from "../useUpdateMessage";
import { useEffect } from "react";

function NewMessage({ conversation }) {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useUser();

  const { updateMessages, isUpdatingMessage } = useUpdateMessage(user?.id);

  function onSendMessage(data) {
    if (!user) return;

    const spaceFilteredContent = data.message
      .replace(/(\r\n|\n|\r|\s)/gm, "", "")
      .replace(" ", "");
    if (spaceFilteredContent.length === 0) {
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

  return (
    <StyledNewMessage onSubmit={handleSubmit(onSendMessage)}>
      {conversation && (
        <>
          <NewMessageTextArea
            id="message"
            disabled={isUpdatingMessage}
            {...register("message", { required: true })}
          />
          <SendMessageButton disabled={isUpdatingMessage}>
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
