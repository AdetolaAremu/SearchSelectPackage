export const getDisplayValue = (option: { [key: string]: any }, displayKey: string) => {
  return displayKey.replace(/\b(\w+)\b/g, (match) => option[match] || match)
}

export const onClickOutside = (element: HTMLElement, cb: () => void): void => {
  const handleClick = (event: MouseEvent) => {
    if (!element.contains(event.target as Node)) {
      cb()
    }
  }

  document.addEventListener('click', handleClick)
}
