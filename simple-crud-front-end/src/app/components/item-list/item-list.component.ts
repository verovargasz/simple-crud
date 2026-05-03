import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  loading = true;
  error = '';
  successMessage = '';

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute   // ← added
  ) {}

  ngOnInit(): void {
    // Read ?success=created|updated from the URL after a form save
    const success = this.route.snapshot.queryParamMap.get('success');
    if (success === 'created') this.showSuccess('Item created.');
    if (success === 'updated') this.showSuccess('Item updated.');

    this.loadItems();
  }

  loadItems(): void {
    this.loading = true;
    this.error = '';
    this.itemService.getItems().subscribe({
      next: (items) => {
        this.items = items;
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load items. Is the API running?';
        this.loading = false;
      }
    });
  }

  deleteItem(id: number): void {
    if (!confirm('Delete this item?')) return;
    this.itemService.deleteItem(id).subscribe({
      next: () => {
        this.items = this.items.filter(i => i.itemId !== id);
        this.showSuccess('Item deleted.');
      },
      error: () => this.error = 'Failed to delete item.'
    });
  }

  showSuccess(msg: string): void {
    this.successMessage = msg;
    setTimeout(() => this.successMessage = '', 3000);
  }
}
