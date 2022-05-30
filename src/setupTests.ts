// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Fix for Jest to detect matchMedia
global.matchMedia = global.matchMedia || (() => {
    return {
        matches : false,
        addListener : () => {},
        removeListener: () => {}
    }
})