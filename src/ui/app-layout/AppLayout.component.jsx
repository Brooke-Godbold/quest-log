import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useUser } from '../../query/auth/useUser';

import Navigation from '../navigation/Navigation.component';

import { Main, StyledAppLayout } from './AppLayout.styles';

import supabase from '../../services/supabase';

function AppLayout() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (user) {
      const messageReceiverChannel = supabase.channel(`${user.id}`);
      messageReceiverChannel
        .on('broadcast', { event: 'messages' }, (payload) => {
          queryClient.invalidateQueries({
            queryKey: [payload.payload.message],
          });
        })
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
