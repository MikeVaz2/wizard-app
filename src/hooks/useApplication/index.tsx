import { useState } from 'react';
import { FieldState } from '../../components/Field';

export interface StepConfig {
  name: string;
  fields: FieldState[];
}

export interface Config {
  steps: StepConfig[];
  activeStep?: number;
  status: 'not-started' | 'in-progress' | 'completed';
}

const STORAGE_KEY = 'applicationConfig';

const useStorage = (key: string): Config | undefined => {
  const storedConfig = localStorage.getItem(key);
  if (storedConfig) {
    try {
      return JSON.parse(storedConfig) as Config;
    } catch (error) {
      console.error('Error parsing stored config:', error);
      return;
    }
  }
};

const initialConfig: Config = {
  steps: [
    {
      name: 'Personal Information',
      fields: [
        {
          name: 'firstName',
          label: 'First Name',
          required: true,
          value: 'Some',
          type: 'text',
        },
        { name: 'lastName', label: 'Last Name', value: '', type: 'text' },
      ],
    },
    {
      name: 'Contact Information',
      fields: [
        {
          name: 'email',
          label: 'Email',
          required: true,
          value: '',
          type: 'email',
        },
        { name: 'phone', label: 'Phone', value: '', type: 'tel' },
      ],
    },
    {
      name: 'Additional questions',
      fields: [
        {
          name: 'marriedStatus',
          label: 'Married Status',
          value: '',
          type: 'select',
          options: [
            { label: 'Single', value: 'single' },
            { label: 'Married', value: 'married' },
          ],
        },
        {
          name: 'age',
          label: 'Age',
          value: '',
          type: 'number',
          min: 18,
          max: 120,
          required: true,
        },
      ],
    },
  ],
  status: 'not-started',
};

export const useApplication: () => {
  config: Config;
  update: Function;
  reset: Function;
} = () => {
  const storedConfig = useStorage(STORAGE_KEY);
  const [config, setConfig] = useState<Config>(storedConfig ?? initialConfig);
  return {
    config: config,
    update: (config: Config) => {
      setConfig(config);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
      if (config.status === 'completed') {
        console.log('Application submitted:', config);
      }
    },
    reset: () => {
      console.log('Resetting application');
      localStorage.removeItem(STORAGE_KEY);
      setConfig(initialConfig);
    },
  };
};
