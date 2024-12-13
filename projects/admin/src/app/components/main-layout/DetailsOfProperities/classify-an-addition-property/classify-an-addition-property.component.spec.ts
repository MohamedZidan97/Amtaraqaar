import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassifyAnAdditionPropertyComponent } from './classify-an-addition-property.component';

describe('ClassifyAnAdditionPropertyComponent', () => {
  let component: ClassifyAnAdditionPropertyComponent;
  let fixture: ComponentFixture<ClassifyAnAdditionPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassifyAnAdditionPropertyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassifyAnAdditionPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
