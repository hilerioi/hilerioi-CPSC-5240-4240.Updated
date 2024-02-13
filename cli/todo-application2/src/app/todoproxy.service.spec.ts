import { TestBed } from '@angular/core/testing';

import { TodoproxyService } from './todoproxy.service';

describe('TodoproxyService', () => {
  let service: TodoproxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoproxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
