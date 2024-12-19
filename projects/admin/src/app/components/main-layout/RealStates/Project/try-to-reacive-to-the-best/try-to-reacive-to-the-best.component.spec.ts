import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TryToReaciveToTheBestComponent } from './try-to-reacive-to-the-best.component';

describe('TryToReaciveToTheBestComponent', () => {
  let component: TryToReaciveToTheBestComponent;
  let fixture: ComponentFixture<TryToReaciveToTheBestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TryToReaciveToTheBestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TryToReaciveToTheBestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
