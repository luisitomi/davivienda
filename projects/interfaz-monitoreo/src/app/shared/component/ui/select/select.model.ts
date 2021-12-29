export class DropdownItem {
  label?: string;
  value?: string;
  type?: string;
  selected? = false;

  constructor(item?: any) {
    if (item.label) {
      this.label = item.label;
    }
    if (item.type) {
      this.type = item.type;
    }
    if (item.value) {
      this.value = item.value;
    }
    if (item.selected) {
      this.selected = item.selected;
    }
  }
}

export type EventDropdown = {
  originalEvent: Event;
  dropdownItem: DropdownItem;
  value: string;
  type: string;
};

export type DropdownItemAarray = Array<DropdownItem>;
