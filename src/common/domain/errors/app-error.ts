export default class AppError extends Error {
  public readonly statuscode: number;

  constructor(message: string, statuscode = 400) {
    super(message);
    
    this.statuscode = statuscode;
  }
}
