import { EntitySchema } from 'typeorm';

export const DomainEventEntity = new EntitySchema({
  columns: {
    data: {
      type: String,
    },
    id: {
      generated: 'uuid',
      primary: true,
      type: String,
    },
    occurredOn: {
      createDate: true,
      name: 'occurred_on',
      type: Date,
    },
    type: {
      type: String,
    },
  },
  name: 'domain_event',
  schema: 'accounts',
  tableName: 'domain_events',
});
