const { insertEntity } = require("../../services/tableService");

const { app } = require("@azure/functions");

app.http("InsertPost", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "blog-post",
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    try {
      if (!request.body) {
        return {
          status: 400,
          body: "Please pass a request body",
        };
      }

      const { blog, title, content } = await request.json();

      if (!blog || !title || !content) {
        return {
          status: 400,
          body: "Please pass blog, title and content",
        };
      }

      const entity = {
        PartitionKey: blog,
        RowKey: new Date().getTime().toString(),
        title,
        content,
      };

      const result = await insertEntity("Posts", entity);

      return {
        jsonBody: result,
      };
    } catch (error) {
      return {
        status: 500,
        body: error.message,
      };
    }
  },
});
