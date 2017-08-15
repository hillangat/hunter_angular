import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTaskGridComponentComponent } from './test-task-grid-component.component';

describe('TestTaskGridComponentComponent', () => {
  let component: TestTaskGridComponentComponent;
  let fixture: ComponentFixture<TestTaskGridComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTaskGridComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTaskGridComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
