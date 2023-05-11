const { app } = require("@azure/functions");
const azure = require("azure-storage");
const { queryEntities } = require("../../services/tableService");

app.http("GetPost", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "blog-post/{blog}/{id}",
  handler: async (request, context) => {
    try {
      const { blog, id } = request.params;

      const query = new azure.TableQuery().where(
        "PartitionKey eq ? and RowKey eq ?",
        blog,
        id.toString()
      );

      const result = await queryEntities("Posts", query);

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
