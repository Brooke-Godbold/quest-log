import SearchResultItem from '../../features/search/search-result-item/SearchResultItem.component';
import { useUser } from '../../query/auth/useUser';
import { useProfileByUser } from '../../query/profile/useProfileByUser';
import { useProfilesByValues } from '../../query/profile/useProfilesByValues';
import { FollowSuggestionsHeaderItem } from './FollowSuggestions.styles';

function FollowSuggestions() {
  const { user } = useUser();
  const { profile } = useProfileByUser(user?.id);
  const { profiles: suggestedProfiles } = useProfilesByValues({
    column: 'currentGames',
    values: [profile?.currentGames[0]] || [],
  });

  return (
    <>
      <FollowSuggestionsHeaderItem>
        <h2>Looks like no-one&apos;s playing what you are</h2>
        {suggestedProfiles?.filter(
          (suggestion) => suggestion.userId !== user.id
        ).length === 0 ? (
          <p>Why don&apos;t you try playing something new?</p>
        ) : (
          <>
            <p>
              We found some new profiles based on what you&apos;re currently
              playing!
            </p>
            <p>Why don&apos;t you try following these?</p>
          </>
        )}
      </FollowSuggestionsHeaderItem>
      {suggestedProfiles
        ?.filter((suggestion) => suggestion.userId !== user.id)
        .slice(0, 10)
        .map((suggestion) => (
          <SearchResultItem
            key={`profile_${suggestion.userId}`}
            userId={suggestion.userId}
            description={suggestion.bio}
          />
        ))}
    </>
  );
}

export default FollowSuggestions;
