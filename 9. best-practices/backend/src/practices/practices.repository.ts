/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import {
  PracticeCategory,
  PracticeCategorySummary,
  PracticeCategoryWithItems,
  PracticeItem,
} from './practices.types';
import { PRACTICES_SEED } from './practices.seed';

@Injectable()
export class PracticesRepository {
  private readonly db: Database.Database;

  constructor() {
    const dbPath = resolve(process.cwd(), 'data', 'practices.sqlite');
    mkdirSync(dirname(dbPath), { recursive: true });
    this.db = new Database(dbPath);
    this.createSchema();
    this.seedWhenEmpty();
  }

  findCategorySummaries(): PracticeCategorySummary[] {
    const query = this.db.prepare(`
      SELECT
        c.slug,
        c.title,
        c.description,
        c.order_index AS orderIndex,
        COUNT(i.id) AS itemCount
      FROM practice_categories c
      LEFT JOIN practice_items i ON i.category_id = c.id
      GROUP BY c.id
      ORDER BY c.order_index ASC;
    `);

    return query.all() as PracticeCategorySummary[];
  }

  findCategoryBySlug(slug: string): PracticeCategoryWithItems | null {
    const categoryQuery = this.db.prepare(`
      SELECT
        slug,
        title,
        description,
        order_index AS orderIndex
      FROM practice_categories
      WHERE slug = ?;
    `);

    const category = categoryQuery.get(slug) as
      | Omit<PracticeCategoryWithItems, 'itemCount' | 'items'>
      | undefined;

    if (!category) {
      return null;
    }

    const itemsQuery = this.db.prepare(`
      SELECT
        title,
        summary,
        details,
        why_it_matters AS whyItMatters,
        good_example AS goodExample,
        bad_example AS badExample,
        tags,
        order_index AS orderIndex
      FROM practice_items
      WHERE category_id = (SELECT id FROM practice_categories WHERE slug = ?)
      ORDER BY order_index ASC;
    `);

    const items = (
      itemsQuery.all(slug) as Array<
        Omit<PracticeItem, 'tags'> & { tags: string }
      >
    ).map((item) => ({
      ...item,
      tags: JSON.parse(item.tags) as string[],
    }));

    return {
      ...category,
      itemCount: items.length,
      items,
    };
  }

  private createSchema(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS practice_categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        order_index INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS practice_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        summary TEXT NOT NULL,
        details TEXT NOT NULL,
        why_it_matters TEXT NOT NULL,
        good_example TEXT NOT NULL,
        bad_example TEXT NOT NULL,
        tags TEXT NOT NULL,
        order_index INTEGER NOT NULL,
        FOREIGN KEY (category_id) REFERENCES practice_categories (id) ON DELETE CASCADE
      );
    `);
  }

  private seedWhenEmpty(): void {
    const countRow = this.db
      .prepare('SELECT COUNT(*) AS count FROM practice_categories;')
      .get() as {
      count: number;
    };

    if (countRow.count > 0) {
      return;
    }

    const insertCategory = this.db.prepare(`
      INSERT INTO practice_categories (slug, title, description, order_index)
      VALUES (@slug, @title, @description, @orderIndex);
    `);

    const insertItem = this.db.prepare(`
      INSERT INTO practice_items (
        category_id,
        title,
        summary,
        details,
        why_it_matters,
        good_example,
        bad_example,
        tags,
        order_index
      ) VALUES (
        @categoryId,
        @title,
        @summary,
        @details,
        @whyItMatters,
        @goodExample,
        @badExample,
        @tags,
        @orderIndex
      );
    `);

    const getCategoryId = this.db.prepare(
      'SELECT id FROM practice_categories WHERE slug = ?;',
    );

    const seedTransaction = this.db.transaction((seed: PracticeCategory[]) => {
      for (const category of seed) {
        insertCategory.run(category);
        const categoryRow = getCategoryId.get(category.slug) as { id: number };

        for (const item of category.items) {
          insertItem.run({
            ...item,
            categoryId: categoryRow.id,
            tags: JSON.stringify(item.tags),
          });
        }
      }
    });

    seedTransaction(PRACTICES_SEED);
  }
}
