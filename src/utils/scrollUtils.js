/**
 * Scrolls smoothly so that the given element is just below the fixed header.
 * @param {HTMLElement} element - The DOM element to scroll to.
 * @param {number} extraOffset - Additional offset in pixels (default: 0).
 */
export function scrollToElementBelowHeader(element, extraOffset = 0) {
  if (!element) return;

  const header = document.querySelector("header");
  const headerHeight = header ? header.offsetHeight : 0;

  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elementPosition - headerHeight - extraOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
}
