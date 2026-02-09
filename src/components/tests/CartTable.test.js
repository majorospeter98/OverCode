import { mount } from "@vue/test-utils";
import { describe, it, expect, vi} from "vitest";
import CartTable from "../CartTable.vue";

describe("EmptyCheck", () => {
  it("check if the table is empty or not", () => {
    const wrapper = mount(CartTable, {
      props: {
        items: [],
      },
    });
    expect(wrapper.text()).toContain("Üres a listád");
  });
});

describe("TableLengthCheck", () => {
  it("Check the table length", () => {
    const wrapper = mount(CartTable, {
      props: {
        items: [{ name: "Kenyér", description: "Valami", bolt: "Tesco" }],
      },
    });
    expect(wrapper.findAll("tr").length).toBe(1);
  });
});
