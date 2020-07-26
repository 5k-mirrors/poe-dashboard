import React from "react";
import DownShift from "downshift";
import matchSorter from "match-sorter";
import xIcon from "../../../resources/assets/SVGIcons/DownShiftSelectorIcons/xIcon";
import arrowIcon from "../../../resources/assets/SVGIcons/DownShiftSelectorIcons/arrowIcon";
import {
  SelectorButton,
  SelectorDiv,
  SelectorInput,
  SelectorLi,
  SelectorUl
} from "./DownShiftSelector.style";

const DownShiftSelector = ({ placeholder, onChange, items }) => {
  const onMouseDown = e => e.stopPropagation();
  const itemToString = selectedItem => {
    // `null` happens upon pressing escape to close selectors
    if (selectedItem === null) {
      return "";
    }
    return selectedItem.name;
  };
  return (
    <DownShift
      onChange={selection => {
        if (!selection) return onChange(null);
        return onChange(selection.id || selection.name);
      }}
      itemToString={itemToString}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        getToggleButtonProps,
        isOpen,
        clearSelection,
        inputValue,
        highlightedIndex,
        selectedItem
      }) => (
        <div>
          <SelectorDiv>
            <SelectorInput
              {...getInputProps({ placeholder })}
              onMouseDown={onMouseDown}
            />
            {selectedItem ? (
              <SelectorButton
                type="button"
                onClick={clearSelection}
                aria-label="clear selection"
                onMouseDown={onMouseDown}
              >
                {xIcon()}
              </SelectorButton>
            ) : (
              <SelectorButton
                {...getToggleButtonProps()}
                type="button"
                onMouseDown={onMouseDown}
              >
                {arrowIcon({ isOpen })}
              </SelectorButton>
            )}
            {isOpen && (
              <SelectorUl {...getMenuProps()} onMouseDown={onMouseDown}>
                {matchSorter(items, inputValue, {
                  keys: ["name"]
                }).map((item, index) => (
                  <SelectorLi
                    {...getItemProps({
                      key: index,
                      index,
                      item,
                      style: {
                        background: highlightedIndex === index && "#283142",
                        fontWeight:
                          selectedItem === item.name ? "bold" : "normal"
                      }
                    })}
                  >
                    {item.name}
                  </SelectorLi>
                ))}
              </SelectorUl>
            )}
          </SelectorDiv>
        </div>
      )}
    </DownShift>
  );
};

DownShiftSelector.defaultProps = {
  placeholder: ""
};

export default DownShiftSelector;
