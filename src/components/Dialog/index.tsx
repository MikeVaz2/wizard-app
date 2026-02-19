import { useEffect, useRef } from 'react';

export interface DialogProps extends React.ComponentProps<'dialog'> {
  open: boolean;
  modal?: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}

export function Dialog({
  open,
  modal,
  children,
  onClose,
  ...rest
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!ref) {
      return;
    }
    if (open && modal) {
      ref.current?.showModal();
    } else if (open) {
      ref.current?.show();
    } else {
      ref.current?.close();
    }
  }, [open, modal, ref]);
  return (
    <dialog ref={ref} onClose={(e) => onClose?.()} {...rest}>
      {children}
    </dialog>
  );
}
