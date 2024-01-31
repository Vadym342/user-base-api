type ErrorContext = Record<string, { errorCode: number; message: string }>;

const errorCodeTypeToFirstDigitMap = {
  Validation: '1',
  Database: '2',
  ['External Service']: '3',
};

export function validateErrorContexts(
  errorContext: ErrorContext,
  errorCodeType: keyof typeof errorCodeTypeToFirstDigitMap,
): void {
  const duplicateErrorCodes: number[] = [];
  const invalidErrorCodes: number[] = [];

  const firstDigit = errorCodeTypeToFirstDigitMap[errorCodeType];

  Object.values(errorContext)
    .map(({ errorCode }) => errorCode)
    .forEach((code, i, array) => {
      const isInvalidCodeType = typeof code !== 'number';
      const isInvalidCodeFirstDigit = !String(code).startsWith(firstDigit);
      const isInvalidCodeLength = String(code).length !== 5;

      if (isInvalidCodeType || isInvalidCodeFirstDigit || isInvalidCodeLength) {
        invalidErrorCodes.push(code);
      }

      const isDuplicate = array.indexOf(code) !== array.lastIndexOf(code);
      const isDuplicateAdded = duplicateErrorCodes.includes(code);

      if (isDuplicate && !isDuplicateAdded) {
        duplicateErrorCodes.push(code);
      }
    });

  if (invalidErrorCodes.length) {
    throw new Error(
      `${errorCodeType} error code must be 5 digit number starting with ${firstDigit}. Invalid: ${invalidErrorCodes}`,
    );
  }

  if (duplicateErrorCodes.length) {
    throw new Error('There are duplicate error codes: ' + duplicateErrorCodes);
  }
}
