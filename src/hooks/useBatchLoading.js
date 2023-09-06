import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { BATCH_ITEM_MULTIPLIER } from "../data/consts";
import { useSearchParams } from "react-router-dom";

export function useBatchLoading() {
  const [searchParams] = useSearchParams();

  const [batchNumber, setBatchNumber] = useState(1);

  const { ref, inView } = useInView({
    triggerOnce: true,
    fallbackInView: true,
    delay: 100,
  });

  useEffect(() => {
    if (inView) setBatchNumber((batchNumber) => batchNumber + 1);
  }, [inView]);

  useEffect(() => {
    setBatchNumber(1);
  }, [searchParams]);

  return { batchNumber, ref };
}

export const refProps = (index, batchNumber, ref) =>
  index === batchNumber * BATCH_ITEM_MULTIPLIER - 1 ? { innerRef: ref } : {};
