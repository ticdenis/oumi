const DEFAULTS = {
  HOST: 'localhost',
  PASSWORD: 'guest',
  PORT: 5672,
  QUEUE: 'all',
  USER: 'guest',
};

export class RabbitMQConfig {
  private readonly _host: string;
  private readonly _port: number;
  private readonly _user: string;
  private readonly _password: string;
  private readonly _queue: string;

  constructor(
    host: string = DEFAULTS.HOST,
    port: number = DEFAULTS.PORT,
    user: string = DEFAULTS.USER,
    password: string = DEFAULTS.PASSWORD,
    queue: string = DEFAULTS.QUEUE,
  ) {
    this._host = host;
    this._port = port;
    this._user = user;
    this._password = password;
    this._queue = queue;
  }

  public host(): string {
    return this._host;
  }

  public port(): number {
    return this._port;
  }

  public user(): string {
    return this._user;
  }

  public password(): string {
    return this._password;
  }

  public queue(): string {
    return this._queue;
  }

  public toString(): string {
    return `amqp://${this.user()}:${this.password()}@${this.host()}:${this.port()}`;
  }
}
