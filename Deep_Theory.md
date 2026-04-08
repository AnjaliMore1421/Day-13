# 1)useEffect Deep Dive: Dependency Array Behavior

`useEffect` is a React Hook used to handle **side effects** such as API calls, timers, event listeners, and local storage operations.

It runs **after the component renders**.

---

## Syntax

```jsx
useEffect(() => {
  // side effect code
}, [dependencies]);
```

- **Callback function** → contains side effect logic
- **Dependency array** → controls when the effect runs

---

## Dependency Array Behavior

### 1) No Dependency Array

```jsx
useEffect(() => {
  console.log("Runs after every render");
});
```

Runs after **every render**:
- initial render
- state update
- prop update

---

### 2) Empty Dependency Array `[]`

```jsx
useEffect(() => {
  console.log("Runs only once");
}, []);
```

Runs **only once after initial render**.

Used for:
- API call on load
- initial setup
- event listeners

---

### 3) Single Dependency

```jsx
useEffect(() => {
  console.log("Runs when count changes");
}, [count]);
```

Runs:
- on initial render
- whenever `count` changes

---

### 4) Multiple Dependencies

```jsx
useEffect(() => {
  console.log("Runs when count or name changes");
}, [count, name]);
```

Runs when **any dependency changes**.

---

# 2)Cleanup Functions and Memory Leaks in React

## Cleanup Function

A **cleanup function** is a function returned from `useEffect`.

It is used to **remove or clean resources** created by the effect.

### Syntax

```jsx
useEffect(() => {
  // side effect code

  return () => {
    // cleanup code
  };
}, []);
```

---

## When Cleanup Function Runs -

Cleanup runs in two cases:

1. **Before the effect runs again**
2. **When the component unmounts**

---

## Example -

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Running...");
  }, 1000);

  return () => clearInterval(timer);
}, []);
```

Here, the cleanup function clears the timer.

---

## Common Uses of Cleanup :

- `clearInterval()`
- `clearTimeout()`
- removing event listeners
- canceling API subscriptions
- closing WebSocket connections

### Example: Event Listener

```jsx
useEffect(() => {
  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
```

---

##  Memory Leak -

A **memory leak** happens when resources are not released after the component is removed.

This causes:
- unnecessary memory usage
- performance issues
- repeated background tasks

---

## Example of Memory Leak

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Running...");
  }, 1000);
}, []);
```

Without cleanup, the timer keeps running even after component unmounts.

This creates a **memory leak**.

---

# 3)useCallback and useMemo Optimization

`useCallback` and `useMemo` are React Hooks used for **performance optimization**.

They help avoid unnecessary re-renders and repeated calculations.

---

## useCallback -

`useCallback` is used to **memoize a function**.

It returns the **same function reference** unless dependencies change.

### Syntax -

```jsx
const memoizedFunction = useCallback(() => {
  // function logic
}, [dependencies]);
```

### Example -

```jsx
const handleClick = useCallback(() => {
  console.log("Button clicked");
}, []);
```

###  Use -

Normally, a new function is created on every render.

This can cause unnecessary re-rendering of child components.

`useCallback` prevents this by keeping the same function reference.

---

## useMemo

`useMemo` is used to **memoize a computed value**.

It stores the result of an expensive calculation and recalculates only when dependencies change.

### Syntax

```jsx
const memoizedValue = useMemo(() => {
  return expensiveCalculation();
}, [dependencies]);
```

### Example

```jsx
const total = useMemo(() => {
  return price * quantity;
}, [price, quantity]);
```

###  Use -

It prevents expensive calculations from running on every render.

---

## Difference

- `useCallback` → memoizes **function**
- `useMemo` → memoizes **value/result**

---

## Optimization Benefit

Both hooks improve performance by:

- reducing unnecessary re-renders
- avoiding repeated calculations
- improving app efficiency


 # 4)useRef Usage for DOM & Persistent Values

`useRef` is a React Hook used to create a **mutable reference object**.

It is mainly used for:

- accessing DOM elements directly
- storing persistent values between renders
- keeping values without causing re-render

---

## Syntax

```jsx
const refName = useRef(initialValue);
```

It returns an object with a `.current` property.

---

## 1) DOM Access

`useRef` is commonly used to access DOM elements directly.

### Example

```jsx
import React, { useRef } from "react";

function App() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </>
  );
}
```

Here, `inputRef.current` points to the input element.

Used for:
- focus input
- scroll element
- measure DOM size

---

## 2) Persistent Values

`useRef` can store values that persist across renders.

Unlike `useState`, updating `useRef` does **not re-render** the component.

### Example

```jsx
const countRef = useRef(0);

const handleClick = () => {
  countRef.current++;
  console.log(countRef.current);
};
```

The value remains stored even after re-render.

---

- `useState` → updates UI and re-renders
- `useRef` → stores value without re-render

This makes it useful for counters, previous values, timers, and DOM references. 


# 5)Custom Hooks Design Patterns

A **custom hook** is a reusable JavaScript function that uses React Hooks (`useState`, `useEffect`, etc.) to share logic between components.

It helps in **code reusability, cleaner components, and better maintainability**.

---

## Naming Rule

A custom hook must always start with **`use`**.

Examples:

- `useFetch`
- `useForm`
- `useToggle`

---

## Basic Syntax

```jsx
function useCustomHook() {
  // hook logic
  return value;
}
```

---

## Example: Toggle Hook

```jsx
import { useState } from "react";

function useToggle(initialValue = false) {
  const [isOpen, setIsOpen] = useState(initialValue);

  const toggle = () => setIsOpen(prev => !prev);

  return [isOpen, toggle];
}
```

### Usage

```jsx
const [isOpen, toggle] = useToggle();
```

---

## Common Design Patterns

### 1) Logic Reusability Pattern

Move repeated logic into a custom hook.

Example:
- form handling
- API calls
- authentication
- window resize listener

---

### 2) State + Actions Pattern

Return both **state value** and **functions to update it**.

```jsx
return { data, loading, fetchData };
```

This makes the hook easy to use.

---

### 3) Separation of Concerns

Keep UI code in components and business logic inside custom hooks.

This keeps components clean and readable.

---

## Benefits

- reusable logic
- less code duplication
- cleaner components
- easy testing
- better project structure
