import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlOnFeaturesComponent } from './control-on-features.component';

describe('ControlOnFeaturesComponent', () => {
  let component: ControlOnFeaturesComponent;
  let fixture: ComponentFixture<ControlOnFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlOnFeaturesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlOnFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
