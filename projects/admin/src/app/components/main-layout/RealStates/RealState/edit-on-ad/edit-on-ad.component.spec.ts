import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOnAdComponent } from './edit-on-ad.component';

describe('EditOnAdComponent', () => {
  let component: EditOnAdComponent;
  let fixture: ComponentFixture<EditOnAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditOnAdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditOnAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
