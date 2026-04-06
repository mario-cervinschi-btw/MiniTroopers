import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-statistics-overview',
  templateUrl: './statistics-overview.component.html',
  styleUrl: './statistics-overview.component.scss',
  standalone: false,
})
export class StatisticsOverviewComponent implements OnInit {
  constructor(public statisticsService: StatisticsService) {}

  ngOnInit(): void {}
}
