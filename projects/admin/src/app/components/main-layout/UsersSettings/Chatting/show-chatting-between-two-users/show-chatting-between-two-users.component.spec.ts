import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowChattingBetweenTwoUsersComponent } from './show-chatting-between-two-users.component';

describe('ShowChattingBetweenTwoUsersComponent', () => {
  let component: ShowChattingBetweenTwoUsersComponent;
  let fixture: ComponentFixture<ShowChattingBetweenTwoUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowChattingBetweenTwoUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowChattingBetweenTwoUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
