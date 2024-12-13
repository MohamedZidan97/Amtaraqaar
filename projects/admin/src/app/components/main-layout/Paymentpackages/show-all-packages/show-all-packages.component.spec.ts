import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllPackagesComponent } from './show-all-packages.component';

describe('ShowAllPackagesComponent', () => {
  let component: ShowAllPackagesComponent;
  let fixture: ComponentFixture<ShowAllPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowAllPackagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAllPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
