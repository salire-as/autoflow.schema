import {
  Application,
  AUTHENTICATION_TYPE,
  InputOutputType,
  REQUEST_METHOD,
} from "../../lib";

const app: Application = {
  name: "MailChimp",
  description: "Flow triggers and actions for MailChimp",
  version: "1.0.1",
  authentication: {
    type: AUTHENTICATION_TYPE.OAUTH2,
    oauth2: {
      getAccessToken: {
        url: "https://login.mailchimp.com/oauth2/token",
        method: REQUEST_METHOD.POST,
        headers: { "content-type": "application/x-www-form-urlencoded" },
      },
      authorizeUrl: {
        url: "https://login.mailchimp.com/oauth2/authorize",
        method: REQUEST_METHOD.POST,
      },
    },
  },
  actions: {
    addListMember: {
      label: "Add member to list",
      description: "Add a new member to a list",
      documentation:
        "https://mailchimp.com/developer/marketing/api/list-members/add-member-to-list/",
      operation: {
        run: {
          url: "https://{{bundle.variables.dc}}.api.mailchimp.com/3.0/lists/{{bundle.variables.list_id}}/members",
          method: REQUEST_METHOD.POST,
        },
        runSubscribe: (f, bundle) => {
          return f.request({
            url: "https://{{bundle.variables.dc}}.api.mailchimp.com/3.0/lists/{{bundle.variables.list_id}}/members",
            method: REQUEST_METHOD.POST,
          });
        },
      },
      inputs: [
        {
          key: "email_address",
          label: "Email address",
          description: "Email address for the member to add to list",
          type: InputOutputType.STRING,
          required: true,
        },
        {
          key: "status",
          label: "Status",
          description: "Status to add to the member",
          type: InputOutputType.STRING,
          choices: [
            {
              label: "Subscribed",
              value: "subscribed",
            },
            {
              label: "Unsubscribed",
              value: "unsubscribed",
            },
          ],
          default: "subscribed",
        },
        {
          key: "list_id",
          label: "ID",
          description: "ID of list to add member to",
          type: InputOutputType.STRING,
          required: true,
        },
      ],
    },
  },
};

export default app;
