import { useQuery } from '@tanstack/react-query';
import { getFonts } from '../../services/apiGoogleFonts';

export function useGoogleFonts() {
  const {
    isLoading,
    isFetching,
    data: fontData,
    isError,
  } = useQuery({
    queryKey: ['googleFonts'],
    queryFn: () => getFonts(),
  });

  return { isLoading, isFetching, fontData, isError };
}
