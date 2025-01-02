import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyOnTechnicalSupportMessageComponent } from './reply-on-technical-support-message.component';

describe('ReplyOnTechnicalSupportMessageComponent', () => {
  let component: ReplyOnTechnicalSupportMessageComponent;
  let fixture: ComponentFixture<ReplyOnTechnicalSupportMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReplyOnTechnicalSupportMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplyOnTechnicalSupportMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
