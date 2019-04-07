import { Event, EventPublisher, Oumi } from '@oumi-package/core/lib';

import { Connection } from 'typeorm';

import { SERVICE_ID } from '../../config';
import { DomainEventEntity } from '../../entity/typeorm';

export class TypeORMDomainEventRepository implements EventPublisher {
  private readonly _connection: Connection;

  public constructor(container: Oumi.Container) {
    this._connection = container
      .get<Oumi.Database>(SERVICE_ID.DB)
      .connection<Connection>();
  }

  public async publish<T>(...events: Event<T>[]): Promise<void> {
    const entityManager = this._connection.createEntityManager();

    await Promise.all(
      events.map(event =>
        entityManager.insert(DomainEventEntity, {
          data: JSON.stringify(event.data),
          id: event.id,
          occurredOn: event.occurredOn,
          type: event.type,
        }),
      ),
    );
  }
}