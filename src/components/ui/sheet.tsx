
// This is a compatibility file for React 16.x
// We're using CustomSheet instead of Radix UI Sheet (Dialog)
import {
  CustomSheet as Sheet,
  CustomSheetTrigger as SheetTrigger,
  CustomSheetClose as SheetClose,
  CustomSheetPortal as SheetPortal,
  CustomSheetOverlay as SheetOverlay,
  CustomSheetContent as SheetContent,
  CustomSheetHeader as SheetHeader,
  CustomSheetFooter as SheetFooter,
  CustomSheetTitle as SheetTitle,
  CustomSheetDescription as SheetDescription
} from "./custom-sheet";

export {
  Sheet, 
  SheetClose,
  SheetContent, 
  SheetDescription, 
  SheetFooter, 
  SheetHeader, 
  SheetOverlay, 
  SheetPortal, 
  SheetTitle, 
  SheetTrigger
}
