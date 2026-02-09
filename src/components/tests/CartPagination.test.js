import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import CartPagination from "../CartPagination.vue";

describe("Button length check if there is item", () => {
  it("check if the cart is empty or not", () => {
    const wrapper = mount(CartPagination, {
      props: {
        items: [{ name: "Kenyér", description: "Valami", bolt: "Tesco" }],
      },
    });
    expect(wrapper.findAll("button").length).toBe(3);
  });
});

describe("Button length emptiness check", () => {
  it("check if the cart is empty", () => {
    const wrapper = mount(CartPagination, {
      props: {
        items: [],
      },
    });
        expect(wrapper.findAll("button").length).toBe(0);
  });
});
