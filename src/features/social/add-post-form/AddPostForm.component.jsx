import PropTypes from "prop-types";

import { useForm } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
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
  ImageUploadInput,
  StyledAddPostForm,
} from "./AddPostForm.styles";
import { FormError } from "../../../ui/form-error/FormError.styles";
import { useLocations } from "../../../contexts/LocationsContext";
import { filterWhiteSpace } from "../../../utils/filterWhiteSpace";
import { validateFile } from "../../../utils/validateFile";

const MAX_LENGTH = 450;
const MIN_LENGTH = 25;

function AddPostForm({
  gameData,
  currentGames,
  parentPostId,
  quoteId,
  userId,
  onCloseModal,
}) {
  const { postId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { setPreviousLocation } = useLocations();

  const [newPostId, setNewPostId] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();
  const watchPostContent = watch("postContent", "");

  const { addPost, isLoading } = useAddPost();

  const redirectToDetailView = !quoteId && !postId && parentPostId;

  function onPost(data) {
    if (filterWhiteSpace(data.postContent.trim()).length < 5) {
      setError("postContent", {
        type: "required",
      });
      return;
    }

    const uploadedFile = data.image?.[0];

    if (!validateFile(uploadedFile, setError)) return;

    const newPost = {
      ...(data.image?.[0] && { image: data.image[0] }),
      data: {
        description: data.postContent.trim(),
        userId,
        ...(currentGames && { gameId: data.gameId }),
        ...(parentPostId && { postId: parentPostId }),
        ...(quoteId && { quoteId }),
      },
    };

    addPost(newPost, {
      onSuccess: ({ id }) => {
        toast((t) => <Notification toast={t} text="Posted Successfully!" />);
        setNewPostId(id);
      },
      onError: () => {
        toast.error((t) => (
          <Notification toast={t} text="Oops! That didn't work!" />
        ));
      },
    });
  }

  useEffect(() => {
    if (!newPostId) return;

    if (parentPostId) {
      searchParams.set("post", parentPostId);
    } else {
      searchParams.set("post", newPostId);
    }
    setSearchParams(searchParams);

    if (redirectToDetailView) {
      setPreviousLocation();
      navigate(`/social/post/${parentPostId}?view=recent`, { replace: true });
    } else {
      onCloseModal?.();
    }
  }, [
    newPostId,
    navigate,
    onCloseModal,
    setPreviousLocation,
    redirectToDetailView,
    parentPostId,
    searchParams,
    setSearchParams,
  ]);

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
      <ImageUploadInput
        {...register("image")}
        type="file"
        id="image"
        disabled={isLoading}
      />
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
          {errors.image && <FormError>Error uploading image!</FormError>}
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
  parentPostId: PropTypes.number,
  quoteId: PropTypes.number,
  onCloseModal: PropTypes.func,
  userId: PropTypes.string.isRequired,
};

export default AddPostForm;
