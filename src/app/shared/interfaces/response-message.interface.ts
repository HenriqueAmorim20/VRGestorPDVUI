export interface ResponseMessage<T> {
  message: string | null;
  count: number | null;
  data: T;
}
