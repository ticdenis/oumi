import { EntitySchema } from 'typeorm';

import { UserEntityType } from './user';

export interface ContactEntityType extends UserEntityType {
  contactId: string;
  userId: string;
}

// tslint:disable-next-line:variable-name
export const ContactEntity = new EntitySchema<ContactEntityType>({
  columns: {
    contactId: {
      name: 'contact_id',
      type: String,
    },
    id: {
      generated: 'uuid',
      primary: true,
      type: String,
    },
    userId: {
      name: 'user_id',
      type: String,
    },
  },
  name: 'contact',
  relations: {
    contactId: {
      joinColumn: {
        referencedColumnName: 'id',
      },
      joinTable: {
        name: 'users',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      target: 'user',
      type: 'one-to-many',
    },
    userId: {
      joinColumn: {
        referencedColumnName: 'id',
      },
      joinTable: {
        name: 'users',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      target: 'user',
      type: 'one-to-many',
    },
  },
  tableName: 'contacts',
});
