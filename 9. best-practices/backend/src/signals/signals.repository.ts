import { Injectable } from '@nestjs/common';
import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { SIGNALS_QUIZZES_SEED, SIGNALS_TOPICS_SEED } from './signals.seed';
import { SignalsQuiz, SignalsTopic } from './signals.types';

@Injectable()
export class SignalsRepository {
  private readonly db: Database.Database;

  constructor() {
    const dbPath = resolve(process.cwd(), 'data', 'practices.sqlite');
    mkdirSync(dirname(dbPath), { recursive: true });
    this.db = new Database(dbPath);
    this.createSchema();
    this.seedWhenEmpty();
  }

  findAllTopics(): SignalsTopic[] {
    const query = this.db.prepare(`
      SELECT
        title,
        description,
        key_points AS keyPoints,
        example,
        analogy,
        tag,
        order_index AS orderIndex
      FROM signals_topics
      ORDER BY order_index ASC;
    `);

    return (
      query.all() as Array<
        Omit<SignalsTopic, 'keyPoints'> & { keyPoints: string }
      >
    ).map((row) => ({
      ...row,
      keyPoints: JSON.parse(row.keyPoints) as string[],
    }));
  }

  findAllQuizzes(): SignalsQuiz[] {
    const query = this.db.prepare(`
      SELECT
        question,
        code_snippet AS codeSnippet,
        options,
        correct_index AS correctIndex,
        explanation,
        order_index AS orderIndex
      FROM signals_quizzes
      ORDER BY order_index ASC;
    `);

    return (
      query.all() as Array<Omit<SignalsQuiz, 'options'> & { options: string }>
    ).map((row) => ({
      ...row,
      options: JSON.parse(row.options) as string[],
    }));
  }

  private createSchema(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS signals_topics (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        title       TEXT    NOT NULL,
        description TEXT    NOT NULL,
        key_points  TEXT    NOT NULL,
        example     TEXT    NOT NULL,
        analogy     TEXT    NOT NULL,
        tag         TEXT    NOT NULL,
        order_index INTEGER NOT NULL UNIQUE
      );

      CREATE TABLE IF NOT EXISTS signals_quizzes (
        id            INTEGER PRIMARY KEY AUTOINCREMENT,
        question      TEXT    NOT NULL,
        code_snippet  TEXT    NOT NULL,
        options       TEXT    NOT NULL,
        correct_index INTEGER NOT NULL,
        explanation   TEXT    NOT NULL,
        order_index   INTEGER NOT NULL UNIQUE
      );
    `);
  }

  private seedWhenEmpty(): void {
    const topicCount = (
      this.db.prepare('SELECT COUNT(*) AS count FROM signals_topics').get() as {
        count: number;
      }
    ).count;

    if (topicCount === 0) {
      const insertTopic = this.db.prepare(`
        INSERT INTO signals_topics (title, description, key_points, example, analogy, tag, order_index)
        VALUES (@title, @description, @keyPoints, @example, @analogy, @tag, @orderIndex);
      `);

      const insertTopics = this.db.transaction(() => {
        for (const topic of SIGNALS_TOPICS_SEED) {
          insertTopic.run({
            ...topic,
            keyPoints: JSON.stringify(topic.keyPoints),
          });
        }
      });
      insertTopics();
    }

    const quizCount = (
      this.db
        .prepare('SELECT COUNT(*) AS count FROM signals_quizzes')
        .get() as { count: number }
    ).count;

    if (quizCount === 0) {
      const insertQuiz = this.db.prepare(`
        INSERT INTO signals_quizzes (question, code_snippet, options, correct_index, explanation, order_index)
        VALUES (@question, @codeSnippet, @options, @correctIndex, @explanation, @orderIndex);
      `);

      const insertQuizzes = this.db.transaction(() => {
        for (const quiz of SIGNALS_QUIZZES_SEED) {
          insertQuiz.run({ ...quiz, options: JSON.stringify(quiz.options) });
        }
      });
      insertQuizzes();
    }
  }
}
