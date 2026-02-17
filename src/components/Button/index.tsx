import React from 'react';
import './styles.css';

type ButtonProps = React.ComponentProps<'button'> & {
  variant?: 'primary' | 'neutral';
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = 'primary', ...rest }, ref) => {
    const classes = ['glass', className || ''].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        type={(rest as any).type || 'button'}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
