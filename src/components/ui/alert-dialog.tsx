
// This is a compatibility file for React 16.x
// We're using CustomAlertDialog instead of Radix UI AlertDialog
import {
  CustomAlertDialog as AlertDialog,
  CustomAlertDialogTrigger as AlertDialogTrigger,
  CustomAlertDialogPortal as AlertDialogPortal,
  CustomAlertDialogOverlay as AlertDialogOverlay,
  CustomAlertDialogContent as AlertDialogContent,
  CustomAlertDialogHeader as AlertDialogHeader,
  CustomAlertDialogFooter as AlertDialogFooter,
  CustomAlertDialogTitle as AlertDialogTitle,
  CustomAlertDialogDescription as AlertDialogDescription,
  CustomAlertDialogAction as AlertDialogAction,
  CustomAlertDialogCancel as AlertDialogCancel
} from "./custom-alert-dialog";

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
