import { execute } from ".";
import { Application, AUTHENTICATION_TYPE } from "../../application";

describe("Execute", () => {
  let app: Partial<Application>;

  beforeEach(() => {
    app = {
      authentication: {
        type: AUTHENTICATION_TYPE.OAUTH2,
        test: () => {},
        label: "{{bundle.input.test}}",
      },
    };
  });

  it("Will parse authentication label if it is a string", async () => {
    const result = await execute(app as Application, {
      method: "authentication.label",
      bundle: {
        input: {
          test: "It works",
        },
        process: {
          env: {},
        },
      },
    });

    expect(result.output).toBe("It works");
  });
});
