/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { RXJS_QUIZZES_SEED, RXJS_SEED } from './rxjs.seed';
import { FlowchartNode, RxjsQuiz, RxjsTopic } from './rxjs.types';

const FLOWCHART_NODES: FlowchartNode[] = [
  {
    id: 'start',
    question: 'Do you need to transform each value?',
    yesLabel: 'Yes → each value maps to another value',
    noLabel: 'No → I need to filter or combine',
    yesNext: 'transform',
    noNext: 'filter',
    result: null,
  },
  {
    id: 'transform',
    question: 'Does each value trigger a new Observable (e.g. HTTP call)?',
    yesLabel: 'Yes',
    noLabel: 'No → just change the value',
    yesNext: 'inner',
    noNext: null,
    result: 'Use map',
  },
  {
    id: 'inner',
    question: 'Should a new emission cancel the previous in-flight request?',
    yesLabel: 'Yes → e.g. search box, route change',
    noLabel: 'No',
    yesNext: null,
    noNext: 'parallel',
    result: 'Use switchMap',
  },
  {
    id: 'parallel',
    question: 'Should all requests run in parallel?',
    yesLabel: 'Yes → fire and forget, order does not matter',
    noLabel: 'No → preserve order',
    yesNext: null,
    noNext: null,
    result: 'Use mergeMap',
  },
  {
    id: 'filter',
    question: 'Do you want to suppress rapid-fire events (e.g. keystrokes)?',
    yesLabel: 'Yes',
    noLabel: 'No → just skip unwanted values',
    yesNext: null,
    noNext: null,
    result: 'Use debounceTime + distinctUntilChanged',
  },
];

@Injectable()
export class RxjsRepository {
  private readonly db: Database.Database;

  constructor() {
    const dbPath = resolve(process.cwd(), 'data', 'practices.sqlite');
    mkdirSync(dirname(dbPath), { recursive: true });
    this.db = new Database(dbPath);
    this.createSchema();
    this.seedWhenEmpty();
  }

  findAllTopics(): RxjsTopic[] {
    const query = this.db.prepare(`
      SELECT
        title,
        description,
        key_points AS keyPoints,
        example,
        analogy,
        tag,
        order_index AS orderIndex
      FROM rxjs_topics
      ORDER BY order_index ASC;
    `);

    return (
      query.all() as Array<Omit<RxjsTopic, 'keyPoints'> & { keyPoints: string }>
    ).map((row) => ({
      ...row,
      keyPoints: JSON.parse(row.keyPoints) as string[],
    }));
  }

  findAllQuizzes(): RxjsQuiz[] {
    const query = this.db.prepare(`
      SELECT
        question,
        code_snippet AS codeSnippet,
        options,
        correct_index AS correctIndex,
        explanation,
        order_index AS orderIndex
      FROM rxjs_quizzes
      ORDER BY order_index ASC;
    `);

    return (
      query.all() as Array<Omit<RxjsQuiz, 'options'> & { options: string }>
    ).map((row) => ({
      ...row,
      options: JSON.parse(row.options) as string[],
    }));
  }

  findFlowchartNodes(): FlowchartNode[] {
    return FLOWCHART_NODES;
  }

  private createSchema(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS rxjs_topics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        key_points TEXT NOT NULL,
        example TEXT NOT NULL,
        analogy TEXT NOT NULL DEFAULT '',
        tag TEXT NOT NULL,
        order_index INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS rxjs_quizzes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT NOT NULL,
        code_snippet TEXT NOT NULL,
        options TEXT NOT NULL,
        correct_index INTEGER NOT NULL,
        explanation TEXT NOT NULL,
        order_index INTEGER NOT NULL
      );
    `);
  }

  private seedWhenEmpty(): void {
    const topicsCount = this.db
      .prepare('SELECT COUNT(*) AS count FROM rxjs_topics;')
      .get() as { count: number };

    if (topicsCount.count === 0) {
      const insert = this.db.prepare(`
        INSERT INTO rxjs_topics (title, description, key_points, example, analogy, tag, order_index)
        VALUES (@title, @description, @keyPoints, @example, @analogy, @tag, @orderIndex);
      `);

      this.db.transaction((topics: RxjsTopic[]) => {
        for (const topic of topics) {
          insert.run({ ...topic, keyPoints: JSON.stringify(topic.keyPoints) });
        }
      })(RXJS_SEED);
    }

    const quizzesCount = this.db
      .prepare('SELECT COUNT(*) AS count FROM rxjs_quizzes;')
      .get() as { count: number };

    if (quizzesCount.count === 0) {
      const insert = this.db.prepare(`
        INSERT INTO rxjs_quizzes (question, code_snippet, options, correct_index, explanation, order_index)
        VALUES (@question, @codeSnippet, @options, @correctIndex, @explanation, @orderIndex);
      `);

      this.db.transaction((quizzes: RxjsQuiz[]) => {
        for (const quiz of quizzes) {
          insert.run({ ...quiz, options: JSON.stringify(quiz.options) });
        }
      })(RXJS_QUIZZES_SEED);
    }
  }
}
