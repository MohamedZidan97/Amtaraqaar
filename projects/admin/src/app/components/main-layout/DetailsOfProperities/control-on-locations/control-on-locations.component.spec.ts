import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlOnLocationsComponent } from './control-on-locations.component';

describe('ControlOnLocationsComponent', () => {
  let component: ControlOnLocationsComponent;
  let fixture: ComponentFixture<ControlOnLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlOnLocationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlOnLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
