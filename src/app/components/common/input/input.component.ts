import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class InputComponent implements OnInit, OnDestroy {
  @Input() minLength: number | null = null;
  @Input() maxLength: number | null = null;
  @Output() currentValue = new EventEmitter<string | null>(null);

  form: FormGroup;

  constructor() { }
  value$: Observable<any> = of(null);
  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(
      this.value$.subscribe((value: string | null) => {
        this.form = this.initForm(value);
      })
    );

    this.subscription.add(
      this.form.get('inputValue').valueChanges.pipe(
        debounceTime(200),
      ).subscribe((value: string | null) => {
        this.emitValue(value);
      })
    );
  }

  initForm(value: string | null): FormGroup {
    return new FormGroup({
      inputValue: new FormControl(value, [
        Validators.minLength(this.minLength),
        Validators.maxLength(this.maxLength),
      ])
    });
  }

  emitValue(value: string | null): void {
    this.currentValue.emit(value);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
