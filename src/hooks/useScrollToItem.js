import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function useScrollToItem(itemData) {
  const [searchParams] = useSearchParams();

  useEffect(
    function () {
      setTimeout(() => {
        if (!searchParams.get("post") && !searchParams.get("hint")) return;

        let currentElement;

        if (searchParams.get("post")) {
          currentElement = document.getElementById(
            `post_${searchParams.get("post")}`
          );
        } else if (searchParams.get("hint")) {
          currentElement = document.getElementById(
            `hint_${searchParams.get("hint")}`
          );
        }

        if (!currentElement) return;

        currentElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }, 150);
    },
    [searchParams, itemData]
  );
}
