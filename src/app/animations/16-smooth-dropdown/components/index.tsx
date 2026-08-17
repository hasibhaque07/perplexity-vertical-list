import { useSharedValue } from "react-native-reanimated";
import DropdownListItem, { DropdownItemType } from "./dropdown-list-item";

type DropdownProps = {
  header: DropdownItemType;
  options: DropdownItemType[];
};

const Dropdown: React.FC<DropdownProps> = ({ header, options }) => {
  const dropdownItems = [header, ...options];
  const isExpanded = useSharedValue(false);

  return (
    <>
      {dropdownItems.map((item, index) => {
        return (
          <DropdownListItem
            key={index}
            index={index}
            {...item}
            isExpanded={isExpanded}
            dropdownItemsCount={dropdownItems.length}
          />
        );
      })}
    </>
  );
};

export default Dropdown;
