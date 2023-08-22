import PropTypes from "prop-types";

import HintItem from "../../hint/hint-item/HintItem.component";
import {
  AccountHintsList,
  StyledAccountHints,
} from "./AccountHintsSection.styles";

function AccountHintsSection({ hintsList, user }) {
  const sortedHints = hintsList.sort(
    (hintA, hintB) => hintB.popularity - hintA.popularity
  );

  return (
    <StyledAccountHints>
      <AccountHintsList>
        {sortedHints.map((hint) => (
          <HintItem
            hint={hint}
            id={`hint_${hint.id}`}
            user={user}
            isNewHint={false}
            key={hint.id}
          />
        ))}
      </AccountHintsList>
    </StyledAccountHints>
  );
}

AccountHintsSection.propTypes = {
  hintsList: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

export default AccountHintsSection;
