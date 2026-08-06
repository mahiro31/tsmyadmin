import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-exsample',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exsample.component.html',
  styleUrls: ['./exsample.component.css']
})
export class ExsampleComponent implements OnInit {
  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('サンプル');
  }
}
