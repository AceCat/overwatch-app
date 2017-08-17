import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterBrowserComponent } from './character-browser.component';

describe('CharacterBrowserComponent', () => {
  let component: CharacterBrowserComponent;
  let fixture: ComponentFixture<CharacterBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
