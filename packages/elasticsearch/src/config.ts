const DEFAULTS = {
  HOST: 'localhost',
  PORT: 9200,
};

export class ElasticSearchConfig {
  private readonly _host: string;
  private readonly _port: number;

  constructor(
    host: string = DEFAULTS.HOST,
    port: number = DEFAULTS.PORT
  ) {
    this._host = host;
    this._port = port;
  }

  public host(): string {
    return this._host;
  }

  public port(): number {
    return this._port;
  }

  public toString(): string {
    return `http://${this._host}:${this._port}`;
  }
}
