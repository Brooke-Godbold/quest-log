import { Outlet } from 'react-router-dom';

import Navigation from '../navigation/Navigation.component';

import { Main, StyledAppLayout } from './AppLayout.styles';
import { useEffect } from 'react';
import supabase from '../../services/supabase';
import { useUser } from '../../query/auth/useUser';
import { useQueryClient } from '@tanstack/react-query';

function AppLayout() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (user) {
      const messageReceiverChannel = supabase.channel(`${user.id}`);
      messageReceiverChannel
        .on('broadcast', { event: 'messages' }, (payload) =>
          queryClient.invalidateQueries({
            queryKey: [payload.message],
          })
        )
        .subscribe();
    }
  }, [user, queryClient]);

  return (
    <StyledAppLayout>
      <Navigation />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
