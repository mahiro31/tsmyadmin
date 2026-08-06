import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sample2 } from './sample2';

describe('Sample2', () => {
  let component: Sample2;
  let fixture: ComponentFixture<Sample2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sample2],
    }).compileComponents();

    fixture = TestBed.createComponent(Sample2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
