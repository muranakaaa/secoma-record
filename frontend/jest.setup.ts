import '@testing-library/jest-dom';

jest.spyOn(global.Storage.prototype, "setItem");
jest.spyOn(global.Storage.prototype, "getItem");
jest.spyOn(global.Storage.prototype, "removeItem");