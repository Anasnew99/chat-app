import { expect } from "chai";

import { RoomPostValidator } from "../../src/validators/Room";

describe("Test Room Validator", () => {
  context("Post Room Validator", () => {
    it("should validate with correct value", () => {
      const roomValues = {
        name: "Test Room",
        owner: "anasnew99",
      };
      const { value, error } = RoomPostValidator.validate(roomValues);
      expect(error).to.be.undefined;
    });
    it("should not validate the incorrect value", () => {
      const roomValues = {
        name: "Test Room",
        password: "Anasnew",
        owner: "anasnew99",
      };
      const { value, error } = RoomPostValidator.validate(roomValues);
      expect(error).to.not.be.undefined;
    });
    it("should validate correct password", () => {
      const roomValues = {
        name: "Test Room",
        password: "Anas1234@",
        owner: "anasnew99",
      };
      const { value, error } = RoomPostValidator.validate(roomValues);
      expect(error).to.be.undefined;
    });
  });
});
