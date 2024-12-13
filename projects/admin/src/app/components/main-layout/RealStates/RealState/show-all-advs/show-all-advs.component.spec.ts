import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllAdvsComponent } from './show-all-advs.component';

describe('ShowAllAdvsComponent', () => {
  let component: ShowAllAdvsComponent;
  let fixture: ComponentFixture<ShowAllAdvsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowAllAdvsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAllAdvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
