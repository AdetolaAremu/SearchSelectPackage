# Vue 3 Search Select Component

A light-weight, flexible and easy-to-use Vue 3 `SearchSelect` component that allows users to search and select options from a dynamic or static list.

## Demo

Check out the [live demonstration](https://search-select.netlify.app/) to see the package in action.

## Installation

Install the package via npm:

```bash
npm i vue3-search-select
```

## Basic Usage

```js
import SearchSelect from 'vue3-search-select'
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

## Explanations

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

## Other optional props

| Prop                  | Description                                                                                           | Default Value     |
| --------------------- | ----------------------------------------------------------------------------------------------------- | ----------------- |
| listBackgroundColor   | This is the background of the dropdown list.                                                          | #e5e7eb           |
| inputBorderColour     | This is the input border colour.                                                                      | 1px solid gray    |
| inputFocusBorderColor | When the input is active or focused on, what colour do you want to show. this is where to specify it. | 1px solid #6a7ada |
| closeAfterMax         | Close the selection field once the selectMax condition/count specified is met.                        | false             |

## Happing coding!
