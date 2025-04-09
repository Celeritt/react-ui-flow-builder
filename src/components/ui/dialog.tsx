
// This is a compatibility file for React 16.x
// We're using CustomDialog instead of Radix UI Dialog
import {
  CustomDialog as Dialog,
  CustomDialogTrigger as DialogTrigger,
  CustomDialogPortal as DialogPortal,
  CustomDialogOverlay as DialogOverlay,
  CustomDialogClose as DialogClose,
  CustomDialogContent as DialogContent,
  CustomDialogHeader as DialogHeader,
  CustomDialogFooter as DialogFooter,
  CustomDialogTitle as DialogTitle,
  CustomDialogDescription as DialogDescription
} from "./custom-dialog";

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
