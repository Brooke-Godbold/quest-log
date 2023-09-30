import PropTypes from 'prop-types';

import HintItem from '../hint-item/HintItem.component';

import { refProps, useBatchLoading } from '../../../hooks/useBatchLoading';

import { BATCH_ITEM_MULTIPLIER } from '../../../data/consts';

function Hints({ hints }) {
  const { batchNumber, ref } = useBatchLoading();

  return (
    <>
      {hints
        .slice(0, batchNumber * BATCH_ITEM_MULTIPLIER)
        .map((hint, index) => (
          <HintItem
            hint={hint}
            id={`hint_${hint.id}`}
            key={`hint_${hint.id}`}
            {...refProps(index, batchNumber, ref)}
          />
        ))}
    </>
  );
}

Hints.propTypes = {
  hints: PropTypes.array.isRequired,
};

export default Hints;
