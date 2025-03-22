export class ApiResponse<T> {
  public status: number;
  public message: string;
  public data: T;
  public error?: any;

  constructor(status: number, message: string, data: T, error?: any) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.error = error;
  }
}
