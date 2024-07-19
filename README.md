# SearchSelect Component

A flexible and easy-to-use Vue 3 `SearchSelect` component that allows users to search and select options from a dynamic list.

## Installation

Install the package via npm:

```bash
npm install searchselect-component
```

## Basic Usage

```js
 <SearchSelect
    :data="pseudoEmployeeData"
    placeholderName="Employee"
    :searchTermProp="searchTerm"
    :isOpenProp="isOpen"
    display-key="firstName lastName"
    v-model="employee"
  />
```

## Explanations

- data: This is where you pass your data to, it houses/consumes your data.

- placeholderName: This is what is attached to the count of the things you will pick in the input box e.g 2 Employee Selected. Take note of the "**Employee** that was passed to the component"

- searchTermProp: This is what will capture your search string. Note that this must be a ref e.g

```js
const searchTerm = ref('') // or ref / reactive / any other reactive term
```

- isOpenProp: This is expecting a reactive boolean value to know whether to open the select options or not. e.g

```js
const searchTerm = isOpen(false) // or ref / reactive / any other reactive term
```

- displayKey: This is vital because this is **what will be displayed in the list**. From the **data** you are sending to the component, you will pick the ones that will be displayed e.g **firstName lastName**
