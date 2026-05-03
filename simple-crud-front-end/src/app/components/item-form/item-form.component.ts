import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
  item: Item = { name: '', price: 0, description: '', category: '', active: true };
  isEdit = false;
  loading = false;
  error = '';

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isEdit = true;
      this.loading = true;
      this.itemService.getItem(+id).subscribe({
        next: (item) => { this.item = item; this.loading = false; },
        error: () => { this.error = 'Could not load item.'; this.loading = false; }
      });
    }
  }

  save(): void {
    if (!this.item.name.trim()) { this.error = 'Name is required.'; return; }
    this.loading = true;
    this.error = '';

    const request = this.isEdit
      ? this.itemService.updateItem(this.item.itemId!, this.item)
      : this.itemService.createItem(this.item);

    request.subscribe({
      next: () => this.router.navigate(['/items'], { queryParams: { success: this.isEdit ? 'updated' : 'created' } }),
      error: () => { this.error = 'Failed to save item.'; this.loading = false; }
    });
  }
}
