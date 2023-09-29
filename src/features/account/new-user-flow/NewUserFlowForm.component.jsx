import PropTypes from 'prop-types';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { HiPlus } from 'react-icons/hi';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import { HiX } from 'react-icons/hi';

import { useUser } from '../../../query/auth/useUser';
import { useProfileByUser } from '../../../query/profile/useProfileByUser';
import { useUpdateProfile } from '../../../query/profile/useUpdateProfile';
import { useProfilesByValues } from '../../../query/profile/useProfilesByValues';

import ProfileBioInput from '../../../ui/profile-bio-input/ProfileBioInput.component';
import ProfileSocialMediaInput from '../../../ui/profile-social-media-input/ProfileSocialMediaInput.component';
import Button from '../../../ui/button/Button.component';
import Spinner from '../../../ui/spinner/Spinner';

import {
  NewUserFlowButtonContainer,
  NewUserFlowFollowSuggestion,
  NewUserFlowSubSection,
  NewUserSuggestionAddButton,
  NewUserSuggestionBio,
  StyledNewUserFlow,
  StyledNewUserFlowForm,
} from './NewUserFlow.styles';
import { UserAvatar } from '../../../ui/avatar-nav-link/AvatarNavLink.styles';

import { onErrorToast } from '../../../utils/onErrorToast';
import AccountAvatarSection from '../account-avatar-section/AccountAvatarSection.component';
import { ProfileDetailsLabel } from '../account-profile-details-section/AccountProfileDetailsSection.styles';
import { ResponsiveButtonContent } from '../../../ui/responsive-button-content/ResponsiveButtonContent.styles';

