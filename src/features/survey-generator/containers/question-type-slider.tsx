import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  NestedDrawer,
} from "@/components/ui/drawer";
import { Plus } from "lucide-react";

export const QuestionTypeSlider = () => {
  return (
    <Drawer>
      <DrawerTrigger>
        <Plus />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add question</DrawerTitle>
          <DrawerDescription>
            Choose a survey question type to add
          </DrawerDescription>
        </DrawerHeader>
        <NestedDrawer>
          <DrawerTrigger>
            <Plus />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerTitle>Add question</DrawerTitle>
            <DrawerDescription>
              Choose a survey question type to add
            </DrawerDescription>
          </DrawerContent>
        </NestedDrawer>
      </DrawerContent>
    </Drawer>
  );
};
