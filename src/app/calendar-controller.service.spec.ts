import { TestBed } from '@angular/core/testing';

import { CalendarControllerService } from './calendar-controller.service';

describe('CalendarControllerService', () => {
  let service: CalendarControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
