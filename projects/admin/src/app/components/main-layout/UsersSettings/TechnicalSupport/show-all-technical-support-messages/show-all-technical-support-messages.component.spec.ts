import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllTechnicalSupportMessagesComponent } from './show-all-technical-support-messages.component';

describe('ShowAllTechnicalSupportMessagesComponent', () => {
  let component: ShowAllTechnicalSupportMessagesComponent;
  let fixture: ComponentFixture<ShowAllTechnicalSupportMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowAllTechnicalSupportMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAllTechnicalSupportMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
