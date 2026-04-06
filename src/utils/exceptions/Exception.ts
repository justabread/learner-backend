class Exception extends Error {
  status: number;

  constructor(
    message: string = "Internal Server Error",
    name: string = "Exception",
    status: number = 500,
  ) {
    super(message);
    this.name = name;
    this.status = status;
  }
}

export default Exception;
