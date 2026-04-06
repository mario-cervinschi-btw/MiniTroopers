export interface StatisticData {
  title: string;
  data: string;
}

export interface StatisticCategory {
  title: string;
  data: StatisticData[];
}

export interface Statistics {
  data: StatisticCategory[];
}
