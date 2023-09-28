import PropTypes from 'prop-types';

import { FaTwitch } from 'react-icons/fa';
import { GrYoutube } from 'react-icons/gr';
import { RiKickFill } from 'react-icons/ri';

import {
  AccountSocialMediaContainer,
  AccountSocialMediaInputRow,
  ProfileDetailsLabel,
} from '../../features/account/account-profile-details-section/AccountProfileDetailsSection.styles';
import { FormInput } from '../FormInput/FormInput.styles';

import { kickUrl, twitchUrl, youtubeUrl } from '../../data/consts';

function ProfileSocialMediaInput({ register, isLoading, profile }) {
  return (
    <>
      <ProfileDetailsLabel>Social Media</ProfileDetailsLabel>
      <AccountSocialMediaContainer>
        <AccountSocialMediaInputRow>
          <label>Twitch</label>
          <p>{`${twitchUrl}`}</p>
          <FormInput
            id="twitch"
            type="text"
            {...register('twitch', {
              validate: (value) =>
                !value?.includes(' ') ||
                'Twitch channel cannot include white space!',
            })}
            defaultValue={profile.twitch}
            disabled={isLoading}
            placeholder="myTwitchUser"
          ></FormInput>
          <FaTwitch />
        </AccountSocialMediaInputRow>

        <AccountSocialMediaInputRow>
          <label>YouTube</label>
          <p>{`${youtubeUrl}`}</p>
          <FormInput
            id="youtube"
            type="text"
            {...register('youtube', {
              validate: (value) =>
                !value?.includes(' ') ||
                'YouTube channel cannot include white space!',
            })}
            defaultValue={profile.youtube}
            disabled={isLoading}
            placeholder="myYoutubeChannel"
          ></FormInput>
          <GrYoutube />
        </AccountSocialMediaInputRow>

        <AccountSocialMediaInputRow>
          <label>Kick</label>
          <p>{`${kickUrl}`}</p>
          <FormInput
            id="kick"
            type="text"
            {...register('kick', {
              validate: (value) =>
                !value?.includes(' ') ||
                'Kick channel cannot include white space!',
            })}
            defaultValue={profile.kick}
            disabled={isLoading}
            placeholder="myKickUser"
          ></FormInput>
          <RiKickFill />
        </AccountSocialMediaInputRow>
      </AccountSocialMediaContainer>
    </>
  );
}

ProfileSocialMediaInput.propTypes = {
  register: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired,
};

export default ProfileSocialMediaInput;