function NewUserFlowForm({ onCloseModal }) {
  const { user } = useUser();
  const { profile, isGettingProfile, isFetchingProfile } = useProfileByUser(
    user?.id
  );
  const { updateProfile, isLoading: isUpdatingProfile } = useUpdateProfile(
    user?.id,
    profile?.username
  );

  const isLoading = isFetchingProfile || isGettingProfile || isUpdatingProfile;

  const { profiles: suggestedProfiles } = useProfilesByValues({
    column: 'currentGames',
    values: [profile?.currentGames[0]] || [],
  });
  const [filteredProfiles, setFilteredProfiles] = useState([]);

  const { register, watch, handleSubmit } = useForm({
    resetOptions: { keepDefaultValues: true },
  });
  const watchBio = watch('bio', profile?.bio);
  const watchTwitch = watch('twitch', profile?.twitch);
  const watchYoutube = watch('youtube', profile?.youtube);
  const watchKick = watch('kick', profile?.kick);

  const [profileUpdated, setProfileUpdated] = useState(false);
  const [step, setStep] = useState(1);

  function handleUpdateProfile() {
    switch (step) {
      case 1:
        nextStep();
        break;
      case 2:
        updateProfile(
          { userId: user.id, data: { bio: watchBio } },
          { onSuccess: setProfileUpdated(true) }
        );
        break;
      case 3:
        updateProfile(
          {
            userId: user.id,
            data: {
              twitch: watchTwitch,
              youtube: watchYoutube,
              kick: watchKick,
            },
          },
          { onSuccess: setProfileUpdated(true) }
        );
        break;
      case 4:
        nextStep();
        break;
    }
  }

  function handleAddSuggestedUser(followUserId, e) {
    e.preventDefault();

    updateProfile({
      userId: user.id,
      data: { following: [...profile.following, followUserId] },
    });
  }

  function previousStep(e) {
    e.preventDefault();
    setStep((step) => step - 1);
  }

  function nextStep() {
    setStep((step) => step + 1);
  }

  function finishNewUserFlow(e) {
    e.preventDefault();

    updateProfile(
      { userId: user.id, data: { newUser: false } },
      { onSuccess: () => onCloseModal?.() }
    );
  }

  useEffect(() => {
    if (profileUpdated) {
      setProfileUpdated(false);
      nextStep();
    }
  }, [profileUpdated]);

  useEffect(() => {
    if (!suggestedProfiles || !user) return;

    setFilteredProfiles(
      suggestedProfiles
        .filter(
          (suggestion) =>
            suggestion.userId !== user.id &&
            !profile.following.includes(suggestion.userId)
        )
        ?.slice(0, 3)
    );
  }, [suggestedProfiles, profile, user]);

  function getUserFlowHeaderText() {
    switch (step) {
      case 1:
        return {
          heading: "Looks like you're new here!",
          body: "Let's get you set up!",
        };
      case 2:
        return {
          heading: 'Set up your Profile!',
          body: 'Set up your Bio And Avatar, and let other users know all about you!',
        };
      case 3:
        return {
          heading: 'Set up your Social Media!',
          body: 'Are you an active Streamer? Put down your channels here so your followers can keep up to date!',
        };
      case 4:
        return {
          heading: 'Follow some Users!',
          body: 'Gaming is more fun with groups!',
        };
      case 5:
        return {
          heading: "We're all done!",
          body: "Looks like you're all set!",
        };
    }
  }

  const TopScrollElement = () => {
    const elementRef = useRef();

    useEffect(() =>
      elementRef.current.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
        inline: 'start',
      })
    );

    return <div ref={elementRef} />;
  };

  return (
    <StyledNewUserFlow>
      {!user || !profile ? (
        <Spinner />
      ) : (
        <StyledNewUserFlowForm
          onSubmit={handleSubmit(handleUpdateProfile, (e) => onErrorToast(e))}
        >
          <TopScrollElement />
          <NewUserFlowSubSection>
            <h2>{`${getUserFlowHeaderText().heading}`}</h2>
            {step < 5 && <h4>{`Step ${step}/4`}</h4>}
          </NewUserFlowSubSection>
          <p>{`${getUserFlowHeaderText().body}`}</p>
          {step === 2 && (
            <>
              <NewUserFlowSubSection>
                <ProfileBioInput
                  register={register}
                  isLoading={isLoading}
                  profile={profile}
                  watchBio={watchBio}
                />
              </NewUserFlowSubSection>
              <NewUserFlowSubSection>
                <ProfileDetailsLabel>Avatar</ProfileDetailsLabel>
                <AccountAvatarSection />
              </NewUserFlowSubSection>
            </>
          )}
          {step === 3 && (
            <NewUserFlowSubSection>
              <ProfileSocialMediaInput
                register={register}
                isLoading={isLoading}
                profile={profile}
              />
            </NewUserFlowSubSection>
          )}
          {step === 4 && (
            <NewUserFlowSubSection>
              {filteredProfiles.length > 0 ? (
                filteredProfiles.map((suggestion) => (
                  <NewUserFlowFollowSuggestion key={suggestion.userId}>
                    <UserAvatar src={suggestion.avatarUrl} />
                    <h4>{suggestion.displayName}</h4>
                    <NewUserSuggestionBio>
                      {suggestion.bio}
                    </NewUserSuggestionBio>
                    <NewUserSuggestionAddButton
                      onClick={(e) =>
                        handleAddSuggestedUser(suggestion.userId, e)
                      }
                    >
                      <HiPlus />
                    </NewUserSuggestionAddButton>
                  </NewUserFlowFollowSuggestion>
                ))
              ) : (
                <p>
                  We don&apos;t have any more suggestions for you right now. Try
                  changing what games you&apos;re playing, or explore your feeds
                  for some more Users!
                </p>
              )}
            </NewUserFlowSubSection>
          )}
          {step < 5 ? (
            <NewUserFlowButtonContainer>
              <Button onClick={finishNewUserFlow}>
                <ResponsiveButtonContent>
                  <p>I&apos;ll do it later!</p>
                  <HiX />
                </ResponsiveButtonContent>
              </Button>
              {step > 1 && (
                <Button onClick={previousStep}>
                  <ResponsiveButtonContent>
                    <p>Previous</p>
                    <AiOutlineArrowLeft />
                  </ResponsiveButtonContent>
                </Button>
              )}
              <Button>
                <ResponsiveButtonContent>
                  <p>Next</p>
                  <AiOutlineArrowRight />
                </ResponsiveButtonContent>
              </Button>
            </NewUserFlowButtonContainer>
          ) : (
            <Button onClick={finishNewUserFlow}>Finish!</Button>
          )}
        </StyledNewUserFlowForm>
      )}
    </StyledNewUserFlow>
  );
}

NewUserFlowForm.propTypes = {
  onCloseModal: PropTypes.func,
};

export default NewUserFlowForm;
