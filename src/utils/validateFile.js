import { MAX_FILE_SIZE_IN_BINARY_BYTES } from "../data/consts";

export const validateFile = (file, setError) =>
  file.type !== "image/jpeg" && file.type !== "image/png"
    ? (setError("image", {
        type: "custom",
        message: "Images must be PNG or JPEG!",
      }),
      false)
    : file.size > MAX_FILE_SIZE_IN_BINARY_BYTES
    ? (setError("image", {
        type: "custom",
        message: "Images must be below 5MB!",
      }),
      false)
    : true;

/*
if (
        uploadedFile.type !== "image/jpeg" &&
        uploadedFile.type !== "image/png"
      ) {
        setError("image", {
          type: "custom",
          message: "Images must be PNG or JPEG!",
        });
        return;
      }

      if (uploadedFile.size > MAX_FILE_SIZE_IN_BINARY_BYTES) {
        setError("image", {
          type: "custom",
          message: "Images must be below 5MB!",
        });
        return;
      }
*/
