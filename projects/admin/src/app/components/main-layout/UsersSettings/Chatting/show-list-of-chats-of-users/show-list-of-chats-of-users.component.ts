import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-show-list-of-chats-of-users',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './show-list-of-chats-of-users.component.html',
  styleUrl: './show-list-of-chats-of-users.component.scss'
})
export class ShowListOfChatsOfUsersComponent {
  messages = [
    { text: 'Hello, how are you?', time: '10:00 AM' },
    { text: 'I am fine, thank you!', time: '10:02 AM' },
  ];

  messagesSent = [
    { text: 'What about you?', time: '10:03 AM' },
    { text: 'I am doing great too.', time: '10:04 AM' },
  ];
}
