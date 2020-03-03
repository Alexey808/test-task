import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputComponent ],
      imports: [ ReactiveFormsModule, BrowserDynamicTestingModule ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should component create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialisation control form', () => {
    const formGroup = component.initForm(null);
    const inputValue = formGroup.get('inputValue').value;
    expect(inputValue).toBeNull();
  });

  it('should emit value', () => {
    let result = null;
    component.form.get('inputValue').setValue('test');
    fixture.componentInstance.currentValue.subscribe(valueEmit => {
      result = valueEmit;
    });
    component.emitValue(component.form.get('inputValue').value);
    expect(result).toContain('test');
  });

  it('should by valid input value', () => {
    component.minLength = 3;
    component.maxLength = 10;
    const formGroup = component.initForm('test');
    expect(formGroup.valid).toBeTruthy();
  });
});
