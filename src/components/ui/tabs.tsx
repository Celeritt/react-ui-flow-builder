
// This is a compatibility file so imports don't break
// We're using CustomTabs instead of Radix UI Tabs due to React 16.x compatibility
import {
  CustomTabs as Tabs,
  CustomTabsList as TabsList,
  CustomTabsTrigger as TabsTrigger,
  CustomTabsContent as TabsContent
} from "./custom-tabs";

export { Tabs, TabsList, TabsTrigger, TabsContent };
