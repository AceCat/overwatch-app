import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAnalyzerComponent } from './team-analyzer.component';

describe('TeamAnalyzerComponent', () => {
  let component: TeamAnalyzerComponent;
  let fixture: ComponentFixture<TeamAnalyzerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamAnalyzerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamAnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
