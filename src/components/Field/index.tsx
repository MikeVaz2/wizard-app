import './styles.css';
import { FieldValues, useFormContext, UseFormRegister } from 'react-hook-form';

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

export const RenderComponent: React.FC<{
  state: FieldState;
  register: UseFormRegister<FieldValues>;
  formState: any;
}> = ({ state, register, formState }) => {
  switch (state.type) {
    case 'select':
      return (
        <select
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
          className="glass"
          data-theme="inverse"
        >
          {(state.options ?? []).map((option: Option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );

    default:
      return (
        <input
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
      );
  }
};

export function Field({ state }: { state: FieldState }) {
  const { register, formState } = useFormContext();
  return (
    <p>
      <label>
        <span>{state.label}</span>
        {RenderComponent({ state, register, formState })}
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
