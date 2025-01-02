import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatTableModule } from '@angular/material/table';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';

export interface UserData {
  id: number;
  name: string;
  age: number;
}
@Component({
  selector: 'app-regiser',
  standalone: true,
  imports: [BrowserModule,
    BrowserAnimationsModule,
    // MatTableModule,
    // MatCardModule,
    // MatButtonModule,
  ],
  templateUrl: './regiser.component.html',
  styleUrl: './regiser.component.scss'
})
export class RegiserComponent {
 // Table Data
 dataSource: UserData[] = [
  { id: 1, name: 'محمد أحمد', age: 25 },
  { id: 2, name: 'أحمد علي', age: 30 },
  { id: 3, name: 'سارة محمد', age: 22 },
  { id: 4, name: 'ليلى حسن', age: 28 },
];

// Table Columns
displayedColumns: string[] = ['id', 'name', 'age', 'action'];

// Edit Action
edit(element: UserData) {
  console.log('Editing:', element);
}

// Delete Action
delete(element: UserData) {
  console.log('Deleting:', element);
}
}
