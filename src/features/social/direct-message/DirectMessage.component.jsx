import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import {
  AddPostButtons,
  AddPostCancelButton,
  AddPostHeader,
  AddPostTextArea,
  AddPostTextSection,
  StyledAddPostForm,
} from "../add-post-form/AddPostForm.styles";
import Button from "../../../ui/button/Button.component";
import { fromUnixTime } from "date-fns";
import { useAddMessage } from "../../messages/useAddMessage";
import { useUser } from "../../auth/useUser";
import { toast } from "react-hot-toast";
import Notification from "../../../ui/notification/Notification.component";
import { useConversations } from "../../../contexts/ConversationsContext";
import { useNavigate } from "react-router-dom";

function DirectMessage({ onCloseModal, username, receiverId }) {
  const { register, handleSubmit, reset } = useForm();

  const { user } = useUser();

  const { addMessage, isLoading } = useAddMessage(user.id);

  const { setCurrentConversation } = useConversations();

  const navigate = useNavigate();

  function onSend(data) {
    const spaceFilteredContent = data.message
      .replace(/(\r\n|\n|\r|\s)/gm, "", "")
      .replace(" ", "");
    if (spaceFilteredContent.length === 0) {
      reset();
      return;
    }

    const createdAt = fromUnixTime(Date.now() / 1000);

    const conversation = [
      {
        userId: user.id,
        content: data.message.trim(),
        createdAt,
        isViewed: false,
      },
    ];

    const conversationData = {
      userIdA: user.id,
      userIdB: receiverId,
      conversation,
    };

    addMessage(conversationData, {
      onSuccess: () => {
        toast((t) => (
          <Notification toast={t} text={`Sent message to ${username}!`} />
        ));

        onCloseModal?.();

        setCurrentConversation(receiverId);
        navigate("/messages", { replace: true });
      },
      onError: () =>
        toast.error((t) => (
          <Notification
            toast={t}
            text={"Unable to send your message at this time"}
          />
        )),
    });
  }

  function onCancel(e) {
    e.preventDefault();
    onCloseModal?.();
  }

  return (
    <StyledAddPostForm onSubmit={handleSubmit(onSend)}>
      <AddPostHeader>
        <h3>{`Message ${username}`}</h3>
      </AddPostHeader>
      <AddPostTextSection>
        <AddPostTextArea
          disabled={isLoading}
          id="message"
          {...register("message", {
            required: true,
          })}
        />
      </AddPostTextSection>
      <AddPostButtons>
        <Button disabled={isLoading} isLight={true}>
          Send
        </Button>
        <AddPostCancelButton disabled={isLoading} onClick={onCancel}>
          Cancel
        </AddPostCancelButton>
      </AddPostButtons>
    </StyledAddPostForm>
  );
}

DirectMessage.propTypes = {
  onCloseModal: PropTypes.func,
  username: PropTypes.string.isRequired,
  receiverId: PropTypes.string.isRequired,
};

export default DirectMessage;