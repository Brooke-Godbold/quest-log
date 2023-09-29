import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useUser } from '../../../query/auth/useUser';
import { useUpdateProfile } from '../../../query/profile/useUpdateProfile';
import { useProfilesByUsername } from '../../../query/profile/useProfilesByUsername';
import { useGoogleFonts } from '../../../query/google/useGoogleFonts';

import { GameSelect } from '../../../ui/game-select/GameSelect.styles';
import {
  MainColorInput,
  MainMenuHeading,
  MenuSectionHeading,
  PersonalizationButtonContainer,
  PersonalizationMenuSection,
  ResetButton,
  StyledPersonalizationMenu,
} from './PersonalizationMenu.styles';

import Button from '../../../ui/button/Button.component';

import { usePersonalization } from '../../../contexts/PersonalizationContext';

function PersonalizationMenu() {
  const { username } = useParams();

  const {
    isPersonalizationOpen,
    closePersonalization,
    personalization,
    updateFontFamily,
    updateMainColor,
    updateSecondaryColor,
    updateTertiaryColor,
    updatePrimaryFontColor,
    updateSecondaryFontColor,
  } = usePersonalization();

  const { fontData: allFonts } = useGoogleFonts();

  const { user } = useUser();
  const { profile } = useProfilesByUsername(username);
  const { updateProfile, isLoading: isUpdatingProfile } = useUpdateProfile(
    user?.id,
    profile?.username
  );
  const [fontNames, setFontNames] = useState([]);

  function handleCancelPersonalization() {
    closePersonalization();
  }

  function handleUpdateProfile() {
    updateProfile(
      {
        userId: user.id,
        data: {
          personalization,
        },
      },
      { onSuccess: closePersonalization }
    );
  }

  useEffect(() => {
    if (!allFonts) return;

    const arr = allFonts.items.reduce((acc, cur) => [...acc, cur.family], []);
    setFontNames(arr);
  }, [allFonts]);

  return (
    <StyledPersonalizationMenu $isOpen={isPersonalizationOpen}>
      <MainMenuHeading>Personalize</MainMenuHeading>

      <PersonalizationMenuSection>
        <MenuSectionHeading>Font Family</MenuSectionHeading>
        <GameSelect
          disabled={isUpdatingProfile}
          value={personalization?.fontFamily}
          onChange={(e) => updateFontFamily(e.target.value)}
        >
          {fontNames.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </GameSelect>
      </PersonalizationMenuSection>

      <PersonalizationMenuSection>
        <MenuSectionHeading>Main Color</MenuSectionHeading>
        <ResetButton onClick={() => updateMainColor(null)}>Reset</ResetButton>
        <MainColorInput
          type="color"
          id="mainColor"
          name="mainColor"
          onChange={(e) => updateMainColor(e.target.value)}
          value={personalization?.mainColor || '#000000'}
        />
      </PersonalizationMenuSection>

      <PersonalizationMenuSection>
        <MenuSectionHeading>Secondary Color</MenuSectionHeading>
        <ResetButton onClick={() => updateSecondaryColor(null)}>
          Reset
        </ResetButton>
        <MainColorInput
          type="color"
          id="secondaryColor"
          name="secondaryColor"
          onChange={(e) => updateSecondaryColor(e.target.value)}
          value={personalization?.secondaryColor || '#000000'}
        />
      </PersonalizationMenuSection>

      <PersonalizationMenuSection>
        <MenuSectionHeading>Tertiary Color</MenuSectionHeading>
        <ResetButton onClick={() => updateTertiaryColor(null)}>
          Reset
        </ResetButton>
        <MainColorInput
          type="color"
          id="tertiaryColor"
          name="tertiaryColor"
          onChange={(e) => updateTertiaryColor(e.target.value)}
          value={personalization?.tertiaryColor || '#000000'}
        />
      </PersonalizationMenuSection>

      <PersonalizationMenuSection>
        <MenuSectionHeading>Primary Font Color</MenuSectionHeading>
        <ResetButton onClick={() => updatePrimaryFontColor(null)}>
          Reset
        </ResetButton>
        <MainColorInput
          type="color"
          id="primaryFontColor"
          name="primaryFontColor"
          onChange={(e) => updatePrimaryFontColor(e.target.value)}
          value={personalization?.primaryFontColor || '#000000'}
        />
      </PersonalizationMenuSection>

      <PersonalizationMenuSection>
        <MenuSectionHeading>Secondary Font Color</MenuSectionHeading>
        <ResetButton onClick={() => updateSecondaryFontColor(null)}>
          Reset
        </ResetButton>
        <MainColorInput
          type="color"
          id="secondaryFontColor"
          name="secondaryFontColor"
          onChange={(e) => updateSecondaryFontColor(e.target.value)}
          value={personalization?.secondaryFontColor || '#000000'}
        />
      </PersonalizationMenuSection>

      <PersonalizationButtonContainer>
        <Button onClick={handleCancelPersonalization}>Cancel</Button>
        <Button onClick={handleUpdateProfile}>Finish</Button>
      </PersonalizationButtonContainer>
    </StyledPersonalizationMenu>
  );
}

export default PersonalizationMenu;
