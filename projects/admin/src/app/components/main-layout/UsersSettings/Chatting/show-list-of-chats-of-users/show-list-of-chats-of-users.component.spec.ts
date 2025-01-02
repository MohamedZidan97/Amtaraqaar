import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowListOfChatsOfUsersComponent } from './show-list-of-chats-of-users.component';

describe('ShowListOfChatsOfUsersComponent', () => {
  let component: ShowListOfChatsOfUsersComponent;
  let fixture: ComponentFixture<ShowListOfChatsOfUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowListOfChatsOfUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowListOfChatsOfUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
