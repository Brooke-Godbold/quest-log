import PropTypes from "prop-types";

import Button from "../../../ui/button/Button.component";
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
import { useForm } from "react-hook-form";
import { useAddPost } from "./useAddPost";
import { FormError } from "../../../ui/form-error/FormError.styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import TextCount from "../../../ui/text-count/TextCount.component";

const MAX_LENGTH = 450;
const MIN_LENGTH = 25;

function AddPostForm({ gameData, currentGames, postId, userId, onCloseModal }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
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
    };

    addPost(newPost, {
      onSuccess: ({ id }) => {
        reset();
        onCloseModal?.();

        if (postId) {
          searchParams.set("post", postId);
          setSearchParams(searchParams);
          navigate(`/social/post/${postId}?post=${id}`, { replace: true });
        }
      },
    });
  }

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
  onCloseModal: PropTypes.func,
  userId: PropTypes.string.isRequired,
};

export default AddPostForm;
