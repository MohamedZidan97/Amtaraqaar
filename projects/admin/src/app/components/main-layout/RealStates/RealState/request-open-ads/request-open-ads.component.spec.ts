import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestOpenAdsComponent } from './request-open-ads.component';

describe('RequestOpenAdsComponent', () => {
  let component: RequestOpenAdsComponent;
  let fixture: ComponentFixture<RequestOpenAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestOpenAdsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestOpenAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
