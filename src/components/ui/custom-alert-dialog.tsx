
import React, { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface AlertDialogProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const CustomAlertDialog: React.FC<AlertDialogProps> = ({
  children,
  open: controlledOpen,
  onOpenChange,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  // Context to pass down the open state and setter
  const context = {
    open,
    onOpenChange: handleOpenChange,
  };

  return (
    <AlertDialogProvider value={context}>
      {children}
    </AlertDialogProvider>
  );
};

// Context
const AlertDialogContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>({
  open: false,
  onOpenChange: () => {},
});

const AlertDialogProvider = ({ value, children }: { value: any, children: React.ReactNode }) => (
  <AlertDialogContext.Provider value={value}>{children}</AlertDialogContext.Provider>
);

export const CustomAlertDialogTrigger: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  const { onOpenChange } = React.useContext(AlertDialogContext);
  
  return (
    <button type="button" onClick={() => onOpenChange(true)} {...props}>
      {children}
    </button>
  );
};

export const CustomAlertDialogPortal: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return <>{children}</>;
};

export const CustomAlertDialogOverlay: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  const { open } = React.useContext(AlertDialogContext);
  
  if (!open) return null;
  
  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 bg-black/80 animate-in fade-in-0",
        className
      )}
      {...props}
    />
  );
};

export const CustomAlertDialogContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  const { open } = React.useContext(AlertDialogContext);
  const ref = useRef<HTMLDivElement>(null);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CustomAlertDialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
);

export const CustomAlertDialogFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);

export const CustomAlertDialogTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => (
  <h3
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
);

export const CustomAlertDialogDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...props
}) => (
  <p
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
);

export const CustomAlertDialogAction: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => {
  const { onOpenChange } = React.useContext(AlertDialogContext);
  
  return (
    <button
      className={cn(buttonVariants(), className)}
      onClick={() => onOpenChange(false)}
      {...props}
    />
  );
};

export const CustomAlertDialogCancel: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => {
  const { onOpenChange } = React.useContext(AlertDialogContext);
  
  return (
    <button
      className={cn(
        buttonVariants({ variant: "outline" }),
        "mt-2 sm:mt-0",
        className
      )}
      onClick={() => onOpenChange(false)}
      {...props}
    />
  );
};
