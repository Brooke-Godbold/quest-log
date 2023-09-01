import PropTypes from "prop-types";

import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

import { useAddPost } from "../../../query/post/useAddPost";

import Button from "../../../ui/button/Button.component";
import TextCount from "../../../ui/text-count/TextCount.component";
import Notification from "../../../ui/notification/Notification.component";

import {
  AddPostButtons,
  AddPostCancelButton,
  AddPostErrorContainer,
  AddPostGame,
  AddPostHeader,
  AddPostTextArea,
  AddPostTextSection,
  StyledAddPostForm,
} from "./AddPostForm.styles";
import { FormError } from "../../../ui/form-error/FormError.styles";

const MAX_LENGTH = 450;
const MIN_LENGTH = 25;

function AddPostForm({
  gameData,
  currentGames,
  postId,
  quoteId,
  userId,
  onCloseModal,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [successfulPost, setSuccessfulPost] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const watchPostContent = watch("postContent", "");

  const { addPost, isLoading } = useAddPost();

  function onPost(data) {
    const newPost = {
      description: data.postContent,
      userId,
      ...(currentGames && { gameId: data.gameId }),
      ...(postId && { postId }),
      ...(quoteId && { quoteId }),
    };

    addPost(newPost, {
      onSuccess: ({ id }) => {
        toast((t) => <Notification toast={t} text="Posted Successfully!" />);

        onCloseModal?.();

        if (postId) {
          searchParams.set("post", postId);
        } else {
          searchParams.set("post", id);
        }

        setSearchParams(searchParams);
        setSuccessfulPost(true);
      },
      onError: () => {
        toast.error((t) => (
          <Notification toast={t} text="Oops! That didn't work!" />
        ));
      },
    });
  }

  useEffect(() => {
    if (successfulPost || !quoteId) {
      navigate(`/social/post/${postId}?view=recent`, { replace: true });
    }
  }, [successfulPost, navigate, postId, quoteId]);

  function onError(e) {
    console.log("ERROR: ", e);
  }

  function onCancel(e) {
    e.preventDefault();
    onCloseModal?.();
  }

  return (
    <StyledAddPostForm onSubmit={handleSubmit(onPost, onError)}>
      <AddPostHeader>
        <h3>{!currentGames ? "Reply" : "New Post"}</h3>
        {currentGames && (
          <AddPostGame
            disabled={isLoading}
            id="gameId"
            {...register("gameId", {
              validate: (value) => value !== "placeholder",
            })}
          >
            <option key="placeholder" value="placeholder">
              Please select...
            </option>
            {currentGames.map((gameId) => (
              <option key={gameId} value={gameId}>
                {gameData.filter((game) => game.id === gameId)[0].name}
              </option>
            ))}
          </AddPostGame>
        )}
      </AddPostHeader>
      <AddPostTextSection>
        <AddPostTextArea
          disabled={isLoading}
          id="postContent"
          {...register("postContent", {
            required: true,
            minLength: MIN_LENGTH,
            maxLength: MAX_LENGTH,
          })}
        />
        <TextCount
          value={watchPostContent}
          minLength={MIN_LENGTH}
          maxLength={MAX_LENGTH}
        />
      </AddPostTextSection>
      {errors && (
        <AddPostErrorContainer>
          {(errors.postContent?.type === "minLength" ||
            errors.postContent?.type === "required") && (
            <FormError>Posts must be at least 25 characters!</FormError>
          )}
          {errors.postContent?.type === "maxLength" && (
            <FormError>Posts cannot be over 450 characters!</FormError>
          )}
          {errors.gameId?.type === "validate" && (
            <FormError>Make sure you select a game for this post!</FormError>
          )}
        </AddPostErrorContainer>
      )}
      <AddPostButtons>
        <Button disabled={isLoading} isLight={true}>
          Post
        </Button>
        <AddPostCancelButton disabled={isLoading} onClick={onCancel}>
          Cancel
        </AddPostCancelButton>
      </AddPostButtons>
    </StyledAddPostForm>
  );
}

AddPostForm.propTypes = {
  gameData: PropTypes.array,
  currentGames: PropTypes.array,
  postId: PropTypes.number,
  quoteId: PropTypes.number,
  onCloseModal: PropTypes.func,
  userId: PropTypes.string.isRequired,
};

export default AddPostForm;
