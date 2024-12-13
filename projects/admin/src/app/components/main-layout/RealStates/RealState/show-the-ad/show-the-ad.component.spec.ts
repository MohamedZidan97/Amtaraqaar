import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTheAdComponent } from './show-the-ad.component';

describe('ShowTheAdComponent', () => {
  let component: ShowTheAdComponent;
  let fixture: ComponentFixture<ShowTheAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowTheAdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowTheAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
