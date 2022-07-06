import { F } from ".";
import { Application, REQUEST_METHOD } from "../../application";
import { Bundle } from "../bundle";
import { RESPONSE_ERROR } from "../errors";

describe("F", () => {
  let app: Application;

  beforeEach(() => {
    app = {
      befores: [],
      afters: [],
    } as unknown as Application;
  });

  it("Can run sample request", async () => {
    const bundle: Bundle = {
      input: {
        orgnr: "923679995",
      },
      process: {
        env: {
          CLIENT_ID: "123",
        },
      },
    };

    const f = new F(app, bundle);

    const result = await f.request({
      url: "https://data.brreg.no/regnskapsregisteret/regnskap/{{bundle.input.orgnr}}",
      method: REQUEST_METHOD.GET,
      params: {
        år: "2021",
        regnskapstype: "SELSKAP",
      },
    });

    expect(f.httpRequests).toHaveLength(1);
    expect(result.data).toBeInstanceOf(Array);
    expect(f.httpRequests[0].request?.url).toBe(
      "https://data.brreg.no/regnskapsregisteret/regnskap/923679995"
    );
  });

  it("throws on f.request error", async () => {
    const bundle: Bundle = {
      input: {
        orgnr: "NOT_VALID",
      },
      process: {
        env: {
          CLIENT_ID: "123",
        },
      },
    };

    const f = new F(app, bundle);

    const result = f.request({
      url: "https://data.brreg.no/regnskapsregisteret/regnskap/{{bundle.input.orgnr}}",
      method: REQUEST_METHOD.GET,
      params: {
        år: "2021",
        regnskapstype: "SELSKAP",
      },
    });

    await expect(result).rejects.toThrow(RESPONSE_ERROR);

    expect(f.httpRequests).toHaveLength(1);
  });

  it("Will resolve nested curlies in the execution", async () => {
    const bundle: Bundle = {
      input: {
        nested: "923679995",
        orgnr: "{{bundle.input.nested}}",
      },
      process: {
        env: {},
      },
    };

    const f = new F(app, bundle);

    await f.request({
      url: "https://data.brreg.no/regnskapsregisteret/regnskap/{{bundle.input.orgnr}}",
      method: REQUEST_METHOD.GET,
      params: {
        år: "2021",
        regnskapstype: "SELSKAP",
      },
    });

    expect(f.httpRequests[0].request?.url).toBe(
      "https://data.brreg.no/regnskapsregisteret/regnskap/923679995"
    );
  });
});
