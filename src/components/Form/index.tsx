import { useEffect, useRef, useState } from 'react';
import { FieldState, Field } from '../Field';
import { useForm, useFormContext } from 'react-hook-form';

export type FormState = FieldState[];
export interface FormProps extends React.ComponentProps<'form'> {
  fields: FieldState[];
}
export const Form: React.FC<FormProps> = ({
  fields,
  children,
  onSubmit,
  ...props
}) => {
  const { handleSubmit } = useFormContext();

  return (
    <form
      {...props}
      onSubmit={handleSubmit((data, event) => {
        onSubmit?.({ ...(event as any), detail: data });
      })}
    >
      {fields.map((field) => {
        // We could support different components based on the field type here
        return <Field key={field.name} state={field}></Field>;
      })}
      {children}
    </form>
  );
};
