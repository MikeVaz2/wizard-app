import './styles.css';
import { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';

export type FieldValidationFunction = (field: FieldState) => boolean;

export interface ValidationRules {
  min?: string | number;
  max?: string | number;
  maxLength?: number;
  minLength?: number;
  pattern?: RegExp;
  required?: boolean;
  validate?: FieldValidationFunction;
}

export interface Field {
  name: string;
  type: string;
  value: string;
  disabled?: boolean;
  label?: string;
}

export interface Option {
  label: string;
  value: string;
}

export interface Select {
  options?: Option[];
}

export interface FieldState extends Field, ValidationRules, Select {}

const errorsByType: Record<string, string> = {
  '': 'Invalid value',
  required: 'This field is required',
  min: 'Value is too low',
  max: 'Value is too high',
  minLength: 'Value is too short',
  maxLength: 'Value is too long',
  pattern: 'Value does not match the required pattern',
};

export const FieldComponent: Record<
  string,
  React.ForwardRefExoticComponent<
    React.ComponentProps<any> & React.RefAttributes<any>
  >
> = {
  text: forwardRef<HTMLInputElement>((props, ref) => (
    <input {...props} ref={ref} className="glass" data-theme="inverse" />
  )),
  select: forwardRef<HTMLSelectElement>((props, ref) => (
    <select
      {...props}
      ref={ref}
      className="glass"
      data-theme="inverse"
    ></select>
  )),
};

export function Field({ state }: { state: FieldState }) {
  const { register, formState } = useFormContext();
  const Component = FieldComponent[state.type] || FieldComponent['text'];
  return (
    <p>
      <label>
        <span>{state.label}</span>
        <Component
          type={state.type}
          disabled={state.disabled}
          data-invalid={!!formState.errors[state.name]}
          aria-required={state.required}
          {...register(state.name, {
            value: state.value,
            required: state.required,
            min: state.min,
            max: state.max,
            maxLength: state.maxLength,
            minLength: state.minLength,
            pattern: state.pattern,
            validate: state.validate,
          })}
        />
      </label>

      {formState.errors[state.name] && (
        <span role="alert">
          {(formState.errors[state.name]?.message as string) ||
            errorsByType[(formState.errors[state.name]?.type as string) || '']}
        </span>
      )}
    </p>
  );
}
