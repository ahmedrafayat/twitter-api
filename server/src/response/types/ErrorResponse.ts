import { ErrorValidation } from './ErrorValidation';
import { ErrorType } from './ErrorType';

export type ErrorResponse = {
  errorType: ErrorType;
  errorMessage: string;
  errors: string[] | null;
  errorRaw: any;
  errorsValidation: ErrorValidation[] | null;
  stack?: string;
};
