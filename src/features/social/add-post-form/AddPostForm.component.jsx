import PropTypes from "prop-types";

import { useForm } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

import { useLocations } from "../../../contexts/LocationsContext";

import { useAddPost } from "../../../query/post/useAddPost";

import Button from "../../../ui/button/Button.component";
import TextCount from "../../../ui/text-count/TextCount.component";
import Notification from "../../../ui/notification/Notification.component";

import {
  AddPostButtons,
  AddPostCancelButton,
  AddPostGame,
  AddPostHeader,
  AddPostTextArea,
  AddPostTextSection,
  ImageUploadInput,
  StyledAddPostForm,
} from "./AddPostForm.styles";

import { POST_MAX_LENGTH, POST_MIN_LENGTH } from "../../../data/consts";

import { filterWhiteSpace } from "../../../utils/filterWhiteSpace";
import { validateFile } from "../../../utils/validateFile";
import { onErrorToast } from "../../../utils/onErrorToast";

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
    clearErrors,
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

    if (uploadedFile && !validateFile(uploadedFile, setError)) return;

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
    onErrorToast(e);
  }

  function onCancel(e) {
    e.preventDefault();
    onCloseModal?.();
  }

  useEffect(() => {
    if (errors.image) {
      onErrorToast(errors, clearErrors);
    }
  }, [errors, clearErrors]);

  return (
    <StyledAddPostForm onSubmit={handleSubmit(onPost, onError)}>
      <AddPostHeader>
        <h3>{!currentGames ? "Reply" : "New Post"}</h3>
        {currentGames && (
          <AddPostGame
            disabled={isLoading}
            id="gameId"
            {...register("gameId", {
              validate: (value) =>
                value !== "placeholder" ||
                "You must select a game for this post!",
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
            required: {
              value: true,
              message: `Posts must be at least ${POST_MIN_LENGTH} characters!`,
            },
            minLength: {
              value: POST_MIN_LENGTH,
              message: `Posts must be at least ${POST_MIN_LENGTH} characters!`,
            },
            maxLength: {
              value: POST_MAX_LENGTH,
              message: `Posts cannot be more than ${POST_MAX_LENGTH} characters!`,
            },
          })}
        />
        <TextCount
          value={watchPostContent}
          minLength={POST_MIN_LENGTH}
          maxLength={POST_MAX_LENGTH}
        />
      </AddPostTextSection>
      <ImageUploadInput
        {...register("image")}
        type="file"
        id="image"
        disabled={isLoading}
      />
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
