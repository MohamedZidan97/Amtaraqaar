import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOfLocationComponent } from './details-of-location.component';

describe('DetailsOfLocationComponent', () => {
  let component: DetailsOfLocationComponent;
  let fixture: ComponentFixture<DetailsOfLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsOfLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsOfLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
