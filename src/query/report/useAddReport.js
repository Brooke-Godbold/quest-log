import { useMutation } from '@tanstack/react-query';
import { addReport as addReportApi } from '../../services/apiReport';

export function useAddReport() {
  const { mutate: addReport, isLoading } = useMutation({
    mutationFn: addReportApi,
  });

  return { addReport, isLoading };
}
