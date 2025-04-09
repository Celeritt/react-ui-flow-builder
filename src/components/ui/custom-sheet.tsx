
import React, { useState, useEffect, useRef } from 'react';
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

interface SheetProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const CustomSheet: React.FC<SheetProps> = ({
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
    <SheetProvider value={context}>
      {children}
    </SheetProvider>
  );
};

// Context
const SheetContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: "top" | "right" | "bottom" | "left";
}>({
  open: false,
  onOpenChange: () => {},
  side: "right",
});

const SheetProvider = ({ value, children }: { value: any, children: React.ReactNode }) => (
  <SheetContext.Provider value={value}>{children}</SheetContext.Provider>
);

export const CustomSheetTrigger: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  const { onOpenChange } = React.useContext(SheetContext);
  
  return (
    <button type="button" onClick={() => onOpenChange(true)} {...props}>
      {children}
    </button>
  );
};

export const CustomSheetClose: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => {
  const { onOpenChange } = React.useContext(SheetContext);

  return (
    <button 
      className={className}
      onClick={() => onOpenChange(false)}
      {...props}
    >
      {children}
    </button>
  );
};

export const CustomSheetPortal: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return <>{children}</>;
};

export const CustomSheetOverlay: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  const { open } = React.useContext(SheetContext);
  
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

interface CustomSheetContentProps 
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof sheetVariants> {}

export const CustomSheetContent: React.FC<CustomSheetContentProps> = ({
  side = "right",
  className,
  children,
  ...props
}) => {
  const { open, onOpenChange } = React.useContext(SheetContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <CustomSheetPortal>
      <CustomSheetOverlay />
      <div
        ref={ref}
        className={cn(sheetVariants({ side }), className)}
        {...props}
      >
        {children}
        <CustomSheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </CustomSheetClose>
      </div>
    </CustomSheetPortal>
  );
};

export const CustomSheetHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
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

export const CustomSheetFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
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

export const CustomSheetTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => (
  <h3
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
);

export const CustomSheetDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...props
}) => (
  <p
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
);
