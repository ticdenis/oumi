import { ElasticSearchConfig } from './config';
import { Client } from '@elastic/elasticsearch';
import { Search, Index } from '@elastic/elasticsearch/api/requestParams';

export class ElasticSearchClient {
  private _client: Client;

  constructor(protected readonly config: ElasticSearchConfig) {
    this._client = new Client({
      node: this.config.toString()
    });
  }

  public index<T>(params: Index<any>): Promise<void> {
    return this._client.index(params).then(res => null);
  }

  public refresh(index: string): Promise<void> {
    return this._client.indices.refresh({ index }).then(res => null);
  }

  public search<R>(params: Search): Promise<R> {
    return this._client.search(params).then(res => res.body.hits.hits);
  }
}
