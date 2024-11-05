# Vue 3 Search Select Component

A light-weight, flexible and easy-to-use Vue 3 Search and Select component that allows users to search and select options from a dynamic or static list.

## Installation

Install the package via npm:

```bash
npm i vue3-search-select
```

## Demo

Check out the [live demonstration](https://search-select.netlify.app/) to see the package in action.

## QUICK PREVIEW

### Search Select

[![Search Select](https://i.postimg.cc/HsRN5Krk/Screen-Recording-2024-11-05-at-09-45-31.gif)](https://postimg.cc/ZCPjzwPG)

### Dynamic Multi Select

[![Dynamic Multi Select](https://i.postimg.cc/KzbH12k6/Screen-Recording-2024-11-05-at-09-45-31-1.gif)](https://postimg.cc/zLdjQ4k7)

## Components in this package

- Search Select
- Dynamic Multi Select

## Search Select

✨ Key Features
🗂 Custom Display Order
Arrange options in any order, helping users easily find frequently selected or high-priority items.

🔢 Conditional Count Display
Display options dynamically based on specific conditions, so users see only relevant choices.

🔍 Search Functionality
Integrated search allows users to quickly filter options by typing, ideal for large lists.

🔑 Primary Key Tracking
Each option is linked to a unique identifier (primary key), ensuring accurate selection and tracking of values.

⭐ Default Value Selection
Pre-select default values to highlight the most relevant choice, improving the initial user experience.

## Search Select Usage

```js
import { SearchSelect } from 'vue3-search-select'
```

```css
import "vue3-search-select/Vue-Search-Select.css";
```

```js
 <SearchSelect
    :data="pseudoEmployeeData"
    placeholderName="Employee" // optional
    displayKey="firstName lastName - employeeId"
    :selectMax="2" // optional
    v-model="employee"
    primaryKey="employeeId"
    :defaultValue="['emp-0001']" // optional
  />
```

## Dynamic Multi Select

The DynamicMultiSelect component is packed with advanced functionality, allowing users to select multiple options from a dynamic list with ease and flexibility.

🚀 Key Features
🎛️ Slot Manipulation
Customize component slots to control how each item selected will be displayed, allowing for unique visual arrangements.

🗂️ Custom Display Order
Easily reorder options to prioritize frequently selected or high-importance items at the top of the list.

🔑 Primary Key Tracking
Each item is uniquely identified by a primary key, ensuring consistent data handling and accurate selections.

🔢 Conditional Count Display
Apply conditions to dynamically control the visibility of options based on specific counts, improving list relevance.

🔍 Multi-Select Search
Built-in search functionality enables users to filter multiple selections, making large lists more manageable.

🖼️ Image Prefix for Options
Add an image prefix to each list option, creating a visually rich experience and making options more recognizable.

⭐ Default Value Selection
Set default values to highlight recommended or commonly selected options, enhancing the user experience from the start.

🚫 Auto-Close on Maximum Selection
Automatically close the dropdown when the maximum number of selections is reached, ensuring users know their selection limit.

```js
import { DynamicMultiSelect } from 'vue3-search-select'
```

```css
import "vue3-search-select/Vue-Search-Select.css";
```

```js
  <DynamicMultiSelect
    v-model="anotherEmploye"
    :data="pseudoEmployeeData"
    display-key="firstName lastName - employeeId"
    primary-key="employeeId"
    imgPrefix="src" // (optional) to add prefix to the list for each item, src is the key in the object of each array
    :select-max="3" // optional
    :defaultValue="['APN999000', 'APN0001']" // optional
    :closeAfterMax="true" // optional
  >
    <template #listClassPrefix="{ item }"> // optional slot manipulation to add prefix to each item in a list
      <div :class="item.tag === 'tech' ? 'red-circle' : 'blue-circle'"></div>
    </template>
    <template #dynamicAction="{ item }">
      {{ fullNameList(item) }}
    </template>
  </DynamicMultiSelect>

  const fullNameList = (item: Person[]) => { // show fullname after the picked
    let allItems = item?.map((obj) => `${obj.firstName} ${obj.lastName}`).join(', ')
    return allItems
  }
```

## Explanations of All Props

- **data**: This is where you pass your data to, it houses/consumes your data.

- **placeholderName**: This is what is attached to the count of the things you will pick in the input box e.g 2 Employee Selected. Take note of the "**Employee** that was passed to the component". You can change it to whatever you want. This is optional prop. If you exclude the placeholderName prop, once you pick items what will show in the input will be e.g "1 item selected"

- **displayKey**: This is what will be displayed from the data you are passing. You can decide to add a **separator**. From the example component you can decide to use

```js
firstName lastName // coming from the api/json you are consuing
```

OR

```js
firstName lastName | employeeId // coming from the api/json you are consuing
```

- **selectMax**: **This is an optional prop**, if you want to pick from the list inifintely, you can take off the **selectMax** prop from the component. But if you have need to cap the number of items to be picked from the list then add the **selectMax** prop. Once it is met, all other items will be disabled.

- **v-model**: of course we know what v-model is.

- **primaryKey**: Primary key is an essential part of this component, because it tells the component to keep track of a particular **key** in the array that is being passed to it and this is what **v-model** will be keep track of. If your primary key is employeeId, as you keeping picking from the list, it will keep adding employeeId to **v-model** as an array e.g [00000, 22222, 44444].

- **defaultValue**: **This is an optional prop**. This is the prop you will use if you need to pass default value that matches the primaryKey. E.g in an edit page, you will certainly be passing default value.

- **imgPrefix**: **This is an optional prop for Dynamic Multi Select**. All that is needed is to reference key in the object from the data you are sending to the dynamic multiselect. The key can be _src_, _image_, _link_ etc. What is important is that, **it must be an image**.

- **slots**: Only two slots are available for **Dyamic Multi Select** and they are:

1. _List Prefix_: You can add a prefix to the list being displayed in the drop down, e.g you want to add a blue circle/banner to the prefix of each item if their tag is tech and blue circle for others. **NOTE**: To use this slot, make sure the **imgPrefix is taken off the component because it will take precedence over this list class prefix prop**.

_EXAMPLE_

```js
  <template #listClassPrefix="{ item }">
    <div :class="item.tag === 'tech' ? 'red-circle' : 'blue-circle'"></div>
  </template>
```

2. _Dynamic Action_: This is the slot you can use to manipulate the display of the items you have picked. By using this slot you can add only images to slot, show the name of items piacked, add banners etc. All you need to do make use of the _item_ that passed down to the slot template.

_EXAMPLE_

```js
  <template #dynamicAction="{ item }">
    {{ fullNameList(item) }}
  </template>

  const fullNameList = (item: Person[]) => { // show fullname after the picked
    let allItems = item?.map((obj) => `${obj.firstName} ${obj.lastName}`).join(', ')
    return allItems
  }
```

- **closeAfterMax**: If you added selectMax to any of the components. Once there is a _closeAfterMax_ is added to your component, it will close the selection dropdown once **selectMax** is true.

## Other Search Select optional props

| Prop                  | Description                                                                                           | Default Value     |
| --------------------- | ----------------------------------------------------------------------------------------------------- | ----------------- |
| listBackgroundColor   | This is the background of the dropdown list.                                                          | #e5e7eb           |
| inputBorderColour     | This is the input border colour.                                                                      | 1px solid gray    |
| inputFocusBorderColor | When the input is active or focused on, what colour do you want to show. this is where to specify it. | 1px solid #6a7ada |
| closeAfterMax         | Close the selection field once the selectMax condition/count specified is met.                        | false             |

## Other Dynamic Multi Select optional props

| Prop                         | Description                                                                                           | Default Value     |
| ---------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------- |
| dynamicListBackgroundColor   | This is the background of the dropdown list.                                                          | #e5e7eb           |
| dynamicInputBorderColour     | This is the input border colour.                                                                      | 1px solid gray    |
| dynamicInputFocusBorderColor | When the input is active or focused on, what colour do you want to show. this is where to specify it. | 1px solid #6a7ada |
| closeAfterMax                | Close the selection field once the selectMax condition/count specified is met.                        | false             |

### License

This package is open-source software licensed under the **MIT license**.

## Happing coding!
