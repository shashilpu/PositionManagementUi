import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Position {
  securityCode: string;
  quantity: number;
  displayQuantity?: string;
}

export interface Transaction {
  transactionId: number;
  tradeId: number;
  version: number;
  securityCode: string;
  quantity: number;
  action: string;
  type: string;
}

export interface TransactionRequest {
  tradeId: number;
  securityCode: string;
  quantity: number;
  action: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private apiUrl = 'http://localhost:5114/api';
  private positionsUrl = `${this.apiUrl}/positions`;
  private transactionsUrl = `${this.apiUrl}/transactions`;

  constructor(private http: HttpClient) { }

  getAllPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(this.positionsUrl);
  }

  getPosition(securityCode: string): Observable<Position> {
    return this.http.get<Position>(`${this.positionsUrl}/${securityCode}`);
  }

  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.transactionsUrl);
  }

  addTransaction(transaction: TransactionRequest): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.transactionsUrl}/insert`, transaction);
  }

  updateTransaction(transaction: TransactionRequest): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.transactionsUrl}/update`, transaction);
  }

  cancelTransaction(transaction: TransactionRequest): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.transactionsUrl}/cancel`, transaction);
  }
}
