To run the all the test Files where we need to generate Report - "npx cypress run --e2e"
To run specific test file where we need to generate Report - "npx cypress run --e2e --headed --spec cypress\integration\examples\ClaimSubmission_Approved.js"

NOTE:
1. The Number of elements present in the ClaimSubmission.json file should be EQUAL to the elements present in the Claim Audit (Approve/Reject/Return) Data file. OTHERWISE THE TESTS WILL FAIL. 