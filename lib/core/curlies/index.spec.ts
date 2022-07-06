import { curlies } from ".";

describe("Curlies", () => {
  it("Parses curlies and replaces them", () => {
    const output = curlies(
      {
        headers: {},
        params: {},
        query: {},
        data: {
          content: "Hello {{bundle.input.62bdb803dc4284b9dadcf3fd.field}}",
        },
      },
      {
        bundle: {
          input: {
            deepNested: ", Oslo",
            nested: "Eldegard{{bundle.input.deepNested}}",
            "62bdb803dc4284b9dadcf3fd": {
              field: "Vemund {{bundle.input.nested}}",
            },
          },
        },
      }
    );

    expect(output.data.content).toBe("Hello Vemund Eldegard, Oslo");
  });

  it("Parses curlies in a string", () => {
    const output = curlies(
      "Hello there {{bundle.input.name}}",
      {
        bundle: {
          input: {
            name: "Vemund Eldegard",
          },
        },
      },
      true
    );

    expect(output).toBe("Hello there Vemund Eldegard");
  });
});
