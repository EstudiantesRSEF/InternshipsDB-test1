import React, { useState } from "react";
import {
  Menu
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup,
  MenuOptionGroup,
  MenuItemOption
} from "@chakra-ui/react";

const MultiSelectMenu = (props) => {
  const { label, options, buttonProps } = props;
  const [selectedOptions, setSelectedOptions] = useState([]);
  return (
    <Menu closeOnSelect={false}>
      {({ onClose }) => (
        <>
          <MenuButton
            type="button"
            backgroundColor={selectedOptions.length ? "purple.200" : "white"}
            color={selectedOptions.length ? "purple.500" : "gray.600"}
            borderColor={selectedOptions.length ? "purple.200" : "gray.300"}
            borderWidth={1}
            p={2}
            px={4}
            borderRadius="25px"
            _focus={{
              outline: "none"
            }}
            {...buttonProps}
          >
            {`${label}${
              selectedOptions.length > 0 ? ` (${selectedOptions.length})` : ""
            }`}
          </MenuButton>
          <MenuList>
            <MenuGroup title={undefined}>
              <MenuItem
                onClick={() => {
                  setSelectedOptions([]);
                  // Have to close, otherwise the defaultValue won't be reset correctly
                  // and so the UI won't immediately show the menu item options unselected.
                  onClose();
                }}
              >
                Clear all
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuOptionGroup
              title={undefined}
              defaultValue={selectedOptions}
              type="checkbox"  
              onChange={(values) => {
                setSelectedOptions(values.filter((_) => _.length));
                props.onChange?.(values, props.name);
              }}
              /* eslint-enable @typescript-eslint/ban-ts-comment */
            >
              {options.map((option) => {
                return (
                  <MenuItemOption
                    key={`multiselect-menu-${option}`}
                    type="button"
                    value={option}
                  >
                    {option}
                  </MenuItemOption>
                );
              })}
            </MenuOptionGroup>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

MultiSelectMenu.displayName = "MultiSelectMenu";

export default MultiSelectMenu;
