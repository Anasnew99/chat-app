import { expect } from "chai";

import { RoomPostValidator } from "../../src/validators/Room";

describe("Test Room Validator", () => {
  context("Post Room Validator", () => {
    it("should validate with correct value", () => {
      const roomValues = {
        roomId: "TestRoom",
      };
      const { value, error } = RoomPostValidator.validate(roomValues);
      expect(error).to.be.undefined;
    });
    it("should not validate the incorrect value", () => {
      const roomValues = {
        roomId: "Test Room",
      };
      const { value, error } = RoomPostValidator.validate(roomValues);
      expect(error).to.not.be.undefined;
    });
    it("should validate correct password", () => {
      const roomValues = {
        roomId: "TestRoom",
        password: "Anasnew99@",
      };
      const { value, error } = RoomPostValidator.validate(roomValues);
      expect(error).to.be.undefined;
    });
  });
});
