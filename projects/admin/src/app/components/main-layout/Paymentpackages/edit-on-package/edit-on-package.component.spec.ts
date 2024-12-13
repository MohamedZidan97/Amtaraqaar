import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOnPackageComponent } from './edit-on-package.component';

describe('EditOnPackageComponent', () => {
  let component: EditOnPackageComponent;
  let fixture: ComponentFixture<EditOnPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditOnPackageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditOnPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
