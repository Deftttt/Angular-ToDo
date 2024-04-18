export type ListFetchingError = { state: number; message: string };

type IdleState = {
  state: "idle";
};

type LoadingState = {
  state: "loading";
};

type SuccessState<T> = {
  state: "success";
  data: T[];
};

type ErrorState = {
  state: "error";
  error: ListFetchingError;
};

export type ComponentState<T> =
  | IdleState
  | LoadingState
  | SuccessState<T>
  | ErrorState;
