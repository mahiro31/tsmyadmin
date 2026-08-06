import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { DatabaseService } from '../services/database.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-exsample',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exsample.component.html',
  styleUrls: ['./exsample.component.css']
})
export class ExsampleComponent implements OnInit {
  users$!: Observable<any[]>; // ユーザーリストをObservableとして保持

  // dbServiceをプロパティとして公開し、テンプレートからアクセス可能にする
  public dbService = new DatabaseService();

  constructor(private titleService: Title, private dbServiceParam: DatabaseService) {}

  ngOnInit(): void {
    this.titleService.setTitle('サンプル');
    // 初期化時にDB接続が成功しているか確認し、データ取得を行う
    this.dbServiceParam.connectionStatus$.subscribe(isConnected => {
      if (isConnected) {
        this.users$ = this.dbServiceParam.getUsers();
      } else {
        console.error('Cannot fetch users: Database connection is not established.');
        // 接続失敗時は空のObservableをセット
        this.users$ = of([]); 
      }
    });
  }
}
