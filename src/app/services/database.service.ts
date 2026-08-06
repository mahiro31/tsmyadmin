import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';

/**
 * データベース接続を管理するサービス。
 * Docker Compose環境下では、ホスト名はサービス名（'db'）を使用します。
 */
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  // docker-compose.yamlのサービス名を使用
  private readonly host = 'db'; 
  private readonly port = 3306;
  private readonly user = 'root';
  private readonly password = 'rootpassword';
  private readonly databaseName = 'mydatabase';

  // 接続状態を管理するSubject
  private connectionStatusSubject = new BehaviorSubject<boolean>(false);
  public connectionStatus$: Observable<boolean> = this.connectionStatusSubject.asObservable();

  constructor() {
    console.log('DatabaseService initialized.');
  }

  /**
   * データベースへの接続を試みる（シミュレーション）。
   * @returns {Promise<void>} 接続が成功した場合は完了、失敗した場合はエラーを投げる。
   */
  connect(): Observable<boolean> {
    console.log(`Attempting to connect to DB: ${this.user}@${this.host}:${this.port}/${this.databaseName}`);

    // 実際のDB接続ライブラリ（例: mysql2）を使用する場合、ここでPromiseベースの接続処理を行います。
    // ここでは、Dockerネットワーク経由での通信をシミュレートし、成功するまで待機します。
    return of(true).pipe(
      delay(1500), // 接続に1.5秒かかることをシミュレート
      tap(() => {
        this.connectionStatusSubject.next(true);
        console.log('Database connection successful.');
      }),
      catchError((error) => {
        this.connectionStatusSubject.next(false);
        console.error('Failed to connect to database:', error);
        return throwError(() => new Error('DB接続に失敗しました。サービス名やポートを確認してください。'));
      })
    );
  }

  /**
   * DBからデータを取得する（ダミーデータ）。
   */
  getInitialData(): Observable<any[]> {
    console.log('Fetching initial data from database...');
    // 接続が確立されていることを前提とします。
    const dummyData = [
      { id: 1, name: 'User A', status: 'Active' },
      { id: 2, name: 'User B', status: 'Inactive' }
    ];
    return of(dummyData);
  }

  /**
   * 接続をクローズする（シミュレーション）。
   */
  disconnect(): void {
    console.log('Disconnecting from database.');
    this.connectionStatusSubject.next(false);
  }
}
