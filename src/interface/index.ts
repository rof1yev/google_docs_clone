import { LucideIcon } from "lucide-react";

export interface ToolbarSectionItem {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
}

export interface ITemplate {
  id: string;
  label: string;
  imageUrl: string;
}
