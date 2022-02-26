import { ErrorType } from './ErrorType';
import { ErrorValidation } from './ErrorValidation';

export type ErrorResponse = {
  errorType: ErrorType;
  errorMessage: string;
  errors: string[] | null;
  errorRaw: any;
  errorsValidation: ErrorValidation[] | null;
  stack?: string;
};
