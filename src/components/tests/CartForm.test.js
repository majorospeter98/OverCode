import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import CartForm from "../CartForm.vue";
import axios from "axios";

vi.mock("axios"); // copilot segítség kellett a vi.mock és axios mockhoz, enélkül 2 errort kaptam "Serialized Error: { code: 'UND_ERR_INVALID_ARG' }"
axios.get.mockResolvedValue({
  status: 200,
  data: { data: [] },
});

describe("Check cart item", () => {
  it("check if the cart is empty or not", () => {
    const wrapper = mount(CartForm, {
      props: {
        items: [{ name: "Kenyér", description: "Valami", bolt: "Tesco" }],
      },
    });
    expect(wrapper.text()).toContain("1 termék összesen");
  });
});

describe("Cart emptiness check", () => {
  it("check if the cart is empty", () => {
    const wrapper = mount(CartForm, {
      props: {
        items: [],
      },
    });
    expect(wrapper.text()).toContain("0 termék összesen");
  });
});
