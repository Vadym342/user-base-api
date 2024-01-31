import { DeleteResult, EntityManager } from 'typeorm';

export type UseTableCleanUpType = {
  entityManager: EntityManager;
  clearTable: (...args) => Promise<DeleteResult>;
  truncateTable: (...args) => Promise<void>;
  resetSequence: (...args) => Promise<void>;
};
