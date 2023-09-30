import PropTypes from 'prop-types';

import {
  ReportSection,
  ReportTextField,
  StyledReportForm,
} from './ReportForm.styles';
import Button from '../../ui/button/Button.component';
import { filterWhiteSpace } from '../../utils/filterWhiteSpace';
import toast from 'react-hot-toast';
import Notification from '../../ui/notification/Notification.component';
import { useState } from 'react';
import { GameSelect } from '../../ui/game-select/GameSelect.styles';
import { useUser } from '../../query/auth/useUser';
import { useAddReport } from '../../query/report/useAddReport';

function ReportForm({
  reportedUser,
  reportedPost,
  reportedHint,
  onCloseModal,
}) {
  const { user } = useUser();
  const { addReport, isLoading } = useAddReport();

  const [reportContent, setReportContent] = useState('');
  const [reportType, setReportType] = useState('');

  function handleSubmitReport(e) {
    e.preventDefault();

    if (filterWhiteSpace(reportContent)?.length === 0 || reportType === '') {
      toast.error(() => (
        <Notification text="Your report must have some content and a report type selected" />
      ));
    } else {
      const report = {
        ...(reportedUser && { userId: reportedUser.userId }),
        ...(reportedPost && { postId: reportedPost.id }),
        ...(reportedHint && { hintId: reportedHint.id }),
        reportContent,
        reportType,
        submittedBy: user.id,
      };

      addReport(report, {
        onError: () => {
          toast.error(() => (
            <Notification text="We were unable to submit your report, please try again" />
          ));
        },
        onSuccess: () => {
          toast(() => <Notification text="Your report has been submitted" />);
          onCloseModal?.();
        },
      });
    }
  }

  return (
    <StyledReportForm onSubmit={handleSubmitReport}>
      <h2>{`Report ${
        reportedUser?.displayName ||
        (reportedPost && 'Post') ||
        (reportedHint && 'Hint')
      }`}</h2>
      <div>
        <p>
          This will alert our moderation team, who will review and act on this
          report as necessary
        </p>
        <p>Abuse of this system may result in appropriate penalties</p>
      </div>
      <p>Please describe the nature of this report</p>
      <ReportSection>
        <GameSelect
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          disabled={isLoading}
        >
          <option value="">Please select...</option>
          <option value="abusive_language">Abusive Language</option>
          <option value="harrassment">Harrassment</option>
          <option value="incitement_violence">Incitement to Violence</option>
          <option value="illegal_activity">Illegal Activity</option>
          <option value="other">Other</option>
        </GameSelect>
      </ReportSection>
      <ReportTextField
        value={reportContent}
        onChange={(e) => setReportContent(e.target.value)}
        disabled={isLoading}
      />
      <Button>Submit Report</Button>
    </StyledReportForm>
  );
}

ReportForm.propTypes = {
  reportedUser: PropTypes.object,
  reportedPost: PropTypes.object,
  reportedHint: PropTypes.object,
  onCloseModal: PropTypes.func,
};

export default ReportForm;
