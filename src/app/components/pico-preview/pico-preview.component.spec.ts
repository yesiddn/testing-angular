import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicoPreviewComponent } from './pico-preview.component';

describe('PicoPreviewComponent', () => {
  let component: PicoPreviewComponent;
  let fixture: ComponentFixture<PicoPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PicoPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PicoPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
