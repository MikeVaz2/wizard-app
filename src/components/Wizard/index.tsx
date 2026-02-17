import React from 'react';
import './styles.css';
import { Config } from '../../hooks/useApplication';
import { Button } from '../Button';
import { Dialog } from '../Dialog';
import { Form } from '../Form';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
export const Wizard: React.FC<{
  open: boolean;
  config: Config;
  onClose: () => void;
  update: Function;
  reset: Function;
}> = ({ open, onClose, config, update, reset }) => {
  const step = config.steps[config.activeStep ?? 0];
  const methods = useForm({ mode: 'all' });
  console.log({ config, step });

  function handleAction(data: any, action: string) {
    // update the field values in the config
    const updatedFields = step.fields.map((field) => {
      if (field.name in data) {
        return { ...field, value: data[field.name] };
      }
      return field;
    });

    const updatedSteps = config.steps.map((s, index) => {
      if (index === (config.activeStep ?? 0)) {
        return { ...s, fields: updatedFields };
      } else {
        return s;
      }
    });

    switch (action) {
      case 'prev':
        update({
          ...config,
          status: 'in-progress',
          steps: [...updatedSteps],
          activeStep: (config.activeStep ?? 0) - 1,
        });
        break;
      case 'next':
        update({
          ...config,
          status: 'in-progress',
          steps: [...updatedSteps],
          activeStep: (config.activeStep ?? 0) + 1,
        });
        break;
      case 'submit':
        update({
          ...config,
          status: 'completed',
          activeStep: 0,
          steps: [...updatedSteps],
        });
        break;
    }
  }
  return (
    <Dialog open={open} modal onClose={onClose} className="glass">
      {config.status === 'completed' && (
        <>
          <header>Application Completed!</header>
          <p data-role="actions">
            <Button type="button" className="glass inverse" onClick={onClose}>
              Close
            </Button>
            <Button
              type="button"
              className="glossy-black-button"
              onClick={() => {
                reset();
              }}
            >
              Reset Application
            </Button>
          </p>
        </>
      )}
      {config.status !== 'completed' && (
        <FormProvider {...methods}>
          <header>{step.name}</header>
          <Form
            method="dialog"
            fields={step.fields}
            onSubmit={(event) => {
              const data = (event as any).detail;
              const action = (event.nativeEvent as any).submitter?.value;
              handleAction(data, action);
            }}
          >
            <p data-role="actions">
              <Button
                type="button"
                className="glossy-black-button"
                onClick={onClose}
              >
                Close
              </Button>

              {(config.activeStep ?? 0) > 0 && (
                <Button
                  name="action"
                  value="prev"
                  className="glossy-black-button"
                  onClick={() => {
                    const data = methods.getValues();
                    const action = 'prev';
                    handleAction(data, action);
                  }}
                >
                  Previous
                </Button>
              )}

              {(config.activeStep ?? 0) < config.steps.length - 1 ? (
                <Button
                  type="submit"
                  name="action"
                  value="next"
                  className="glossy-black-button"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  name="action"
                  value="submit"
                  className="glossy-black-button"
                >
                  Submit
                </Button>
              )}
            </p>
          </Form>
        </FormProvider>
      )}
    </Dialog>
  );
};
