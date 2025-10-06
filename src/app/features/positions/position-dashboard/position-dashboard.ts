import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PositionService, Position } from '../../../core/services/position';

export interface Transaction {
  tradeId: number;
  securityCode: string;
  quantity: number;
  action: string;
  type: string;
}

@Component({
  selector: 'app-position-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './position-dashboard.html',
  styleUrl: './position-dashboard.scss'
})
export class PositionDashboard implements OnInit {
  positions: Position[] = [];
  loading = false;
  error: string | null = null;
  showTransactionForm = false;
  addingTransaction = false;
  
  newTransaction: Transaction = {
    tradeId: 0,
    securityCode: '',
    quantity: 0,
    action: 'Insert',
    type: 'Buy'
  };

  constructor(private positionService: PositionService) { }

  ngOnInit(): void {
    this.loadPositions();
  }

  loadPositions(): void {
    this.loading = true;
    this.error = null;
    
    this.positionService.getAllPositions().subscribe({
      next: (positions) => {
        this.positions = positions;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load positions. Please check if the API is running.';
        this.loading = false;
        console.error('Error loading positions:', error);
      }
    });
  }

  refreshPositions(): void {
    this.loadPositions();
  }

  getLongPositionsCount(): number {
    return this.positions.filter(p => p.quantity > 0).length;
  }

  getShortPositionsCount(): number {
    return this.positions.filter(p => p.quantity < 0).length;
  }

  getQuantityClass(quantity: number): string {
    if (quantity > 0) return 'positive';
    if (quantity < 0) return 'negative';
    return 'neutral';
  }

  getPositionTypeClass(quantity: number): string {
    if (quantity > 0) return 'long';
    if (quantity < 0) return 'short';
    return 'flat';
  }

  getPositionType(quantity: number): string {
    if (quantity > 0) return 'LONG';
    if (quantity < 0) return 'SHORT';
    return 'FLAT';
  }

  getMarketValue(position: Position): number {
    // Mock market value calculation (in real app, this would come from market data)
    const mockPrice = 100; // Mock price per share
    return Math.abs(position.quantity) * mockPrice;
  }

  addTransaction(): void {
    this.addingTransaction = true;
    
    this.positionService.addTransaction(this.newTransaction).subscribe({
      next: (transaction) => {
        console.log('Transaction added:', transaction);
        this.addingTransaction = false;
        this.closeTransactionForm();
        this.refreshPositions();
      },
      error: (error) => {
        console.error('Error adding transaction:', error);
        this.addingTransaction = false;
        this.error = 'Failed to add transaction. Please try again.';
      }
    });
  }

  closeTransactionForm(): void {
    this.showTransactionForm = false;
    this.newTransaction = {
      tradeId: 0,
      securityCode: '',
      quantity: 0,
      action: 'Insert',
      type: 'Buy'
    };
  }
}
