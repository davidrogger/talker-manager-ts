export default abstract class HttpError extends Error {
  public abstract name:string;

  public abstract status: number;
}
