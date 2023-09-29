import { useQuery } from '@tanstack/react-query';
import { getFont } from '../../services/apiGoogleFonts';

export function useGoogleFont(fontFamily) {
  const {
    isLoading,
    isFetching,
    data: fontData,
    isError,
  } = useQuery({
    queryKey: ['googleFonts', fontFamily],
    queryFn: () => getFont(fontFamily),
  });

  return { isLoading, isFetching, fontData, isError };
}
