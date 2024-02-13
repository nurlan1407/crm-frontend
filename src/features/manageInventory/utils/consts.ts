import { ReactNode } from "react";
import { MdDashboard } from "react-icons/md";
import { FaTable } from "react-icons/fa";
import { IoIosRefresh } from "react-icons/io";
import { IconType } from "react-icons";

export interface SettingMenuOption {
    title: string;
    icon: IconType;
    isCheckbox?: boolean;
}
export const SettingsMenu: SettingMenuOption[] = [
    {
        title: "Table view",
        icon: FaTable,
        isCheckbox: true
    },
    {
        title: "Dashboard view",
        icon: MdDashboard,
        isCheckbox: true
    },
    {
        title: "Refresh",
        icon: IoIosRefresh,
        isCheckbox: false
    }
]