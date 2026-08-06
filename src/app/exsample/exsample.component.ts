import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { DatabaseService } from '../services/database.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-exsample',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exsample.component.html',
  styleUrls: ['./exsample.component.css']
})
export class ExsampleComponent implements OnInit {
  users$!: Observable<any[]>; // ユーザーリストをObservableとして保持

  constructor(private titleService: Title, private dbService: DatabaseService) {}

  ngOnInit(): void {
    this.titleService.setTitle('サンプル');
    // 初期化時にDB接続が成功しているか確認し、データ取得を行う
    this.dbService.connectionStatus$.subscribe(isConnected => {
      if (isConnected) {
        this.users$ = this.dbService.getUsers();
      } else {
        console.error('Cannot fetch users: Database connection is not established.');
        this.users$ = of([]); // 接続失敗時は空のObservableをセット
      }
    });
  }
}
