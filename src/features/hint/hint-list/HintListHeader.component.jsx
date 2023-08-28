import PropTypes from "prop-types";

import { StyledButtonContainer } from "../../../ui/button-container/ButtonContainer.styles";
import Button from "../../../ui/button/Button.component";
import ToggleButton from "../../../ui/toggle-button/ToggleButton.component";
import NewHint from "../new-hint/NewHint.component";
import {
  ButtonContainer,
  ResetUserButton,
  StyledHintListHeader,
  UserSearch,
  UserSearchInput,
} from "./HintList.styles";
import { useSearchParams } from "react-router-dom";
import { useUser } from "../../auth/useUser";
import { useForm } from "react-hook-form";
import { HiX } from "react-icons/hi";

function HintListHeader({ isNewHint, setIsNewHint }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get("sort") || "popularity";
  const currentFilter = searchParams.get("filter") || "none";

  const { register, handleSubmit, reset } = useForm();

  const { isAuthenticated, user } = useUser();

  function handleAddNewHint() {
    setIsNewHint((isNewHint) => !isNewHint);
  }

  function handleSetSort(toggleValue) {
    if (searchParams.get("sort") === toggleValue) return;

    searchParams.set("sort", toggleValue);
    setSearchParams(searchParams);
  }

  function handleSetFilter(toggleValue) {
    if (searchParams.get("filter") === toggleValue) return;

    searchParams.set("filter", toggleValue);
    setSearchParams(searchParams);
  }

  function handleSearchUsername(data) {
    searchParams.set("username", data.username);
    setSearchParams(searchParams);

    reset();
  }

  function resetSearchUsername() {
    searchParams.delete("username");
    setSearchParams(searchParams);
  }

  return (
    <StyledHintListHeader>
      {!isNewHint && (
        <>
          <ButtonContainer>
            {isAuthenticated && (
              <div>
                <Button isLight={false} onClick={handleAddNewHint}>
                  Add Hint
                </Button>
              </div>
            )}
            <StyledButtonContainer>
              <ToggleButton
                toggleValue="popularity"
                currentToggleValue={currentSort}
                toggleFunction={handleSetSort}
              >
                Popularity
              </ToggleButton>
              <ToggleButton
                toggleValue="newest"
                currentToggleValue={currentSort}
                toggleFunction={handleSetSort}
              >
                Newest
              </ToggleButton>
              <ToggleButton
                toggleValue="oldest"
                currentToggleValue={currentSort}
                toggleFunction={handleSetSort}
              >
                Oldest
              </ToggleButton>
            </StyledButtonContainer>

            <StyledButtonContainer>
              <ToggleButton
                toggleValue="none"
                currentToggleValue={currentFilter}
                toggleFunction={handleSetFilter}
              >
                None
              </ToggleButton>
              <ToggleButton
                toggleValue="positive"
                currentToggleValue={currentFilter}
                toggleFunction={handleSetFilter}
              >
                Positive
              </ToggleButton>
              <ToggleButton
                toggleValue="sixMonths"
                currentToggleValue={currentFilter}
                toggleFunction={handleSetFilter}
              >
                Last Six Months
              </ToggleButton>
              {isAuthenticated && (
                <ToggleButton
                  toggleValue="mine"
                  currentToggleValue={currentFilter}
                  toggleFunction={handleSetFilter}
                >
                  My Own
                </ToggleButton>
              )}
            </StyledButtonContainer>
            <UserSearch onSubmit={handleSubmit(handleSearchUsername)}>
              <UserSearchInput
                {...register("username", { required: true })}
                placeholder={
                  searchParams.get("username") || "Search by username..."
                }
              />
              <ResetUserButton onClick={resetSearchUsername}>
                <HiX />
              </ResetUserButton>
            </UserSearch>
          </ButtonContainer>
        </>
      )}
      {isNewHint && <NewHint setIsNewHint={setIsNewHint} user={user} />}
    </StyledHintListHeader>
  );
}

HintListHeader.propTypes = {
  isNewHint: PropTypes.bool.isRequired,
  setIsNewHint: PropTypes.func.isRequired,
};

export default HintListHeader;
